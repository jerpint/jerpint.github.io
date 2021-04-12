---
title: "Reversing a Neural Network"
date: 2021-04-11T00:00:00-05:00
excerpt: "Reverse the traditional way a Neural Network is optimized to get insights into what it sees."
categories:
  - blog
tags:
  - python
  - pytorch
  - neural-network
  - colab
classes: wide
header:
  - image: "/assets/images/photo-jer-mila_square.jpg"
---

<a href='https://colab.research.google.com/drive/1ODzFT8u4PyXFqRdgYkrICfNM2xY6F2El?usp=sharing'>
<button type='button'>&nbsp;View the code on <span><img src="../../assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>

In this post, we are going to explore how to "reverse" a neural network - also known as [feature visualization](https://distill.pub/2017/feature-visualization/). 

The traditional way to train a neural network is to optimize the weights to achieve a task:

![reverse_nnet1](https://user-images.githubusercontent.com/18450628/114316243-bbd36300-9ad0-11eb-9251-d1637221e4c0.png)

When we reverse a neural network, we optimize the input instead of optimizing the weights. 

![reverse_nnet2](https://user-images.githubusercontent.com/18450628/114316534-fc7fac00-9ad1-11eb-96fc-984382fd3897.png)

This will generate an image that triggers what activates the part of the network that we choose to target. 
It allows us to probe what the network focuses on. 

Earlier layers of the network show intricate patterns:

![early-layer](https://user-images.githubusercontent.com/18450628/114316654-6b5d0500-9ad2-11eb-915d-cfbc24eebc28.png)

Later figures show some sometimes creepy looking alien animals, some mish-mash of what the network has learned to recognize:


![iteration 2450](https://user-images.githubusercontent.com/18450628/114315727-3949a400-9ace-11eb-8108-0e6b23211bf8.png)

We can even animate (and visualize) the process from noise to convergence:

![png_to_gif](https://user-images.githubusercontent.com/18450628/114315818-a3fadf80-9ace-11eb-92c8-d974022ffaf1.gif)


There are a lot of tricks that go into doing this reversal, and I wanted to try my own "simple" implementation.
I used VGG19 because the linear structure made it easy to dissect.

There is a lot of really nice work on the subject, far more advanced than what I present here.  
[Here](https://distill.pub/2017/feature-visualization/) is an excellent in-depth intro to the subject that goes much further than this post.
More recently, it was used to [study multi-modal inputs in DALL-E](https://openai.com/blog/multimodal-neurons/).

I made [all the code available](https://colab.research.google.com/drive/1ODzFT8u4PyXFqRdgYkrICfNM2xY6F2El?usp=sharing), so you can try looking for weird creatures yourself!

<a href='https://colab.research.google.com/drive/1ODzFT8u4PyXFqRdgYkrICfNM2xY6F2El?usp=sharing'>
<button type='button'>&nbsp;View the code on <span><img src="../../assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>
