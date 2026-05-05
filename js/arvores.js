/* ─── Módulo 1.3 — Árvores Binárias (visualizador + reconstrutor) ─── */

// Estrutura de nó
function TreeNode(val, esq, dir) {
    this.val = val;
    this.esq = esq || null;
    this.dir = dir || null;
}

// Árvore demo fixa para a seção de percursos
const DEMO_TREE = (() => {
    // Árvore:
    //          F
    //        /   \
    //       B     G
    //      / \     \
    //     A   D     I
    //        / \   /
    //       C   E H
    return new TreeNode('F',
        new TreeNode('B',
            new TreeNode('A'),
            new TreeNode('D', new TreeNode('C'), new TreeNode('E'))
        ),
        new TreeNode('G', null,
            new TreeNode('I', new TreeNode('H'), null)
        )
    );
})();

// Layout: atribui (x,y) a cada nó usando in-ordem para x e profundidade para y
function layoutTree(root, opts = {}) {
    const xSpacing = opts.xSpacing || 50;
    const ySpacing = opts.ySpacing || 60;
    let counter = 0;
    const nodes = [];

    function dfs(node, depth) {
        if (!node) return;
        dfs(node.esq, depth + 1);
        node._x = counter++ * xSpacing;
        node._y = depth * ySpacing + 30;
        nodes.push(node);
        dfs(node.dir, depth + 1);
    }
    dfs(root, 0);

    // Centraliza horizontalmente
    if (nodes.length === 0) return { width: 0, height: 0, nodes: [] };
    const minX = Math.min(...nodes.map(n => n._x));
    const maxX = Math.max(...nodes.map(n => n._x));
    const maxY = Math.max(...nodes.map(n => n._y));
    nodes.forEach(n => n._x = n._x - minX + 30);

    return {
        width: maxX - minX + 60,
        height: maxY + 40,
        nodes
    };
}

// Renderiza árvore como SVG; aceita conjunto de nós destacados
function renderTreeSVG(root, opts = {}) {
    if (!root) return '<div style="text-align:center;padding:40px;color:var(--muted);font-family:JetBrains Mono,monospace">árvore vazia</div>';

    const layout = layoutTree(root, opts);
    const highlights = opts.highlights || new Set();
    const orderMap = opts.orderMap || new Map(); // node → ordem de visita
    const nodeRadius = opts.nodeRadius || 18;

    let svg = `<svg viewBox="0 0 ${layout.width} ${layout.height}" xmlns="http://www.w3.org/2000/svg" style="width:auto;max-width:100%;height:${layout.height + 10}px;">`;

    // Edges
    function drawEdges(node) {
        if (!node) return '';
        let out = '';
        if (node.esq) {
            out += `<line x1="${node._x}" y1="${node._y}" x2="${node.esq._x}" y2="${node.esq._y}" stroke="var(--border)" stroke-width="1.5"/>`;
            out += drawEdges(node.esq);
        }
        if (node.dir) {
            out += `<line x1="${node._x}" y1="${node._y}" x2="${node.dir._x}" y2="${node.dir._y}" stroke="var(--border)" stroke-width="1.5"/>`;
            out += drawEdges(node.dir);
        }
        return out;
    }
    svg += drawEdges(root);

    // Nodes
    layout.nodes.forEach(n => {
        const isHL = highlights.has(n);
        const order = orderMap.get(n);
        const fill = isHL ? 'rgba(39,174,96,0.18)' : 'var(--surface)';
        const stroke = isHL ? '#27ae60' : 'var(--border)';
        const textColor = isHL ? '#27ae60' : 'var(--text)';
        svg += `<circle cx="${n._x}" cy="${n._y}" r="${nodeRadius}" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
        svg += `<text x="${n._x}" y="${n._y + 5}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="14" font-weight="700" fill="${textColor}">${n.val}</text>`;
        if (order !== undefined) {
            svg += `<circle cx="${n._x + nodeRadius - 2}" cy="${n._y - nodeRadius + 2}" r="9" fill="#27ae60" stroke="var(--bg)" stroke-width="2"/>`;
            svg += `<text x="${n._x + nodeRadius - 2}" y="${n._y - nodeRadius + 5}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="9" font-weight="700" fill="white">${order + 1}</text>`;
        }
    });

    svg += '</svg>';
    return svg;
}

// Percursos
function preorder(root, out) { if (!root) return; out.push(root); preorder(root.esq, out); preorder(root.dir, out); }
function inorder(root, out)  { if (!root) return; inorder(root.esq, out); out.push(root); inorder(root.dir, out); }
function postorder(root, out){ if (!root) return; postorder(root.esq, out); postorder(root.dir, out); out.push(root); }
function levelorder(root, out){
    if (!root) return;
    const q = [root];
    while (q.length) {
        const n = q.shift();
        out.push(n);
        if (n.esq) q.push(n.esq);
        if (n.dir) q.push(n.dir);
    }
}

// Estado do visualizador de percurso
let currentTraversal = 'preorder';
let traversalTimer = null;

const TRAVERSAL_NAMES = {
    preorder:  'Pré-ordem (RAIZ → ESQ → DIR)',
    inorder:   'In-ordem / Simétrica (ESQ → RAIZ → DIR)',
    postorder: 'Pós-ordem (ESQ → DIR → RAIZ)',
    level:     'Em Nível (BFS)'
};

function setTraversal(t) {
    if (traversalTimer) { clearInterval(traversalTimer); traversalTimer = null; }
    currentTraversal = t;
    document.querySelectorAll('#traversal-buttons button').forEach(b => b.classList.remove('active'));
    const buttons = document.querySelectorAll('#traversal-buttons button');
    const idx = ['preorder','inorder','postorder','level'].indexOf(t);
    if (buttons[idx]) buttons[idx].classList.add('active');
    document.getElementById('trav-name').textContent = TRAVERSAL_NAMES[t];
    document.getElementById('trav-result').textContent = 'clique em "Animar Percurso" para começar';
    renderDemoTree(new Set(), new Map());
}

