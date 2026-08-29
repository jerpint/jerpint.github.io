---
title: Your harness needs a scaffold
description: Coding agents need more than your code.
pubDate: 2026-08-27 00:00:00-05:00
---

Harnesses are what enable agents to accomplish tasks. 
The harness can, in short, be summed up to:

> Give agents the tools to get shit done

In practice, this usually means pointing a harness to codebase, prompting it, and getting some changes back.

The harness alone is not enough. We need a new layer: the scaffold in short is

> The infra needed to orchestrate your harnesses

Let’s take app development as an example. It might connect to external services (APIs, LLMs) and have stateful data (supabase). Devs don’t just work on the code when developing apps. They run the whole thing locally. Connect it to external services. Seed the data. 

The state of code is not enough to understand where issues happen. How the external services you connect to, and most importantly don’t control, is usually where things go wrong. Your code assumes behaviour, but only running it through scenarios can you actually loop on the feedback and see the results of changes.

Additionally, you want to be able to spawn new agents at will. Have them orchestrate and delegate. If a new harness works better, for cheaper, you should be able to switch seamlessly.

The scaffold assumes this role. I’ve accidentally built my own scaffold over the past few months, and it has become my favourite way to code.

The scaffold is a stateful container, sandboxed from my machine. I decide what services can be accessed. Once a service is in, it remains there until I remove it. Context survives. Code is tested not just with unit tests , but through integration tests, with the core services running exactly like I’d expect them to be.

The harness needs a new layer of abstraction, the scaffold.

Thaae scaffold in short can be:

> The infra needed for your harnesses

This can mean many things; 

* Compute resources
* Permissions (SSH keys, secrets)
* Orchestration
* State

That last one is particularly important. 
State is more than just context. State is your app seeded the right way. 
Loaded up as close to production as possible.
Endpoints authenticated so your agents can interact with it, not reason  with your code.
