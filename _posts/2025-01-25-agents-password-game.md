---
title: "'The Password Game' is a Solid Benchmark for Multimodal Agents"


date: 2025-01-22T00:00:00-05:00
excerpt: "Comparing multimodal agents and how they struggle on 'The Password Game'"
categories:
  - blog
tags:
  - agents
  - multimodal
---
<!-- title: "Multimodal Agents Struggle with 'The Password Game'" -->
<!-- title: "'The Password Game' is the ultimate benchmark for multimodal agents" -->

## The Password Game

[The Password Game](https://neal.fun/password-game/) is a kafkaesque masterpiece of absurdity.
The goal is simple: create a password that satisfies all the rules, which get increasingly obtuse.

The best way to get a feel for it is simply to [try it yourself](https://neal.fun/password-game/).
There are [_insane videos_](https://www.youtube.com/watch?v=o3nBbvfdwkI) of people getting through all 35 rules.
Some absurd tasks include solving captchas, playing chess, geoguessing, and my favourite - [keeping Paul 🐔 alive.](https://youtu.be/o3nBbvfdwkI?si=JUI4VZfUv5BqfCmF&t=681).


![image](../../assets/images/password-game/screenshot2.png)


## Multimodal Agents

2025 seems to be the year of Agents™️, even though no one really agrees on what they really are.
With all the hype around agents, it's hard to truly know what these things can actually do or not.
<!-- Still, there are plenty of impressive demos out there and the promises are endless. -->
<!-- Imagine being able to have an Agent™️  go off and book you the cheapest flights, airbnbs, buses, etc. all while you go do things "real humans" do. -->

<!-- Most benchmarks these days focus on really hard things, like proving theorems or fixing github issues. -->
<!-- In some cases, those benchmarks can be overfitted and sometimes gamed [citation needed]. -->

This is where 'The Password Game' comes in. A few requirements make it particularly interesting:

- It requires vision capabilities
- It requires interacting with a webpage
- It requires reasoning through conflicting rules

<!-- Most importantly - It hasn't been overfitted yet. -->

It's also very easy to _understand_. 
While solving it is difficult, the rules themselves are mostly clear and concise. 

You can also observe in real-time where multimodal agents might stumble and what reasoning led to it.
And since the rules increase incrementally in difficulty, we can basically just keep track of how far an agent is able to get in the game to measure performance.


## The Setup

A recent library, [browser use](https://github.com/browser-use/browser-use), has made setting this all up [pretty easy](https://gist.github.com/jerpint/24ed3dbfa9a85ee64b34499100b4ac6c).
It takes screenshots of the browser and overlays elements on screen that the model can then interact with via tool use. 
It takes care of all the heavy-lifting. 
You just have to define a task for the LLMs.
Here's what the LLMs "see":

![image](../../assets/images/password-game/screenshot.png/)

I purposefully made the `task` prompt super simple - there are already plenty of prompts under the hood of `browser-use` 
and the goal is to see how an agent performs with very little direction on the actual task:

```python
TASK = """
Go to https://neal.fun/password-game/ and find an appropriate password that satisfies the criteria.
Keep track of the highest rule number that has been satisfied explicitly in a variable in memory, e.g. MAX_RULE=1.
"""
```

Because I don't have access programatically to the game itself, I figured I'd just let the LLM keep track of its own score, which I could then parse from the history.
This ended up working most of the time, though I did have to intervene sometimes (more on that later).

## Results

Here's an example of `gpt-4o` attempting the password game. I added the textbox with the model's thoughts and actions on top.

<div style="display: flex; justify-content: space-between;">
  <figure style="margin: 0 10px;">
    <img src="../../assets/images/password-game/gpt-4o.gif" alt="Image 2" style="width: 100%;"/>
  </figure>
</div>

It starts off really strong, breezing through the captcha, sponsor logo and Roman Numerals.
However, once the Captcha is solved, it then struggles to get the digits to add to 25 once more and just gets stuck endlessly mashing things.

I evaluated different models and providers for a maximum of 30 steps. 
I only ran each model once (running these evals is not cheap!), though I'm sure you might get different results averaging over many runs.
Here are the results I got:

<div style="display: flex; justify-content: space-between;">
  <figure style="margin: 0 10px;">
    <img src="../../assets/images/password-game/model_scores.png" alt="Image 2" style="width: 100%;"/>
  </figure>
</div>

Below, you can scroll through the replays for each one of the attempts:
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Model Comparisons</title>
    <style>
        .container {
            max-width: 900px;
            margin: 20px auto;
            position: relative;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            border-radius: 8px;
        }
        .title-banner {
            background: #333;
            color: white;
            padding: 15px;
            text-align: center;
            font-family: Arial, sans-serif;
            font-size: 1.2em;
            border-radius: 8px 8px 0 0;
        }
        .slider {
            overflow: hidden;
            position: relative;
            border-radius: 8px;
            background: #f5f5f5;
        }
        .slides {
            display: flex;
            transition: transform 0.3s ease;
        }
        .slide {
            min-width: 100%;
        }
        img {
            width: 100%;
            height: auto;
            display: block;
        }
        .caption {
            text-align: center;
            padding: 12;
            background: #f5f5f5;
            font-family: Arial, sans-serif;
            font-size: 0.8em;
            border-top: 1px solid #eee;
        }
        .model-name {
            font-weight: bold;
            color: #333;
        }
        .navigation {
            text-align: center;
            padding: 15px;
        }
        button {
            background: #333;
            color: white;
            border: none;
            padding: 8px 16px;
            margin: 0 5px;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background: #555;
        }
        .counter {
            display: inline-block;
            margin: 0 15px;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="slider">
            <div class="slides">
                <div class="slide">
                    <img src="../../assets/images/password-game/gpt-4o.gif" alt="gpt-4o">
                    <div class="caption">
                        <span class="model-name">gpt-4o</span>
                        <br>
                        Breezing through the captcha, but struggles with digit sum rule after that.
                    </div>
                </div>
                <div class="slide">
                    <img src="../../assets/images/password-game/claude-3-5-sonnet-20241022.gif" alt="Claude 3 Example">
                    <div class="caption">
                        <span class="model-name">Claude 3.5 Sonnet</span>
                        <br>
                        Fools itself into thinking it solved the captcha, and then terminates the task early.
                    </div>
                </div>
                <div class="slide">
                    <img src="../../assets/images/password-game/gpt-4o-mini.gif" alt="GPT-4 Example">
                    <div class="caption">
                        <span class="model-name">gpt-4o-mini</span>
                        <br>
                        Can't get past the digit sum rule. Tries to scroll down the page for some reason.
                    </div>
                </div>
                <div class="slide">
                    <img src="../../assets/images/password-game/gemini-1.5-flash.gif" alt="Claude 2 Example">
                    <div class="caption">
                        <span class="model-name">gemini-1.5-flash</span>
                        <br>
                        Can't get past the digit sum rule.
                    </div>
                </div>
                <div class="slide">
                    <img src="../../assets/images/password-game/gemini-1.5-pro.gif" alt="GPT-3.5 Example">
                    <div class="caption">
                        <span class="model-name">gemini-1.5-pro</span>
                        <br>
                        Can't get past the digit sum rule.
                    </div>
                </div>
            </div>
        </div>
        <div class="navigation">
            <button onclick="prevSlide()">Previous</button>
            <span class="counter">1 / 5</span>
            <button onclick="nextSlide()">Next</button>
        </div>
    </div>

    <script>
        const slides = document.querySelector('.slides');
        const titleBanner = document.querySelector('.title-banner');
        const counter = document.querySelector('.counter');
        let currentSlide = 0;
        const totalSlides = 5;

        function updateSlides() {
            slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            counter.textContent = `${currentSlide + 1} / ${totalSlides}`;

            // Update title banner based on current slide
            const titles = [
                "GPT-4o Password Game Attempt",
                "Claude 3 Password Game Attempt",
                "GPT-4 Password Game Attempt",
                "Claude 2 Password Game Attempt",
                "GPT-3.5 Password Game Attempt"
            ];
            titleBanner.textContent = titles[currentSlide];
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlides();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlides();
        }
    </script>
</body>

Some interesting observations:

- `gpt-4o-mini`, `gemini-1.5-flash` and `gemini-1.5-pro` can't make it past summing digits to 25 rule.
- `gemini-1.5-pro` doesn't seem to keep anything useful in its previous memories
- `gpt-4o` breezes through the first series of rules including the captcha.
It then gets caught up on summing to 25 again and can't get past that.
- `claude-3-5-sonnet` doesn't make it past the captcha. It does fool itself into thinking it solved it, and falsely incremented its counter which I had to correct.
It even terminated the task prematurely assuming it was all done!

Of course, this is just based on a single run for each model and is not statistically significant.
I'm sure running them multiple times would yield different results. 
But part of me was hoping some of these models would make it much further on a first try.

Though it might be tempting to add more instructions to the prompt, 
part of the point of this exercise is to see how much the agents can figure out on their own.

Keep in mind also that these models are first and foremost trained on text.
This task specifically involves parsing the text from the image, and then acting on it.
Interestingly enough, from the logs, the "reading" part does not seem to be too problematic. 
Coordinating the interpretation, reasoning and acting on some of the observations seems to be much harder.
In some cases it feels like the brain tells it to do something, but the limb just doesn't act accordingly.

If you want to replicate the experiments, you can find the code [here](https://gist.github.com/jerpint/24ed3dbfa9a85ee64b34499100b4ac6c)

## Conclusion

"The Password Game" in its current form is currently too hard for multimodal agents.
It might just be a really good benchmark, assuming it doesn't become *too* popular and people don't start gaming it.

It could be that the models themselves are not properly trained to handle this kind of reasoning just yet.
It could also be that the agentic methods of `browser-use` are not optimal for this kind of setup.

One thing is for sure, I will be using this as a personal benchmark for future multimodal agents!
