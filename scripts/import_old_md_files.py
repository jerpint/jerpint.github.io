import os
from pathlib import Path
import yaml
from datetime import datetime

OLD_POSTS_PATH = Path("/Users/jerpint/jerpint.github.io") / "_posts"
NEW_POSTS_PATH = Path("/Users/jerpint/blog-jerpint") / "src/content/blog"

def convert_frontmatter(frontmatter_old: dict) -> dict:
    frontmatter_new = {}
    frontmatter_new["title"] = frontmatter_old["title"]
    frontmatter_new["pubDate"] = frontmatter_old["date"]
    frontmatter_new["description"] = frontmatter_old["excerpt"]
    return frontmatter_new

def convert_content(old_content) -> str:
    # Load the frontmatter to a dict and convert it to the new format
    frontmatter_str = content.split("---")[1]
    frontmatter_old = yaml.safe_load(frontmatter_str)
    frontmatter_new = convert_frontmatter(frontmatter_old)

    # Replace the previous frontmatter with the new one
    split_contents = content.split("---")
    split_contents[1] = yaml.dump(frontmatter_new)
    new_content = "---".join(split_contents)

    return new_content

def load_content(fullpath: str) -> str:
    with open(fullpath, "r") as f:
        content = f.read()
    return content

for filename in os.listdir(OLD_POSTS_PATH):
    fullpath = os.path.join(OLD_POSTS_PATH, filename)
    content = load_content(fullpath)
    new_content = convert_content(content)

    # save to new path
    new_fullpath = os.path.join(NEW_POSTS_PATH, filename)
    with open(new_fullpath, "w") as f:
        f.write(new_content)

print(f"Succesfully imported {len(os.listdir(OLD_POSTS_PATH))} files")
