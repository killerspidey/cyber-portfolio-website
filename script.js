// ===== BOOT SEQUENCE =====
const terminal = document.getElementById("terminal");
const terminalText = document.getElementById("terminal-text");
const mainContent = document.getElementById("main-content");

const bootLines = [
    "[ 00.01 ] Initializing cyber-os kernel...",
    "[ 00.07 ] Loading security modules...",
    "[ 00.12 ] Identity confirmed: <span class='highlight'>HACKER</span>",
    "[ 00.18 ] Establishing encrypted channels...",
    "[ 00.24 ] System integrity: VERIFIED",
    "[ 00.30 ] Launching secure interface...",
    "[ 00.36 ] Access Granted."
];

let line = 0;

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
    }, 20);
}

function runBoot() {
    if (line < bootLines.length) {
        typeLine(bootLines[line], () => {
            line++;
            setTimeout(runBoot, 300);
        });
    } else {
        terminalText.innerHTML += "<br>root@cyber-os:~$ <span class='cursor'></span>";
        setTimeout(() => {
            terminal.style.display = "none";
            mainContent.classList.remove("hidden");
        }, 1500);
    }
}

runBoot();

// ===== MATRIX =====
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters = "01";
const fontSize = 16;
let columns = canvas.width / fontSize;
let drops = [];

for (let i = 0; i < columns; i++) drops[i] = 1;

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#00ff00";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random()*letters.length)];
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);

        if (drops[i]*fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++;
    }
}

setInterval(draw, 33);

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
});

// ===== GITHUB FETCH =====
const username = "killerspidey";
const projectContainer = document.getElementById("github-projects");

fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
    .then(res => res.json())
    .then(data => {
        const filtered = data.filter(r => !r.fork).slice(0,5);
        projectContainer.innerHTML = "";

        filtered.forEach(repo => {
            const div = document.createElement("div");
            div.innerHTML = `
                <strong><a href="${repo.html_url}" target="_blank">${repo.name}</a></strong>
                <p>${repo.description || "No description provided."}</p>
                <hr>
            `;
            projectContainer.appendChild(div);
        });
    });