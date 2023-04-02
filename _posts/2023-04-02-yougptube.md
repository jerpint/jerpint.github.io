---
title: "YouGPTube"
date: 2023-04-02T00:00:00-05:00
excerpt: "Summarize Youtube videos using whisper and chatGPT"
categories:
  - blog
tags:
  - ChatGPT
  - youtube
  - colab
---

**TL;DR**: Automatically summarize any youtube video using openAI's whisper and ChatGPT. 


<a href="https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/youGPTube.ipynb">
<button type='button'>&nbsp;Check it out on <span><img src="../../assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>

## Video

<iframe width="560" height="315" src="https://www.youtube.com/embed/WtMrp2hp94E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## What it does

In a nutshell, this `python` script will automatically:

1. Download the audio from a youtube video using `youtube-dl`
2. Generate the transcript using `whisper`, OpenAI's text2speech model
3. Summarize it using `ChatGPT`

## How it works

Here's a visual schematic:

![yougptube](https://user-images.githubusercontent.com/18450628/229377710-95fb8645-3d71-47d0-b3ba-0fd05941b083.png)

I explain it in detail in the [youtube video](https://www.youtube.com/watch?v=WtMrp2hp94E)

## Using it on actual videos

To demonstrate how well this thing works in practice, let's summarize the youtube video I made using the same youtube video summarizer. I know, meta right?!


Here's the code:

```python
youtube_url = "https://www.youtube.com/watch?v=WtMrp2hp94E"
outputs_dir = "outputs/"

long_summary, short_summary = summarize_youtube_video(youtube_url, outputs_dir)
```

And here's the short summary of my youtube video it made:

#### Short Summary
> The video demonstrates how to use open AI's speech to text model, ChaiGPT, and Librosa to automate the process of summarizing YouTube videos. The tool can provide both long and short summaries of the videos and is best suited for videos with a lot of audio. The examples given in the video include summaries of a video on stretching and a conversation on AI alignment and the future of AI.

Pretty good overview of the video!

Notice the typo on `ChaiGPT`, this actually comes directly from the whisper transcription. It's very likely that the audio data whisper was trained on never contained any reference to chatGPT.

## Interviews

I was also surprised at how well this worked at summarizing a [45 minute interview](https://www.youtube.com/watch?v=Yf1o0TQzry8), even though it actually has no idea who is speaking. 
Here are the sumamries if you're interested:

#### Short Summary

> The co-founder and chief scientist of OpenAI discusses a variety of topics including AI alignment, economic value, reliability, and the future of AI as a collaboration between humans and machines. They acknowledge the difficulty of achieving alignment with models smarter than us and the potential for illegal or malicious uses of AI. They also emphasize the importance of data for making predictions about the future of AI and the potential for AGI to help people become more enlightened.

I'll be giving that video a listen soon!

## Code

All code is availble on colab!

<a href="https://colab.research.google.com/github/jerpint/jerpint.github.io/blob/master/colabs/youGPTube.ipynb">
<button type='button'>&nbsp;Check it out on <span><img src="../../assets/images/colab.jpeg" width="50" height="50" /></span></button>
</a>

