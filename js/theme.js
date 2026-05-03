/* ─── Tema Claro/Escuro ─── */
/* ── Tema claro/escuro ──────────────────────────────────────── */
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('theme-icon');
    if (html.getAttribute('data-theme') === 'light') {
        html.removeAttribute('data-theme');
        if (icon) icon.textContent = '☾';
        localStorage.setItem('aed-theme', 'dark');
    } else {
        html.setAttribute('data-theme', 'light');
        if (icon) icon.textContent = '☀';
        localStorage.setItem('aed-theme', 'light');
    }
    setTimeout(() => { drawBigoChart(); desenharHanoi(); }, 60);
}
(function() {
    const saved = localStorage.getItem('aed-theme');
    if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.textContent = '☀';
    }
})();

window.addEventListener('resize', ()=>{ drawBigoChart(); desenharHanoi(); syncSortSidebar(); });
