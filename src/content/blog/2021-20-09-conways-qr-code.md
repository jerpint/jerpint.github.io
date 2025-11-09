---description: Animating QR codes using Conway's game of life
pubDate: 2021-09-20 00:00:00-05:00
title: Conway's QR Codes of Life
---


# TL;DR

Animate a QR code using Conway's game of Life:
![image]../../assets/images/qr_code_gif.gif)

<a href="https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/Conway's_QR_Code.ipynb">
<button type='button'>&nbsp;Check it out on <span><img src="/assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>

# Conway's game of Life
John Conway, a British mathematician, discovered a beautifully simple phenomenon he dubbed the game of life.
Long story short, given a grid of live or dead cells, and with a sprinkle of simple rules, "life-like" kind of structures emerge over time.
It's one example of something called cellular automatons, which themselves might warrant their own blog post (hint to future me...).

Implementing the game of Life isn't difficult, it's just a few rules that you have to respect, namely:

> 1. Any live cell with two or three live neighbours survives.
> 2. Any dead cell with three live neighbours becomes a live cell.
> 3. All other live cells die in the next generation. Similarly, all other dead cells stay dead. [1](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Rules)


The only thing left is to find the right starting point. I guess you see where this is going...

# QR Codes

QR codes are everywhere these days. At restaurants, on boarding passes, on billboards, even on vaccine passports.
These are all binary maps full of entropy gifted to us by the universe, so let's put them to good use and use them in our game of life.

To fetch our QR code, we use `requests` and `PIL` to load the image. We then binarize it by thresholding using the mean grayscale value.
This is a gross approximation - we are not replicating 1:1 the binary map, we're just using an approximation that's good enough to play the game.


```python
def URL_to_pil_img(URL):
  """Fetch an image from a URL and load it as a PIL Image."""
  urllib.request.urlretrieve(URL, "qrcode.png")
  pil_img = Image.open("qrcode.png") # .resize((new_w, new_h), Image.ANTIALIAS)
  return pil_img

def binarize_qr_code(pil_img):
  """Convert a qr code to a binary map + resize it."""
  # resize
  old_w, old_h = pil_img.size
  new_w = 400
  new_h = int(new_w / old_w * old_h)
  pil_img = pil_img.resize((new_w, new_h), Image.ANTIALIAS)

  # convert to grayscale
  gray_image = np.array(ImageOps.grayscale(pil_img))

  # convert to binary map
  game_array = (gray_image > np.mean(gray_image)).astype(int)

  return game_array
```

# Implementing the game of Life
We need to count the number of live and dead neighbours at each generation and then implement our rules.
Instead of doing nested `for` loops and dealing with edge cases,
we'll simply using a convolution between the current game state and this kernel:
```
kernel = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
]
```

This is done in the `count_neighbors` method of the game:

```python
def count_neighbors(self):
    '''
    Count the number of live neighbors each cell in self.state has with convolutions.
    '''
    self.neighbors = (
        signal.convolve2d(self.state,
                          self.kernel,
                          boundary='fill',
                          fillvalue=0,
                          mode='same').astype('int')
    )
```
We are setting a zero padding boundary with the `fill` and `fillvalue` parameters, and the `same` means our output is the same dimension as our input.
Pretty neat trick to count neighbours, right?

Next, to change values to dead or alive, we apply our rules and update our grid:

```python
def step(self):
    '''Update the game based on conway game of life rules'''
    # Count the number of neighbors each cell has via convolution
    self.count_neighbors()

    # Copy of initial state
    self.new_state = self.state

    # Rebirth if cell is dead and has three live neighbors
    self.new_state += np.logical_and(self.neighbors == 3, self.state == 0)

    # Death if cell has less than 2 neighbors
    self.new_state -= np.logical_and(self.neighbors < 2, self.state == 1)

    # Death if cell has more than 3 neighbors
    self.new_state -= np.logical_and(self.neighbors > 3, self.state == 1)

    # Update game state
    self.state = self.new_state
```

All of the methods are wrapped in a class for convenience.


# Putting it all together
In the colab, we can set the length of the game to be as long as we want using the `n_steps` parameter. Let's see the evolution of our QR code over a longer period of time:

<video width="480" height="320" controls="controls">
  <source src="https://user-images.githubusercontent.com/18450628/134022642-4f80f5b5-6959-45df-89cd-bdcb0441b176.mp4" type="video/mp4">
</video>

Ah, so satisfying!

All the code to reproduce this is on Colab:

<a href="https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/Conway's_QR_Code.ipynb">
<button type='button'>&nbsp;Check it out on <span><img src="/assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>
