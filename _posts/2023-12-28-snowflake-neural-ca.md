---
title: "Growing snowflakes with neural cellular automata"
date: 2024-01-09T00:00:00-05:00
excerpt: "Generate snowflakes using neural cellular automata"
categories:
  - blog
tags:
  - python
  - colab
  - pytorch
---

<html>
<head>
<style>
.centered-video {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 640px; /* or any desired width */
    height: 480px; /* or any desired height */
}
</style>
</head>
</html>

## TL;DR

In this post, we will look at how to generate snowflakes using neural cellular automata:
<br>

<video class="centered-video" controls autoplay loop>
  <source src="../../assets/images/neural_ca_snowflake.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

<br>

All code used is available in a notebook:


<a href="https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/neural_ca.ipynb">
<button type='button'>&nbsp;Check it out on <span><img src="../../assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>


## Neural Cellular Automata

In an earlier [post](/blog/snowflake-ca/), I showed how we could use cellular automata (CA) to generate snowflakes. In this post, I will go one step further and implement a neat concept published a few years ago: neural cellular automata.

While it is conceptually similar, i.e. start from a seed and evolve a snowflake using deterministic rules, in neural CA, the rules are learned using gradient descent.

While I will cover in some detail how neural cellular automata work, I still very highly recommend the very clear and well explained [distill paper](https://distill.pub/2020/growing-ca/) on the subject.

In a nutshell, we construct a grid of cells. Each cell can be decomposed into 2 states: a "visible" state, and a "hidden" state. The visible state is essentially the RGB representation of our state (the pixel values), and the hidden state encodes underlying information about the cell. This hidden state will allow the model to decide how to update it at each step.

In practice, we encode each "cell" in our grid as a 16-channel vector representation: the first 4 elements are the visible portion (RGB+alpha pixel values), and the last 12 represent the hidden state of the cell, which can be thought of as a dense vector encoding some underlying information about the cell.


<!-- <img width="1259" alt="image" src="https://github.com/jerpint/jerpint.github.io/assets/18450628/df4a198d-0f88-439c-8443-d983a54cf3cc"> -->

The authors also chose to incorporate "spatial awareness" as a prior to the model by computing Sobel gradients in both x and y dimensions, for both the visible and hidden states, and add those to the original state as input to a neural network. This means that by construction, a cell can have access to information about its immediate neighbors relative to itself.

<img width="674" alt="image" src="https://github.com/jerpint/jerpint.github.io/assets/18450628/8dc5c46e-8b05-4375-99d5-553aea7c07b7">

In order to efficiently compiute the sobel filters, we can modify the Conv2D layer and hard-code our sobel kernels:

```python

    def _init_sobel_kernels(self):
        in_channels = out_channels = 16

        # Define the sobel kernel
        sobel_x = torch.tensor([
                [-1, 0, 1],
                [-2, 0, 2],
                [-1, 0, 1],
            ],
            dtype=torch.float,
        )

        # Declare the conv. layers
        self.sobel_x_conv = torch.nn.Conv2d(
            in_channels=in_channels,
            out_channels=out_channels,
            kernel_size=3,
            padding="same",
        )

        # Initialize all weights to zero
        x_sobel_weights = torch.zeros_like(self.sobel_x_conv.weight)

        # For each channel, we only want to compute the sobel convolution for the given channel
        # Because of how Conv2D are implemented, we set the kernels to non-zero only on the "diagonal"
        for channel in range(in_channels):
            x_sobel_weights[channel, channel, :] = sobel_x

        # Set biases to 0
        x_sobel_bias = torch.zeros_like(self.sobel_x_conv.bias)

        # Reassign the weights, requires_grad=False so they don't get updated!
        self.sobel_x_conv.weight = torch.nn.Parameter(
            x_sobel_weights, requires_grad=False
        )
        self.sobel_x_conv.bias = torch.nn.Parameter(x_sobel_bias, requires_grad=False)
            

    def perceive(self, grid):
        "Compute the sobel convolutions at each step)"
        grad_x = self.sobel_x_conv(grid)
        grad_y = self.sobel_y_conv(grid)
        return torch.cat((grid, grad_x, grad_y))

```

To make a next state prediction, we define a neural network to learn an "update" step, in practice a 2-layer convolutional neural network:

<img width="646" alt="image" src="https://github.com/jerpint/jerpint.github.io/assets/18450628/0ff7a62a-414d-4b3b-8aab-2aecfd6ec489">

```python
self.updater = torch.nn.Sequential(
    torch.nn.Conv2d(in_channels=48, out_channels=128, kernel_size=1),
    torch.nn.ReLU(),
    torch.nn.Conv2d(in_channels=128, out_channels=16, kernel_size=1),
)

# In practice we also initialize the weights of the last conv. layer to 0
```

The initial grid is zeroed everywhere except in the center point - this is our seed. Then, for each grid, the model spits out the next grid state, and we can then auto-regressively generate our snowflake:

```python
grid = initialize_grid()

# Auto-regressively do model inference
for step in range(steps):
    grid = model(grid)
```

To decide which cells live or die, we use the "alpha" channel of the RGB-A representation (usually represents transparency). If the transparency value is below a certain threshold, the cell doesn't survive and is zeroed out.
To add a bit of stochasticity to the model, at every update we also "disable" at random cells from our grid (in practice they are unaffected by the update).

```python
def forward(self, grid):
    perception_grid = self.perceive(grid)
    updated_grid = self.updater(perception_grid)

    grid = grid + updated_grid * self.stochastic_masking(updated_grid)
    grid = grid * self.alive_masking(grid, thresh=0.1)

    return grid
```

So what exactly are we learning anyway? We start with a target of a snowflake, in our case the snowflake a snowflake emoji:

<img width=200 alt="A photo of a snowflake emoji" src="../../assets/images/snowflake_emoji.png" alt="Snowflake Emoji" style="display: block; margin-left: auto; margin-right: auto;">


Then, starting from our seed, we evolve our grid for a random amount of steps, and simply calculate the `MSELoss()` between our original emoji and what we evolved.


```python
def train_loop(image: Image, num_epochs: int) -> NeuralCA:
    # Initialize the model
    model = NeuralCA(image)

    loss_fn = torch.nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=2e-3, weight_decay=0)

    for epoch in (pbar := tqdm(range(num_epochs))):
        # initialize an empty grid and reset the optimizer state
        grid = model.initialize_grid()
        optimizer.zero_grad()

        # sample a random number of steps
        steps = np.random.randint(64, 96)
        for step in range(steps):
            grid = model(grid)

        prediction = grid[: model.target.shape[0], :]  # the "image" portion of the prediction
        loss = loss_fn(prediction, model.target)
        loss.backward()

        pbar.set_description("Loss %s" % loss.item())

        # clip gradients
        torch.nn.utils.clip_grad_norm_(model.parameters(), 0.001)
        optimizer.step()
    return model
```

After training for a set number of epochs, we eventually have a proper snowflake cellular automata:

<video class="centered-video" controls autoplay loop>
  <source src="../../assets/images/neural_ca_snowflake.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>



<a href="https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/neural_ca.ipynb">
<button type='button'>&nbsp;Check it out on <span><img src="../../assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>

