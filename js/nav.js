/* ─── Navegação: Módulos e Painéis ─── */
/* ══════════════════════════════════════════════════════
   MODULE + PANEL NAVIGATION
══════════════════════════════════════════════════════ */
const MOD_SUBTABS = { m1:'subtab-m1', prova:'subtab-prova', m2:'subtab-m2' };
const MOD_PANELS  = { home:'panel-home', m1:'panel-m1', prova:'panel-prova', m2:'panel-m2' };
const MOD_LABEL   = { m1:'Módulo 1 · Teoria', prova:'Prova · P1 do Strauss', m2:'Módulo 2 · Problemas' };

/* Metadados de cada painel: módulo, bloco/grupo, número e título.
   Cor segue a paleta dos blocos/grupos definidos no layout.css. */
const PANEL_META = {
    /* M1 — 6 blocos */
    'm1-notacoes':       { mod:'m1', block:'Fundamentos',     color:'#be90d4', num:'1.1',  title:'Notações & Complexidade' },
    'm1-recursao':       { mod:'m1', block:'Fundamentos',     color:'#be90d4', num:'1.2',  title:'Recursão' },
    'm1-estruturas':     { mod:'m1', block:'ED Lineares',     color:'#58d68d', num:'1.3',  title:'Estruturas de Dados' },
    'm1-notmat':         { mod:'m1', block:'ED Lineares',     color:'#58d68d', num:'1.4',  title:'Notações Matemáticas (in/pré/pós)' },
    'm1-arvores':        { mod:'m1', block:'ED Não-Lineares', color:'#5dade2', num:'1.5',  title:'Árvores Binárias' },
    'm1-grafos-teoria':  { mod:'m1', block:'ED Não-Lineares', color:'#5dade2', num:'1.6',  title:'Grafos' },
    'm1-sort':           { mod:'m1', block:'Algoritmos Clássicos', color:'#f5b041', num:'1.7',  title:'Ordenação' },
    'm1-strings':        { mod:'m1', block:'Especializados',  color:'#aab7b8', num:'1.8',  title:'Strings' },
    'm1-numeros':        { mod:'m1', block:'Especializados',  color:'#aab7b8', num:'1.9',  title:'Teoria dos Números' },
    'm1-geometria':      { mod:'m1', block:'Especializados',  color:'#aab7b8', num:'1.10', title:'Geometria' },

    /* Prova — 4 cartões de preparo para a P1 */
    'pr-anatomia':       { mod:'prova', block:'Tática P1', color:'#f7dc6f', num:'P1', title:'Anatomia da Resposta Ideal' },
    'pr-modelo':         { mod:'prova', block:'Tática P1', color:'#f7dc6f', num:'P2', title:'Modelo de Resposta (Template)' },
    'pr-erros':          { mod:'prova', block:'Tática P1', color:'#f7dc6f', num:'P3', title:'Erros Comuns que Descontam Nota' },
    'pr-temas':          { mod:'prova', block:'Tática P1', color:'#f7dc6f', num:'P4', title:'Temas × Probabilidade × Onde Estudar' },

    /* M2 — 4 grupos */
    'p1':  { mod:'m2', block:'Estruturas Lineares', color:'#5dade2', num:'01', title:'O Problema da Celebridade' },
    'p3':  { mod:'m2', block:'Estruturas Lineares', color:'#5dade2', num:'02', title:'Agenda Binária' },
    'p7':  { mod:'m2', block:'Estruturas Lineares', color:'#5dade2', num:'03', title:'Top-K' },
    'p2':  { mod:'m2', block:'Estruturas Lineares', color:'#5dade2', num:'04', title:'Votação Boyer-Moore' },
    'p6':  { mod:'m2', block:'Heap',                color:'#f5b041', num:'05', title:'Fila de Prioridade Dinâmica' },
    'p8':  { mod:'m2', block:'Heap',                color:'#f5b041', num:'06', title:'Linha de Montagem' },
    'p10': { mod:'m2', block:'Recursão',            color:'#ec7063', num:'07', title:'Torre de Hanói' },
    'p4':  { mod:'m2', block:'Aplicações',          color:'#76d7c4', num:'08', title:'Criptografia' },
    'p5':  { mod:'m2', block:'Aplicações',          color:'#76d7c4', num:'09', title:'Distribuição de Jornais' },
    'p9':  { mod:'m2', block:'Aplicações',          color:'#76d7c4', num:'10', title:'Operações com Matrizes M×N' }
};

/* Ordem pedagógica para navegação Anterior/Próximo */
const PANEL_ORDER = {
    m1:    ['m1-notacoes','m1-recursao','m1-estruturas','m1-notmat','m1-arvores','m1-grafos-teoria','m1-sort','m1-strings','m1-numeros','m1-geometria'],
    prova: ['pr-anatomia','pr-modelo','pr-erros','pr-temas'],
    m2:    ['p1','p3','p7','p2','p6','p8','p10','p4','p5','p9']
};

let currentMod = 'home';
let grafosInit = {};

