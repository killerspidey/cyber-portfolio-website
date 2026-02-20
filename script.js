// ===== BOOT SCREEN =====

const terminal = document.getElementById("terminal");
const terminalText = document.getElementById("terminal-text");
const mainContent = document.getElementById("main-content");

const bootLines = [
    "[ 00.01 ] Initializing cyber-os kernel...",
    "[ 00.07 ] Loading security modules...",
    "[ 00.12 ] Identity confirmed: <span class='highlight'>HACKER</span>",
    "[ 00.18 ] Establishing encrypted channels...",
    "[ 00.24 ] Scanning threat environment...",
    "[ 00.30 ] System integrity: VERIFIED",
    "[ 00.36 ] Launching secure interface...",
    "[ 00.42 ] Access Granted."
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
            terminal.style.opacity = "0";
            terminal.style.transition = "opacity 0.8s ease";
            setTimeout(() => {
                terminal.style.display = "none";
                mainContent.classList.remove("hidden");
            }, 800);
        }, 1200);
    }
}

runBoot();


// ===== MATRIX =====

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let x = 0; x < columns; x++) drops[x] = 1;

function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
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

setInterval(drawMatrix, 33);


// ===== SCROLL REVEAL =====

const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting)
            entry.target.classList.add('show');
    });
}, { threshold: 0.2 });

cards.forEach(card => observer.observe(card));


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
            div.classList.add("project-item");
            div.innerHTML = `
                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                <div>${repo.description || "No description provided."}</div>
            `;
            projectContainer.appendChild(div);
        });
    })
    .catch(() => {
        projectContainer.innerHTML = "Unable to load projects.";
    });