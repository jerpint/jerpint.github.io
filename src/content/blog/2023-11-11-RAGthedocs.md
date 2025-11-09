---description: How to one-click deploy a RAG app on any readthedocs website
pubDate: 2023-11-11 00:00:00-05:00
title: RAGTheDocs
---

## Motivation

I built [RAGTheDocs](https://github.com/jerpint/RAGTheDocs), an open-source library that allows you to **one-click deploy** retrieval augmented generation (RAG) on any readthedocs website on [huggingface 🤗 spaces](https://huggingface.co/spaces/jerpint/RAGTheDocs)!

It leverages [Buster 🤖](https://github.com/jerpint/buster), our open-source Retrieval Augmented Generation (RAG) library and gradio/huggingface for the UI.

## Usage 👉

To use it, follow these 3 simple steps:

1) Go to the [example space](https://huggingface.co/spaces/jerpint/RAGTheDocs)

2) Duplicate the space:

![image](https://github.com/jerpint/buster/assets/18450628/0c89038c-c3af-4c1f-9d3b-9b4d83db4910)

3) Set your environment variables:
* `OPENAI_API_KEY` (required): Needed for the app to work, e.g. `sk-...`
* `READTHEDOCS_URL` (required): The url of the website you are interested in scraping (must be built with
sphinx/readthedocs). e.g. `https://orion.readthedocs.io`
* `READTHEDOCS_VERSION` (optional): This is important if there exist multiple versions of the docs (e.g. `en/v0.2.7` or `en/latest`). If left empty, it will scrape all available versions (there can be many for open-source projects!).
