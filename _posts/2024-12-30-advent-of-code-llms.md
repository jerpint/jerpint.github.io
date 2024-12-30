---
title: "Performance of LLMs on Advent of code 2024"
date: 2024-12-30T00:00:00-05:00
excerpt: "Taking a look at how LLMs performed on the latest AoC competition."
categories:
  - blog
tags:
  - python
---

<!-- ## TL;DR -->

In this post I'll look at how LLMs performed on [Advent of Code 2024](https://adventofcode.com/).
Surprisingly, they didn't perform nearly as well as I'd expect, which we'll explore in this post.
Here are the main results:

<script
	type="module"
	src="https://gradio.s3-us-west-2.amazonaws.com/5.9.1/gradio.js"
></script>

<gradio-app src="https://jerpint-advent24-llm.hf.space"></gradio-app>

##  Intro

I recently [wrote about my experience](https://www.jerpint.io/blog/advent-of-code-24/) with the 2024 advent of code challenge. 
Part of my challenge this year was not to use any LLMs, which I got really used to using in the last few years.
This was mostly a learning exercise for me to brush up on and learn more about leetcode-style problems.



As we all know by now, LLMs are particularly good at leedcode-style problems.
I think there's a very small window of opportunity to evaluate the performance of LLMs on this competition before they inevitably scrape answers and 
have the chance to overfit to this new challenge. 


I was mostly curious: 

> how well would someone do if they only used LLMs during the AoC challenge?

Or asked differently:

> How well will LLMs perform at actually never-before-seen problems?

More importantly, I wanted to know how well would LLMs perform without any humans steering the responses. 
This mimics pretty well a scenario where specific requirements would be sent straight to an LLM without any human in the loop.


## Setup

I decided to test the models in a relatively simple framework.

- The model is given a prompt with the full problem description of both parts combined. 
This arguably makes it easier, since requirements change quite a bit from part one to part two (increasing the difficulty).

- The model must return a single script to be run and evaluated by me on the same inputs I had access to. To score a star, the answer had to be an exact match. 
This is very much in-line with AoC submissions, which don't consider your code, just a properly submitted answer.


I used the same prompts accross all models. 
I did no attempt to do any prompt engineering, though I don't think this will have that much impact in this case.
The problem descriptions themselves are already very clear and to the point-ish.


Here are the prompts:

```python
SYSTEM_PROMPT = "You are a programming assistant. You are solving the 2024 advent of code challenge."
PROMPT_TEMPLATE = """You are solving the 2024 advent of code challenge.
You will be provided the description of each challenge. You are to provide the solution to each given challenge.
1) You can reason and explain your logic before writing the code.
2) You must write the code such that it can be parsed into an actual python file.
3) It will be parsed by the evaluator, so it must be valid python code.
4) All of the code must be in a single code block, delimited by ```python and ```.
5) To count as a proper submission, the code must print the result to each question asked.
6) Each question will have a single string as an answer. Make sure to print it that string, and nothing else.
7) The actual input to the question will be provided in a file relative to the python file, e.g. "./input.txt". You must read and parse from the file accordingly. You can safely assume the file will always be relative to the python file.

Here is an example of a proper submission:

You reasoning goes here ...

```python


file = "input.txt"

def your_function(...)
    ...

...
print(result1)


def your_other_function(...)
    ...

...
print(result2)

\```

Here is today's challenge description:
{problem_description}
"""
```


I picked most of the SOTA models that mostly compare with each other on various coding benchmarks.



```json
all_models = {
    "openai": ["gpt-4o"],
    "gemini": ["gemini-1.5-pro"],
    "anthropic": ["claude-3-5-sonnet-20241022"],
}
```

Of course, you could argue that the most advanced inference-time models aren't on the list, 
but I also wanted to have a fair comparison for similar models.
I also think that while advent of code is difficult to me, it's also much easier to people (and therefore LLMs) 
who have extensive experience in programming competitions (disclaimer: I definitely do not).

Therefore, I genuinely thought before running this experiment that this very selection of LLMs would perform really well out-of-the-box.

For each response, I then basically just parsed out the code blocks, ran the python file and collected `stdout` outputs from my machine.

I ran each model with a max timeout of 300 seconds (applied this to myself as well), which is very generous for most AoC problems (brute force is almost never the best or even possible solution, though lord knows I tried many a brute-force solve). 
If a model gives an error for whatever reason, this counts as a mistake.


Remember: The goal here is not to see how well a meat-bag can steer a model, but how well it can steer itself given only clear instructions on unseen problems.

## Analysis
Here are the results:

<gradio-app src="https://jerpint-advent24-llm.hf.space"></gradio-app>

Surprisingly, I did much better than the LLMs, this was something I was not expecting!

Some things to note with my current setup: 

- A model has access to both problems at once, which in my opinion makes the solving easier (since problems tend to change and you can therefore think ahead).

- A model can only score as high as me: this is because I didn't solve all problems, therefore I don't have all solutions to evaluate the models on. 
Though you could argue a model could have scored one or two more stars, looking at the breakdown by day, there were very few instances where that might have actually happened (remember that part 1 needs to be solved in order to attempt part 2).

I really thought point 2) would be a problem, because I really thought the LLMs would perform really well, but there are only a few instances where it could have maybe made a difference in their score (e.g. problem 16 where I know im very close to the answer, I just needed to debug a little more).
This is because I have already solved all part 1s possible, so if a model would have successfully solved part 1 on a day I didn't solve part 2, I didn't have a way to evaluate it.
Of course, I could just start entering them manually to check, but I don't want to inflate my scorecard.

So what's going on? A few things:

- First, I suspect that we are seeing what many have pointed out over and over - these models are really good at using program templates for problems they've already seen, but not great at solving never-before-seen problems.
We might be seeing a change with test-time inference models, but that still requires A LOT of compute, as shown on the latest [arc benchmarks](https://arcprize.org/blog/oai-o3-pub-breakthrough).

- Second, a lot of the submissions had timeout errors, which means that their solutions might work if asked more explicitly for efficient solutions. 
However the models should know very well what AoC solutions entail, since it's been going on for 10 years after all!

- Finally, some of the submissions raised some `Exceptions`, which would likely be fixed with a human reviewing this code and asking for changes.
You can also argue that an agentic setup with a critiquer might do better. This leads perhaps to the conclusion that these kinds of competitions could be good benchmarks for coding agents while they're happening.
I'm sure that if the model had access to an interpreter and more inference-time compute they could probably fix some of those errors as well.

One thing to note is that I ran all of the prompts on December 26th, so there was basically no chance that models had been trained on submission code yet. 
I do suspect performance on AoC 24 will increase over time...
