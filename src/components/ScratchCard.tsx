import { useEffect, useRef, useState, type PointerEvent } from "react";

// 24 Nov 2026, 7:00 PM IST = 13:30 UTC; 3 hour block.
const GOOGLE_CALENDAR_URL = "https://calendar.google.com/calendar/render?" + new URLSearchParams({
  action: "TEMPLATE",
  text: "Shivam & Apoorva - Wedding (Baraat)",
  dates: "20261124T133000Z/20261124T163000Z",
  location: "Kawatra Tents, behind Keshav Mahavidyalaya, Parwana Road, Pitampura, New Delhi",
  details: "Shivam & Apoorva's wedding celebration.",
}).toString();

function saveTheDate() {
  const isApple = /iPad|iPhone|iPod/.test(navigator.userAgent)
    || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  if (isApple) {
    // Served as text/calendar, so iOS Safari offers "Add to Calendar" directly.
    window.location.href = `${import.meta.env.BASE_URL}shivam-apoorva-wedding.ics`;
  } else {
    window.open(GOOGLE_CALENDAR_URL, "_blank", "noopener");
  }
}

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const drawing = useRef(false);
  const lastPoint = useRef<{x:number;y:number}|null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);
      const gradient = ctx.createLinearGradient(0,0,rect.width,rect.height);
      gradient.addColorStop(0,"#f5d88e");
      gradient.addColorStop(.22,"#b77b35");
      gradient.addColorStop(.48,"#f8e7b9");
      gradient.addColorStop(.72,"#c18b43");
      gradient.addColorStop(1,"#f2d58c");
      ctx.globalCompositeOperation="source-over";
      ctx.fillStyle=gradient;
      ctx.fillRect(0,0,rect.width,rect.height);
      const glow=ctx.createRadialGradient(rect.width*.5,rect.height*.45,4,rect.width*.5,rect.height*.45,rect.width*.7);
      glow.addColorStop(0,"rgba(255,255,255,.46)");
      glow.addColorStop(1,"rgba(255,255,255,0)");
      ctx.fillStyle=glow;ctx.fillRect(0,0,rect.width,rect.height);
      ctx.strokeStyle="rgba(255,247,215,.78)";ctx.lineWidth=1;
      ctx.strokeRect(9,9,rect.width-18,rect.height-18);
      ctx.fillStyle="rgba(255,249,221,.55)";
      for(let i=0;i<120;i++){ctx.beginPath();ctx.arc((i*73)%rect.width,(i*47)%rect.height,(i%3)*.55+.3,0,Math.PI*2);ctx.fill();}
      ctx.font="24px Georgia";ctx.fillStyle="rgba(255,244,204,.86)";
      ctx.fillText("✧",17,35);ctx.fillText("✧",rect.width-39,35);
      ctx.fillText("❧",16,rect.height-16);ctx.fillText("❧",rect.width-38,rect.height-16);
    };
    resize();
    const observer=new ResizeObserver(resize);
    observer.observe(canvas);
    return ()=>observer.disconnect();
  },[]);

  const eraseAt=(event:PointerEvent<HTMLCanvasElement>)=>{
    if(!drawing.current||revealed)return;
    const canvas=canvasRef.current;if(!canvas)return;
    const ctx=canvas.getContext("2d");if(!ctx)return;
    const rect=canvas.getBoundingClientRect();
    const point={x:event.clientX-rect.left,y:event.clientY-rect.top};
    ctx.globalCompositeOperation="destination-out";
    ctx.lineCap="round";ctx.lineJoin="round";ctx.lineWidth=38;
    ctx.beginPath();
    if(lastPoint.current){ctx.moveTo(lastPoint.current.x,lastPoint.current.y);ctx.lineTo(point.x,point.y);}
    else{ctx.arc(point.x,point.y,19,0,Math.PI*2);}
    ctx.stroke();lastPoint.current=point;
    if(Math.random()<.18){
      const data=ctx.getImageData(0,0,canvas.width,canvas.height).data;
      let clear=0;for(let i=3;i<data.length;i+=64)if(data[i]<30)clear++;
      if(clear/(data.length/64)>.43)setRevealed(true);
    }
  };

  return <div className={`scratch-card ${revealed?"scratch-revealed":""}`}>
    <div className="scratch-card-inner">
      <div className="scratch-reveal-copy">
        <span className="scratch-label">OUR WEDDING DATE</span>
        <strong>24 November 2026</strong>
        <small>The beginning of forever</small>
      </div>
      {!revealed&&<canvas ref={canvasRef} className="scratch-foil" aria-label="Scratch to reveal the wedding dates"
        onPointerDown={e=>{drawing.current=true;lastPoint.current=null;e.currentTarget.setPointerCapture(e.pointerId);eraseAt(e);}}
        onPointerMove={eraseAt}
        onPointerUp={()=>{drawing.current=false;lastPoint.current=null;}}
        onPointerCancel={()=>{drawing.current=false;lastPoint.current=null;}}/>}
      {!revealed&&<div className="scratch-overlay-prompt" aria-hidden="true"><span>✧</span><b>Scratch to reveal</b></div>}
    </div>
    {revealed
      ? <button type="button" className="scratch-bottom-note" onClick={saveTheDate} aria-label="A date to remember: add the wedding to your calendar">
          A date to remember <small>Add to calendar</small>
        </button>
      : <span className="scratch-bottom-note">Use your finger to gently scratch</span>}
  </div>;
}
