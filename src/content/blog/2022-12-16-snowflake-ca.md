---description: Generate snowflakes using simple rule-based cellular automata
pubDate: 2022-12-16 00:00:00-05:00
title: "Making snowflakes with cellular automata \u2744\uFE0F"
---

TL;DR: Generate snowflakes using cellular automata.

<a href="https://colab.research.google.com/drive/1bvOigjYLq3Rrt-QwDqjjr_0aP33T1Elc?usp=sharing">
<button type='button'>&nbsp;Check it out on <span><img src="/assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>

<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/p5@1.3.1/lib/p5.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.3.1/lib/p5.sound.js"></script>
    <script src="/assets/snowflakes.js"></script>
  </head>
  <body>
    <main>
    </main>
  </body>
</html>

*Click on the image to reset the animation!*


## Making Snowflakes

Arguably, the most famous Cellular Automata (CA) is [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life).
What's interesting is that we can slightly modify the rules to generate snowlakes!

In the original CA, we work on a square grid and assume each cell to have 8 neighbors.
For our snowflake, we will work on a hexagonal lattice and assume each cell to have 6 neighbors.

We will be using the `odd-r` representation to represent our lattice (see this wonderful [post](https://www.redblobgames.com/grids/hexagons/#conversions) for more info).
This allows us to use a regular array and simply "convert" the representation to a hexagonal grid.

![image](https://user-images.githubusercontent.com/18450628/208270779-eee19784-1610-49a9-8be6-5d34274b2b0c.png)


To get a cell's neighboring cell coordinates, we can then simply implement the following function:

```python
def get_adjacent_cells(i, j):
  """Given a position i,j, get all adjacent neighbors on hexagonal grid."""
  if j % 2 == 0:
    adjacent_cells =  (i-1, j-1), (i, j-1), (i-1, j), (i+1, j), (i-1, j+1), (i, j+1)
  else:
    adjacent_cells =  (i, j-1), (i+1, j-1), (i-1, j), (i+1, j), (i, j+1), (i+1, j+1)
  return adjacent_cells
```


We then need to define an update rule for our snowflake CA. We keep track of two states:

* `"ice": 1`
* `"melted": 0`


To define an update, we simply count the number of "icy" and "melted" neighbors for a given cell and decide what should then happen:

Here's an example set of rules:

```python
if sum(neighbors) == 1:
    snowflake[i, j] = 1
elif sum(neighbors) == 2:
    snowflake[i, j] = 0
elif sum(neighbors) == 3:
    snowflake[i, j] = 0
elif sum(neighbors) == 4:
    snowflake[i, j] = 1
elif sum(neighbors) == 5:
    snowflake[i, j] = 1
elif sum(neighbors) == 6:
    snowflake[i, j] = 0
```

Now we can simply iterate over this and generate pretty snowflakes!

![image](https://user-images.githubusercontent.com/18450628/208271151-65bc9474-e56c-4da7-9728-d28cfde00786.png)


<a href="https://colab.research.google.com/drive/1bvOigjYLq3Rrt-QwDqjjr_0aP33T1Elc?usp=sharing">
<button type='button'>&nbsp;Check it out on <span><img src="/assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>

