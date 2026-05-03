/* ─── Navegação: Módulos e Painéis ─── */
/* ══════════════════════════════════════════════════════
   MODULE + PANEL NAVIGATION
══════════════════════════════════════════════════════ */
const MOD_SUBTABS = { m1:'subtab-m1', m2:'subtab-m2', m3:'subtab-m3' };
const MOD_PANELS  = { home:'panel-home', m1:'panel-m1', m2:'panel-m2', m3:'panel-m3' };
let currentMod = 'home';
let grafosInit = {};

function switchMod(mod) {
    // Deactivate all mod tabs
    document.querySelectorAll('.mod-tab').forEach(t => t.classList.remove('active'));
    document.querySelector(`.mod-tab[data-mod="${mod}"]`).classList.add('active');

    // Hide all panels
    document.querySelectorAll('.mod-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(MOD_PANELS[mod]).classList.add('active');

    // Hide all subtab bars
    document.querySelectorAll('.subtab-bar').forEach(b => b.classList.remove('visible'));
    if (MOD_SUBTABS[mod]) document.getElementById(MOD_SUBTABS[mod]).classList.add('visible');

    // Adjust page-wrap padding
    const pageWrap = document.getElementById('page-wrap');
    if (MOD_SUBTABS[mod]) pageWrap.classList.add('has-subtabs');
    else pageWrap.classList.remove('has-subtabs');

    currentMod = mod;
    window.scrollTo(0, 0);

    // Init grafos when visiting M2 for first time
    if (mod === 'm2' && !grafosInit.m2) { grafosInit.m2 = true; initGrafos(); }
    if (mod === 'm3' && !grafosInit.m3) { grafosInit.m3 = true; gerarMatrizes(); setTimeout(resetHanoi,100); }
    if (mod === 'm1' && !grafosInit.m1) { grafosInit.m1 = true; setTimeout(()=>{drawBigoChart();renderDS('array');},50); }
}

function switchPanel(mod, panel) {
    // Deactivate content panels in this module
    document.querySelectorAll(`#panel-${mod} .content-panel`).forEach(p => p.classList.remove('active'));
    document.getElementById(`panel-${panel}`).classList.add('active');

    // Update subtab active state
    document.querySelectorAll(`#subtab-${mod} .sub-tab`).forEach(t => t.classList.remove('active'));
    document.querySelector(`#subtab-${mod} .sub-tab[data-panel="${panel}"]`).classList.add('active');

    window.scrollTo(0, 0);
}
