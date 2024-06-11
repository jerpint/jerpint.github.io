---
title: "Stable Diffusion 🤝 Game of Life"
date: 2024-06-11T00:00:00-05:00
excerpt: "How to use stable diffusion to animate the game of life."
categories:
  - blog
tags:
  - python
  - colab
  - pytorch
header:
  og_image: /assets/images/gol_snapshot.png
---

## TL;DR

In this post, we we will be using Stable Diffusion to animate the famous [Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).

![image](../../assets/images/gol_resize.gif)


<a href="https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/gol_diffusion.ipynb">
<button type='button'>&nbsp;Check it out on <span><img src="../../assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>

# How it works

## ControlNet

Fundamentally, we are using [stable diffusion](https://en.wikipedia.org/wiki/Stable_Diffusion) to generate the images.
However, vanilla stable diffusion doesn't allow for the preservation of the grid of cells, especially not as we iterate through the game.

Instead, we use a variant of stable diffusion called [ControlNet](https://huggingface.co/docs/diffusers/en/using-diffusers/controlnet).
ControlNet has the nice property that you can feed it both a start image as well as a "control image", which encodes the general outlines of the shape you want to preserve.

In practice, this can be done using segmentation maps, canny edges, etc. With it, we can preserve the shapes while letting the model generate the fill.
Here, ControlNet is used to map a painting to another painting while preserving the original structure.

![image](../../assets/images/controlnet-text2img-demo.png)
[source](https://huggingface.co/docs/diffusers/en/using-diffusers/controlnet)


## QR Code ControlNet

Shortly after ControlNet, a fun use-case people thought of was to [finetune ControlNet](https://huggingface.co/DionTimmer/controlnet_qrcode) to preserve the semantics of QR Codes. Think of it; if you can preserve the shapes of the tiles enough, you can generate actually fun QR codes, it's so simple yet powerful:

![image](../../assets/images/qr_code_controlnet.png)
[source](https://huggingface.co/DionTimmer/controlnet_qrcode/blob/main/README.md)

## Connecting the Dots

Inspired by this idea, I thought it would be fun to connect the dots: after all, the game of life can easily be thought of as a QR Code grid, as I wrote about in a [previous post](https://www.jerpint.io/blog/conways-qr-code/).

We pretty much just need to generate a control image from each game of life state, and use it to guide our ControlNet model. For example:

![image](../../assets/images/gol_frame_with_guide.png)


Now we can iterate on each cell of the game, and for each one generate an image. Note that there is nothing guaranteeing temporal consistency, we are just hoping for the best by controlling the seeds. Here is the overall pseudo-code that we then need to implement:

```python
controlnet = ControlNet()  # Load the model
grids = GameOfLife.generate_grids()  # Playout the game of life
source_image = load_image(IMAGE_URL)  # Load a source image
frames = []  # Collect all frames here

for grid in grids:
    # generate a frame
    frame = controlnet.generate(source_image=source_image, control_image=grid, **controlnet_kwargs)
    frames.append(frame)

display_gif(frames)
```

We can start with plenty of different types of images, for example, here is one with the famous "Tsunami by hokusai" theme:

![image](../../assets/images/gol_resize_2.gif)

## Full Code

The entire implementation itself is available in a colab notebook:

<a href="https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/gol_diffusion.ipynb">
<button type='button'>&nbsp;Check it out on <span><img src="../../assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>