function renderDemoTree(highlights, orderMap) {
    const wrap = document.getElementById('tree-demo-wrap');
    if (!wrap) return;
    wrap.innerHTML = renderTreeSVG(DEMO_TREE, { highlights, orderMap });
}

function animateTraversal() {
    if (traversalTimer) { clearInterval(traversalTimer); traversalTimer = null; }
    const out = [];
    if (currentTraversal === 'preorder')  preorder(DEMO_TREE, out);
    if (currentTraversal === 'inorder')   inorder(DEMO_TREE, out);
    if (currentTraversal === 'postorder') postorder(DEMO_TREE, out);
    if (currentTraversal === 'level')     levelorder(DEMO_TREE, out);

    const highlights = new Set();
    const orderMap = new Map();
    let i = 0;
    document.getElementById('trav-result').textContent = '';

    traversalTimer = setInterval(() => {
        if (i >= out.length) {
            clearInterval(traversalTimer);
            traversalTimer = null;
            return;
        }
        const node = out[i];
        highlights.add(node);
        orderMap.set(node, i);
        renderDemoTree(highlights, orderMap);
        const cur = document.getElementById('trav-result').textContent;
        document.getElementById('trav-result').textContent = cur ? cur + ' → ' + node.val : node.val;
        i++;
    }, 600);
}

function resetTraversal() {
    if (traversalTimer) { clearInterval(traversalTimer); traversalTimer = null; }
    document.getElementById('trav-result').textContent = 'clique em "Animar Percurso" para começar';
    renderDemoTree(new Set(), new Map());
}

/* ── Reconstrutor (Pré-ordem + In-ordem) ─────────────────────────────── */
function reconstruct(pre, ino) {
    if (pre.length === 0 || ino.length === 0) return null;
    const rootVal = pre[0];
    const k = ino.indexOf(rootVal);
    if (k === -1) throw new Error(`Caractere '${rootVal}' não está no in-ordem`);
    const node = new TreeNode(rootVal);
    node.esq = reconstruct(pre.slice(1, k + 1), ino.slice(0, k));
    node.dir = reconstruct(pre.slice(k + 1),   ino.slice(k + 1));
    return node;
}

function rebuild() {
    const preIn = document.getElementById('rec-preorder');
    const inoIn = document.getElementById('rec-inorder');
    const errEl = document.getElementById('rec-error');
    const wrap  = document.getElementById('rec-tree-wrap');
    const postEl= document.getElementById('rec-postorder');
    if (!preIn || !inoIn) return;

    const pre = preIn.value.toUpperCase().replace(/\s/g, '').split('');
    const ino = inoIn.value.toUpperCase().replace(/\s/g, '').split('');
    preIn.value = pre.join('');
    inoIn.value = ino.join('');

    errEl.textContent = '';
    if (pre.length === 0) { wrap.innerHTML = ''; postEl.textContent = '—'; return; }

    // Validações
    const setPre = new Set(pre), setIno = new Set(ino);
    if (pre.length !== setPre.size) { errEl.textContent = 'Erro: pré-ordem tem caracteres repetidos'; wrap.innerHTML = ''; postEl.textContent = '—'; return; }
    if (ino.length !== setIno.size) { errEl.textContent = 'Erro: in-ordem tem caracteres repetidos'; wrap.innerHTML = ''; postEl.textContent = '—'; return; }
    if (pre.length !== ino.length || ![...setPre].every(c => setIno.has(c))) {
        errEl.textContent = 'Erro: os percursos devem conter exatamente os mesmos caracteres';
        wrap.innerHTML = ''; postEl.textContent = '—';
        return;
    }

    try {
        const root = reconstruct(pre, ino);
        wrap.innerHTML = renderTreeSVG(root, { xSpacing: Math.max(36, 600 / pre.length), ySpacing: 56, nodeRadius: 16 });
        const postOut = [];
        postorder(root, postOut);
        postEl.textContent = postOut.map(n => n.val).join(' ');
    } catch (e) {
        errEl.textContent = 'Erro: ' + e.message;
        wrap.innerHTML = '';
        postEl.textContent = '—';
    }
}

const REC_EXAMPLES = [
    null,
    { pre: 'ABDHOPIQREJKSTCFGMUNVXZ', ino: 'OHPDQIRBJESKTAFCUMGVNXZ' }, // P1-2023.02
    { pre: 'FBADCEGIH',                ino: 'ABCDEFGHI' },               // exemplo médio
    { pre: 'ABDECF',                   ino: 'DBEAFC' }                    // simples
];

function loadExample(n) {
    const ex = REC_EXAMPLES[n];
    if (!ex) return;
    document.getElementById('rec-preorder').value = ex.pre;
    document.getElementById('rec-inorder').value = ex.ino;
    rebuild();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('tree-demo-wrap')) renderDemoTree(new Set(), new Map());
        if (document.getElementById('rec-preorder')) rebuild();
    }, 200);
});

// Re-init when m1-arvores panel becomes active
const _origSwitchPanel_arvores = window.switchPanel;
window.switchPanel = function(mod, panel) {
    _origSwitchPanel_arvores(mod, panel);
    if (panel === 'm1-arvores') {
        setTimeout(() => {
            if (document.getElementById('tree-demo-wrap')) renderDemoTree(new Set(), new Map());
            if (document.getElementById('rec-preorder')) rebuild();
        }, 60);
    }
};
