import glob
import re

# Update HTML files and python script
for filename in glob.glob("*.html") + ["generate_pages.py"]:
    with open(filename, "r") as f:
        content = f.read()
    
    # Replace Alex Brush with Pacifico
    new_content = content.replace("family=Alex+Brush", "family=Pacifico")
    
    with open(filename, "w") as f:
        f.write(new_content)

# Update styles.css
with open("styles.css", "r") as f:
    css = f.read()

# Update colors
css = re.sub(r"#21755E", "#670527", css, flags=re.IGNORECASE)
css = re.sub(r"#FF8CD8", "#bbd798", css, flags=re.IGNORECASE)

# Replace the font title variable
css = re.sub(r"--font-title:\s*[^;]+;", "--font-title: 'Pacifico', cursive;", css)

# Remove the bold and text-stroke from .main-title
css = re.sub(r"\s*font-weight:\s*bold;\n\s*-webkit-text-stroke:[^;]+;", "", css)

# Reset the margins so Pacifico doesnt look crazy broken
css = re.sub(r"(\.title-top\s*\{\s*margin-left:)\s*-[0-9]+px;", r"\1 -30px;", css)
css = re.sub(r"(\.title-bottom\s*\{\s*margin-left:)\s*[0-9]+px;", r"\1 50px;", css)

with open("styles.css", "w") as f:
    f.write(css)

print("done")
