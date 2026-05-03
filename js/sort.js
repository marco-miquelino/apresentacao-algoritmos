/* ─── Módulo Sort: Algoritmos de Ordenação ─── */
/* ══════════════════════════════════════════════════════
   SORT FAMILY — INTERACTIVE VISUALIZER
══════════════════════════════════════════════════════ */
const ALGO_DATA = {
  bubble: {
    name:'Bubble Sort', tag:'O(n²) pior · O(n) melhor · Estável', color:'#5dade2', category:'Elementares',
    when:'Dados quase-ordenados (com flag de swap). Fins didáticos.',
    avoid:'Qualquer dataset com n > 1000.',
    real:'Ensino de algoritmos. Detecção de inversões.',
    desc:'Percorre o array comparando pares adjacentes e trocando os fora de ordem. O maior elemento "borbulha" para o fim a cada passagem. Com flag de troca, detecta array já ordenado em O(n).',
    code:`<span class="kw">def</span> <span class="fn">bubble_sort</span>(arr):
    n = <span class="fn">len</span>(arr)
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n):
        trocou = <span class="kw">False</span>
        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(<span class="num">0</span>, n - i - <span class="num">1</span>):
            <span class="kw">if</span> arr[j] > arr[j + <span class="num">1</span>]:
                arr[j], arr[j+<span class="num">1</span>] = arr[j+<span class="num">1</span>], arr[j]
                trocou = <span class="kw">True</span>
        <span class="kw">if not</span> trocou: <span class="kw">break</span>  <span class="cm"># já ordenado → O(n)</span>
    <span class="kw">return</span> arr`
  },
  selection: {
    name:'Selection Sort', tag:'O(n²) sempre · Instável', color:'#e74c3c', category:'Elementares',
    when:'Custo de escrita altíssimo (ex: memória flash com ciclos limitados).',
    avoid:'Arrays grandes. Nunca melhor que O(n²).',
    real:'EEPROM, firmware embarcado onde escrever é caro.',
    desc:'A cada iteração, encontra o menor elemento do subarray não-ordenado e o coloca na posição correta. Faz exatamente n−1 trocas — o mínimo possível para qualquer algoritmo de seleção.',
    code:`<span class="kw">def</span> <span class="fn">selection_sort</span>(arr):
    n = <span class="fn">len</span>(arr)
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n):
        min_idx = i
        <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(i + <span class="num">1</span>, n):
            <span class="kw">if</span> arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    <span class="kw">return</span> arr
<span class="cm"># Exatamente n-1 trocas — mínimo possível!</span>`
  },
  insertion: {
    name:'Insertion Sort', tag:'O(n²) pior · O(n) melhor · Estável', color:'#27ae60', category:'Elementares',
    when:'Dados quase-ordenados. Base do TimSort para blocos pequenos (cache-friendly).',
    avoid:'Dados aleatórios com n grande.',
    real:'TimSort usa Insertion Sort para blocos de 32–64 elementos. Streaming de dados.',
    desc:'Mantém um subarray ordenado à esquerda e insere cada novo elemento na posição correta deslocando os maiores. Como ordenar cartas na mão.',
    code:`<span class="kw">def</span> <span class="fn">insertion_sort</span>(arr):
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, <span class="fn">len</span>(arr)):
        chave = arr[i]
        j = i - <span class="num">1</span>
        <span class="kw">while</span> j >= <span class="num">0</span> <span class="kw">and</span> arr[j] > chave:
            arr[j + <span class="num">1</span>] = arr[j]
            j -= <span class="num">1</span>
        arr[j + <span class="num">1</span>] = chave
    <span class="kw">return</span> arr
<span class="cm"># O(n) para dados já ordenados — O(n²) no pior caso</span>`
  },
  merge: {
    name:'Merge Sort', tag:'Θ(n log n) sempre · Estável · O(n) espaço', color:'#9b59b6', category:'Eficientes',
    when:'Estabilidade obrigatória. Dados que não cabem na RAM. Listas encadeadas.',
    avoid:'Quando memória é escassa (usa O(n) extra).',
    real:'Python sorted() para objetos, Java Collections.sort(), PostgreSQL ORDER BY, Hadoop MapReduce.',
    desc:'Divide o array ao meio recursivamente até tamanho 1. Intercala (merge) os pedaços ordenados com dois ponteiros. O(n log n) garantido em qualquer caso — único algoritmo de comparação com essa propriedade.',
    code:`<span class="kw">def</span> <span class="fn">merge_sort</span>(arr):
    <span class="kw">if</span> <span class="fn">len</span>(arr) <= <span class="num">1</span>: <span class="kw">return</span> arr
    mid = <span class="fn">len</span>(arr) // <span class="num">2</span>
    esq = <span class="fn">merge_sort</span>(arr[:mid])
    dir = <span class="fn">merge_sort</span>(arr[mid:])
    <span class="kw">return</span> <span class="fn">_merge</span>(esq, dir)

<span class="kw">def</span> <span class="fn">_merge</span>(esq, dir):
    res = []; i = j = <span class="num">0</span>
    <span class="kw">while</span> i < <span class="fn">len</span>(esq) <span class="kw">and</span> j < <span class="fn">len</span>(dir):
        <span class="kw">if</span> esq[i] <= dir[j]: res.append(esq[i]); i += <span class="num">1</span>
        <span class="kw">else</span>: res.append(dir[j]); j += <span class="num">1</span>
    res.extend(esq[i:]); res.extend(dir[j:])
    <span class="kw">return</span> res
<span class="cm"># <= garante estabilidade: iguais mantêm ordem original</span>`
  },
  quick: {
    name:'Quicksort', tag:'O(n log n) médio · O(n²) pior · Instável', color:'#e74c3c', category:'Eficientes',
    when:'Ordenar arrays na RAM sem necessidade de estabilidade. Mais rápido na prática por localidade de cache.',
    avoid:'Dados já ordenados com pivô ingênuo (O(n²)). Quando estabilidade é necessária.',
    real:'C++ std::sort (introsort), V8/Node.js para arrays primitivos, qsort() do C.',
    desc:'Escolhe um pivô, particiona os menores à esquerda e maiores à direita (O(n)), aplica recursivamente. Com bom pivô: O(n log n). Com pivô sempre extremo: O(n²).',
    code:`<span class="kw">def</span> <span class="fn">quicksort</span>(arr, lo=<span class="num">0</span>, hi=<span class="kw">None</span>):
    <span class="kw">if</span> hi <span class="kw">is</span> <span class="kw">None</span>: hi = <span class="fn">len</span>(arr) - <span class="num">1</span>
    <span class="kw">if</span> lo >= hi: <span class="kw">return</span> arr
    p = <span class="fn">_partition</span>(arr, lo, hi)
    <span class="fn">quicksort</span>(arr, lo, p - <span class="num">1</span>)
    <span class="fn">quicksort</span>(arr, p + <span class="num">1</span>, hi)
    <span class="kw">return</span> arr

<span class="kw">def</span> <span class="fn">_partition</span>(arr, lo, hi):
    pivo = arr[hi]; i = lo - <span class="num">1</span>
    <span class="kw">for</span> j <span class="kw">in</span> <span class="fn">range</span>(lo, hi):
        <span class="kw">if</span> arr[j] <= pivo:
            i += <span class="num">1</span>; arr[i], arr[j] = arr[j], arr[i]
    arr[i+<span class="num">1</span>], arr[hi] = arr[hi], arr[i+<span class="num">1</span>]
    <span class="kw">return</span> i + <span class="num">1</span>`
  },
  heap: {
    name:'Heap Sort', tag:'Θ(n log n) sempre · In-place · Não estável', color:'#f39c12', category:'Eficientes',
    when:'Precisa de O(n log n) garantido E O(1) espaço extra. Sistemas embarcados.',
    avoid:'Quando estabilidade é necessária. Mais lento que Quicksort por cache misses.',
    real:'Introsort (fallback do C++ std::sort), sistemas embarcados de tempo real.',
    desc:'Constrói um max-heap em O(n). Extrai o máximo repetidamente para o fim do array, reorganizando o heap em O(log n). Array ordenado in-place sem espaço extra.',
    code:`<span class="kw">def</span> <span class="fn">heap_sort</span>(arr):
    n = <span class="fn">len</span>(arr)
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n // <span class="num">2</span> - <span class="num">1</span>, -<span class="num">1</span>, -<span class="num">1</span>):
        <span class="fn">_heapify</span>(arr, n, i)
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(n - <span class="num">1</span>, <span class="num">0</span>, -<span class="num">1</span>):
        arr[<span class="num">0</span>], arr[i] = arr[i], arr[<span class="num">0</span>]
        <span class="fn">_heapify</span>(arr, i, <span class="num">0</span>)

<span class="kw">def</span> <span class="fn">_heapify</span>(arr, n, i):
    m, l, r = i, <span class="num">2</span>*i+<span class="num">1</span>, <span class="num">2</span>*i+<span class="num">2</span>
    <span class="kw">if</span> l < n <span class="kw">and</span> arr[l] > arr[m]: m = l
    <span class="kw">if</span> r < n <span class="kw">and</span> arr[r] > arr[m]: m = r
    <span class="kw">if</span> m != i:
        arr[i], arr[m] = arr[m], arr[i]
        <span class="fn">_heapify</span>(arr, n, m)`
  },
  counting: {
    name:'Counting Sort', tag:'O(n+k) · k = intervalo · Estável', color:'#27ae60', category:'Lineares',
    when:'Inteiros em intervalo limitado (k pequeno). n >> k.',
    avoid:'Floats, strings longas, k muito grande (k >> n gasta memória).',
    real:'Ordenação de idades/notas. Fase interna do Radix Sort.',
    desc:'Conta ocorrências, acumula posições, constrói saída. Zero comparações — por isso quebra o limite Ω(n log n) dos algoritmos por comparação.',
    code:`<span class="kw">def</span> <span class="fn">counting_sort</span>(arr, k=<span class="kw">None</span>):
    <span class="kw">if not</span> arr: <span class="kw">return</span> arr
    <span class="kw">if</span> k <span class="kw">is</span> <span class="kw">None</span>: k = <span class="fn">max</span>(arr)
    count = [<span class="num">0</span>] * (k + <span class="num">1</span>)
    <span class="kw">for</span> v <span class="kw">in</span> arr: count[v] += <span class="num">1</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>, k + <span class="num">1</span>): count[i] += count[i-<span class="num">1</span>]
    out = [<span class="num">0</span>] * <span class="fn">len</span>(arr)
    <span class="kw">for</span> v <span class="kw">in</span> <span class="fn">reversed</span>(arr):
        count[v] -= <span class="num">1</span>
        out[count[v]] = v
    <span class="kw">return</span> out
<span class="cm"># O(n+k) — LINEAR quando k = O(n). Zero comparações!</span>`
  },
  radix: {
    name:'Radix Sort', tag:'O(d·(n+k)) · d = dígitos · Estável', color:'#5dade2', category:'Lineares',
    when:'Inteiros com d dígitos fixo. Strings de comprimento fixo.',
    avoid:'Floats arbitrários, dados com comprimento muito variado.',
    real:'Redes (ordenar IPs), bancos de dados, processamento de DNA.',
    desc:'Ordena dígito por dígito (do menos ao mais significativo) usando Counting Sort estável como sub-rotina. Para inteiros de 32 bits: d=4 passes de 8 bits.',
    code:`<span class="kw">def</span> <span class="fn">radix_sort</span>(arr):
    <span class="kw">if not</span> arr: <span class="kw">return</span> arr
    maximo = <span class="fn">max</span>(arr); exp = <span class="num">1</span>
    <span class="kw">while</span> maximo // exp > <span class="num">0</span>:
        <span class="fn">_counting_digit</span>(arr, exp); exp *= <span class="num">10</span>
    <span class="kw">return</span> arr

<span class="kw">def</span> <span class="fn">_counting_digit</span>(arr, exp):
    n = <span class="fn">len</span>(arr); out = [<span class="num">0</span>]*n; count = [<span class="num">0</span>]*<span class="num">10</span>
    <span class="kw">for</span> v <span class="kw">in</span> arr: count[(v//exp)%<span class="num">10</span>] += <span class="num">1</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(<span class="num">1</span>,<span class="num">10</span>): count[i] += count[i-<span class="num">1</span>]
    <span class="kw">for</span> v <span class="kw">in</span> <span class="fn">reversed</span>(arr):
        count[(v//exp)%<span class="num">10</span>] -= <span class="num">1</span>
        out[count[(v//exp)%<span class="num">10</span>]] = v
    arr[:] = out`
  },
  tim: {
    name:'TimSort', tag:'O(n) melhor · O(n log n) pior · Estável · Adaptativo', color:'#9b59b6', category:'Híbridos',
    when:'Dados reais parcialmente ordenados. Uso geral onde estabilidade importa.',
    avoid:'Raramente — é o melhor algoritmo geral. Apenas se O(n) extra for proibido.',
    real:'Python list.sort() e sorted(), Java Arrays.sort() para objetos, Android, Safari.',
    desc:'Híbrido Insertion Sort + Merge Sort. Detecta "runs" (sequências naturalmente ordenadas), estende-as com Insertion Sort até MIN_RUN (~32), funde com Merge Sort. O(n) para dados já ordenados.',
    code:`<span class="cm"># Python já usa TimSort em todo sorted() e list.sort()!</span>
MIN_RUN = <span class="num">32</span>

<span class="kw">def</span> <span class="fn">timsort</span>(arr):
    n = <span class="fn">len</span>(arr)
    <span class="cm"># Fase 1: Insertion Sort em blocos de MIN_RUN</span>
    <span class="kw">for</span> s <span class="kw">in</span> <span class="fn">range</span>(<span class="num">0</span>, n, MIN_RUN):
        e = <span class="fn">min</span>(s + MIN_RUN - <span class="num">1</span>, n - <span class="num">1</span>)
        <span class="fn">insertion_sort_range</span>(arr, s, e)
    <span class="cm"># Fase 2: Merge progressivo — dobra o tamanho</span>
    size = MIN_RUN
    <span class="kw">while</span> size < n:
        <span class="kw">for</span> lo <span class="kw">in</span> <span class="fn">range</span>(<span class="num">0</span>, n, <span class="num">2</span>*size):
            mid = <span class="fn">min</span>(lo + size - <span class="num">1</span>, n - <span class="num">1</span>)
            hi  = <span class="fn">min</span>(lo + <span class="num">2</span>*size - <span class="num">1</span>, n - <span class="num">1</span>)
            <span class="kw">if</span> mid < hi: merge(arr, lo, mid, hi)
        size *= <span class="num">2</span>`
  }
};

