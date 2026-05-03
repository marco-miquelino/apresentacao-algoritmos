/* ─── Grafos: Visualizações vis-network ─── */
/* ══════════════════════════════════════════════════════
   GRAFOS
══════════════════════════════════════════════════════ */
const VIS_OPTS = {
    nodes:{color:{background:'#1a1e28',border:'#5dade2',highlight:{background:'#1a1e28',border:'#f1c40f'}},font:{color:'#e6e4e0',size:13,face:'JetBrains Mono'},borderWidth:2,shape:'box',margin:8},
    edges:{color:{color:'#3a3f52',highlight:'#5dade2'},arrows:{to:{enabled:true,scaleFactor:0.6}},smooth:{type:'curvedCW',roundness:0.2}},
    physics:{enabled:true,stabilization:{iterations:120}},
    interaction:{dragNodes:true,zoomView:true}
};

function makeNet(id,nodes,edges,opts={}) {
    const el=document.getElementById(id); if (!el) return;
    return new vis.Network(el,{nodes:new vis.DataSet(nodes),edges:new vis.DataSet(edges)},{...VIS_OPTS,...opts});
}

function initGrafos() {
    makeNet('grafo-celebridade',[{id:0,label:'👑 Alice\n(celebridade)',color:{background:'#2d2205',border:'#f1c40f'},font:{color:'#f1c40f',size:14}},{id:1,label:'Bruno'},{id:2,label:'Carla'},{id:3,label:'Diego'},{id:4,label:'Eva'}],[{from:1,to:0},{from:2,to:0},{from:3,to:0},{from:4,to:0},{from:1,to:2},{from:2,to:3},{from:3,to:4},{from:4,to:1}]);
    const votNodes=[{id:'X1',label:'X',color:{background:'rgba(93,173,226,0.2)',border:'#5dade2'}},{id:'Y1',label:'Y',color:{background:'rgba(231,76,60,0.2)',border:'#e74c3c'}},{id:'X2',label:'X',color:{background:'rgba(93,173,226,0.2)',border:'#5dade2'}},{id:'X3',label:'X',color:{background:'rgba(93,173,226,0.2)',border:'#5dade2'}},{id:'Y2',label:'Y',color:{background:'rgba(231,76,60,0.2)',border:'#e74c3c'}},{id:'X4',label:'X',color:{background:'rgba(93,173,226,0.2)',border:'#5dade2'}},{id:'X5',label:'X',color:{background:'rgba(93,173,226,0.2)',border:'#5dade2'}},{id:'R',label:'✓ X vence\n(5 de 7)',color:{background:'rgba(39,174,96,0.2)',border:'#27ae60'},font:{color:'#27ae60'}}];
    makeNet('grafo-votacao',votNodes,['X1','Y1','X2','X3','Y2','X4','X5'].map(id=>({from:id,to:'R'})),{layout:{hierarchical:{direction:'LR',levelSeparation:120}}});
    const agNodes=['Ana','Bruno','Carla','Diego','Eva','Fábio','Gabi'].map((n,i)=>({id:i,label:n}));
    makeNet('grafo-agenda',agNodes,agNodes.slice(0,-1).map((_,i)=>({from:i,to:i+1,label:'<',font:{color:'#7a8099',size:10}})),{physics:{enabled:false},layout:{hierarchical:{direction:'LR',levelSeparation:80}}});
    makeNet('grafo-hash',[{id:0,label:'MENSAGEM\n"OLA"',color:{background:'rgba(155,89,182,0.2)',border:'#9b59b6'}},{id:1,label:'hash(O)→V',color:{background:'rgba(93,173,226,0.1)',border:'#5dade2'}},{id:2,label:'hash(L)→X',color:{background:'rgba(93,173,226,0.1)',border:'#5dade2'}},{id:3,label:'hash(A)→Q',color:{background:'rgba(93,173,226,0.1)',border:'#5dade2'}},{id:4,label:'"VXQ"\nCIFRADO',color:{background:'rgba(39,174,96,0.2)',border:'#27ae60'},font:{color:'#27ae60'}}],[{from:0,to:1},{from:0,to:2},{from:0,to:3},{from:1,to:4},{from:2,to:4},{from:3,to:4}]);
    makeNet('grafo-rotas',[{id:'c0',label:'Centro A',color:{background:'rgba(231,76,60,0.2)',border:'#e74c3c'},font:{color:'#e74c3c'}},{id:'c1',label:'Centro B',color:{background:'rgba(231,76,60,0.2)',border:'#e74c3c'},font:{color:'#e74c3c'}},{id:'c2',label:'Centro C',color:{background:'rgba(231,76,60,0.2)',border:'#e74c3c'},font:{color:'#e74c3c'}},...['B1','B2','B3','B4','B5'].map(n=>({id:n,label:`🏪 ${n}`}))],[{from:'B1',to:'c0'},{from:'B2',to:'c1'},{from:'B3',to:'c2'},{from:'B4',to:'c1'},{from:'B5',to:'c0'}]);
    makeNet('grafo-heap',[{id:0,label:'10\n(raiz/máx)',color:{background:'rgba(39,174,96,0.2)',border:'#27ae60'},font:{color:'#27ae60'}},{id:1,label:'8'},{id:2,label:'7'},{id:3,label:'5'},{id:4,label:'6'},{id:5,label:'4'},{id:6,label:'3'}],[{from:0,to:1},{from:0,to:2},{from:1,to:3},{from:1,to:4},{from:2,to:5},{from:2,to:6}],{physics:{enabled:false},layout:{hierarchical:{direction:'UD',levelSeparation:70}}});
    makeNet('grafo-topk',[{id:'h',label:'min-heap\n[87]',color:{background:'rgba(231,76,60,0.15)',border:'#e74c3c'}},{id:'a',label:'Alice\n92',color:{background:'rgba(93,173,226,0.15)',border:'#5dade2'}},{id:'b',label:'Bruno\n87',color:{background:'rgba(93,173,226,0.15)',border:'#5dade2'}},{id:'c',label:'Carla\n95',color:{background:'rgba(93,173,226,0.15)',border:'#5dade2'}},{id:'d',label:'Eva\n99',color:{background:'rgba(39,174,96,0.2)',border:'#27ae60'},font:{color:'#27ae60'}},{id:'e',label:'Fábio\n88',color:{background:'rgba(93,173,226,0.15)',border:'#5dade2'}}],[{from:'a',to:'h'},{from:'b',to:'h'},{from:'c',to:'h'},{from:'d',to:'h'},{from:'e',to:'h'}]);
}
