/* ─── Módulo 1.6 — Strings (palíndromos) ─── */

let palTimer = null;

function preprocessPal(s) {
    return s.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

function renderPalCells(s, marks) {
    const wrap = document.getElementById('pal-canvas');
    if (!wrap) return;
    if (s.length === 0) { wrap.innerHTML = '<div style="color:var(--muted);font-size:12px">(string vazia)</div>'; return; }
    let html = '<div class="str-row">';
    for (let i = 0; i < s.length; i++) {
        const cls = marks[i] || '';
        html += `<div class="str-cell ${cls}"><span class="str-idx">${i}</span>${s[i]}</div>`;
    }
    html += '</div>';
    wrap.innerHTML = html;
}

function onPalInput() {
    if (palTimer) { clearInterval(palTimer); palTimer = null; }
    const raw = document.getElementById('pal-input').value;
    const s = preprocessPal(raw);
    const status = document.getElementById('pal-status');
    status.textContent = `Pré-processada: "${s}" (${s.length} chars). Clique em "Detectar".`;
    status.className = 'str-status';
    renderPalCells(s, {});
}

function animatePal() {
    if (palTimer) { clearInterval(palTimer); palTimer = null; }
    const raw = document.getElementById('pal-input').value;
    const s = preprocessPal(raw);
    const status = document.getElementById('pal-status');
    if (s.length === 0) { status.textContent = 'String vazia.'; return; }

    let i = 0, j = s.length - 1;
    let isPal = true;
    const marks = {};
    renderPalCells(s, marks);

    palTimer = setInterval(() => {
        // Reset previous cell colors
        Object.keys(marks).forEach(k => { if (marks[k] === 'compare-l' || marks[k] === 'compare-r') marks[k] = 'match'; });

        if (i >= j) {
            // Final
            for (let k = 0; k < s.length; k++) marks[k] = isPal ? 'match' : marks[k] || 'fail';
            renderPalCells(s, marks);
            if (isPal) {
                status.textContent = `✓ "${s}" É palíndromo. Comparações: ${Math.ceil(s.length/2)}.`;
                status.className = 'str-status ok';
            } else {
                status.textContent = `✗ "${s}" NÃO é palíndromo.`;
                status.className = 'str-status fail';
            }
            clearInterval(palTimer); palTimer = null;
            return;
        }

        marks[i] = 'compare-l';
        marks[j] = 'compare-r';
        renderPalCells(s, marks);

        if (s[i] !== s[j]) {
            // Mismatch
            isPal = false;
            marks[i] = 'fail';
            marks[j] = 'fail';
            renderPalCells(s, marks);
            status.textContent = `✗ Caractere ${s[i]} (idx ${i}) ≠ ${s[j]} (idx ${j}). NÃO é palíndromo.`;
            status.className = 'str-status fail';
            clearInterval(palTimer); palTimer = null;
            return;
        }

        // Match: schedule advancing
        setTimeout(() => {
            marks[i] = 'match';
            marks[j] = 'match';
            i++;
            j--;
        }, 350);
    }, 700);
}

const PAL_EXAMPLES = [null, 'HANNAH', 'ROMA ME TEM AMOR', 'SOCORRAM-ME, SUBI NO ÔNIBUS EM MARROCOS', 'ALGORITMO'];
function loadPalEx(n) {
    const ex = PAL_EXAMPLES[n];
    if (!ex) return;
    document.getElementById('pal-input').value = ex;
    onPalInput();
}

/* ─── Módulo 1.7 — Teoria dos Números (Euclides + Crivo) ─── */

function runEuclid() {
    const a = parseInt(document.getElementById('euclid-a').value, 10);
    const b = parseInt(document.getElementById('euclid-b').value, 10);
    const stepsEl = document.getElementById('euclid-steps');
    if (isNaN(a) || isNaN(b) || a < 1 || b < 1) { stepsEl.innerHTML = '<div style="color:var(--danger)">Valores inválidos.</div>'; return; }

    let x = Math.max(a, b);
    let y = Math.min(a, b);
    let html = '';
    let step = 1;
    while (y !== 0) {
        const q = Math.floor(x / y);
        const r = x % y;
        html += `<div class="euclid-step"><span class="es-num">#${step}</span>mdc(<span style="color:var(--accent)">${x}</span>, <span style="color:var(--warn)">${y}</span>) = mdc(${y}, ${x} mod ${y}) <span class="es-eq">=</span> mdc(${y}, ${r})</div>`;
        x = y; y = r;
        step++;
        if (step > 100) break;
    }
    html += `<div class="euclid-step final">→ mdc = <span style="color:var(--accent3);font-size:16px">${x}</span> &nbsp;&nbsp;(em ${step - 1} passos)</div>`;
    stepsEl.innerHTML = html;
}

const EUCLID_EXAMPLES = [null, [24,36], [120,144], [17,13]];
function loadEuclidEx(n) {
    const ex = EUCLID_EXAMPLES[n];
    if (!ex) return;
    document.getElementById('euclid-a').value = ex[0];
    document.getElementById('euclid-b').value = ex[1];
    runEuclid();
}

/* Crivo de Eratóstenes */
let sieveTimer = null;
const SIEVE_N = 50;

function buildSieveCells(states) {
    const grid = document.getElementById('sieve-grid');
    if (!grid) return;
    let html = '';
    for (let i = 2; i <= SIEVE_N; i++) {
        const cls = states[i] || '';
        html += `<div class="sieve-cell ${cls}" data-n="${i}">${i}</div>`;
    }
    grid.innerHTML = html;
}

function resetSieve() {
    if (sieveTimer) { clearInterval(sieveTimer); sieveTimer = null; }
    buildSieveCells({});
    const ce = document.getElementById('sieve-count');
    if (ce) ce.textContent = '0';
}

function runSieve() {
    if (sieveTimer) { clearInterval(sieveTimer); sieveTimer = null; }
    const N = SIEVE_N;
    const isPrime = new Array(N + 1).fill(true);
    const states = {};
    let i = 2;
    let primesFound = 0;
    let phase = 'find'; // find | mark
    let markBase = 0;
    let markMul = 0;

    buildSieveCells(states);

    sieveTimer = setInterval(() => {
        if (i * i > N) {
            // Mark all remaining unmarked as primes
            for (let k = 2; k <= N; k++) {
                if (isPrime[k] && !states[k]) {
                    states[k] = 'prime';
                    primesFound++;
                }
            }
            buildSieveCells(states);
            document.getElementById('sieve-count').textContent = primesFound;
            clearInterval(sieveTimer); sieveTimer = null;
            return;
        }

        if (phase === 'find') {
            // Find next prime
            while (i <= N && !isPrime[i]) i++;
            if (i > N) { clearInterval(sieveTimer); sieveTimer = null; return; }
            // Mark as prime
            states[i] = 'prime';
            primesFound++;
            document.getElementById('sieve-count').textContent = primesFound;
            buildSieveCells(states);
            phase = 'mark';
            markBase = i;
            markMul = i * i;
        } else {
            if (markMul > N) {
                // Done marking, advance
                i++;
                phase = 'find';
                return;
            }
            // Highlight current and mark composite
            if (isPrime[markMul]) {
                isPrime[markMul] = false;
                states[markMul] = 'composite';
            }
            // Quick visual
            const cells = document.querySelectorAll('.sieve-cell');
            cells.forEach(c => {
                if (c.classList.contains('current')) c.classList.remove('current');
            });
            const cellMul = document.querySelector(`.sieve-cell[data-n="${markMul}"]`);
            if (cellMul) cellMul.classList.add('current');
            buildSieveCells(states);
            markMul += markBase;
        }
    }, 80);
}

/* ─── Módulo 1.8 — Geometria (Museu) ─── */

const MUSEUM_CONFIGS = [
    null,
    // Default: similar to the prova
    {
        name: 'P1-Strauss original',
        room: { w: 700, h: 400 },
        entrance: { x: 0, y: 400 },
        cameras: [
            { x: 150, y: 130, r: 80 },
            { x: 130, y: 230, r: 70 },
            { x: 320, y: 150, r: 100 },
            { x: 380, y: 280, r: 80 },
            { x: 540, y: 200, r: 90 }
        ],
        painting: { x: 700, y: 30 }
    },
    // Quadro descoberto
    {
        name: 'Quadro descoberto',
        room: { w: 700, h: 400 },
        entrance: { x: 0, y: 400 },
        cameras: [
            { x: 150, y: 130, r: 60 },
            { x: 130, y: 230, r: 50 },
            { x: 320, y: 150, r: 70 }
        ],
        painting: { x: 650, y: 50 }
    },
    // Quadro coberto
    {
        name: 'Quadro coberto',
        room: { w: 700, h: 400 },
        entrance: { x: 0, y: 400 },
        cameras: [
            { x: 100, y: 100, r: 70 },
            { x: 350, y: 200, r: 100 },
            { x: 600, y: 60, r: 100 }
        ],
        painting: { x: 650, y: 50 }
    }
];

let currentMuseum = MUSEUM_CONFIGS[1];

function pointInCircle(px, py, cx, cy, r) {
    const dx = px - cx, dy = py - cy;
    return dx * dx + dy * dy <= r * r;
}

function renderMuseum() {
    const wrap = document.getElementById('geo-wrap');
    const status = document.getElementById('geo-status');
    if (!wrap) return;

    const m = currentMuseum;
    const W = m.room.w, H = m.room.h;
    const margin = 30;

    let svg = `<svg viewBox="-${margin} -${margin} ${W + 2 * margin} ${H + 2 * margin}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:760px;height:auto;cursor:crosshair" onclick="moveMuseumPainting(event, this)">`;

    // Room
    svg += `<rect x="0" y="0" width="${W}" height="${H}" fill="rgba(255,255,255,0.02)" stroke="var(--border)" stroke-width="2"/>`;

    // Cameras (circles + labels)
    m.cameras.forEach((c, idx) => {
        svg += `<circle cx="${c.x}" cy="${c.y}" r="${c.r}" fill="rgba(243,156,18,0.10)" stroke="#f39c12" stroke-width="1.5" stroke-dasharray="4,3"/>`;
        svg += `<circle cx="${c.x}" cy="${c.y}" r="4" fill="#f39c12"/>`;
        svg += `<text x="${c.x}" y="${c.y - c.r - 4}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="11" fill="#f39c12" font-weight="700">K${idx + 1},R${c.r}</text>`;
        svg += `<text x="${c.x}" y="${c.y - 8}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" fill="var(--muted)">(${c.x},${c.y})</text>`;
    });

    // Entrance
    svg += `<rect x="${m.entrance.x - 15}" y="${m.entrance.y - 15}" width="30" height="30" fill="rgba(39,174,96,0.25)" stroke="#27ae60" stroke-width="2"/>`;
    svg += `<text x="${m.entrance.x}" y="${m.entrance.y + 30}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="#27ae60" font-weight="700">ENTRADA</text>`;

    // Painting — check if covered
    const covered = m.cameras.some(c => pointInCircle(m.painting.x, m.painting.y, c.x, c.y, c.r));
    const pColor = covered ? '#27ae60' : '#e74c3c';
    svg += `<rect x="${m.painting.x - 12}" y="${m.painting.y - 12}" width="24" height="24" fill="${pColor}" stroke="white" stroke-width="2"/>`;
    svg += `<text x="${m.painting.x}" y="${m.painting.y - 18}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="${pColor}" font-weight="700">QUADRO (${m.painting.x},${m.painting.y})</text>`;

    svg += '</svg>';
    wrap.innerHTML = svg;

    // Status
    if (covered) {
        const idx = m.cameras.findIndex(c => pointInCircle(m.painting.x, m.painting.y, c.x, c.y, c.r));
        status.textContent = `✓ SEGURO — Quadro coberto pela câmera K${idx + 1} (raio ${m.cameras[idx].r}).`;
        status.className = 'geo-status safe';
    } else {
        status.textContent = '✗ INSEGURO — Quadro fora do raio de TODAS as câmeras.';
        status.className = 'geo-status unsafe';
    }
}

function moveMuseumPainting(evt, svg) {
    // Get click coordinates in SVG coordinate space
    const pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const localPt = pt.matrixTransform(ctm.inverse());
    const m = currentMuseum;
    const x = Math.max(0, Math.min(m.room.w, Math.round(localPt.x)));
    const y = Math.max(0, Math.min(m.room.h, Math.round(localPt.y)));
    m.painting = { x, y };
    renderMuseum();
}

function loadGeoEx(n) {
    const ex = MUSEUM_CONFIGS[n];
    if (!ex) return;
    // Deep clone so user clicks don't permanently modify
    currentMuseum = JSON.parse(JSON.stringify(ex));
    renderMuseum();
}

/* Init for Onda 2 */
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('pal-canvas')) onPalInput();
        if (document.getElementById('euclid-steps')) runEuclid();
        if (document.getElementById('sieve-grid')) buildSieveCells({});
        if (document.getElementById('geo-wrap')) renderMuseum();
    }, 350);
});

const _origSwitchPanel_o2 = window.switchPanel;
window.switchPanel = function(mod, panel) {
    _origSwitchPanel_o2(mod, panel);
    setTimeout(() => {
        if (panel === 'm1-strings'   && document.getElementById('pal-canvas'))   onPalInput();
        if (panel === 'm1-numeros'   && document.getElementById('euclid-steps')) { runEuclid(); buildSieveCells({}); }
        if (panel === 'm1-geometria' && document.getElementById('geo-wrap'))     renderMuseum();
    }, 60);
};
