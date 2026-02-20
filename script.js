// ===== BOOT SCREEN LOGIC =====
const terminal = document.getElementById("terminal");
const terminalText = document.getElementById("terminal-text");
const mainContent = document.getElementById("main-content");

const bootLines = [
    "[ 00.01 ] Initializing cyber-os kernel...",
    "[ 00.07 ] Loading security modules...",
    "[ 00.12 ] Identity confirmed: <span class='highlight'>GHOST</span>",
    "[ 00.18 ] Establishing encrypted channels...",
    "[ 00.30 ] System integrity: VERIFIED",
    "[ 00.42 ] Access Granted."
];

let lineIdx = 0;

function typeLine(text, callback) {
    let i = 0;
    const interval = setInterval(() => {
        terminalText.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
            terminalText.innerHTML += "<br>";
            callback();
        }
    }, 15);
}

function runBoot() {
    if (lineIdx < bootLines.length) {
        typeLine(bootLines[lineIdx], () => {
            lineIdx++;
            setTimeout(runBoot, 200);
        });
    } else {
        terminalText.innerHTML += "<br>root@cyber-os:~$ <span class='cursor'></span>";
        setTimeout(() => {
            terminal.style.opacity = "0";
            terminal.style.transition = "opacity 0.5s ease";
            setTimeout(() => {
                terminal.style.display = "none";
                mainContent.classList.remove("hidden");
            }, 500);
        }, 1000);
    }
}

window.onload = runBoot;

// ===== MATRIX ANIMATION =====
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
}
window.onresize = resizeCanvas;
resizeCanvas();

const letters = "0101010101010101ABCDEF";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(1, 3, 15, 0.1)";
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
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.card').forEach(card => observer.observe(card));

// ===== GITHUB API FETCH =====
const username = "killerspidey";
const projectContainer = document.getElementById("github-projects");

fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then(res => res.json())
    .then(data => {
        const filtered = data.filter(r => !r.fork).slice(0, 4);
        projectContainer.innerHTML = "";
        filtered.forEach(repo => {
            const div = document.createElement("div");
            div.className = "project-item";
            div.innerHTML = `
                <a href="${repo.html_url}" target="_blank">${repo.name.toUpperCase()}</a>
                <p style="font-size: 0.9rem; margin-top: 5px; color: #ccc;">${repo.description || "Security project in progress."}</p>
            `;
            projectContainer.appendChild(div);
        });
    })
    .catch(() => { projectContainer.innerHTML = "Offline: Unable to fetch repositories."; });