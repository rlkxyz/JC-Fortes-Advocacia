/* ============================================================
   Roda antes da página aparecer (sem defer, é minúsculo).
   Marca a página com "js" (os blocos podem começar apagados pra
   acender com a rolagem) e com "calmo" quando o sistema da pessoa
   pede menos movimento: aí o reflexo do logo e a onda do mapa
   param, e as entradas ficam mais curtas.
   "?movimento=1" na URL liga tudo e guarda; "?movimento=0" desliga.
   Fica num arquivo separado (e não dentro do HTML) porque a
   política de segurança do site não deixa rodar script embutido.
   ============================================================ */
(function () {
  var m = null;
  var p = /[?&]movimento=([01])(?:&|$)/.exec(location.search);
  try { m = localStorage.getItem('jc.movimento'); } catch (e) {}
  if (m !== 'sim' && m !== 'nao') m = null;
  if (p) {
    m = p[1] === '1' ? 'sim' : 'nao';
    try { localStorage.setItem('jc.movimento', m); } catch (e) {}
  }
  var reduz = false;
  try { reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  var calmo = m ? m === 'nao' : reduz;
  document.documentElement.className = 'js' + (calmo ? ' calmo' : '');
})();
