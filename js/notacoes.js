/* ─── Módulo 1.4 — Notações Matemáticas (conversor) ─── */

const OPERATORS = new Set(['+', '-', '*', '/']);

// Tokeniza uma expressão prefixa.
// Suporta parênteses como agrupadores de subexpressão (P1-Strauss).
// Regra simplificada: parênteses delimitam subárvores; o conteúdo dentro é uma expressão prefixa completa.
function tokenizePrefix(str) {
    const tokens = [];
    let i = 0;
    str = str.trim();
    while (i < str.length) {
        const c = str[i];
        if (c === ' ' || c === '\t') { i++; continue; }
        if (c === '(' || c === ')') { tokens.push(c); i++; continue; }
        if (OPERATORS.has(c)) { tokens.push(c); i++; continue; }
        // operando: consome até espaço/parêntese/operador
        let j = i;
        while (j < str.length && str[j] !== ' ' && str[j] !== '(' && str[j] !== ')' && !OPERATORS.has(str[j])) j++;
        if (j > i) tokens.push(str.slice(i, j));
        i = j;
    }
    return tokens;
}

// Parser prefixa → árvore. Retorna {tree, error}
function parsePrefix(tokens) {
    let idx = 0;
    function parse() {
        if (idx >= tokens.length) throw new Error('Expressão incompleta');
        const tok = tokens[idx++];
        if (tok === '(') {
            // dentro de parênteses, parseia uma expressão completa, espera ')'
            const inner = parse();
            if (idx >= tokens.length || tokens[idx] !== ')') throw new Error('Parêntese sem fechamento');
            idx++;
            return inner;
        }
        if (tok === ')') throw new Error('Parêntese fechado inesperado');
        if (OPERATORS.has(tok)) {
            const node = new TreeNode(tok);
            node.esq = parse();
            node.dir = parse();
            return node;
        }
        // operando (folha)
        return new TreeNode(tok);
    }
    try {
        const root = parse();
        if (idx !== tokens.length) throw new Error('Tokens extras após expressão');
        return { tree: root, error: null };
    } catch (e) {
        return { tree: null, error: e.message };
    }
}

// Gera infixa a partir da árvore (com parênteses)
function toInfix(node) {
    if (!node) return '';
    if (!node.esq && !node.dir) return node.val;
    const e = toInfix(node.esq);
    const d = toInfix(node.dir);
    return `(${e} ${node.val} ${d})`;
}

// Gera pósfixa
function toPostfix(node) {
    if (!node) return '';
    if (!node.esq && !node.dir) return node.val;
    return `${toPostfix(node.esq)} ${toPostfix(node.dir)} ${node.val}`;
}

// Gera prefixa (canônica, sem parênteses extras)
function toPrefix(node) {
    if (!node) return '';
    if (!node.esq && !node.dir) return node.val;
    return `${node.val} ${toPrefix(node.esq)} ${toPrefix(node.dir)}`;
}

function convertFromPrefix() {
    const input = document.getElementById('nc-prefix');
    const infixEl = document.getElementById('nc-infix');
    const postEl  = document.getElementById('nc-postfix');
    const wrap    = document.getElementById('nc-tree-wrap');
    if (!input) return;

    const tokens = tokenizePrefix(input.value);
    if (tokens.length === 0) {
        infixEl.textContent = '—';
        postEl.textContent = '—';
        wrap.innerHTML = '';
        return;
    }

    const { tree, error } = parsePrefix(tokens);
    if (error || !tree) {
        infixEl.textContent = `(erro: ${error || 'expressão inválida'})`;
        postEl.textContent = '—';
        wrap.innerHTML = '';
        return;
    }

    infixEl.textContent = toInfix(tree);
    postEl.textContent = toPostfix(tree);
    wrap.innerHTML = renderTreeSVG(tree, { xSpacing: 54, ySpacing: 60, nodeRadius: 18 });
}

const NOT_EXAMPLES = [
    null,
    '+ Z * Q (-/T L M)',          // P1-2024
    '+ Z * Q / - T L M',          // simples
    '+ A * B C'                   // A+B*C
];

function loadNotExample(n) {
    const ex = NOT_EXAMPLES[n];
    if (!ex) return;
    document.getElementById('nc-prefix').value = ex;
    convertFromPrefix();
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (document.getElementById('nc-prefix')) convertFromPrefix();
    }, 250);
});

const _origSwitchPanel_not = window.switchPanel;
window.switchPanel = function(mod, panel) {
    _origSwitchPanel_not(mod, panel);
    if (panel === 'm1-notmat') {
        setTimeout(() => {
            if (document.getElementById('nc-prefix')) convertFromPrefix();
        }, 60);
    }
};
