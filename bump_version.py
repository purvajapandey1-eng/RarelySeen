with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace styles.css?v=11 with styles.css?v=12
content = content.replace('styles.css?v=11', 'styles.css?v=12')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