let currentAlgo = 'bubble', srtArr = [], srtTimer = null, srtComps = 0, srtSwaps = 0;

function selectAlgo(name) {
    if (srtTimer) { clearInterval(srtTimer); srtTimer = null; }
    currentAlgo = name;
    document.querySelectorAll('.algo-card').forEach(c => c.classList.remove('selected'));
    const card = document.getElementById('ac-' + name);
    if (card) card.classList.add('selected');
    renderAlgoDetail(name);
    sortNewArr();
    document.getElementById('srt-phase').textContent = '—';
    document.getElementById('srt-log').textContent = 'Clique em Animar para ver ' + ALGO_DATA[name].name + '.';
}

function renderAlgoDetail(name) {
    const a = ALGO_DATA[name];
    const catColors = {Elementares:'#e74c3c', Eficientes:'#5dade2', Lineares:'#27ae60', 'Híbridos':'#9b59b6'};
    const cc = catColors[a.category] || '#9b59b6';
    document.getElementById('algo-detail-area').innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
            <div style="font-family:'DM Serif Display',serif;font-size:24px;color:var(--text)">${a.name}</div>
            <span style="font-family:'JetBrains Mono',monospace;font-size:10px;padding:3px 10px;border-radius:3px;background:${cc}22;color:${cc};border:1px solid ${cc}55;">${a.category}</span>
        </div>
        <div style="font-size:15px;color:var(--muted);line-height:1.9;margin-bottom:16px;">${a.desc}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px;">
            <div style="background:rgba(39,174,96,0.08);border:1px solid rgba(39,174,96,0.2);border-radius:6px;padding:10px 12px;">
                <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#27ae60;margin-bottom:4px;">USE QUANDO</div>
                <div style="font-size:13.5px;color:var(--muted);">${a.when}</div>
            </div>
            <div style="background:rgba(231,76,60,0.08);border:1px solid rgba(231,76,60,0.2);border-radius:6px;padding:10px 12px;">
                <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#e74c3c;margin-bottom:4px;">EVITE QUANDO</div>
                <div style="font-size:13.5px;color:var(--muted);">${a.avoid}</div>
            </div>
            <div style="background:rgba(93,173,226,0.08);border:1px solid rgba(93,173,226,0.2);border-radius:6px;padding:10px 12px;">
                <div style="font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#5dade2;margin-bottom:4px;">USADO EM</div>
                <div style="font-size:13.5px;color:var(--muted);">${a.real}</div>
            </div>
        </div>
        <pre style="margin-bottom:0"><code>${a.code}</code></pre>`;
}

function sortNewArr() {
    if (srtTimer) { clearInterval(srtTimer); srtTimer = null; }
    const n = (currentAlgo==='counting'||currentAlgo==='radix') ? 18 : 20;
    const max = currentAlgo==='counting' ? 25 : 95;
    srtArr = Array.from({length:n}, () => Math.floor(Math.random()*max)+5);
    srtComps=0; srtSwaps=0;
    document.getElementById('srt-comps').textContent=0;
    document.getElementById('srt-swaps').textContent=0;
    renderSortBars(srtArr, srtArr.map(()=>'#5dade2'));
}

function renderSortBars(arr, colors) {
    const el = document.getElementById('srt-bars');
    if (!el) return;
    el.innerHTML = '';
    const maxV = Math.max(...arr);
    arr.forEach((v,i) => {
        const b = document.createElement('div');
        b.className = 'sort-bar';
        b.style.height = (v/maxV*144)+'px';
        b.style.background = colors[i]||'#5dade2';
        b.title = v;
        el.appendChild(b);
    });
}

function genBubbleSteps(arr){const a=[...arr],steps=[],n=a.length;for(let i=0;i<n;i++){let sw=false;for(let j=0;j<n-i-1;j++){steps.push({type:'compare',i:j,j:j+1,arr:[...a]});if(a[j]>a[j+1]){[a[j],a[j+1]]=[a[j+1],a[j]];sw=true;steps.push({type:'swap',i:j,j:j+1,arr:[...a]});}}steps.push({type:'pass',sorted:n-i-1,arr:[...a]});if(!sw)break;}steps.push({type:'done',arr:[...a]});return steps;}
function genSelectionSteps(arr){const a=[...arr],steps=[],n=a.length;for(let i=0;i<n;i++){let m=i;for(let j=i+1;j<n;j++){steps.push({type:'compare',i:m,j,arr:[...a]});if(a[j]<a[m])m=j;}if(m!==i){[a[i],a[m]]=[a[m],a[i]];steps.push({type:'swap',i,j:m,arr:[...a]});}steps.push({type:'placed',i,arr:[...a]});}steps.push({type:'done',arr:[...a]});return steps;}
function genInsertionSteps(arr){const a=[...arr],steps=[],n=a.length;for(let i=1;i<n;i++){const k=a[i];let j=i-1;steps.push({type:'pick',i,arr:[...a]});while(j>=0&&a[j]>k){steps.push({type:'compare',i:j,j:i,arr:[...a]});a[j+1]=a[j];j--;steps.push({type:'shift',j:j+1,arr:[...a]});}a[j+1]=k;steps.push({type:'insert',i:j+1,arr:[...a]});}steps.push({type:'done',arr:[...a]});return steps;}
function genMergeSteps(arr){const a=[...arr],steps=[];function ms(lo,hi){if(lo>=hi)return;const mid=Math.floor((lo+hi)/2);steps.push({type:'divide',lo,mid,hi,arr:[...a]});ms(lo,mid);ms(mid+1,hi);const tmp=a.slice(lo,hi+1);let i=0,j=mid-lo+1,k=lo;while(i<=mid-lo&&j<=hi-lo){steps.push({type:'compare',i:lo+i,j:lo+j,arr:[...a]});if(tmp[i]<=tmp[j]){a[k]=tmp[i];i++;}else{a[k]=tmp[j];j++;}steps.push({type:'place',k,arr:[...a]});k++;}while(i<=mid-lo){a[k]=tmp[i];i++;steps.push({type:'place',k,arr:[...a]});k++;}while(j<=hi-lo){a[k]=tmp[j];j++;steps.push({type:'place',k,arr:[...a]});k++;}steps.push({type:'merged',lo,hi,arr:[...a]});}ms(0,a.length-1);steps.push({type:'done',arr:[...a]});return steps;}
function genQuickSteps(arr){const a=[...arr],steps=[];function qs(lo,hi){if(lo>=hi)return;const pv=a[hi];steps.push({type:'pivot',idx:hi,arr:[...a]});let i=lo-1;for(let j=lo;j<hi;j++){steps.push({type:'compare',i:j,j:hi,arr:[...a]});if(a[j]<=pv){i++;[a[i],a[j]]=[a[j],a[i]];steps.push({type:'swap',i,j,arr:[...a]});}}[a[i+1],a[hi]]=[a[hi],a[i+1]];const pi=i+1;steps.push({type:'placed',idx:pi,arr:[...a]});qs(lo,pi-1);qs(pi+1,hi);}qs(0,a.length-1);steps.push({type:'done',arr:[...a]});return steps;}
function genHeapSteps(arr){const a=[...arr],n=a.length,steps=[];function hfy(sz,i){let m=i,l=2*i+1,r=2*i+2;steps.push({type:'compare',i:l<sz?l:i,j:r<sz?r:i,arr:[...a]});if(l<sz&&a[l]>a[m])m=l;if(r<sz&&a[r]>a[m])m=r;if(m!==i){[a[i],a[m]]=[a[m],a[i]];steps.push({type:'swap',i,j:m,arr:[...a]});hfy(sz,m);}}steps.push({type:'phase',msg:'Construindo max-heap',arr:[...a]});for(let i=Math.floor(n/2)-1;i>=0;i--)hfy(n,i);for(let i=n-1;i>0;i--){[a[0],a[i]]=[a[i],a[0]];steps.push({type:'extract',sorted:i,arr:[...a]});hfy(i,0);}steps.push({type:'done',arr:[...a]});return steps;}
function genCountingSteps(arr){const a=[...arr],k=Math.max(...a),steps=[];const cnt=new Array(k+1).fill(0);steps.push({type:'start',arr:[...a],msg:'Contando ocorrências...'});for(let v of a){cnt[v]++;steps.push({type:'count',val:v,cnt:[...cnt],arr:[...a]});}for(let i=1;i<=k;i++)cnt[i]+=cnt[i-1];steps.push({type:'accum',cnt:[...cnt],arr:[...a],msg:'Acumulando posições...'});const out=new Array(a.length).fill(0);for(let i=a.length-1;i>=0;i--){cnt[a[i]]--;out[cnt[a[i]]]=a[i];steps.push({type:'place',arr:[...out],msg:`Posicionando ${a[i]}`});}steps.push({type:'done',arr:[...out]});return steps;}
function genRadixSteps(arr){const a=[...arr],steps=[],mx=Math.max(...a);let exp=1;while(Math.floor(mx/exp)>0){steps.push({type:'phase',msg:`Ordenando pelo dígito ×${exp}`,arr:[...a]});const cnt=new Array(10).fill(0);for(let v of a)cnt[Math.floor(v/exp)%10]++;for(let i=1;i<10;i++)cnt[i]+=cnt[i-1];const out=new Array(a.length).fill(0);for(let i=a.length-1;i>=0;i--){const d=Math.floor(a[i]/exp)%10;cnt[d]--;out[cnt[d]]=a[i];steps.push({type:'place',arr:[...out],msg:`Dígito ${d} de ${a[i]}`});}a.splice(0,a.length,...out);steps.push({type:'pass-done',arr:[...a]});exp*=10;}steps.push({type:'done',arr:[...a]});return steps;}
function genTimSteps(arr){const a=[...arr],n=a.length,steps=[],MR=6;for(let s=0;s<n;s+=MR){const e=Math.min(s+MR-1,n-1);steps.push({type:'ins-block',lo:s,hi:e,arr:[...a]});for(let i=s+1;i<=e;i++){const k=a[i];let j=i-1;while(j>=s&&a[j]>k){a[j+1]=a[j];j--;steps.push({type:'shift',arr:[...a]});}a[j+1]=k;steps.push({type:'insert',i:j+1,arr:[...a]});}steps.push({type:'run-done',lo:s,hi:e,arr:[...a]});}let size=MR;while(size<n){steps.push({type:'merge-phase',size,arr:[...a]});for(let lo=0;lo<n;lo+=2*size){const mid=Math.min(lo+size-1,n-1),hi=Math.min(lo+2*size-1,n-1);if(mid<hi){const tmp=a.slice(lo,hi+1);let i=0,j=mid-lo+1,k=lo;while(i<=mid-lo&&j<=hi-lo){if(tmp[i]<=tmp[j]){a[k]=tmp[i];i++;}else{a[k]=tmp[j];j++;}steps.push({type:'place',k,arr:[...a]});k++;}while(i<=mid-lo){a[k]=tmp[i];i++;steps.push({type:'place',k,arr:[...a]});k++;}while(j<=hi-lo){a[k]=tmp[j];j++;steps.push({type:'place',k,arr:[...a]});k++;}steps.push({type:'merged',lo,hi,arr:[...a]});}}size*=2;}steps.push({type:'done',arr:[...a]});return steps;}

function sortRun(){
    if(srtTimer){clearInterval(srtTimer);srtTimer=null;}
    if(!srtArr.length)sortNewArr();
    srtComps=0;srtSwaps=0;
    document.getElementById('srt-comps').textContent=0;
    document.getElementById('srt-swaps').textContent=0;
    const gens={bubble:genBubbleSteps,selection:genSelectionSteps,insertion:genInsertionSteps,merge:genMergeSteps,quick:genQuickSteps,heap:genHeapSteps,counting:genCountingSteps,radix:genRadixSteps,tim:genTimSteps};
    const steps=(gens[currentAlgo]||genBubbleSteps)(srtArr);
    let si=0;const n=srtArr.length;const acol=ALGO_DATA[currentAlgo].color;
    srtTimer=setInterval(()=>{
        if(si>=steps.length){clearInterval(srtTimer);srtTimer=null;return;}
        const s=steps[si++];
        const cols=srtArr.map(()=>'#5dade2');
        if(s.type==='compare'){srtComps++;document.getElementById('srt-comps').textContent=srtComps;cols[s.i]='#f39c12';cols[s.j]='#f39c12';document.getElementById('srt-phase').textContent='Comparando';}
        else if(s.type==='swap'){srtSwaps++;document.getElementById('srt-swaps').textContent=srtSwaps;cols[s.i]='#e74c3c';cols[s.j]='#e74c3c';document.getElementById('srt-phase').textContent='Trocando';}
        else if(s.type==='pass'){for(let k=s.sorted;k<n;k++)cols[k]='#27ae60';document.getElementById('srt-log').textContent=`Passagem completa — posição ${s.sorted} na posição final.`;}
        else if(s.type==='placed'||s.type==='insert'){srtSwaps++;document.getElementById('srt-swaps').textContent=srtSwaps;cols[s.i!==undefined?s.i:s.idx]='#27ae60';document.getElementById('srt-phase').textContent='Posicionado';}
        else if(s.type==='pivot'){cols[s.idx]='#e74c3c';document.getElementById('srt-phase').textContent=`Pivô = ${s.arr[s.idx]}`;document.getElementById('srt-log').textContent=`Pivô: ${s.arr[s.idx]} (índice ${s.idx})`;}
        else if(s.type==='merged'){for(let k=s.lo;k<=s.hi;k++)cols[k]='#27ae60';document.getElementById('srt-log').textContent=`Segmento [${s.lo}..${s.hi}] fundido e ordenado.`;}
        else if(s.type==='place'){const idx=s.k!==undefined?s.k:0;cols[idx]=acol;document.getElementById('srt-phase').textContent='Posicionando';}
        else if(s.type==='extract'){for(let k=s.sorted;k<n;k++)cols[k]='#27ae60';document.getElementById('srt-phase').textContent='Extraindo do heap';}
        else if(s.type==='phase'||s.type==='merge-phase'){document.getElementById('srt-phase').textContent=s.msg||`Merge size=${s.size}`;document.getElementById('srt-log').textContent=s.msg||`Fundindo blocos de tamanho ${s.size}`;}
        else if(s.type==='run-done'){for(let k=s.lo;k<=s.hi;k++)cols[k]='#9b59b6';}
        else if(s.type==='ins-block'){for(let k=s.lo;k<=s.hi;k++)cols[k]='#9b59b6';document.getElementById('srt-phase').textContent=`Insertion Sort [${s.lo}..${s.hi}]`;}
        else if(s.type==='start'||s.type==='accum'){document.getElementById('srt-log').textContent=s.msg;}
        else if(s.type==='done'){for(let k=0;k<n;k++)cols[k]='#27ae60';document.getElementById('srt-phase').textContent='Concluído! ✓';document.getElementById('srt-log').textContent=`${ALGO_DATA[currentAlgo].name} completo! ${srtComps} comparações, ${srtSwaps} trocas/escritas.`;}
        if(s.arr)renderSortBars(s.arr,cols);
    },90);
}

function syncSortSidebar(){
    const groups=document.querySelectorAll('.sort-group');
    const cats=['cat-elementares','cat-eficientes','cat-lineares'];
    if(!groups.length)return;
    groups.forEach((g,i)=>{const c=document.getElementById(cats[i]);if(c)c.style.height=g.offsetHeight+'px';});
}
window.addEventListener('resize',syncSortSidebar);

const _origSPSort=window.switchPanel;
window.switchPanel=function(mod,panel){
    _origSPSort(mod,panel);
    if(panel==='m1-sort'){
        if(!document.getElementById('algo-detail-area').innerHTML)renderAlgoDetail('bubble');
        if(!srtArr.length)sortNewArr();
        setTimeout(syncSortSidebar,60);
    }
};
document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>{
    if(document.getElementById('algo-detail-area'))renderAlgoDetail('bubble');
    if(!srtArr.length)sortNewArr();
    setTimeout(syncSortSidebar,200);
},100));
