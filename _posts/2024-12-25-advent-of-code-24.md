---
title: "Recap on Advent of Code 2024"
date: 2024-12-25T00:00:00-05:00
excerpt: "Overall thoughts on the 2024 challenge"
categories:
  - blog
tags:
  - python
---

## TL;DR

Here is a recap of my experience on the 2024 [advent of code](https://adventofcode.com/)

![image](https://github.com/user-attachments/assets/82927b43-1e7f-432e-93aa-926a520f9602)

You can find my code submissions on [github](https://github.com/jerpint/advent24). 

## Advent of Code 2024

The [advent of code](https://adventofcode.com/) is a yearly challenge during which for each day of December leading to x-mas, thousands of people compete to get gold stars as fast as possible.

A new coding challenge is unveiled at midgnight (eastern time). Each day consists of 2 problems, though the second is only revealed once the first is solved.
For each correct answer provided, you get a gold star ⭐️.

<!-- Each user is provided their own unique variant of the problem (their input), and each solution is to be provided via a textbox. -->
<!-- A proper solution simply requires you to paste the correct solution in a text box. No code needs to be submitted - you just need to find the right answer. -->
<!--  -->
<!-- It doesn't matter how good or bad your code is, as long as the answer is good. Brute forcing will work in theory, but might not always earn you your gold stars on time for xmas...  -->

This year was my first time actively participating to the challenge. I definitely didn't expect it to be as addictive as I found it.

While programming is a big part of my career, a lot of these coding challenges tend to require a good grasp of very specific data structures and algorithms that you rarely tend to encounter in the real-world. 
I thought it would be a good way to brush up on some of my skills, while also learning new algorithms along the way.

## Rules that I Followed

I got really used to pair-programming with LLMs and using editors with built-in AI completion. While I love these tools, I wanted to take the opportunity to sharpen my code writing.
Here are some of the rules I followed:

1. ABSOLUTELY NO USAGE of LLMs. This means for both code generation and for ideation. I used VIM for the entire challenge to be on the safe side and avoid temptation.
2. Googling is only permitted to search and read up on known algorithms (e.g. djikstra, bfs, etc.). No external code snippets are to be used.
3. All answers must be self-contained in a single .py file

I also tried my best to use only core python modules - no external libraries.
I did break that soft rule on one exception when I used numpy to compute the inverse of matrices.

## My performance

You can find my code submissions on [github](https://github.com/jerpint/advent24). 
Note that the code is very messy and was optimized for getting an answer as fast as possible and not much more. 
Once a problem was solved, I moved onto the next one. Hopefully none of this code would ever pass any kind of code review :)

My personal score is (as of writing) 41/50 ⭐️. My personal goal was to have at least one gold star each day, which I am quite happy I managed to obtain.
For the remaining stars, some I genuinely have no idea how to solve, and others I need to debug or think a bit more about.

![image](https://github.com/user-attachments/assets/82927b43-1e7f-432e-93aa-926a520f9602)


## My Experience

While I consider myself overall a somewhat decent programmer, I definitely found some of the problems to be particularly challenging.
This style of programming is definitely something you need to practice, especially if you ever want any chance at being competitive on the leaderboard.

I would say that while some solutions took minutes, others took many hours. There's a well done leaderboard to which you can compare your times and scores to others.
This is especially true for recursive functions I had to debug, or for problems I simply had never been exposed to before.
For example, this is the first time I ever write a maze-solving algorithm!

One thing I did notice is that editors with AI completion really do save me a ton of typing. 
By the 2nd week, I started noticing a bit of pain in my fingers from all the typing. 
Even though I code a lot at work, I've been using IDEs like cursor which I find minimize the amount I need to type quite a bit, especially when it comes to boilerplate code.

There were some really nice easter eggs along the way, like this xmas tree I had to hunt like a needle in a haystack on day 14:

```
.....................1.....................................................
..........11...............................................1...............
.......................1111111111111111111111111111111.....................
.......................1.............................1.....................
.......................1.............................1.....................
.......................1.............................1.....................
.......................1.............................1.....................
................1......1..............1..............1.....................
..................1....1.............111.............1.....................
...............1.......1............11111............1.....................
.......................1...........1111111...........1....................1
................1......1..........111111111..........1.....................
.......................1............11111............1.....1...1...........
....................1..1...........1111111...........1.....................
.....1.................1..........111111111..........1.....................
.......................1.........11111111111.........1...............1.....
............1..........1........1111111111111........1..................1..
...1...................1..........111111111..........1.....................
.......................1.........11111111111.........1.....................
.......................1........1111111111111........1.....................
.......................1.......111111111111111.......1.....................
.....1..............1..1......11111111111111111......1.....................
.................1.....1........1111111111111........1.....................
.......................1.......111111111111111.......1..........1.1........
.......................1......11111111111111111......1...............1.....
.......................1.....1111111111111111111.....1...................1.
.......................1....111111111111111111111....1...............1...1.
......1................1.............111.............1.....................
.......................1.............111.............1.....................
.......................1.............111.............1.....................
.......................1.............................1....1................
................1......1.............................1.....................
.......................1.............................1.....................
.......................1.............................1.................1...
.......................1111111111111111111111111111111.....................
....1..............1.........................................1.............
```
