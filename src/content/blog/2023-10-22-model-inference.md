---description: How to easily access a GPU deployed almost anywhere
pubDate: 2023-10-22 00:00:00-05:00
title: Local Model Inference from any GPU
---

## Motivation

I recently wanted to use LLama-2 to do inference on my laptop.
I also happen to have access to GPUs on a remote cluster.

Yet, for various reasons, getting "easy access" to the GPUs from my laptop was not obvious (simple SSH port-forwarding was getting me nowhere). After a bunch of debugging, I found a much simpler approach that I wanted to share.

This approach will also work really well on [Colab](https://colab.research.google.com/drive/1VBcjilvhTxBwtDVta_zsfVoV4T0_A1EN?usp=sharing) where you can get access to free GPUs. You'll then be able to pretend like the GPU is living right on your laptop!

## How it works
We will be using `gradio` and `huggingface transformers` in this setup.
Overall the setup looks like this:

- Setup a gradio interface with public access to the model on the GPU of choice
- Use gradio locally to interface with the GPU

As a bonus, you'll even get a web GUI for easy debugging!

## Deploying the model

On the remote machine (like this [colab](https://colab.research.google.com/drive/1VBcjilvhTxBwtDVta_zsfVoV4T0_A1EN?usp=sharing) notebook), run the following:

```python
import gradio as gr
import numpy as np
import torch
from transformers import pipeline
import torch
import os

# you only need a huggingface API token when accessing gated models like llama
hf_token = os.getenv("HF_TOKEN")

# Pick any model from huggingface hub that supports text completion
model_id = "HuggingFaceH4/zephyr-7b-alpha"

# Load the model using the transformers pipeline
model_pipeline = pipeline(
    "text-generation",
    model=model_id,  # model_id can be any huggingface model
    device_map="auto",  # Uses the GPU if available
    torch_dtype=torch.bfloat16,  # Saves you memory
    token=hf_token, # Necessary for gated models like llama2
)

def inference(text: str, max_length: int=100) -> str:
  return model_pipeline(text, max_length=max_length)[0]["generated_text"]

# Setup the Gradio Interface
title = f"Inference for {model_id}"
description = f"This demo uses {model_id} for inference"

io = gr.Interface(
  inference,
  inputs=gr.Textbox(lines=3, label="Model Input"),
  outputs=gr.Textbox(lines=3, label="Model's Output"),
  title=title,
  description=description,
)
io.launch(share=True)
```

The key part here is the `share=True` parameter from gradio. This will create a link through some ngrok magic that can be accessed from anywhere. Clicking the link will bring you to a shiny interface:

![image](https://github.com/jerpint/jerpint.github.io/assets/18450628/2b627533-4f56-49b8-9ab9-7bd4b046daaf)


**WARNING:** Anyone with the link will have access to your GPU. Be sure to understand the implications of opening an endpoint to your machines!


## Running locally

Now the cool thing is you can interface with this directly via python code:

In the console, you should see a message like:

```
Running on public URL: https://ed00cd099007456d54.gradio.live
```

Copy+paste that URL in the following snippet:

```python
from gradio_client import Client

client = Client("https://ed00cd099007456d54.gradio.live")
result = client.predict(
		"Knock, knock! Who's There?",  # str  in 'Model Input' Textbox component
		api_name="/predict"
)
print(result)
```

This should print out the rest of the joke.

Here's what I was able to get:

```
Knock Knock! Who's there?

JASON: (laughing) I'll get it.

(Jason opens the door to reveal a delivery man holding a large box.)

DELIVERY MAN: (handing the box to Jason) Sign here, please.

(Jason signs for the package and brings it inside.)

JASON: (opening the box) Hey, guys, check this out!
```

OK, not the best joke, but we now have access to a 7B model "locally", pretty neat!

Here's a [Colab](https://colab.research.google.com/drive/1VBcjilvhTxBwtDVta_zsfVoV4T0_A1EN?usp=sharing) for you to try running your own models!