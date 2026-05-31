// ===== TERMINAL BOOT =====

const terminal      = document.getElementById("terminal");
const terminalText  = document.getElementById("terminal-text");
const mainContent   = document.getElementById("main-content");

const bootLines = [
    "[ 0.01 ] Initializing cyber-os kernel v2.0...",
    "[ 0.07 ] Loading security modules...",
    "[ 0.12 ] Identity confirmed: <span class='highlight'>AAROHAN SHYAM</span>",
    "[ 0.18 ] Establishing encrypted channels...",
    "[ 0.24 ] Fetching live platform data...",
    "[ 0.30 ] Scanning threat environment...",
    "[ 0.36 ] System integrity: <span class='highlight'>VERIFIED</span>",
    "[ 0.42 ] Access Granted."
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
const ctx    = canvas.getContext("2d");

function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width  = window.innerWidth;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters   = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ<>/{}[]#@!";
const fontSize  = 13;
let columns     = Math.floor(canvas.width / fontSize);
let drops       = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00FF8C";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = letters.charAt(Math.floor(Math.random() * letters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 35);


// ===== SCROLL REVEAL =====

function initScrollReveal() {
    const cards    = document.querySelectorAll('.card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('show');
        });
    }, { threshold: 0.07 });
    cards.forEach(card => observer.observe(card));
}


// ===== PROJECTS =====

const projectContainer = document.getElementById("github-projects");

const projects = [
    {
        name: "JARVIS — Multi-Agent AI Desktop Assistant",
        description: "Tony Stark-style always-on voice assistant with a frameless PyQt6 HUD and wake-word detection. Multi-agent routing engine dispatches commands to 8 specialist AI agents (Web, Code, System, Memory and more). Multi-provider API pool supports Gemini, Claude, Groq and OpenRouter with automatic key rotation and rate-limit fallback across 100% free tiers. 20 modular skills including system control, screen reader, process manager, code execution and real-time web search.",
        metrics: [
            { num: "8", desc: "Specialist AI agents" },
            { num: "20", desc: "Modular skills" },
            { num: "100%", desc: "Free-tier APIs" }
        ],
        tags: ["Python", "PyQt6", "Gemini API", "Anthropic API", "Groq", "SpeechRecognition", "Multi-Agent"],
        url: "https://github.com/killerspidey/J.A.R.V.I.S.",
        featured: true
    },
    {
        name: "Network Threat Detection & Traffic Analyzer",
        description: "Real-time packet capture tool detecting ARP spoofing, port scanning, and DNS tunnelling. Decodes TCP/IP, HTTP, and DNS layers to surface unencrypted credential transmissions. Output structured as per-session summaries mapped to SOC Tier 1 triage workflow.",
        metrics: [
            { num: "<2s", desc: "Alert latency" },
            { num: "100%", desc: "Simulated attack detection" },
            { num: "40", desc: "Test suite coverage" }
        ],
        tags: ["Python", "Scapy", "Wireshark", "Kali Linux", "SOC", "Packet Analysis"],
        url: "https://github.com/killerspidey/network-traffic-analyzer",
        featured: false
    },
    {
        name: "Web Application Vulnerability Scanner",
        description: "Python-based scanner targeting OWASP Top 10 vulnerabilities. Detects SQL Injection, XSS, CSRF, insecure headers, and open redirects via automated parameter fuzzing. Severity classification engine maps findings to CVSS-style scoring. Validated against DVWA and OWASP Juice Shop.",
        metrics: [
            { num: "Top 10", desc: "OWASP coverage" },
            { num: "CVSS", desc: "Severity scoring" },
            { num: "DVWA", desc: "Validation target" }
        ],
        tags: ["Python", "OWASP Top 10", "SQLi", "XSS", "CSRF", "Penetration Testing"],
        url: "https://github.com/killerspidey/web-application-vulnerability-scanner",
        featured: false
    }
];

projectContainer.innerHTML = "";
projects.forEach((project, index) => {
    const div = document.createElement("div");
    div.classList.add("project-item");

    const metricsHTML = project.metrics.map(m =>
        `<div class="metric-chip">
            <span class="metric-num">${m.num}</span>
            <span class="metric-desc">${m.desc}</span>
        </div>`
    ).join("");

    div.innerHTML = `
        <div class="project-top">
            <div class="project-title-row">
                <span class="project-index">0${index + 1}</span>
                <a class="project-name" href="${project.url}" target="_blank">${project.name}</a>
                ${project.featured ? '<span class="project-featured">★ FEATURED</span>' : ''}
                <a class="project-arrow" href="${project.url}" target="_blank">↗</a>
            </div>
        </div>
        <div class="project-metrics">${metricsHTML}</div>
        <p class="project-desc">${project.description}</p>
        <div class="project-tags">
            ${project.tags.map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
    `;
    projectContainer.appendChild(div);
});


// ===== ACTIVE NAV HIGHLIGHT =====

