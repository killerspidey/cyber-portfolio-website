# 🔐 Aarohan Shyam | Cyber Security Portfolio

### Terminal-Inspired Cybersecurity Portfolio with Live Platform Data

[![Live Demo](https://img.shields.io/badge/🌐_Click_to_View_Live-00CC00?style=for-the-badge&logoColor=black)](https://aarohan-portfolio.netlify.app/) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE) [![GitHub Profile](https://img.shields.io/badge/GitHub-killerspidey-00D9FF?style=for-the-badge)](https://github.com/killerspidey)

---

## ✨ Features

### 🎨 Design & UI
- Terminal boot screen animation
- Cyberpunk aesthetic (`#00FF8C`, `#00D9FF`)
- Matrix-inspired canvas background
- Scroll-triggered card animations
- Glitch effect on hero name
- Fully responsive — mobile hamburger menu included
- Scroll-to-top button

### 📡 Live Data (No Backend Required)
- **GitHub stats** — repos, followers, following, and total stars pulled live from `api.github.com`
- **GitHub contribution graph** — rendered via `ghchart.rshah.org`
- **TryHackMe** — attempts to fetch rank, rooms completed, and points from the public THM API; falls back gracefully if CORS blocks the request
- All live stats update on every page load with no API key needed

### 🛠️ Technical Stack
- Pure Vanilla HTML / CSS / JavaScript — zero dependencies, zero frameworks
- CSS Grid & Flexbox
- Custom CSS animations & keyframes
- Intersection Observer API for scroll reveals
- Canvas API for Matrix rain effect
- `fetch()` for live GitHub and TryHackMe data

### 📋 Sections
**Hero** → **About** → **Projects** → **Platforms** → **Skills** → **Experience + Certs** → **Contact**

---

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/killerspidey/resume.git
cd resume

# Open directly in browser
open index.html

# Or use a local server (recommended — avoids CORS issues with live data)
python -m http.server 8000
# Then visit: http://localhost:8000
```

> **Requirements:** Modern web browser (Chrome, Firefox, Safari, Edge)

---

## 📁 Project Structure

```
resume/
│
├── index.html          # Main HTML — all sections and structure
├── script.js           # Boot animation, matrix, live API fetches, interactions
├── style.css           # Full cyberpunk theme, animations, responsive layout
├── resume.pdf          # Downloadable resume
├── README.md           # This file
│
├── assets/
│   └── profile.jpeg    # Profile photo
│
├── favicon.ico
├── favicon_32.png
├── favicon_180.png
└── favicon_512.png
```

---

## 🎨 Customization

### Colors
All colors are CSS variables at the top of `style.css`:

```css
:root {
    --green:   #00FF8C;   /* Primary — neon green */
    --cyan:    #00D9FF;   /* Secondary — cyan */
    --pink:    #FF004D;   /* Accent — hot pink */
    --gold:    #FFD700;   /* Featured highlight */
    --bg:      #01030F;   /* Background — deep navy */
}
```

### Content
| File | What to edit |
|------|--------------|
| `index.html` | Personal info, project descriptions, skills, experience, contact links |
| `script.js` | Boot sequence text, project metrics, GitHub/THM usernames |
| `style.css` | Colors, fonts, spacing, animations |
| `resume.pdf` | Replace with your current resume |
| `assets/profile.jpeg` | Replace with your photo |

### Updating GitHub Username
In `script.js`, change the username in `fetchGitHub()` and `fetchGitHubStars()`:
```js
const res = await fetch("https://api.github.com/users/YOUR_USERNAME");
```
And update the contribution graph URL in `index.html`:
```html
src="https://ghchart.rshah.org/00FF8C/YOUR_USERNAME"
```

### Updating TryHackMe Username
In `script.js`, update `fetchTryHackMe()`:
```js
const username = "your_thm_username";
```
And update the profile link in `index.html`:
```html
href="https://tryhackme.com/p/your_thm_username"
```

### Updating Project Metrics
In `script.js`, each project has a `metrics` array:
```js
metrics: [
    { num: "<2s", desc: "Alert latency" },
    { num: "100%", desc: "Simulated attack detection" },
    { num: "40",   desc: "Test suite coverage" }
]
```
Keep these honest — they're the first thing technical reviewers will question.

---

## 📡 Live Data Notes

| Source | Method | Fallback |
|--------|--------|----------|
| GitHub profile | `api.github.com/users/:username` | Shows `—` if fetch fails |
| GitHub stars | `api.github.com/users/:username/repos` | Shows `—` if fetch fails |
| GitHub graph | `ghchart.rshah.org` image embed | Shows error text if image 404s |
| TryHackMe | Public profile API (CORS varies) | Shows "Active / Earning / View ↗" |

GitHub's public API allows ~60 unauthenticated requests/hour per IP — more than sufficient for a portfolio.

---

## 💻 Skills Highlighted

**Languages:** Python • JavaScript • C • C++ • Java • Bash

**Security Tools:** Burp Suite • Nmap • Wireshark • Kali Linux • Gobuster • Nikto • Metasploit

**Cybersecurity:** OWASP Top 10 • Vulnerability Assessment • Penetration Testing • Secure Coding • Threat Modelling

**Attack Techniques:** SQL Injection • XSS • CSRF • Privilege Escalation • Auth Bypass • ARP Spoofing • DNS Tunnelling

**Networking:** TCP/IP • HTTP/HTTPS • DNS • ARP • Packet Analysis • Scapy

**AI & Automation:** Gemini API • Anthropic API • Groq • OpenRouter • PyQt6 • SpeechRecognition

---

## 🌐 Compatibility

**Browsers:** Chrome, Firefox, Safari, Edge (latest)
**Responsive:** Mobile-first — hamburger menu below 820px viewport width
**Performance:** Zero external JS dependencies; CSS animations only

---

## ⚡ Performance

✅ Zero JS frameworks or libraries  
✅ CSS-only animations — no jQuery  
✅ Intersection Observer for lazy scroll reveals  
✅ Live API calls fire after boot sequence completes (no blocking)  
✅ Graceful fallbacks on all network requests  
✅ Contribution graph loads as a static image — no JS required  

---

## 🛠️ Built With

**HTML5** • **CSS3** (Grid, Flexbox, Custom Properties, Keyframes) • **Vanilla JavaScript** (Intersection Observer, Canvas API, Fetch API, DOM APIs)

---

## 🎯 Projects

- **JARVIS** — Multi-agent AI desktop assistant (PyQt6, 8 agents, 20 skills, 100% free-tier APIs)
- **Network Threat Detection & Traffic Analyzer** — <2s alert latency, 100% simulated attack detection, 40-test suite
- **Web Application Vulnerability Scanner** — OWASP Top 10 coverage, CVSS-style scoring, validated on DVWA & Juice Shop

---

## 📋 Education

**B.Tech Computer Science Engineering (Cyber Security)**
SRM Institute of Science and Technology, Delhi-NCR

---

## 🎯 Experience

- **Executive — FinTech & Blockchain Track** — BitBucks FinTech Club, SRM IST (Jan 2026–Present)
- **Technical Content — DSA & Security Focus** — GeeksforGeeks Campus Body, SRM IST (Sep 2025–Present)

---

## 📜 Certifications

- **Cybersecurity Fundamentals** — Infosys Springboard (2025)
- **eJPT — Junior Penetration Tester** — eLearnSecurity / INE (In Progress)

---

## 🔗 Connect

📧 **Email:** aarohanshyam@gmail.com
💼 **LinkedIn:** linkedin.com/in/aarohanshyam
🐙 **GitHub:** github.com/killerspidey
⚡ **TryHackMe:** tryhackme.com/p/aarohanshyam

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 💬 Support

Found a bug or have a suggestion? [Open an issue](https://github.com/killerspidey/resume/issues)

---

**Made by Aarohan Shyam** • [github.com/killerspidey](https://github.com/killerspidey)
