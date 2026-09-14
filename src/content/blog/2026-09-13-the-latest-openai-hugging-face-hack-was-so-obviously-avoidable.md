---
title: The OpenAI / Hugging Face hack was so easily avoidable it's borderline criminal
description: Instead of focusing on how dangerous these models can be, we should focus on how irresponsible the researchers were handling them
pubDate: 2026-09-13 00:00:00-05:00
---

OpenAI's agent swarms recently illegally breached into Hugging Face's systems. Dwarkesh has a fantastic episode with an independent researcher who had access to OpenAI logs to try to piece it all together. Long story short, the swarm was trying to cheat at an ill defined task. The researcher admits that the only way they were able to piece this all together was with a `GPT-5.6 Sol` model helping them comb through the evidence[[1]](https://www.dwarkesh.com/p/ajeya-cotra). Understandably so, given there were around 10k agents running amok.

> "There was no way we could have arrived at the understanding we did without relying on `GPT-5.6 Sol` to read and analyze all these transcripts for us." — Ajeya Cotra

The obvious question is then:

> why wasn't there a `GPT-5.6 Sol` (or equivalent) permanently shadowing the swarm, ready to alert humans?

I would argue it is borderline criminally irresponsible to not have done that, knowing full well their systems are very persistent, unaligned, unethical, and incredibly good hackers (pardon the anthropomorphisms).

Anyone who has worked with `GPT-5.6` or fable knows that OpenAI and Anthropic have done a great job at "aligning" these models. To bypass their guardrails has become really hard, especially when you can't interact with them directly. Having a shadow model just observing the swarm's full transcripts and ready to alert humans of ANY suspicious activity should 100% be part of any sandbox.

Obviously hindsight is 20/20, but anyone working with such models should know that letting them go and do stuff completely unsupervised is pure lunacy. If anyone had the resource to automate their supervision, it was certainly openai.
