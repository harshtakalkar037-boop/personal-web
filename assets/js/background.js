(()=>{
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const coarse=window.matchMedia('(pointer: coarse)').matches;
const css=`
.ai-bg{position:fixed;inset:0;z-index:-1;pointer-events:none;overflow:hidden;background:#040609}
.ai-bg canvas{position:absolute;inset:0;width:100%;height:100%}
.ai-bg:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 18%,rgba(44,196,255,.07),transparent 34%),radial-gradient(circle at 82% 68%,rgba(120,82,255,.055),transparent 30%)}
.ai-bg-grid{position:absolute;left:-15%;right:-15%;bottom:-18%;height:58%;opacity:.18;transform:perspective(700px) rotateX(64deg);transform-origin:center bottom;background-image:linear-gradient(rgba(91,215,255,.13) 1px,transparent 1px),linear-gradient(90deg,rgba(91,215,255,.13) 1px,transparent 1px);background-size:70px 70px;mask-image:linear-gradient(to top,rgba(0,0,0,.9),transparent 92%);animation:gridDrift 18s linear infinite}
.ai-bg-haze{position:absolute;width:45vw;height:45vw;left:50%;top:18%;transform:translate(-50%,-50%);border-radius:50%;background:radial-gradient(circle,rgba(43,199,255,.055),transparent 68%);filter:blur(35px)}
.cursor-dot{position:fixed;width:4px;height:4px;border-radius:50%;background:#b8f2ff;box-shadow:0 0 12px 3px rgba(72,213,255,.5);pointer-events:none;z-index:50;transform:translate(-50%,-50%);opacity:0}
@keyframes gridDrift{from{background-position:0 0,0 0}to{background-position:0 70px,70px 0}}
@media(max-width:720px){.ai-bg-grid{opacity:.08}.ai-bg-haze{width:80vw;height:80vw}.cursor-dot{display:none}}
@media(prefers-reduced-motion:reduce){.ai-bg-grid{animation:none}}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const bg=document.createElement('div');bg.className='ai-bg';bg.setAttribute('aria-hidden','true');bg.innerHTML='<canvas></canvas><div class="ai-bg-grid"></div><div class="ai-bg-haze"></div>';document.body.prepend(bg);
if(reduce)return;
const canvas=bg.querySelector('canvas'),ctx=canvas.getContext('2d');let w,h,dpr,points=[],mouse={x:-9999,y:-9999,tx:-9999,ty:-9999};
function resize(){dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);const count=Math.min(95,Math.max(42,Math.floor(w*h/18000)));points=Array.from({length:count},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,r:Math.random()*1.3+.25,a:Math.random()*.45+.12,p:Math.random()*Math.PI*2}))}resize();addEventListener('resize',resize,{passive:true});
function move(e){mouse.tx=e.clientX;mouse.ty=e.clientY;mouse.x+= (mouse.tx-mouse.x)*.13;mouse.y+=(mouse.ty-mouse.y)*.13}
if(!coarse){addEventListener('pointermove',move,{passive:true});const dot=document.createElement('div');dot.className='cursor-dot';document.body.append(dot);addEventListener('pointermove',e=>{dot.style.opacity='1';dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px'},{passive:true});addEventListener('pointerout',e=>{if(!e.relatedTarget)dot.style.opacity='0'},{passive:true})}
function frame(t){ctx.clearRect(0,0,w,h);for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<-20)p.x=w+20;if(p.x>w+20)p.x=-20;if(p.y<-20)p.y=h+20;if(p.y>h+20)p.y=-20;const dx=p.x-mouse.x,dy=p.y-mouse.y,dist=Math.hypot(dx,dy);if(dist<150&&dist>0){p.x+=dx/dist*.16;p.y+=dy/dist*.16}p.p+=.012;const alpha=p.a*(.7+.3*Math.sin(p.p));ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(117,221,255,${alpha})`;ctx.fill()}
for(let i=0;i<points.length;i++){for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],dx=a.x-b.x,dy=a.y-b.y,dist=Math.hypot(dx,dy);if(dist<105){const nearMouse=Math.min(Math.hypot(a.x-mouse.x,a.y-mouse.y),Math.hypot(b.x-mouse.x,b.y-mouse.y));let alpha=(1-dist/105)*.075;if(nearMouse<190)alpha+=(1-nearMouse/190)*.22;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(82,205,255,${alpha})`;ctx.lineWidth=.7;ctx.stroke()}}}
if(mouse.x>0){const radius=190;const g=ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,radius);g.addColorStop(0,'rgba(82,218,255,.11)');g.addColorStop(.45,'rgba(82,218,255,.035)');g.addColorStop(1,'rgba(82,218,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(mouse.x,mouse.y,radius,0,Math.PI*2);ctx.fill()}requestAnimationFrame(frame)}requestAnimationFrame(frame);
})();