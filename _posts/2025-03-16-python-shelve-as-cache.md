---
title: "Python's 'shelve' is really useful for LLM debugging"
date: 2025-03-16T00:00:00-05:00
excerpt: "Python's shelve module is a persistent key-value store perfect for LLM debugging."
categories:
  - blog
tags:
  - python
---

TL;DR Use python's [shelve](https://docs.python.org/3/library/shelve.html) as a quick and easy, persistent key-value store for LLM workflows

##  Shelve

I've been finding myself re-implementing a similar pattern when developping new ideas with LLMs, especially in the debugging phase.
<!-- Most of my iterations don't usually revolve around the prompt, especially in the initial development of new ideas. -->
<!-- What usually takes more time + iterations tends to be what goes around it, e.g. integrating those calls into the app/workflows/visualizations I'm building. -->

I'll usually start with very simple prompts and build what goes around it first.
But - when you're debugging, you don't want to wait a few seconds for your LLM calls to finish, especially when you are querying different models.
I want my things to break as fast as possible! Not to mention that the cost can add up quickly, especially with VLMs.

So I often find myself asking claude to write a similar version of the same boilerplate over and over:

> For each LLM, check if a file already exists (on disk), if it does, load it, if not, then generate + save it to a json file.

This ends up being a bit tedious and repetitive - you have to define what a file contains (a single model, a dict of models?, data structures, etc.), check if it exists, when to save vs. overwrite its contents, etc.

So recently I was wondering if there wasn't a better solution to this.
To my surprise, I landed on a built-in python library I had never heard of: [shelve](https://docs.python.org/3/library/shelve.html).

This allows me to have something significantly simpler: a persistent key-value cache. It's absurdly simple. Simply open a `shelve` db, and you have a persistent key-value store out of the box.
The keys should be strings, but the values can be any arbitrary python object - as long as its picklable. 
Which means you don't even need to bother parsing the reponse, just save the entire object for later use!

## Implementing a Cache with Shelve

Here's what that would look like in practice. 
Here, I am trying to get various models to predict the first 20 digits of pi.
    
```python
import shelve
model_predictions = shelve.open('pi_predictions')  # Will save to "model_predictions.db"

models = ["gpt-4o", "gpt-4o-mini", "anthropic/claude-3-5-sonnet-20240620", "anthropic/claude-3-7-sonnet-20250219", "gemini/gemini-2.0-flash-001"]
instructions =  "Print the first 20 digits of pi. Only print the digits, nothing else. Begin your response with 3.14."
for model in models:
    if model not in model_predictions:
        print(f"Predicting {model}")
        response = completion(
            model=model,
            messages=[
              {
                "role": "user",
                "content": instructions
              }
            ],
            max_tokens=50,
        )
        model_predictions[model] = response
    else:
       print(f"{model} already in cache.")

    model_output = model_predictions[model].choices[0].message.content

    # Rest of your logic goes here...
    print(model_output)

# Close the file
model_predictions.close()
```

Now you can use this to debug much quicker and cache your responses, and it will save you lots of time (and money)!

## Few Notes

By default, you can't overwrite keys that were already written in `shelve`, to do so, you'd have to load it with:

```python
shelve.open('pi_predictions', writeback=True)
```

However, the docs do claim it will be slower on `close()`.

You can also use a context manager if you don't want to worry about opening and closing the file:


```python
with shelve.open('pi_predictions') as db:  
   ...
```
