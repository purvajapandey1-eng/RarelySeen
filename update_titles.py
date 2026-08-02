import glob
import re

# Update HTML files and python script
for filename in glob.glob("*.html") + ["generate_pages.py"]:
    with open(filename, "r") as f:
        content = f.read()
    
    # Replace Caveat with Alex Brush
    new_content = content.replace("family=Caveat", "family=Alex+Brush")
    
    # Replace <h1 class="main-title">rarely seen</h1> or similar
    new_content = re.sub(
        r'<h1 class="main-title">\s*Rarely Seen\s*</h1>',
        '<h1 class="main-title">\n    <span class="title-top">Rarely</span>\n    <span class="title-bottom">Seen</span>\n</h1>',
        new_content,
        flags=re.IGNORECASE
    )
    
    with open(filename, "w") as f:
        f.write(new_content)

# Update styles.css
with open("styles.css", "r") as f:
    css = f.read()

# Replace font
css = re.sub(r"--font-title:\s*'Caveat',\s*cursive;", "--font-title: 'Alex Brush', cursive;", css)

# Remove text-transform lowercase
css = re.sub(r"\n\s*text-transform:\s*lowercase;", "", css)

# Add positioning rules for the new title format
css += """
.main-title {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 0.5;
    margin-bottom: 25px;
}
.title-top {
    margin-left: -100px;
}
.title-bottom {
    margin-left: 100px;
}
"""

with open("styles.css", "w") as f:
    f.write(css)

print("done")
