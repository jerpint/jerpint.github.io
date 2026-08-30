---
title: Your harness needs a scaffold
description: The scaffold is persistent infrastructure built for harnesses
pubDate: 2026-08-27 00:00:00-05:00
---

## Harness
The harness gives agents the tools they need to get shit done.
In practice, this usually means pointing a harness to a codebase, prompting it, and getting some output back.

> The harness alone is not enough.

It does not provision compute. 
It does not imply anything about setup, teardown, authentication, etc.

> We need a new layer: the scaffold

## Scaffold

The scaffold is persistent infrastructure built for harnesses.
The scaffold provides the compute and runtime. It should be stateful.
Always on. Connected to services.
More importantly, it should be agnostic to the harness that uses it.

Let’s take typical app development as an example.
Devs don’t just write code when developing apps.
They spin up the entire stack and run integration tests, see how things break at the seams and fix them.
The external services you connect to, and most importantly don't control, is usually where things go wrong.
Only after running the code can you actually loop on the feedback and see the impact of changes.

## Woltspace

I was increasingly frustrated about not having somewhere to persist my work across sessions.
Especially during app development, where setup is usually time-consuming and getting it right makes all the difference.
I've been developing my own version of a scaffold over the last few months: [woltspace](https://www.woltspace.com).

Woltspace runs entirely on your machine, using your resources.
It runs in a container that you can access securely from anywhere.
You can spawn and resume sessions at any point via telegram.
Context AND state persist.

Woltspace can do much more than just host harnesses.
It provides infrastructure and guidance for platform-specific concepts.
Through skills, harnesses immediately know how to make things work.
Woltspace is harness agnostic - if it runs in a CLI and understands skills, woltspace can support it.
Swapping a harness becomes an implementation detail.

<!-- It can host any vibecoded apps directly, bringing the "it works on my machine" meme to life. -->
<!-- If it works on woltspace, it just works from anywhere. No deployments, no CI. Your machine IS the host. -->
<!--  -->
<!-- Woltspace is based on the premise of wolts, creatures with their own persistent identity, memory and responsibilities.  -->
<!-- They can be driven by any harness. -->
<!-- You can use it to start new sessions and communicate from telegram. -->
<!-- Wolts can communicate with each other too, and report back to you. -->
