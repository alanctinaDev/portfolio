// ── PARTICLES ──
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let W, H, pts = [];

function resize() { W = canvas.width = innerWidth; H = canvas.height = innerHeight; }
resize();
window.addEventListener('resize', resize);

class P {
  constructor() { this.init(); }
  init() {
    this.x = Math.random() * W; this.y = Math.random() * H;
    this.vx = (Math.random()-.5)*.28; this.vy = (Math.random()-.5)*.28;
    this.r = Math.random()*2+.6;
    this.a = Math.random()*.55+.18;
    this.life = Math.random(); this.decay = Math.random()*.0015+.0008;
  }
  step() {
    this.x+=this.vx; this.y+=this.vy; this.life-=this.decay;
    if(this.life<=0||this.x<0||this.x>W||this.y<0||this.y>H) this.init();
  }
  draw() {
    ctx.beginPath(); ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(0,212,255,${this.a*this.life})`; ctx.fill();
  }
}

for(let i=0;i<160;i++) pts.push(new P());

function frame() {
  ctx.clearRect(0,0,W,H);
  for(let i=0;i<pts.length;i++){
    pts[i].step(); pts[i].draw();
    for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
      const d=Math.sqrt(dx*dx+dy*dy);
      if(d<120){
        ctx.beginPath();
        ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
        ctx.strokeStyle=`rgba(0,212,255,${(1-d/120)*.13})`;
        ctx.lineWidth=.8; ctx.stroke();
      }
    }
  }
  requestAnimationFrame(frame);
}
frame();

// ── NAV ──
const nav = document.getElementById('navbar');
window.addEventListener('scroll', ()=> nav.classList.toggle('scrolled', scrollY>40));

// ── REVEAL ──
const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// ── SIGNSPEAK TEXT ANIMATION ──
const ssText = document.getElementById('ss-text');
if (ssText) {
  const ssWords = ["Hola, mundo", "SignSpeak", "¿Cómo estás?", "Inteligencia", "MediaPipe"];
  let ssIdx = 0;
  setInterval(() => {
    ssText.style.opacity = 0;
    setTimeout(() => {
      ssIdx = (ssIdx + 1) % ssWords.length;
      ssText.textContent = ssWords[ssIdx];
      ssText.style.opacity = 1;
    }, 200);
  }, 2000);
}
