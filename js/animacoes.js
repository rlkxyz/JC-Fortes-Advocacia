/* ============================================================
   JC Fortes · animações (GSAP 3.15 + ScrollTrigger, copiados do
   npm pra dentro do site: a política de segurança não deixa CDN).

   - Topo: saudação, título, texto, botões e logo entram em sequência.
   - Blocos do meio pra baixo acendem ao entrar na tela.
   - Escudo de cada advogado se desenha (o contorno do logo).
   - Mapa: a RJ-106 se desenha em dourado de Iguaba até São Pedro
     e o escudo do escritório aparece no km 104.
   - "Qual é a sua situação?": a lista do que separar entra de leve.

   Não desliga com prefers-reduced-motion (o PC do André pede menos
   movimento e ele quer ver as animações): os movimentos ficam mais
   curtos. Sem GSAP nada fica escondido: o CSS acende tudo sozinho.
   ============================================================ */
(function () {
  'use strict';
  const g = window.gsap, ST = window.ScrollTrigger;
  if (!g || !ST) return;
  g.registerPlugin(ST);
  const html = document.documentElement;
  html.classList.add('gsap-ok');
  const calmo = html.classList.contains('calmo');
  const k = calmo ? 0.4 : 1; // tamanho dos movimentos

  /* ---------- topo ---------- */
  const entra = g.utils.toArray('[data-entra]');
  g.fromTo(entra, { opacity: 0, y: 22 * k }, {
    opacity: 1, y: 0, duration: calmo ? 0.5 : 0.85, ease: 'power3.out', stagger: 0.09, delay: 0.1, clearProps: 'transform',
  });

  /* ---------- blocos que acendem ao aparecer ---------- */
  const revela = g.utils.toArray('[data-revela]');
  g.set(revela, { y: 26 * k });
  ST.batch(revela, {
    start: 'top 90%',
    once: true,
    onEnter: lote => g.to(lote, { opacity: 1, y: 0, duration: calmo ? 0.45 : 0.8, ease: 'power2.out', stagger: 0.09, clearProps: 'transform' }),
  });

  /* ---------- escudos dos advogados se desenham ---------- */
  g.utils.toArray('.advogado').forEach((card, i) => {
    const contorno = card.querySelector('.selo-escudo path');
    const letras = card.querySelector('.selo-letras');
    if (!contorno) return;
    const tl = g.timeline({ scrollTrigger: { trigger: card, start: 'top 85%', once: true } });
    tl.fromTo(contorno, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: calmo ? 0.6 : 1.5, ease: 'power2.inOut', delay: i * 0.12 })
      .fromTo(letras, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.5');
  });

  /* ---------- mapa ---------- */
  const rota = document.querySelector('.m-rota');
  if (rota) {
    const pino = document.querySelector('.m-pino');
    const placa = document.querySelector('.m-placa');
    const marcas = g.utils.toArray('.m-marca');
    const tl = g.timeline({ scrollTrigger: { trigger: '.mapa', start: 'top 75%', once: true } });
    tl.fromTo(rota, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: calmo ? 0.9 : 2.2, ease: 'power1.inOut' })
      .fromTo(marcas, { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.12 }, 0.2)
      .fromTo(pino, { opacity: 0, y: -18 * k }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(2)' }, calmo ? 0.5 : 1.2)
      .fromTo(placa, { opacity: 0 }, { opacity: 1, duration: 0.4 }, '-=0.15');
  }

  /* ---------- o que o app.js chama ---------- */
  window.JCAnim = {
    itens(lista) {
      g.fromTo(lista, { opacity: 0, x: -8 * k }, { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out', clearProps: 'transform,opacity' });
    },
    painel(lista) {
      g.fromTo(lista, { opacity: 0, x: -6 * k }, { opacity: 1, x: 0, duration: 0.28, stagger: 0.04, ease: 'power2.out', clearProps: 'transform,opacity' });
    },
  };

  /* fontes e imagens mudam a altura da página depois de carregar */
  window.addEventListener('load', () => ST.refresh());
})();
