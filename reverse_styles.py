import json

log_file = "/Users/purvajapandey/.gemini/antigravity-ide/brain/b5ba0cce-8c7a-4c43-a8cf-6402446fa701/.system_generated/logs/transcript.jsonl"
css_file = "styles.css"

with open(css_file, "r") as f:
    css = f.read()

# Let's just restore the body, watermark-bg, promo-ticker, hero-layout, honeycomb-container, bubble colors manually in the script for speed, or we can use the exact TargetContent from the log.

# Actually, let's just write the exact TargetContent strings to replace the ReplacementContent strings.
replacements = [
    (
        "body {\n    background-color: #1b2a41; /* Dark navy blue from mockup */\n    color: #ffffff;\n    font-family: var(--font-body);\n    position: relative;\n    overflow-x: hidden;\n    margin: 0;\n    padding: 0;\n}",
        "body {\n    background-color: #D8D365;\n    color: var(--color-text-main);\n    font-family: var(--font-body);\n    position: relative;\n    min-height: 100vh;\n    overflow-x: hidden;\n    padding-top: 40px;\n}"
    ),
    (
        ".watermark-bg {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    background-color: #1b2a41;\n    z-index: -1;\n    pointer-events: none;\n    /* Optional map texture could be added here */\n    background-image: radial-gradient(circle at center, rgba(255,255,255,0.03) 0%, transparent 70%);\n}",
        ".watermark-bg {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100vw;\n    height: 100vh;\n    background-color: #D8D365;\n    z-index: -1;\n    pointer-events: none;\n}"
    ),
    (
        "/* --- Ticker Tape --- */\n.promo-ticker {\n    width: 100%;\n    background-color: #111;\n    color: #d4af37; /* Golden text */\n    padding: 8px 0;\n    font-size: 0.85rem;\n    font-weight: 600;\n    letter-spacing: 2px;\n    text-transform: uppercase;\n    overflow: hidden;\n    white-space: nowrap;\n    position: fixed;\n    top: 0;\n    left: 0;\n    z-index: 100;\n    border-bottom: 1px solid rgba(212, 175, 55, 0.2);\n}\n\n.ticker-content {\n    display: inline-block;\n    padding-left: 100%;\n    animation: ticker 25s linear infinite;\n}\n\n@keyframes ticker {\n    0% { transform: translateX(0); }\n    100% { transform: translateX(-100%); }\n}\n\n/* --- Premium Layout --- */\n.premium-layout {\n    display: flex;\n    flex-direction: column;\n    min-height: 100vh;\n    width: 100vw;\n    position: relative;\n    padding-top: 35px; /* Offset for ticker */\n}\n\n/* --- Top Section --- */\n.premium-top {\n    position: relative;\n    display: flex;\n    height: 45vh; /* Top half of screen */\n    width: 100%;\n    background-color: #1b2a41;\n}\n\n.hero-panel {\n    flex: 1;\n    height: 100%;\n    background-size: cover;\n    background-position: center;\n    position: relative;\n    box-shadow: inset 0 0 50px rgba(0,0,0,0.5);\n    transition: filter 0.3s ease;\n}\n\n.hero-panel::after {\n    content: '';\n    position: absolute;\n    inset: 0;\n    background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(27,42,65,1) 100%);\n    pointer-events: none;\n}\n\n.hero-panel:hover {\n    filter: brightness(1.1);\n}\n\n.hero-badge {\n    position: absolute;\n    bottom: 2rem;\n    left: 50%;\n    transform: translateX(-50%);\n    background: linear-gradient(135deg, rgba(212, 175, 55, 0.85), rgba(184, 134, 11, 0.95));\n    border: 1px solid #d4af37;\n    padding: 1rem 2rem;\n    text-align: center;\n    border-radius: 4px;\n    z-index: 10;\n    box-shadow: 0 4px 15px rgba(0,0,0,0.3);\n    min-width: 200px;\n}\n\n.badge-title {\n    font-family: var(--font-body);\n    font-weight: 600;\n    font-size: 1.1rem;\n    color: #111;\n    margin-bottom: 2px;\n}\n\n.badge-price {\n    font-size: 0.95rem;\n    color: #222;\n    margin-bottom: 8px;\n}\n\n.badge-tag {\n    font-family: var(--font-body);\n    font-weight: 700;\n    font-size: 0.8rem;\n    letter-spacing: 2px;\n    text-transform: uppercase;\n    background: #111;\n    color: #d4af37;\n    padding: 4px 10px;\n    border-radius: 2px;\n    display: inline-block;\n}\n\n/* --- Center Title Overlay --- */\n.hero-title-overlay {\n    position: absolute;\n    top: 2rem;\n    left: 50%;\n    transform: translateX(-50%);\n    text-align: center;\n    z-index: 20;\n    width: 100%;\n    pointer-events: none;\n}\n\n.main-title-gold {\n    font-family: var(--font-title);\n    font-size: clamp(4rem, 8vw, 8rem);\n    margin: 0;\n    line-height: 1;\n    background: linear-gradient(to bottom, #f9f0c2, #d4af37, #b8860b);\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n    filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));\n    letter-spacing: 2px;\n}\n\n.tagline-gold {\n    font-family: var(--font-body);\n    font-size: 1rem;\n    letter-spacing: 4px;\n    color: #d4af37;\n    margin-top: 0.5rem;\n    font-weight: 500;\n    text-transform: uppercase;\n    text-shadow: 0 2px 4px rgba(0,0,0,0.8);\n}\n\n/* --- Bottom Section --- */\n.premium-bottom {\n    position: relative;\n    height: 55vh;\n    display: flex;\n    justify-content: space-between;\n    align-items: flex-end;\n    padding: 2rem 4rem;\n    background-color: #1b2a41;\n}\n\n.mini-grid {\n    display: grid;\n    grid-template-columns: repeat(2, 60px);\n    gap: 15px;\n    z-index: 10;\n}\n\n.mini-grid-item {\n    width: 60px;\n    height: 60px;\n    background-color: rgba(255,255,255,0.05);\n    border: 1px solid rgba(255,255,255,0.1);\n    border-radius: 12px;\n    overflow: hidden;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    box-shadow: 0 4px 10px rgba(0,0,0,0.2);\n    transition: transform 0.2s ease, border-color 0.2s ease;\n}\n\n.mini-grid-item:hover {\n    transform: translateY(-2px);\n    border-color: rgba(212, 175, 55, 0.5);\n}\n\n.mini-grid-item img {\n    width: 100%;\n    height: 100%;\n    object-fit: cover;\n}\n\n/* --- Honeycomb --- */\n.honeycomb-container {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    width: 100vw;\n    height: 800px;\n    z-index: 15;\n    pointer-events: none; /* Let clicks pass to bubbles */\n}",
        "/* --- Promo Ticker --- */\n.promo-ticker {\n    position: fixed;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 40px;\n    background-color: rgba(0, 0, 0, 0.85);\n    backdrop-filter: blur(10px);\n    border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n    color: #fff;\n    display: flex;\n    align-items: center;\n    overflow: hidden;\n    z-index: 1000;\n    font-size: 0.85rem;\n    font-weight: 500;\n    letter-spacing: 2px;\n    text-transform: uppercase;\n    white-space: nowrap;\n}\n.ticker-content {\n    display: inline-block;\n    padding-left: 0;\n    width: 100%;\n    animation: tickerScroll 60s linear infinite;\n}\n@keyframes tickerScroll {\n    0%   { transform: translateX(100vw); }\n    100% { transform: translateX(-100%); }\n}\n\n/* --- Layout --- */\n.top-header {\n    text-align: center;\n    padding: 80px 1rem 2rem 1rem;\n    position: relative;\n    z-index: 10;\n}\n.main-title {\n    font-family: var(--font-title);\n    font-size: clamp(3rem, 6vw, 5rem);\n    margin: 0;\n    color: var(--color-text-main);\n    line-height: 1;\n    letter-spacing: -1px;\n}\n.tagline {\n    font-family: var(--font-body);\n    font-size: 1.1rem;\n    color: var(--color-text-light);\n    margin-top: 0.5rem;\n    font-weight: 400;\n    letter-spacing: 0.5px;\n}\n.hero-layout {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    max-width: 1800px;\n    margin: 0 auto;\n    padding: 0 2rem;\n    position: relative;\n    min-height: 700px;\n}\n.honeycomb-container {\n    width: 1000px;\n    height: 850px;\n    position: relative;\n    flex-shrink: 0;\n}\n/* --- Sidebars --- */\n.sidebar-left, .sidebar-right {\n    width: 250px;\n    display: flex;\n    flex-direction: column;\n    gap: 2.5rem;\n    margin-top: -140px;\n    transition: opacity 0.5s ease, transform 0.5s ease;\n}\n.sidebar-widget {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n}\n.sidebar-title {\n    font-family: var(--font-body);\n    font-weight: 600;\n    text-transform: uppercase;\n    font-size: 0.85rem;\n    letter-spacing: 2px;\n    color: var(--color-text-main);\n    border-bottom: 1px solid rgba(0,0,0,0.1);\n    padding-bottom: 0.5rem;\n}\n.spotlight-card {\n    background: rgba(255, 255, 255, 0.4);\n    backdrop-filter: blur(10px);\n    -webkit-backdrop-filter: blur(10px);\n    border: 1px solid rgba(255, 255, 255, 0.3);\n    border-radius: 16px;\n    padding: 1rem;\n    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05);\n    transition: transform 0.3s ease;\n}\n.spotlight-card:hover {\n    transform: translateY(-5px);\n}\n.spotlight-img {\n    width: 100%;\n    aspect-ratio: 4/5;\n    object-fit: cover;\n    border-radius: 8px;\n    margin-bottom: 1rem;\n}\n.curated-stack {\n    display: flex;\n    flex-direction: column;\n    gap: 1rem;\n}"
    ),
    (
        "    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    background-color: #ffffff; /* Stark white background for bubbles */\n    border: 2px solid #111; /* Dark border */\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    overflow: hidden;\n    position: relative;\n    box-shadow: 0 8px 25px rgba(0,0,0,0.4);\n    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease, border-color 0.3s ease;",
        "    background-color: #fdfbf7;\n    border: 1px solid #e0dbce;\n    padding: 15px 15px 30px 15px;\n    border-radius: 4px;\n    box-shadow: inset 0 0 20px rgba(0,0,0,0.03), 0 8px 25px rgba(0,0,0,0.4);\n    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;"
    ),
    (
        "    background: rgba(255,255,255,0.05);\n    border: 1px solid rgba(255,255,255,0.1);\n    box-shadow: 0 10px 30px rgba(0,0,0,0.3);",
        "    background-color: #fdfbf7;\n    border: 1px solid #e0dbce;\n    box-shadow: inset 0 0 20px rgba(0,0,0,0.03), 0 8px 25px rgba(0,0,0,0.4);"
    ),
    (
        "    width: 75%;\n    height: 75%;\n    object-fit: contain;\n    mix-blend-mode: multiply; /* Helps blend white logo backgrounds into the white bubble */\n    transition: transform 0.4s ease;\n    pointer-events: none;",
        "    width: 80%;\n    height: 80%;\n    object-fit: contain;\n    transition: transform 0.4s ease;\n    pointer-events: none;\n    mix-blend-mode: multiply;"
    ),
    (
        "    border-color: #d4af37;\n    box-shadow: 0 15px 35px rgba(212,175,55,0.4);",
        "    box-shadow: 0 15px 35px rgba(0,0,0,0.15);"
    ),
    (
        "    min-height: 850px;\n    padding: 120px 4rem 4rem 4rem; \n    z-index: 50;\n    background-color: #1b2a41; \n    color: #ffffff;",
        "    min-height: 850px;\n    padding: 120px 4rem 4rem 4rem;\n    z-index: 50;\n    background-color: #D8D365;\n    color: var(--color-text-main);"
    ),
    (
        "    border: 1px solid rgba(255,255,255,0.3);\n    border-radius: 4px;\n    font-family: var(--font-body);\n    font-size: 0.9rem;\n    background: rgba(255,255,255,0.05);\n    color: #ffffff;\n}\n\n.price-filter select {\n    width: auto;\n    cursor: pointer;\n}\n\n.price-filter select option {\n    background-color: #1b2a41;\n    color: #ffffff;",
        "    border: 1px solid #ccc;\n    border-radius: 4px;\n    font-family: var(--font-body);\n    font-size: 0.9rem;\n    background: transparent;\n    color: var(--color-text-main);\n}\n\n.price-filter select {\n    width: auto;\n    cursor: pointer;"
    ),
    (
        "    border: 1px solid #d4af37;\n    color: #d4af37;",
        "    border: 1px solid var(--color-text-main);\n    color: var(--color-text-main);"
    ),
    (
        "    background: #d4af37;\n    color: #111;",
        "    background: var(--color-text-main);\n    color: #ffffff;"
    ),
    (
        "    background: #b8860b;",
        "    background: #444;"
    ),
    (
        "    background: rgba(255, 255, 255, 0.05);\n    backdrop-filter: blur(10px);\n    border: 1px solid rgba(255,255,255,0.1);",
        "    background: rgba(255, 255, 255, 0.6);\n    backdrop-filter: blur(10px);\n    border: 1px solid rgba(0,0,0,0.04);"
    ),
    (
        "    color: #ffffff;",
        "    color: var(--color-text-main);"
    ),
    (
        "    color: #d4af37;",
        "    color: var(--color-accent);"
    )
]

for target, replacement in replacements:
    if target in css:
        css = css.replace(target, replacement)
    else:
        print(f"Target not found: {target[:50]}...")

with open(css_file, "w") as f:
    f.write(css)

print("Done")
