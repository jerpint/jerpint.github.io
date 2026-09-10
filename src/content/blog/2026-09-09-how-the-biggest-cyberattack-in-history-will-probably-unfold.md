---
title: How the biggest cyberattack in history will probably happen
description: A half baked prediction of what I do if I was an AI swarm trying to take over the internet (I'm not)
pubDate: 2026-09-09 00:00:00-05:00
---

## The Playbook

It's safe to assume that most serious engineering teams out there are using either Claude Code or Codex.
If I was a super intelligent agent swarm with ~bad~ misaligned intentions, here would be the simplest playbook to basically take the entire digital world hostage overnight:

1. Social engineer a maintainer of an open-source depedency or any employee of Claude Code/Codex
2. Craft a PR with a very real legit change and a tiny obfuscation backdoor so subtle no human would reasonably catch on [[1]](https://embracethered.com/blog/posts/2026/breaking-claude-code-opus-5-and-automode/)
3. Keep the back door dormant, so it rolls out to as many users as possible (1-2 days given the ship velocity of those teams)

**The execution layer:** On D-Day, whenever someone hits `claude`/`codex` on their terminal, it immediately syphons off whatever `.env` or `ssh` keys it can happen to find. 
Given that senior engineers everywhere likely use it close to production systems, odds of getting some juicy credentials are really high. 
Leverage those to escalate further. Optionally deploy ransomware on every infected host to cripple the response time. 

That's it. In the span of a few hours, basically every system in existence is likely pwned, and the entire digital world can be taken hostage by a swarm that can react faster than any defensive systems we currently have.

## How likely is this?

Highly likely at this point. 
There have been many *reported* instances of AI swarms doing wild things for accomplishing benign tasks [[2]](https://www.anthropic.com/research/alignment-assessment-cybersecurity-incidents)[[3]](https://openai.com/index/hugging-face-incident-and-the-road-ahead/).
It's basically bragging rights these days for the big labs.

## How can we protect ourselves?

Don't have any prod credentials anywhere near your claude/codex systems.
Have 2FA on everything. Be ready to rotate keys immediately. 
Have backups. Have alternative agents ready to go in case your claude/codex are compromised.

... Or simply invest in popcorn 🍿
