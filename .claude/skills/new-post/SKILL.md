---
name: new-post
description: Create a new blog post. Pass the title and content as arguments.
---

Create a new blog post based on $ARGUMENTS.

Follow these steps:

1. Determine the post title and content from the arguments provided.
2. Generate a URL-friendly slug from the title (lowercase, hyphens, no special characters).
3. Create the file at `src/content/blog/YYYY-MM-DD-<slug>.md` using today's date.
4. Use this front matter template:

```yaml
---
title: <Title>
description: <Generate a short 1-sentence description>
pubDate: YYYY-MM-DD 00:00:00-05:00
---
```

5. Add the post content below the front matter. Keep the user's wording intact; only fix obvious spelling mistakes.
6. Commit with message: "Add blog post: <Title>"
7. Push to the current branch.