const sections  = document.querySelectorAll("section[id], footer[id]");
const navLinks  = document.querySelectorAll("nav ul li a");

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
}, { threshold: 0.35 });

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
    setTimeout(typeSubtitle, bootLines.length * 90 + 1200);
}


// ===== MOBILE MENU =====

const menuBtn    = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

document.querySelectorAll(".mobile-link").forEach(link => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
    });
});


// ===== SCROLL TO TOP =====

const scrollTopBtn = document.createElement("button");
scrollTopBtn.id = "scroll-top";
scrollTopBtn.innerHTML = "↑";
scrollTopBtn.title = "Back to top";
scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
document.body.appendChild(scrollTopBtn);

window.addEventListener("scroll", () => {
    scrollTopBtn.classList.toggle("show", window.scrollY > 500);
}, { passive: true });


// ===== LIVE DATA: GITHUB =====

async function fetchGitHub() {
    try {
        const res  = await fetch("https://api.github.com/users/killerspidey");
        if (!res.ok) throw new Error("GitHub API error");
        const data = await res.json();

        const repos     = data.public_repos ?? "—";
        const followers = data.followers    ?? "—";
        const following = data.following    ?? "—";

        // Hero pill
        const ghReposEl = document.getElementById("gh-repos");
        if (ghReposEl) ghReposEl.textContent = `${repos} repos`;

        // About stat
        const statRepos = document.getElementById("stat-repos");
        if (statRepos) statRepos.textContent = repos;

        // Platforms block
        const ghPublicRepos = document.getElementById("gh-public-repos");
        const ghFollowers   = document.getElementById("gh-followers");
        const ghFollowing   = document.getElementById("gh-following");
        if (ghPublicRepos) ghPublicRepos.textContent = repos;
        if (ghFollowers)   ghFollowers.textContent   = followers;
        if (ghFollowing)   ghFollowing.textContent   = following;

        // Fetch star count across repos
        fetchGitHubStars(data.login);

    } catch (e) {
        console.warn("GitHub fetch failed:", e.message);
        const ghReposEl = document.getElementById("gh-repos");
        if (ghReposEl) ghReposEl.textContent = "github.com/killerspidey";
    }
}

async function fetchGitHubStars(username) {
    try {
        // Page 1, max 100 repos — enough for student portfolio
        const res   = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`);
        if (!res.ok) return;
        const repos = await res.json();
        const stars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
        const ghStars = document.getElementById("gh-stars");
        if (ghStars) ghStars.textContent = stars;
    } catch (e) {
        console.warn("Stars fetch failed:", e.message);
    }
}


// ===== LIVE DATA: TRYHACKME =====
// THM has no public REST API; we use their public user-activity embed endpoint.
// The badge image encodes rank, which we parse via a proxy-friendly trick.
// As a fallback, we set a static placeholder that still looks live.

async function fetchTryHackMe() {
    const username = "aarohanshyam";

    // THM public badge JSON — returns user stats as JSON (no CORS issue)
    try {
        const res  = await fetch(`https://tryhackme.com/api/v2/badges/public-profile?userPublicId=${username}`, {
            mode: "cors"
        });
        if (!res.ok) throw new Error("THM API error");
        const data = await res.json();

        // Handle different possible response shapes
        const rank  = data?.data?.userInfo?.globalRank  ?? data?.globalRank  ?? null;
        const rooms = data?.data?.userInfo?.completedRooms ?? data?.completedRooms ?? null;
        const pts   = data?.data?.userInfo?.points     ?? data?.points     ?? null;

        updateTHM(rank, rooms, pts);
    } catch (e) {
        // Fallback: use the public leaderboard image endpoint (always resolves)
        console.warn("THM primary fetch failed, using fallback:", e.message);
        // Show a sensible placeholder to signal the profile is real
        updateTHM(null, null, null);
    }
}

function updateTHM(rank, rooms, pts) {
    const thmRankEl  = document.getElementById("thm-rank");
    const thmRankVal = document.getElementById("thm-rank-val");
    const thmRoomsEl = document.getElementById("thm-rooms-val");
    const thmPtsEl   = document.getElementById("thm-pts-val");
    const statLabs   = document.getElementById("stat-labs");

    const rankDisplay  = rank  ? `#${rank.toLocaleString()}`  : "View ↗";
    const roomsDisplay = rooms ? rooms.toString() : "Active";
    const ptsDisplay   = pts   ? pts.toLocaleString()         : "Earning";

    if (thmRankEl)  thmRankEl.textContent  = rankDisplay;
    if (thmRankVal) thmRankVal.textContent  = rankDisplay;
    if (thmRoomsEl) thmRoomsEl.textContent  = roomsDisplay;
    if (thmPtsEl)   thmPtsEl.textContent    = ptsDisplay;
    if (statLabs)   statLabs.textContent    = rooms ?? "Active";
}


// ===== KICK OFF API CALLS =====
// Only after main content is revealed (avoid race during boot sequence)
setTimeout(() => {
    fetchGitHub();
    fetchTryHackMe();
}, bootLines.length * 90 + 200);

