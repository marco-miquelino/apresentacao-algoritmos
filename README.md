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
│   ├── layout.css          # Topbar, navegação, sub-tabs, blocos pedagógicos
│   ├── content.css         # Hero, problemas, notações, código
│   ├── sort.css            # Módulo de Ordenação
│   ├── m1-onda1.css        # Estilos específicos da Onda 1 do M1
│   ├── m1-onda2.css        # Estilos específicos da Onda 2 do M1
│   ├── m1-onda3.css        # Estilos específicos da Onda 3 do M1
│   └── theme.css           # Tema beige + responsividade
│
├── js/
│   ├── nav.js              # Navegação entre módulos e painéis
│   ├── bigo.js             # Calculadora Big-O e gráfico de crescimento
│   ├── ds.js               # Demos de Estruturas de Dados
│   ├── recursao.js         # Visualizador de árvore de chamadas
│   ├── notacoes.js         # Conversor Pré/In/Pós-fixa
│   ├── arvores.js          # Reconstrutor de árvore (pré + in-ordem)
│   ├── grafos.js           # Grafos dos problemas (vis-network)
│   ├── grafos-teoria.js    # Visualizador de grafos teóricos (BFS/DFS)
│   ├── sort.js             # 9 algoritmos de ordenação com animação
│   ├── matrix.js           # Operações com Matrizes M×N
│   ├── hanoi.js            # Torre de Hanói recursivo/iterativo
│   ├── onda2.js            # Demos da Onda 2 (strings, números, geometria)
│   └── theme.js            # Toggle tema claro/escuro
│
└── assets/                  # Cópias de referência dos blocos HTML
```

---

## 📚 Conteúdo

A organização é **pedagógica**, em três etapas claras:

1. **Módulo 1 — Teoria**: aprende-se a matéria, do geral ao específico.
2. **Prova**: prepara-se para a P1 do Strauss (tática direta, sem teoria de AED).
3. **Módulo 2 — Problemas**: gabarito dos exercícios de aula, para consulta opcional após dominar a tática.

### Módulo 1 — Teoria (10 seções, 5 blocos pedagógicos)

| Bloco | Seções |
|---|---|
| **A. Fundamentos** | 1.1 Notações & Complexidade · 1.2 Recursão |
| **B. ED Lineares** | 1.3 Estruturas de Dados · 1.4 Notações Matemáticas (in/pré/pós-fixa) |
| **C. ED Não-Lineares** | 1.5 Árvores Binárias · 1.6 Grafos |
| **D. Algoritmos Clássicos** | 1.7 Ordenação (9 algoritmos) |
| **E. Especializados** | 1.8 Strings · 1.9 Teoria dos Números · 1.10 Geometria |

> A ordem foi pensada para um aluno que está aprendendo do zero: análise antes de algoritmos, recursão antes de árvores, lineares antes de não-lineares, geral antes de especializado.

### Prova (4 cartões de preparo para a P1 do Prof. Strauss)

| # | Cartão | O que tem |
|---|---|---|
| **P1** | Anatomia da Resposta Ideal | Os 5 passos obrigatórios em qualquer resposta da P1 |
| **P2** | Modelo de Resposta | Template em 5 blocos para copiar e adaptar |
| **P3** | Erros Comuns | 6 armadilhas que descontam nota |
| **P4** | Temas × Probabilidade | Estatísticas dos temas das 4 últimas P1's e onde revisá-los no Módulo 1 |

> Este módulo **não** é teoria de AED — é estratégia de prova. Foi separado do M1 para deixar a teoria pura e o preparo prático em locais distintos.

### Módulo 2 — Problemas Aplicados *(gabarito de consulta opcional)* — 10 problemas em 4 grupos

| Grupo | Problemas |
|---|---|
| **Estruturas Lineares** *(Pilha · Busca · Hash)* | 01 Celebridade · 02 Agenda Binária · 03 Top-K · 04 Votação BM |
| **Heap** *(Fila de Prioridade)* | 05 Fila Prior. Dinâmica · 06 Linha de Montagem |
| **Recursão** | 07 Torre de Hanói |
| **Aplicações** *(Mat. Modular · Clustering · Matrizes)* | 08 Criptografia · 09 Jornais (k-means) · 10 Matrizes M×N |

Cada problema tem: **breadcrumb** mostrando módulo › grupo › título, **link de pré-requisito** apontando para a seção teórica que o resolve, **enunciado**, **intuição**, **passo a passo**, **análise de complexidade**, **implementação** em Python (e às vezes C++) e **botões Anterior/Próximo** no rodapé.

---

## 🎨 Funcionalidades

- **Navegação compacta** — sub-tabs mostram só o número (ex.: `1.1`); o nome curto aparece no tab ativo e o tooltip revela o título completo. Divisórias finas separam blocos sem poluir.
- **Breadcrumb por painel** — uma faixa fina no topo de cada seção mostra `Módulo › Bloco › Número e título`, dispensando rótulos longos na barra superior.
- **Anterior / Próximo** — rodapé de cada seção sugere o próximo passo da trilha pedagógica, na ordem recomendada.
- **Pré-requisitos clicáveis** — cada problema do M2 tem um link para a teoria correspondente (ex.: *Antes: §1.3 ED · Pilha*).
- **Atalho rápido na Home** — botão de acesso direto à *Tática para a P1*.
- **Tema escuro/claro** — toggle ☾/☀ no canto direito do topbar (salvo em `localStorage`).
- **Tema claro beige** — fundo `#f5f0e8`, pensado para leitura prolongada.
- **Animações de ordenação** — visualizador com 9 algoritmos.
- **Grafos interativos** — `vis-network` para grafos dos problemas e da teoria.
- **Demos de ED** — Array, Pilha, Fila e Hash Table com operações animadas.
- **Calculadora Big-O** — slider interativo com gráfico de crescimento.

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
| Layout topbar / sub-tabs / blocos pedagógicos | `css/layout.css` |
| Estilo dos problemas, notações, código | `css/content.css` |
| Estilo do módulo Sort | `css/sort.css` |
| Tema beige ou media queries | `css/theme.css` |
| Navegação entre módulos | `js/nav.js` |
| Conteúdo HTML dos módulos | `index.html` (seções `<!-- ─── MÓDULO N -->`) |
| Adicionar pré-requisito a um problema | `index.html` — bloco `<div class="prereq">` antes do enunciado |
| Adicionar/remover sub-tab | `index.html` — bloco `<div class="subtab-bar" id="subtab-mX">` |

