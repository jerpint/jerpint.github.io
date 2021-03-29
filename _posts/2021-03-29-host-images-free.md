---
title: "How to generate a URL from a screenshot"
date: 2021-03-29T00:00:00-05:00
excerpt: "How to generate a URL from a screenshot"
categories:
  - blog
tags:
  - github
  - hack
classes: wide
header:
  - image: "/assets/images/photo-jer-mila_square.jpg"
---

TL;DR: Easily host your screenshots using github's magic links.

Every once in a while, I find myself needing an image, particularly a screenshot, in the form of a URL. This is usually because I am updating a README, adding an image to a jupyter notebook, adding something to a forum, etc. but don't want to bother hosting the image myself. 

Who wants to pollute a git repo with `assets/images/` for a single image? The issue is, if you don't own the image link, it might break someday and someone somewhere won't be happy.

My best solution? Use github. SURE, it wasn't meant to do this - but here's a pro tip - if you are opening an issue, updating a README, etc. you can simply "paste" your screenshot in the dialogue box and a custom github URL will automagically be created to host your image.

So let's see how it works:

```
1. Take your screenshot
2. On github: open an Issue, edit a README, etc.
3. hit Ctrl-P inside the text editor - and voilà
```

You should then see a `githubusercontent` magic link generated. Use it anywhere!

The best part is that it's already formatted in markdown for you. In fact, this screenshot was taken exactly like that. Don't believe me? Just look at the link to the image.

![image](https://user-images.githubusercontent.com/18450628/112839589-5f9e2700-906c-11eb-9c3f-d0f0faf24ce7.png)

I know what you're thinking - it might die some day - and sure that's a valid point - but github is a huge org and hosts some of the most important tech projects in the world. It can't afford to just make the images from a README disappear.

If you are ever reading this and the photo is no longer available - well, I guess by then we'll know how long these links actually last :)

