---description: GPT4 struggles to find good wordle strategies, only wins 10% of games.
pubDate: 2023-03-26 00:00:00-05:00
title: GPT4 Can't Play Wordle
---

**TL;DR**: I evaluate GPT4's ability to play Wordle. GPT4's wordle strategy is suboptimal.
Out of 10 games, GPT4 only gets 1/10 correct. All of the code to reproduce these results is [made available](https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/gpt-4ordl/wordle.ipynb).

<a href="https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/gpt-4ordl/wordle.ipynb">
<button type='button'>&nbsp;Check it out on <span><img src="/assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>


## Intro

[Wordle](https://www.nytimes.com/games/wordle/index.html) is a fun online game that consists of guessing 5-letter words.
You get clues each turn on the position of the letters, and have a total of 6 tries.
Invalid words don't count. Every day, a new daily wordle appears, and users have to guess it.

Here's a quick snapshot of the rules:

![image](https://user-images.githubusercontent.com/18450628/227807838-50cf6745-d79b-4cf2-b1ef-d04b61b45db4.png)

## GPT4 and Wordle

GPT4 is no doubt one of the most impressive LLMs out there (read: ever). I was curious to see how well it would fare at wordle, so I decided to put it to the test.

Here is the setup 👇:

* Make it play 10 games
* Only use words that were previously used by the NYT wordle game
* Follow official NYT rules

## Prompt engineering

I didn't want to make the prompt to complicated, so I stuck to the game description found on the official wordle website as closely as possible.

I added an example of how I want it to answer so that it was easy for me to extract its actual guess (prompt engineering magic).

Finally, I also asked it to reason step by step: [this has been shown](https://arxiv.org/pdf/2205.11916.pdf) to give GPT models much better performance, and also allows us to follow its reasoning.

Here's the full prompt:

```python
INSTRUCTIONS = """You are playing the game wordle.

# HOW TO PLAY
Guess the wordle in 6 tries.

* Each guess must be a valid 5-letter word.
* The color of the tiles will change to show how close your guess was to the word.

Examples:
WEARY: 🟩 ⬜ ⬜ ⬜ ⬜, W is in the word and in the correct spot.

PILLS: ⬜ 🟨 ⬜ ⬜ ⬜, I is in the word but in the wrong spot.

VAGUE: ⬜ ⬜ ⬜ ⬛️ ⬜, U is not in the word in any spot.

APPLE: 🟩 ⬛ ⬛ ⬛ ⬛, A is in the correct spot, P-P-L-E are not in the word.

Respond with your reasoning, step by step, motivating your choice. After your reasning, respond, on a newline, only with your guess, where your guess is a valid 5 letter word and nothing else.

For example:

Because I know that the A is in the first place, I will guess the word apple.
APPLE

Game begins.
⬜ ⬜ ⬜ ⬜ ⬜
"""
```

I responded with only with emojis following the same colors given by the NYT.

## Some examples

Let's start by analyzing a few examples.

I also tested on `chatGPT` on all the same words, which performed even worse, and so I am not adding it to this post.

You can see the unabriged outputs of all games played (and all the code used) [in the notebook](https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/gpt-4ordl/wordle.ipynb) (scroll towards the cells at the end).


```
===============================================================================
Word to guess: GLOOM
Using model: gpt-4
===============================================================================
[gpt-4] I'll start with a common word to get some hints.
PLATE
[user] ⬛️ 🟩 ⬛️ ⬛️ ⬛️
[gpt-4] Since the L is in the correct spot, I'll try another word with L in the second position.
FLAKE
[user] ⬛️ 🟩 ⬛️ ⬛️ ⬛️
[gpt-4] Since the L is again the only correct letter, I'll try another word with L as the second letter.
BLAZE
[user] ⬛️ 🟩 ⬛️ ⬛️ ⬛️
[gpt-4] The L remains the only correct letter, so I'll try another word with L as the second letter.
SLATE
[user] ⬛️ 🟩 ⬛️ ⬛️ ⬛️
[gpt-4] Given that L is consistently the only correct letter, I will try a different word with L as the second letter.
ALLOY
[user] ⬛️ 🟩 ⬛️ 🟩 ⬛️
[gpt-4] Now I see that there are two matching letters, so I’ll try another word with an L in the second position and retaining the O common letter but in another position.
CLOWN
[user] ⬛️ 🟩 🟩 ⬛️ ⬛️
Game failed, too many guesses.
********************************************************************************
```

After the first guess, the reasoning seems to indicate it understands the rules since it knows L is in the correct spot.
However, the next few guesses after have an A and an E in 3rd and 5th place, even though the first turn showed the letters shouldn't be there. This isn't good strategy.

It its 5th attempt, it gets the O in the proper place, but from its reasoning, suggests it should then try the O in a different position. This behaviour is also unexpected.

Let's look at another example:

```
===============================================================================
Word to guess: CRAVE
Using model: gpt-4
===============================================================================
[gpt-4] I will start with a common starting word to potentially reveal some vowels and consonants.
AHEAD
[user] 🟨 ⬛️ 🟨 ⬛️ ⬛️
[gpt-4] Since the A and E are in the word but in different positions, I will try to find the correct positions for those vowels.
ARENA
[user] 🟨 🟩 🟨 ⬛️ ⬛️
[gpt-4] With the E in the correct position and the A in the word but in a different position, I will try to find the correct position for the A.
ADORE
[user] 🟨 ⬛️ ⬛️ 🟨 🟩
[gpt-4] Now I know that the O and the E are in the correct positions. I'll try to find the correct position for the A and figure out the missing letter.
ABODE
[user] 🟨 ⬛️ ⬛️ ⬛️ 🟩
[gpt-4] Since the A was not in the correct position in ABODE, I know it must be in the first position. I'll try to find the remaining letters.
ALONE
[user] 🟨 ⬛️ ⬛️ ⬛️ 🟩
[gpt-4] Since ALONE didn't work, I will try another word with A in the first position.
ALIEN
[user] 🟨 ⬛️ ⬛️ 🟨 ⬛️
Game failed, too many guesses.
```

In its first guess, it gets 2 letters, A and E, but in the incorrect position.
It recognizes this, (it says it will try putting the A and E different positions), but suggests another word with A and E in the same spots.
It then gets another good letter, but seems to ignore it, and instead says the E is in the proper position (it isn't).

Also, notice how every word it guesses in this round begins with A even though the first hint was a clear giveaway that the word shouldn't start in A.
Ultimately, it looses the game.

Most of the other games are like this, except for the one game it gets correct. Let's take a look at the correct game:

```
===============================================================================
Word to guess: FORGE
Using model: gpt-4
===============================================================================
[gpt-4] For my first guess, I'll try a word that has a variety of vowels and consonants. This will help me see if any of these letters are in the word or in the correct positions.

Since the word "PLATE" covers different vowels and consonants, I will start with that.

PLATE
[user] ⬛️ ⬛️ ⬛️ ⬛️ 🟩
[gpt-4] Based on the feedback, the letter "E" is in the correct position. I will guess a new word with "E" in the last position and different vowels and consonants in the other spots to gather more information.

I will guess the word "CHORE."

CHORE
[user] ⬛️ ⬛️ 🟨 🟨 🟩
[gpt-4] From the given feedback, I can tell that the letters "O" and "R" are in the word but not in their current positions, and "E" is in the correct position. I now need a word with "O" and "R" in different positions and "E" at the end.

I will guess the word "ADORE."

ADORE
[user] ⬛️ ⬛️ 🟨 🟨 🟩
[gpt-4] The same feedback suggests that "O," "R," and "E" are still in the word, but "O" and "R" are not in the correct positions. I will keep "E" at the end and rearrange "O" and "R" again in the word, while changing the remaining letters.

I will now try the word "FORCE."

FORCE
[user] 🟩 🟩 🟩 ⬛️ 🟩
[gpt-4] Now I see that "F," "O," and "R" are in the correct positions, while "E" remains in the correct position. I need to find a letter to replace the "C" that completes the word.

I will guess the word "FORGE."

FORGE
[user] 🟩 🟩 🟩 🟩 🟩
Game solved!
```

This time, it plays almost perfectly. It guesses it in 5 attempts, which is OK, but not great. Guessing ADORE after CHORE, is suboptimal, and wastes a precious turn.


## So what?

These examples show a pretty flawed strategy to a pretty popular game, played by the world's best availble LLM.
I was expecting it to perform much better, and was surprised to see it score so low.

So what does it mean? Why can GPT pass law school exams, medical exams, engineering interviews, etc. and not beat Wordle?

My guess is that GPT has seen very little to no Wordle in its training. [Wordle was released in October 2021](https://www.cnbc.com/2022/01/31/the-new-york-times-is-buying-wordle.html), yet chatGPT and GPT4's cutoff dates are September 2021:

![image](https://user-images.githubusercontent.com/18450628/227822333-f71e7cdb-91d2-4649-8baf-11c89607db13.png)

There has been some speculation that GPT might be overfitting a lot of the tests we benchmark it on during its training.
This is known as overfitting. Sadly, we don't have many tangible ways of evaluating this, since we have no idea what data GPT was actually trained on.

Perhaps Wordle is a hint of this. I'm sure that given even just a few Wordle examples in its training, GPT4 would nail it with near optimal strategy.