### Regra de cores

Cada **bloco** do M1 e cada **categoria** do M2 tem uma cor. Para criar um novo bloco/categoria:

1. Inclua a classe (`block-novo` ou `cat-novo`) tanto no `<span class="block-sep">` quanto em cada `.sub-tab` daquele grupo.
2. Adicione o par de regras CSS em `layout.css`:
   ```css
   .block-sep.block-novo       { color: #COR; }
   .sub-tab.block-novo.active  { color: #COR; border-bottom-color: #COR_FORTE; }
   ```

---

## 🧭 Histórico de reorganização

A versão atual incorpora uma **revisão pedagógica** completa do material:

- O antigo Módulo 3 (Exercícios Complementares — Matrizes e Hanói) foi **mesclado** ao Módulo 2.
- Os 10 problemas foram **reagrupados em 4 grupos** (de 8 categorias estreitas → 4 grupos balanceados).
- O Módulo 1 foi **reordenado em 5 blocos**: Fundamentos → ED Lineares → ED Não-Lineares → Algoritmos Clássicos → Especializados.
- A **Tática para a P1** saiu de §1.11 do M1 e virou um **módulo separado** (Prova) entre M1 e M2 — porque é estratégia de prova, não teoria de AED.
- O M2 (Problemas) foi reposicionado como **gabarito opcional**: o aluno passa por Teoria → Prova e só consulta os Problemas se quiser ver os exercícios de aula resolvidos.
- Recursão (antes 1.5) virou **§1.2**, antes das árvores e pilhas — pois árvores e a maioria das demos são definidas recursivamente.
- Sort e Grafos saíram do final e estão entre os algoritmos clássicos e ED não-lineares.

### Iteração da navegação

A primeira versão usou rótulos longos como cabeçalhos no meio da barra de sub-tabs (ex.: *Fundamentos · ED Lineares · ED Não-Lineares · …*). Ficou poluído e estourava a tela. Foi substituído por:

1. **Sub-tabs compactos** — só o número aparece (ex.: `1.1`, `1.2`, `1.3` …). O nome curto e o título completo aparecem no tab ativo e no tooltip.
2. **Divisórias finas** (linha vertical) separam visualmente os blocos sem texto.
3. **Breadcrumb dentro do painel** — uma faixa estreita no topo do conteúdo mostra `Módulo › Bloco › Número e título`, levando o contexto pesado para um lugar onde ele não compete com a navegação.
4. **Anterior / Próximo no rodapé** — guia o aluno pela ordem pedagógica sem que ele precise voltar à barra.
