# AED — UFRJ | Algoritmos & Estrutura de Dados

Site de monitoria da disciplina de Algoritmos e Estrutura de Dados da UFRJ.

**Monitores:** Marco Aurélio Miquelino · Igor Eccard de Sá  
**Professor:** Strauss

## 🌐 Acesso

Disponível em: `https://<usuario>.github.io/<repositorio>/`

---

## 📁 Estrutura do Projeto

```
aed-ufrj/
│
├── index.html              # Entrada principal do site
│
├── css/
│   ├── tokens.css          # Variáveis CSS (cores, design tokens)
│   ├── layout.css          # Topbar, navegação, tabs, page-wrap
│   ├── content.css         # Hero, problemas, notações, DS, código
│   ├── sort.css            # Módulo de Ordenação (cards, sidebar, visualizador)
│   └── theme.css           # Tema claro beige + responsividade
│
├── js/
│   ├── nav.js              # Navegação entre módulos e painéis
│   ├── bigo.js             # Calculadora Big-O e gráfico de crescimento
│   ├── ds.js               # Demos interativos de Estruturas de Dados
│   ├── grafos.js           # Visualizações com vis-network (grafos)
│   ├── matrix.js           # Módulo P9 — Operações com Matrizes
│   ├── hanoi.js            # Módulo P10 — Torre de Hanói
│   ├── sort.js             # Módulo Sort — 9 algoritmos com animação
│   └── theme.js            # Toggle tema claro/escuro + resize
│
└── assets/
    ├── header.html         # Topbar e sub-tabs (referência de manutenção)
    ├── home.html           # Painel Home (referência de manutenção)
    ├── m1.html             # Módulo 1 — Teoria (referência de manutenção)
    ├── m2.html             # Módulo 2 — Problemas (referência de manutenção)
    └── m3.html             # Módulo 3 — Exercícios (referência de manutenção)
```

> **Nota:** Os arquivos em `assets/` são cópias de referência para facilitar a edição de cada módulo. O site funciona a partir do `index.html` principal.

---

## 📚 Conteúdo

### Módulo 1 — Teoria
- **1.1 Notações & Complexidade** — Big-O, Θ, Ω com calculadora interativa e gráfico de crescimento
- **1.2 Estruturas de Dados** — Array, Lista Encadeada, Pilha, Fila, Hash Table, BST, Heap, Grafo com demos interativos
- **1.3 Ordenação (Sort)** — 9 algoritmos com animação, sidebar por categoria, tabela comparativa

### Módulo 2 — Problemas de Aula
8 problemas clássicos com enunciado, intuição, análise de complexidade e implementação em Python:
`Celebridade` · `Votação Boyer-Moore` · `Agenda Binária` · `Criptografia` · `Jornais K-means` · `Fila de Prioridade` · `Top-K` · `Linha de Montagem`

### Módulo 3 — Exercícios Complementares
- **P9** — Operações com Matrizes M×N (soma e multiplicação interativas)
- **P10** — Torre de Hanói — Recursivo vs Iterativo com animação

---

## 🎨 Funcionalidades

- **Tema escuro/claro** — toggle ☾/☀ no canto direito do topbar (salvo em localStorage)
- **Tema claro beige** — fundo `#f5f0e8`, não branco puro, pensado para leitura prolongada
- **Animações de ordenação** — visualizador com 9 algoritmos, comparações e trocas em tempo real
- **Grafos interativos** — vis-network para todos os problemas do Módulo 2
- **Demos de DS** — Array, Pilha, Fila e Hash Table com operações animadas
- **Calculadora Big-O** — slider interativo com valores em tempo real

---

## 🚀 GitHub Pages

Para publicar via GitHub Pages:

1. Faça push de todos os arquivos para o repositório
2. Vá em **Settings → Pages**
3. Source: **Deploy from a branch** → branch `main` → pasta `/` (root)
4. O site estará em `https://<usuario>.github.io/<repo>/`

---

## 🛠️ Como editar

| O que mudar | Arquivo |
|---|---|
| Cores e variáveis globais | `css/tokens.css` |
| Layout do topbar ou tabs | `css/layout.css` |
| Estilo dos problemas, notações, código | `css/content.css` |
| Estilo do módulo Sort | `css/sort.css` |
| Tema beige ou media queries | `css/theme.css` |
| Navegação entre módulos | `js/nav.js` |
| Gráfico Big-O | `js/bigo.js` |
| Demos de estruturas de dados | `js/ds.js` |
| Grafos dos problemas | `js/grafos.js` |
| Problema das Matrizes | `js/matrix.js` |
| Torre de Hanói | `js/hanoi.js` |
| Algoritmos de ordenação | `js/sort.js` |
| Toggle de tema | `js/theme.js` |
| Conteúdo HTML dos módulos | `index.html` (seções `<!-- ─── MÓDULO N -->`) |
