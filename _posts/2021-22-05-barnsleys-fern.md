---
title: "Barnsley's Fern"
date: 2021-05-22T00:00:00-05:00
excerpt: "Constructing Barnley's Fern using python"
categories:
  - blog
tags:
  - python
  - colab
classes: wide
header:
  - og_image: "/assets/images/barnsley_fern.png"
---

# Barnsley's Fern

<a href="https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/Barnley's_Fern.ipynb">
<button type='button'>&nbsp;Check it out on <span><img src="../../assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>

In 1988, Michael Barnsley published an elegant way to programatically generate ferns. The rules are rather simple: iteratively apply a rotation + translation to a coordinate with certain probabilities, and voilà! 
A fern appears:

![image](https://user-images.githubusercontent.com/18450628/119228569-967b4100-bae1-11eb-9970-ffb21b2aca29.png)


## How it works
The fern is generated iteratively. Starting with a seed coordinate, we jump to a new coordinate using an update rule. Given a coordinate vector [x, y], the update is given by:

![\Large x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}](https://latex.codecogs.com/svg.latex?\Large&space;\begin{bmatrix} x_{n+1}\\ y_{n+1} \end{bmatrix} = A\begin{bmatrix} x_{n}\\ y_{n} \end{bmatrix} + b) 

Which values you use for A and b depend on a probability p. For this specific fern, there are four possible sets of values for A and b, each with it's associated p:

![\Large x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}](https://latex.codecogs.com/svg.latex?\Large&space;A_{1} = \begin{bmatrix} 0 & 0\\ 0 & 0 \end{bmatrix}, b_{1}  \begin{bmatrix} 0\\ 0 \end{bmatrix}, p1=0.01)

![\Large x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}](https://latex.codecogs.com/svg.latex?\Large&space;A_{2} = \begin{bmatrix} 0.85 & 0.04 \\ -0.04 & 0.85 \end{bmatrix}, b_{2}  \begin{bmatrix} 0\\ 1.60 \end{bmatrix}, p2=0.85)

![\Large x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}](https://latex.codecogs.com/svg.latex?\Large&space;A_{3} = \begin{bmatrix} 0.20 & -0.26 \\ 0.23 & 0.22 \end{bmatrix}, b_{3}  \begin{bmatrix} 0\\ 1.60 \end{bmatrix}, p3=0.07)

![\Large x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}](https://latex.codecogs.com/svg.latex?\Large&space;A_{4} = \begin{bmatrix} -0.15 & 0.28\\ 0.26 & 0.24 \end{bmatrix}, b_{4}  \begin{bmatrix} 0\\  0.44 \end{bmatrix}, p4=0.07)

We plant a seed at [0, 0] and iterate for as many steps as we'd like. At each step, we plot the coordinate. That's it!

## Python Implementation
Let's code this in python. First, we define our transformations and their associated probabilities:

```python
import numpy as np

A1 = np.array(([0, 0], [0, 0.16]))
b1 = np.array([[0], [0]])
p1 = 0.01

A2 = np.array(([0.85, 0.04], [-0.04, 0.85]))
b2 = np.array([[0], [1.60]])
p2 = 0.85

A3 = np.array(([0.20, -0.26], [0.23, 0.22]))
b3 = np.array([[0], [1.60]])
p3 = 0.07

A4 = np.array(([-0.15, 0.28], [0.26, 0.24]))
b4 = np.array([[0], [0.44]])
p4 = 0.07
```

Next, we chose given probability p which update rule to apply, and apply it as long as many times as we want:

```python
fern = [] # The collection of all Xs that will make up our Fern
X = np.array(([0], [0]))  # Seed

for N in range(100000):
    p = np.random.random()  # Random value between 0 and 1
    if p < p1:
        A, b = A1, b1
    elif p < p1 + p2:
        A, b = A2, b2
    elif p < p1 + p2 + p3:
        A, b = A3, b3
    elif p < p1 + p2 + p3 + p4:
        A, b = A4, b4
    X = np.matmul(A, X) + b  # Update Rule
    fern.append(X)  # Add our new point to the fern
```

The last step is simply to scatter plot all our results:
```python
import matplotlib.pyplot as plt

plt.figure(figsize=(10, 10))
plt.scatter(x=[X[0] for X in fern], y=[X[1] for X in fern], c="green", s=0.5)
plt.axis("off")
```
![image](https://user-images.githubusercontent.com/18450628/119228569-967b4100-bae1-11eb-9970-ffb21b2aca29.png)

That's it! All the code to reproduce this is on Colab:

<a href="https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/Barnley's_Fern.ipynb">
<button type='button'>&nbsp;Check it out on <span><img src="../../assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>
