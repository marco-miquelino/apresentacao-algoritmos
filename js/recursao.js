/* ─── Módulo 1.5 — Algoritmos Recursivos (árvore de chamadas Fibonacci) ─── */

function buildFibCallTree(n) {
    let callCount = 0;
    function build(k) {
        callCount++;
        const node = { val: `fib(${k})`, n: k, esq: null, dir: null, result: 0 };
        if (k <= 1) {
            node.result = k;
            return node;
        }
        node.esq = build(k - 1);
        node.dir = build(k - 2);
        node.result = node.esq.result + node.dir.result;
        return node;
    }
    const tree = build(n);
    return { tree, callCount };
}

// Layout específico para árvore de chamadas (binária mas pode ser desbalanceada)
function layoutFibTree(root) {
    const ySpacing = 50;
    const xMin = 60;
    let counter = 0;
    const nodes = [];
    function dfs(node, depth) {
        if (!node) return;
        dfs(node.esq, depth + 1);
        node._x = counter++ * xMin;
        node._y = depth * ySpacing + 25;
        nodes.push(node);
        dfs(node.dir, depth + 1);
    }
    dfs(root, 0);
    if (nodes.length === 0) return { width: 0, height: 0, nodes: [] };
    const minX = Math.min(...nodes.map(n => n._x));
    const maxX = Math.max(...nodes.map(n => n._x));
    const maxY = Math.max(...nodes.map(n => n._y));
    nodes.forEach(n => n._x = n._x - minX + 30);
    return { width: maxX - minX + 60, height: maxY + 35, nodes };
}

function renderFibTree() {
    const wrap = document.getElementById('fib-tree-wrap');
    const callsEl = document.getElementById('fib-calls');
    const resEl = document.getElementById('fib-result');
    const input = document.getElementById('fib-n');
    if (!wrap || !input) return;

    let n = parseInt(input.value, 10);
    if (isNaN(n) || n < 0) n = 0;
    if (n > 8) { n = 8; input.value = 8; }

    const { tree, callCount } = buildFibCallTree(n);
    callsEl.textContent = callCount;
    resEl.textContent = tree.result;

    // Render
    const layout = layoutFibTree(tree);
    let svg = `<svg viewBox="0 0 ${layout.width} ${layout.height}" xmlns="http://www.w3.org/2000/svg" style="width:auto;max-width:100%;height:${layout.height + 10}px;">`;
    function drawEdges(node) {
        if (!node) return '';
        let out = '';
        if (node.esq) {
            out += `<line x1="${node._x}" y1="${node._y}" x2="${node.esq._x}" y2="${node.esq._y}" stroke="var(--border)" stroke-width="1.2"/>`;
            out += drawEdges(node.esq);
        }
        if (node.dir) {
            out += `<line x1="${node._x}" y1="${node._y}" x2="${node.dir._x}" y2="${node.dir._y}" stroke="var(--border)" stroke-width="1.2"/>`;
            out += drawEdges(node.dir);
        }
        return out;
    }
    svg += drawEdges(tree);

    layout.nodes.forEach(node => {
        const isBase = node.n <= 1;
        const fill = isBase ? 'rgba(39,174,96,0.15)' : 'rgba(93,173,226,0.10)';
        const stroke = isBase ? '#27ae60' : '#5dade2';
        const textColor = isBase ? '#27ae60' : 'var(--text)';
        // ellipse to fit text
        const w = node.val.length * 4.5 + 14;
        svg += `<ellipse cx="${node._x}" cy="${node._y}" rx="${w}" ry="14" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
        svg += `<text x="${node._x}" y="${node._y + 4}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" font-weight="600" fill="${textColor}">${node.val}</text>`;
    });

    svg += '</svg>';
    wrap.innerHTML = svg;
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('fib-tree-wrap')) renderFibTree();
    }, 300);
});

const _origSwitchPanel_rec = window.switchPanel;
window.switchPanel = function(mod, panel) {
    _origSwitchPanel_rec(mod, panel);
    if (panel === 'm1-recursao') {
        setTimeout(() => {
            if (document.getElementById('fib-tree-wrap')) renderFibTree();
        }, 60);
    }
};
