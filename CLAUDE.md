# Blog - jerpint.github.io

## Overview

This is a personal blog built with Astro, auto-deployed on GitHub Pages on every merge to main.

## Blog Post Structure

- **Location**: `src/content/blog/`
- **Naming convention**: `YYYY-MM-DD-slug.md` (e.g. `2026-02-07-my-post-title.md`)
- **Format**: Markdown with YAML front matter

### Front matter template

```yaml
---
title: Post Title Here
description: A brief description of the post.
pubDate: YYYY-MM-DD 00:00:00-05:00
---
```

### Fields

- `title` (required): The post title
- `description` (required): A short summary for previews/SEO
- `pubDate` (required): Publication date in ISO 8601 format with timezone offset

## Workflow

1. Create the markdown file in `src/content/blog/`
2. Commit and push to a feature branch
3. Merge to main to deploy
