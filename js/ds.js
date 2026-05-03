/* ─── Estruturas de Dados: Demos Interativos ─── */
/* ══════════════════════════════════════════════════════
   DS INTERACTIVE DEMOS
══════════════════════════════════════════════════════ */
let dsState = { array:[1,2,3], stack:[10,20,30], queue:[5,10,15], hash:{'nome':'Alice','idade':20,'curso':'AED'} };
let dsCounter = { array:4, stack:40, queue:20 };

function switchDS(type) {
    ['array','stack','queue','hash'].forEach(t => {
        document.getElementById('demo-'+t).style.display = t===type?'':'none';
    });
    document.querySelectorAll('.btn.active').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderDS(type);
}

function renderDS(type) {
    if (type==='array') {
        const area=document.getElementById('ds-arr-area'); area.innerHTML='';
        dsState.array.forEach((v,i)=>{
            const n=document.createElement('div'); n.className='ds-node node-arr'; n.style.position='relative';
            n.innerHTML=`${v}<span style="position:absolute;top:-14px;font-size:9px;color:var(--muted);font-family:JetBrains Mono,monospace">[${i}]</span>`;
            area.appendChild(n);
        });
    } else if (type==='stack') {
        const area=document.getElementById('ds-stack-area'); area.innerHTML='';
        dsState.stack.forEach((v,i)=>{
            const n=document.createElement('div'); n.className='ds-node node-stack'; n.style.position='relative';
            if (i===dsState.stack.length-1) n.innerHTML=`${v}<span style="position:absolute;top:-14px;font-size:9px;color:var(--accent2);font-family:JetBrains Mono,monospace">TOPO</span>`;
            else n.innerHTML=v;
            area.appendChild(n);
        });
    } else if (type==='queue') {
        const area=document.getElementById('ds-queue-area'); area.innerHTML='';
        dsState.queue.forEach(v=>{
            const n=document.createElement('div'); n.className='ds-node node-queue'; n.textContent=v; area.appendChild(n);
        });
    } else if (type==='hash') {
        const area=document.getElementById('ds-hash-area'); area.innerHTML='';
        Object.entries(dsState.hash).forEach(([k,v])=>{
            const n=document.createElement('div'); n.className='ds-node node-arr';
            n.style.cssText='min-width:auto;height:auto;padding:8px 12px;flex-direction:column;border-radius:6px;font-size:11px;';
            n.innerHTML=`<span style="color:var(--muted);font-size:9px">${k}</span><span style="color:var(--accent);font-weight:700">${v}</span>`;
            area.appendChild(n);
        });
    }
}

function dsArrayPush() { const v=dsCounter.array++; dsState.array.push(v); const area=document.getElementById('ds-arr-area'); const n=document.createElement('div'); n.className='ds-node node-new'; n.style.position='relative'; n.innerHTML=`${v}<span style="position:absolute;top:-14px;font-size:9px;color:var(--muted);font-family:JetBrains Mono,monospace">[${dsState.array.length-1}]</span>`; area.appendChild(n); document.getElementById('ds-arr-log').textContent=`→ push(${v}) em [${dsState.array.length-1}] — O(1)`; }
function dsArrayPop() { if (!dsState.array.length){document.getElementById('ds-arr-log').textContent='× Vazio!';return;} const v=dsState.array.pop(); renderDS('array'); document.getElementById('ds-arr-log').textContent=`← pop() removeu ${v} — O(1)`; }
function dsArrayAccess() { if (!dsState.array.length){return;} document.getElementById('ds-arr-log').textContent=`→ arr[0] = ${dsState.array[0]} — O(1) acesso direto`; }
function dsStackPush() { const v=dsCounter.stack; dsCounter.stack+=10; dsState.stack.push(v); renderDS('stack'); document.getElementById('ds-stack-log').textContent=`⬆ push(${v}) no topo — O(1)`; }
function dsStackPop() { if (!dsState.stack.length){document.getElementById('ds-stack-log').textContent='× Pilha vazia!';return;} const v=dsState.stack.pop(); renderDS('stack'); document.getElementById('ds-stack-log').textContent=`⬇ pop() → ${v} — O(1)`; }
function dsStackPeek() { if (!dsState.stack.length){return;} document.getElementById('ds-stack-log').textContent=`👁 peek() → topo = ${dsState.stack[dsState.stack.length-1]} — O(1)`; }
function dsQueueEnq() { const v=dsCounter.queue; dsCounter.queue+=5; dsState.queue.push(v); renderDS('queue'); document.getElementById('ds-queue-log').textContent=`⟶ enqueue(${v}) no fim — O(1)`; }
function dsQueueDeq() { if (!dsState.queue.length){document.getElementById('ds-queue-log').textContent='× Fila vazia!';return;} const v=dsState.queue.shift(); renderDS('queue'); document.getElementById('ds-queue-log').textContent=`⟵ dequeue() → ${v} — O(1)`; }
function dsHashSet() { const keys=['nota','turma','matricula','projeto']; const vals=[9.5,'AED-2025','#11023','TreeVis']; const idx=Object.keys(dsState.hash).length%keys.length; dsState.hash[keys[idx]]=vals[idx]; renderDS('hash'); document.getElementById('ds-hash-log').textContent=`set("${keys[idx]}", ${vals[idx]}) — O(1)`; }
function dsHashGet() { const k=Object.keys(dsState.hash)[0]; document.getElementById('ds-hash-log').textContent=`get("${k}") → ${dsState.hash[k]} — O(1)`; }
function dsHashDel() { const keys=Object.keys(dsState.hash); if (!keys.length){document.getElementById('ds-hash-log').textContent='× Hash vazia!';return;} const k=keys[keys.length-1]; delete dsState.hash[k]; renderDS('hash'); document.getElementById('ds-hash-log').textContent=`del("${k}") — O(1)`; }
function dsReset(type) { if (type==='array'){dsState.array=[1,2,3];dsCounter.array=4;} if (type==='stack'){dsState.stack=[10,20,30];dsCounter.stack=40;} if (type==='queue'){dsState.queue=[5,10,15];dsCounter.queue=20;} if (type==='hash'){dsState.hash={'nome':'Alice','idade':20,'curso':'AED'};} renderDS(type); }
