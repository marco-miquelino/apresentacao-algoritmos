/* ─── Módulo 1.10 — Grafos (Teoria) ─── */

// Demo graph used in the visualizer
const GRAPH_DEMO = {
    vertices: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    positions: {
        A: { x: 350, y: 40 },
        B: { x: 200, y: 120 },
        C: { x: 500, y: 120 },
        D: { x: 100, y: 220 },
        E: { x: 300, y: 220 },
        F: { x: 480, y: 220 },
        G: { x: 350, y: 300 }
    },
    edges: [
        ['A', 'B'], ['A', 'C'],
        ['B', 'D'], ['B', 'E'],
        ['C', 'F'],
        ['E', 'G'], ['F', 'G']
    ]
};

// Build adjacency from edge list (undirected)
function buildAdjList(graph) {
    const adj = {};
    graph.vertices.forEach(v => adj[v] = []);
    graph.edges.forEach(([u, v]) => {
        adj[u].push(v);
        adj[v].push(u);
    });
    // Sort for deterministic order
    Object.keys(adj).forEach(k => adj[k].sort());
    return adj;
}

let graphTimer = null;

function renderGraph(visited, current, edgeHL) {
    const wrap = document.getElementById('graph-vis-wrap');
    if (!wrap) return;
    visited = visited || new Set();
    edgeHL = edgeHL || new Set();
    const W = 600, H = 360;

    let svg = `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" style="width:100%;max-width:600px;height:auto">`;

    // Edges
    GRAPH_DEMO.edges.forEach(([u, v]) => {
        const pu = GRAPH_DEMO.positions[u];
        const pv = GRAPH_DEMO.positions[v];
        const key = [u, v].sort().join('-');
        const isHL = edgeHL.has(key);
        const stroke = isHL ? '#27ae60' : 'var(--border)';
        const w = isHL ? 2.5 : 1.5;
        svg += `<line x1="${pu.x}" y1="${pu.y}" x2="${pv.x}" y2="${pv.y}" stroke="${stroke}" stroke-width="${w}"/>`;
    });

    // Vertices
    GRAPH_DEMO.vertices.forEach(v => {
        const p = GRAPH_DEMO.positions[v];
        const isCurr = current === v;
        const isVisited = visited.has(v);
        let fill = 'var(--surface)';
        let stroke = 'var(--border)';
        let textColor = 'var(--text)';
        if (isVisited) { fill = 'rgba(39,174,96,0.18)'; stroke = '#27ae60'; textColor = '#27ae60'; }
        if (isCurr)    { fill = 'rgba(243,156,18,0.25)'; stroke = '#f39c12'; textColor = '#f39c12'; }
        svg += `<circle cx="${p.x}" cy="${p.y}" r="22" fill="${fill}" stroke="${stroke}" stroke-width="2.5"/>`;
        svg += `<text x="${p.x}" y="${p.y + 6}" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="16" font-weight="700" fill="${textColor}">${v}</text>`;
    });

    svg += '</svg>';
    wrap.innerHTML = svg;
}

function logLine(msg) {
    const log = document.getElementById('graph-log');
    if (!log) return;
    log.textContent += (log.textContent ? '\n' : '') + msg;
    log.scrollTop = log.scrollHeight;
}

function clearLog() {
    const log = document.getElementById('graph-log');
    if (log) log.textContent = '';
}

function runBfs() {
    if (graphTimer) { clearInterval(graphTimer); graphTimer = null; }
    clearLog();
    const adj = buildAdjList(GRAPH_DEMO);
    const visited = new Set(['A']);
    const edgeHL = new Set();
    const queue = ['A'];
    const order = [];
    logLine('▶ BFS a partir de A');
    renderGraph(visited, 'A', edgeHL);

    let phase = 'visit';
    let current = null;
    let neighbors = [];
    let neighborIdx = 0;

    graphTimer = setInterval(() => {
        if (phase === 'visit') {
            if (queue.length === 0) {
                logLine(`✓ Fim. Ordem: ${order.join(' → ')}`);
                clearInterval(graphTimer); graphTimer = null;
                return;
            }
            current = queue.shift();
            order.push(current);
            logLine(`Visitando ${current}`);
            renderGraph(visited, current, edgeHL);
            neighbors = adj[current];
            neighborIdx = 0;
            phase = 'enqueue';
        } else {
            if (neighborIdx >= neighbors.length) { phase = 'visit'; return; }
            const v = neighbors[neighborIdx++];
            if (!visited.has(v)) {
                visited.add(v);
                queue.push(v);
                edgeHL.add([current, v].sort().join('-'));
                logLine(`  → enfileira ${v}`);
                renderGraph(visited, current, edgeHL);
            }
        }
    }, 600);
}

function runDfs() {
    if (graphTimer) { clearInterval(graphTimer); graphTimer = null; }
    clearLog();
    const adj = buildAdjList(GRAPH_DEMO);
    const visited = new Set();
    const edgeHL = new Set();
    const stack = [{ node: 'A', parent: null, idx: 0 }];
    visited.add('A');
    const order = ['A'];
    logLine('▶ DFS a partir de A (recursivo, simulado com pilha)');
    renderGraph(visited, 'A', edgeHL);

    graphTimer = setInterval(() => {
        if (stack.length === 0) {
            logLine(`✓ Fim. Ordem: ${order.join(' → ')}`);
            clearInterval(graphTimer); graphTimer = null;
            return;
        }
        const top = stack[stack.length - 1];
        const nbrs = adj[top.node];
        if (top.idx >= nbrs.length) {
            stack.pop();
            renderGraph(visited, stack.length ? stack[stack.length - 1].node : null, edgeHL);
            return;
        }
        const v = nbrs[top.idx++];
        if (!visited.has(v)) {
            visited.add(v);
            order.push(v);
            edgeHL.add([top.node, v].sort().join('-'));
            stack.push({ node: v, parent: top.node, idx: 0 });
            logLine(`Desce para ${v} (a partir de ${top.node})`);
            renderGraph(visited, v, edgeHL);
        }
    }, 500);
}

function resetGraph() {
    if (graphTimer) { clearInterval(graphTimer); graphTimer = null; }
    clearLog();
    document.getElementById('graph-log').textContent = 'Clique em ▶ BFS ou ▶ DFS para ver a busca em ação.';
    renderGraph(new Set(), null, new Set());
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('graph-vis-wrap')) renderGraph(new Set(), null, new Set());
    }, 400);
});

const _origSwitchPanel_o3 = window.switchPanel;
window.switchPanel = function(mod, panel) {
    _origSwitchPanel_o3(mod, panel);
    setTimeout(() => {
        if (panel === 'm1-grafos-teoria' && document.getElementById('graph-vis-wrap')) renderGraph(new Set(), null, new Set());
    }, 60);
};
