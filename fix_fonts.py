import re

with open("styles.css", "r") as f:
    css = f.read()

# Remove the font-family override from the second .main-title block
css = re.sub(r"(\.main-title\s*\{[^}]*?)(font-family:\s*'Anton',\s*sans-serif;)([^}]*\})", r"\1\3", css)

# Update .nav-brand-small to use var(--font-title) instead of var(--font-body)
css = re.sub(r"(\.nav-brand-small\s*\{[^}]*?font-family:\s*)var\(--font-body\);", r"\1var(--font-title);", css)

with open("styles.css", "w") as f:
    f.write(css)
print("done")
