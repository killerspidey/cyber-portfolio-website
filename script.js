// Boot screen hide
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("boot-screen").style.display = "none";
  }, 2500);
});

// Matrix responsive
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters = "01";
const fontSize = 16;
let columns = canvas.width / fontSize;
let drops = [];

for(let i=0;i<columns;i++) drops[i]=1;

function draw(){
  ctx.fillStyle="rgba(0,0,0,0.05)";
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#00ff00";
  ctx.font=fontSize+"px monospace";

  for(let i=0;i<drops.length;i++){
    const text=letters[Math.floor(Math.random()*letters.length)];
    ctx.fillText(text,i*fontSize,drops[i]*fontSize);

    if(drops[i]*fontSize>canvas.height && Math.random()>0.975)
      drops[i]=0;
    drops[i]++;
  }
}
setInterval(draw,33);

// Scroll reveal
const cards = document.querySelectorAll(".card");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting)
      entry.target.classList.add("show");
  });
},{threshold:0.2});

cards.forEach(card=>observer.observe(card));

// GitHub auto fetch
fetch("https://api.github.com/users/killerspidey/repos?sort=updated")
.then(res=>res.json())
.then(data=>{
  const container=document.getElementById("github-projects");
  container.innerHTML="";
  data.filter(r=>!r.fork).slice(0,5).forEach(repo=>{
    const div=document.createElement("div");
    div.innerHTML=`<strong>${repo.name}</strong><br>${repo.description||""}<br><br>`;
    container.appendChild(div);
  });
});