function switchMod(mod) {
    document.querySelectorAll('.mod-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.mod-tab[data-mod="${mod}"]`).classList.add('active');

    document.querySelectorAll('.mod-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(MOD_PANELS[mod]).classList.add('active');

    document.querySelectorAll('.subtab-bar').forEach(b => b.classList.remove('visible'));
    if (MOD_SUBTABS[mod]) document.getElementById(MOD_SUBTABS[mod]).classList.add('visible');

    const pageWrap = document.getElementById('page-wrap');
    if (MOD_SUBTABS[mod]) pageWrap.classList.add('has-subtabs');
    else pageWrap.classList.remove('has-subtabs');

    currentMod = mod;
    window.scrollTo(0, 0);

    if (mod === 'm2' && !grafosInit.m2) {
        grafosInit.m2 = true;
        initGrafos();
        if (typeof gerarMatrizes === 'function') gerarMatrizes();
        if (typeof resetHanoi === 'function') setTimeout(resetHanoi, 100);
    }
    if (mod === 'm1' && !grafosInit.m1) { grafosInit.m1 = true; setTimeout(()=>{drawBigoChart();renderDS('array');},50); }

    // Renderiza chrome (breadcrumb + prev/next) do painel ativo do módulo
    if (MOD_SUBTABS[mod]) {
        const activePanel = document.querySelector(`#panel-${mod} .content-panel.active`);
        if (activePanel) renderPanelChrome(mod, activePanel.id.replace('panel-',''));
    }
}

function switchPanel(mod, panel) {
    document.querySelectorAll(`#panel-${mod} .content-panel`).forEach(p => p.classList.remove('active'));
    document.getElementById(`panel-${panel}`).classList.add('active');

    document.querySelectorAll(`#subtab-${mod} .sub-tab`).forEach(t => t.classList.remove('active'));
    const tab = document.querySelector(`#subtab-${mod} .sub-tab[data-panel="${panel}"]`);
    if (tab) tab.classList.add('active');

    renderPanelChrome(mod, panel);
    window.scrollTo(0, 0);
}

/* Injeta breadcrumb (topo) e Anterior/Próximo (rodapé) no painel ativo.
   Idempotente: substitui elementos existentes em vez de duplicar. */
function renderPanelChrome(mod, panel) {
    const meta = PANEL_META[panel];
    if (!meta) return;
    const panelEl = document.getElementById(`panel-${panel}`);
    if (!panelEl) return;

    /* Breadcrumb */
    let crumb = panelEl.querySelector(':scope > .panel-crumb');
    if (!crumb) {
        crumb = document.createElement('div');
        crumb.className = 'panel-crumb';
        panelEl.insertBefore(crumb, panelEl.firstChild);
    }
    crumb.innerHTML =
        `<span class="pc-mod">${MOD_LABEL[mod]}</span>` +
        `<span class="pc-arrow">›</span>` +
        `<span class="pc-block" style="color:${meta.color};background:${hexToRgba(meta.color,0.1)}">${meta.block}</span>` +
        `<span class="pc-arrow">›</span>` +
        `<span class="pc-step"><strong>${meta.num}</strong>${meta.title}</span>`;

    /* Anterior / Próximo */
    const order = PANEL_ORDER[mod];
    const idx = order.indexOf(panel);
    const prev = idx > 0 ? order[idx-1] : null;
    const next = idx < order.length - 1 ? order[idx+1] : null;
    const prevMeta = prev ? PANEL_META[prev] : null;
    const nextMeta = next ? PANEL_META[next] : null;

    let nav = panelEl.querySelector(':scope > .panel-nav');
    if (!nav) {
        nav = document.createElement('div');
        nav.className = 'panel-nav';
        panelEl.appendChild(nav);
    }
    nav.innerHTML =
        (prev
            ? `<button class="pn-btn pn-prev" onclick="switchPanel('${mod}','${prev}')">
                 <span class="pn-dir">← Anterior</span>
                 <span class="pn-name"><span class="pn-num">${prevMeta.num}</span>${prevMeta.title}</span>
               </button>`
            : `<span class="pn-btn pn-empty"><span class="pn-dir">— início da trilha —</span><span class="pn-name">você está no primeiro tópico</span></span>`) +
        (next
            ? `<button class="pn-btn pn-next" onclick="switchPanel('${mod}','${next}')">
                 <span class="pn-dir">Próximo →</span>
                 <span class="pn-name"><span class="pn-num">${nextMeta.num}</span>${nextMeta.title}</span>
               </button>`
            : `<span class="pn-btn pn-empty"><span class="pn-dir">— fim da trilha —</span><span class="pn-name">você concluiu o módulo</span></span>`);
}

function hexToRgba(hex, alpha) {
    const h = hex.replace('#','');
    const r = parseInt(h.substring(0,2),16);
    const g = parseInt(h.substring(2,4),16);
    const b = parseInt(h.substring(4,6),16);
    return `rgba(${r},${g},${b},${alpha})`;
}

/* Renderiza chrome do primeiro painel ativo de cada módulo na carga inicial */
document.addEventListener('DOMContentLoaded', () => {
    ['m1','prova','m2'].forEach(mod => {
        const activePanel = document.querySelector(`#panel-${mod} .content-panel.active`);
        if (activePanel) renderPanelChrome(mod, activePanel.id.replace('panel-',''));
    });
});
