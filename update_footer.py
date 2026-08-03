import os
import glob
import re

html_files = glob.glob('*.html')

new_footer = """    <footer class="global-footer" style="padding: 2rem; background-color: #fdfbf7; border-top: 1px solid #eaeaea; text-align: center; font-family: 'Montserrat', sans-serif;">
        <div class="footer-content" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; align-items: center; gap: 1rem;">
            <div class="footer-mission" style="font-size: 0.9rem; color: #333;">
                <strong style="color: #670527;">Our Mission</strong><br>
                We are here to cure your shopping fatigue. We are cutting through the boring fast fashion and the endless scrolling to bring you a curated catalogue of the hardest homegrown brands, all in one place.
            </div>
            <div class="footer-contact" style="font-size: 0.9rem; color: #333;">
                <strong style="color: #670527;">Contact Us</strong><br>
                hello@rarelyseen.com<br>
                Follow our journey on Instagram @rarelyseen
            </div>
            <div class="footer-feedback" style="margin-top: 0.5rem;">
                <button id="open-feedback-btn" class="back-btn" style="border-color: #670527; color: #670527; background: transparent; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Give Feedback</button>
            </div>
            <div class="footer-legal" style="font-size: 0.75rem; display: flex; gap: 1.5rem; justify-content: center; margin-top: 1rem; border-top: 1px solid #ddd; padding-top: 1rem; width: 100%;">
                <a href="terms.html" style="color: #666; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">Terms of Use</a>
                <a href="privacy.html" style="color: #666; text-decoration: none; text-transform: uppercase; letter-spacing: 1px;">Privacy & Cookies</a>
            </div>
        </div>
    </footer>"""

for filepath in html_files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to find the existing footer block
    updated_content = re.sub(
        r'<footer class="global-footer">.*?</inner_tag_doesnt_exist_im_using_dot_star_but_need_dotall></footer>',
        new_footer,
        content,
        flags=re.DOTALL
    )
    
    # Actually let's use a more robust regex just in case
    updated_content = re.sub(
        r'<footer class="global-footer">.*?</footer>',
        new_footer,
        content,
        flags=re.DOTALL
    )

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(updated_content)

print(f"Updated footer in {len(html_files)} HTML files.")
