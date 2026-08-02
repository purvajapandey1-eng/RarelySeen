import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any styles.css?v=X with styles.css?v=38
new_content = re.sub(r'styles\.css\?v=\d+', 'styles.css?v=38', content)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(new_content)
print("Bumped CSS version in index.html")
