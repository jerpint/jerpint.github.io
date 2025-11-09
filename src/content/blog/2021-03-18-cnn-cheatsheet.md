---description: A collection of animations explaining operations in convolutional neural
  networks
pubDate: 2021-03-18 00:00:00-05:00
title: Convolutional Neural Networks Cheat Sheet
---
Here are a collection of animations I made for visualizing typical operations in Convolutional Neural Networks. I used them in the context of IVADO/Mila's [deep learning schools](https://catalogue.ivado.umontreal.ca/Web/MyCatalog/ViewP?pid=DwpGfXsYFQ5dNLAWEt9mWQ%3d%3d&id=nEhGP8rT7JIzvZQYUOcwdw%3d%3d). 

All animations were done using the 3blue1brown's manim library. Check out the [code](https://github.com/jerpint/manim/blob/master/convnet.py) to reproduce the images.

# 1D Convolution

![conv1d](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/Conv1D.gif)


# 2D Convolution

## Zero Padding
![zeropad](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/Conv2D_zeropad.gif)

## Valid Convolution
![valid](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/Conv2D.gif)

## Same Convolution
![same](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/Conv2D_zeropad.gif)

## Full Convolution
![full](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/Conv2D_full_padding.gif)

## Strided Convolution
![strided](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/Conv2D_strided.gif)

## Strided 1 and Stride 2
![strided2](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/Conv2D_stride.gif)

## Pooling
![pooling](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/Pooling.gif)

## Dilated Convolution
![dilated](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/Conv2D_dilated.gif)

## MNIST Convolution
![mnist_conv](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/MnistConvNet.gif)

## Depth
![depth](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/Conv2D_depth.gif)

## RGB Convolution
![rgb_conv](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/RGBConv.gif)

## RGB to Volume
![rgb2vol](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/RGB_vol2vol.gif)

## Volume to Volume
![rgb2vol](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/RGB_vol2vol_2.gif)

## 1x1 Convolution
![onebyone](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/OnebyOneConv.gif)

## Global Pooling
![globalpool](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/global_pooling.gif)

## Transpose Convolution
![transpose_conv](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/deConv2D.gif)
![transpose-2](https://github.com/jerpint/cnn-cheatsheet/raw/master/assets/deConv2D_frac.gif)
