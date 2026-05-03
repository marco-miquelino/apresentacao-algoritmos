/* ─── Big-O: Calculadora e Gráfico ─── */
/* ══════════════════════════════════════════════════════
   BIG-O CALCULATOR
══════════════════════════════════════════════════════ */
function fmt(x) {
    if (!isFinite(x) || x > 1e15) return '∞';
    if (x > 1e12) return (x/1e12).toFixed(1)+'T';
    if (x > 1e9)  return (x/1e9).toFixed(1)+'B';
    if (x > 1e6)  return (x/1e6).toFixed(1)+'M';
    if (x > 999)  return (x/1e3).toFixed(1)+'K';
    return Math.round(x).toString();
}

function updateBigoCalc(n) {
    n = +n;
    document.getElementById('n-val').textContent = n;
    document.getElementById('bv-o1').textContent = '1';
    document.getElementById('bv-logn').textContent = fmt(Math.log2(n));
    document.getElementById('bv-n').textContent = fmt(n);
    document.getElementById('bv-nlogn').textContent = fmt(n * Math.log2(n));
    document.getElementById('bv-n2').textContent = fmt(n * n);
    document.getElementById('bv-2n').textContent = n <= 50 ? fmt(Math.pow(2, n)) : '∞';
    document.getElementById('bv-nfat').textContent = n <= 20 ? fmt(factorial(n)) : '∞';
}

function factorial(n) { if (n <= 1) return 1; return n * factorial(n - 1); }

function drawBigoChart() {
    const canvas = document.getElementById('bigo-canvas');
    if (!canvas) return;
    const W = canvas.offsetWidth || 720, H = 280;
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext('2d');
    const lt=document.documentElement.getAttribute('data-theme')==='light';
    ctx.fillStyle = lt?'#ede4d4':'#0a0c10'; ctx.fillRect(0,0,W,H);
    const pad = {l:40,r:20,t:20,b:30}, cW = W-pad.l-pad.r, cH = H-pad.t-pad.b;
    const maxN = 30, maxY = 200;
    ctx.strokeStyle = lt?'#c8bfae':'#1a1e28'; ctx.lineWidth = 1;
    [0.25,0.5,0.75,1].forEach(f => {
        const y = pad.t + cH*(1-f);
        ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(pad.l+cW,y); ctx.stroke();
        ctx.fillStyle=lt?'#5a5040':'#3a3f52'; ctx.font='10px JetBrains Mono,monospace';
        ctx.fillText(Math.round(f*maxY),4,y+4);
    });
    const fns = [
        {f:n=>1,             color:'#27ae60'},
        {f:n=>Math.log2(n),  color:'#5dade2'},
        {f:n=>n,             color:'#f39c12'},
        {f:n=>n*Math.log2(n),color:'#e8eaf0'},
        {f:n=>n*n,           color:'#e74c3c'},
        {f:n=>Math.pow(2,n), color:'#9b59b6'},
    ];
    fns.forEach(({f,color}) => {
        ctx.strokeStyle=color; ctx.lineWidth=2; ctx.beginPath();
        let first=true;
        for (let i=1;i<=maxN;i++) {
            const x=pad.l+(i/maxN)*cW, val=f(i);
            const y=pad.t+cH*(1-Math.min(val,maxY)/maxY);
            if (first){ctx.moveTo(x,y);first=false;}else ctx.lineTo(x,y);
        }
        ctx.stroke();
    });
    ctx.strokeStyle=lt?'#c8bfae':'#242836'; ctx.lineWidth=1;
    ctx.beginPath(); ctx.moveTo(pad.l,pad.t+cH); ctx.lineTo(pad.l+cW,pad.t+cH); ctx.stroke();
    ctx.fillStyle=lt?'#5a5040':'#3a3f52'; ctx.font='10px JetBrains Mono,monospace';
    [5,10,15,20,25,30].forEach(n=>{
        const x=pad.l+(n/maxN)*cW;
        ctx.fillText(n,x-5,pad.t+cH+14);
    });
}
