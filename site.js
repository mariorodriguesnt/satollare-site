(function(){
  var main = document.getElementById('inicio');
  var menu = document.getElementById('cardapio-completo');
  function route(){
    var h = location.hash.slice(1);
    var noMenu = h === 'cardapio-completo';
    main.hidden = noMenu;
    menu.hidden = !noMenu;
    if (noMenu) { window.scrollTo(0, 0); return; }
    var alvo = h && document.getElementById(h);
    if (alvo && h !== 'inicio') alvo.scrollIntoView();
    else if (h === 'inicio') window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();
})();
(function(){
  // Troque pelo número real da pizzaria (55 + DDD + número, só dígitos)
  var WHATS = '5515997310474';
  document.querySelectorAll('.pedir').forEach(function(a){
    a.href = 'https://wa.me/' + WHATS + '?text=' + encodeURIComponent('Olá! Quero pedir uma pizza de ' + a.dataset.sabor + '.');
    a.target = '_blank'; a.rel = 'noopener';
  });
  document.querySelectorAll('.chips button').forEach(function(b){
    b.addEventListener('click', function(){ document.getElementById(b.dataset.alvo).scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); });
  });
  var campo = document.getElementById('busca'), info = document.getElementById('busca-info'), vazio = document.getElementById('sem-resultado');
  function norm(s){ return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  var linhas = Array.prototype.map.call(document.querySelectorAll('.pagina-cardapio [data-busca]'), function(el){ return [el, norm(el.dataset.busca)]; });
  campo.addEventListener('input', function(){
    var q = norm(campo.value.trim()), n = 0;
    linhas.forEach(function(l){ var ok = !q || l[1].indexOf(q) > -1; l[0].hidden = !ok; if (ok) n++; });
    document.querySelectorAll('.pagina-cardapio .categoria').forEach(function(c){ c.hidden = q && !c.querySelector('[data-busca]:not([hidden])'); });
    info.textContent = q ? (n ? n + (n === 1 ? ' opção encontrada' : ' opções encontradas') : '') : '';
    vazio.hidden = !q || n > 0;
    vazio.textContent = 'Nada encontrado para “' + campo.value.trim() + '”. Tente outro sabor ou ingrediente, como frango ou bacon.';
  });
})();
