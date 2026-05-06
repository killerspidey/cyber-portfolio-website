// ===== TERMINAL BOOT =====

const terminal = document.getElementById("terminal");
const terminalText = document.getElementById("terminal-text");
const mainContent = document.getElementById("main-content");

const bootLines = [
    "[ 00.01 ] Initializing cyber-os kernel...",
    "[ 00.07 ] Loading security modules...",
    "[ 00.12 ] Identity confirmed: <span class='highlight'>AAROHAN SHYAM</span>",
    "[ 00.18 ] Establishing encrypted channels...",
    "[ 00.24 ] Scanning threat environment...",
    "[ 00.30 ] System integrity: <span class='highlight'>VERIFIED</span>",
    "[ 00.36 ] Launching secure interface...",
    "[ 00.42 ] Access Granted."
];

let line = 0;

function typeLine(text, callback) {
    terminalText.innerHTML += text + "<br>";
    terminalText.scrollTop = terminalText.scrollHeight;
    callback();
}

function runBoot() {
    if (line < bootLines.length) {
        typeLine(bootLines[line], () => {
            line++;
            setTimeout(runBoot, 90);
        });
    } else {
        terminalText.innerHTML += "<br>root@cyber-os:~$ <span class='cursor'></span>";
        setTimeout(() => {
            terminal.style.opacity = "0";
            terminal.style.transition = "opacity 0.5s ease";
            setTimeout(() => {
                terminal.style.display = "none";
                mainContent.classList.remove("hidden");
                initScrollReveal();
            }, 500);
        }, 500);
    }
}

runBoot();


// ===== MATRIX BACKGROUND =====

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]#@!";
const fontSize = 13;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00FF8C";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);


// ===== SCROLL REVEAL =====

function initScrollReveal() {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}


// ===== PROJECTS =====

const projectContainer = document.getElementById("github-projects");

const projects = [
    {
        name: "JARVIS — Multi-Agent AI Desktop Assistant",
        description: "Tony Stark-style always-on voice assistant with a frameless PyQt6 HUD and wake-word detection. Multi-agent routing engine dispatches commands to 8 specialist AI agents (Web, Code, System, Memory and more). Multi-provider API pool supports Gemini, Claude, Groq and OpenRouter with automatic key rotation and rate-limit fallback across 100% free tiers. 20 modular skills including system control, screen reader, process manager, code execution and real-time web search.",
        tags: ["Python", "PyQt6", "Gemini API", "Anthropic API", "Groq", "SpeechRecognition", "Multi-Agent"],
        url: "https://github.com/killerspidey/J.A.R.V.I.S..git",
        status: "active",
        featured: true
    },
    {
        name: "Network Traffic Analyzer",
        description: "Real-time packet capture tool built with Scapy that detects ARP spoofing, port scanning (SYN/FIN/XMAS/NULL), DNS tunnelling, and cleartext HTTP credential exposure. Decodes TCP/IP, HTTP, and DNS protocol layers. Validated in an isolated VirtualBox home lab against Metasploitable 2. 40-test suite, JSON report generation.",
        tags: ["Python", "Scapy", "Wireshark", "Kali Linux", "Networking", "Packet Analysis"],
        url: "https://github.com/killerspidey/Network-Traffic-Analyzer.git",
        status: "active"
    },
    {
        name: "Web Application Vulnerability Scanner",
        description: "Python-based scanner targeting OWASP Top 10 vulnerabilities. Detects SQL Injection, XSS, CSRF, insecure headers, and open redirects via automated parameter fuzzing. Severity classification engine maps findings to CVSS-style scoring. Validated against DVWA and OWASP Juice Shop.",
        tags: ["Python", "OWASP Top 10", "SQLi", "XSS", "CSRF", "Penetration Testing"],
        url: "https://github.com/killerspidey/web-application-vulnerability-scanner",
        status: "active"
    }
];

projectContainer.innerHTML = "";
projects.forEach((project, index) => {
    const div = document.createElement("div");
    div.classList.add("project-item");
    div.style.animationDelay = `${index * 0.1}s`;
    div.innerHTML = `
        <div class="project-top">
            <div class="project-title-row">
                <span class="project-index">0${index + 1}</span>
                <a class="project-name" href="${project.url}" target="_blank">${project.name}</a>
                ${project.featured ? '<span class="project-featured">★ FEATURED</span>' : ''}
                <a class="project-arrow" href="${project.url}" target="_blank">↗</a>
            </div>
        </div>
        <p class="project-desc">${project.description}</p>
        <div class="project-tags">
            ${project.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
    `;
    projectContainer.appendChild(div);
});


// ===== ACTIVE NAV HIGHLIGHT =====

const sections = document.querySelectorAll("section[id], footer[id]");
const navLinks = document.querySelectorAll("nav ul li a");

const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === `#${entry.target.id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));


// ===== TYPING EFFECT FOR HERO SUBTITLE =====

const subtitleEl = document.querySelector(".subtitle");
if (subtitleEl) {
    const originalText = subtitleEl.textContent;
    subtitleEl.textContent = "";
    let i = 0;

    function typeSubtitle() {
        if (i < originalText.length) {
            subtitleEl.textContent += originalText[i];
            i++;
            setTimeout(typeSubtitle, 35);
        }
    }

    // Start typing after boot sequence finishes
    setTimeout(typeSubtitle, bootLines.length * 90 + 1200);
}
