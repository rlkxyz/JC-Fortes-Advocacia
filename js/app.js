/* ============================================================
   JC Fortes Advocacia · comportamento da página
   - cabeçalho escurece ao rolar; menu do celular
   - WhatsApp flutuante aparece depois do topo
   - links de WhatsApp com a mensagem pronta (advogado, empresa, colega)
   - "Qual é a sua situação?": escolhe a área e o assunto, mostra quem
     cuida e o que separar, e monta a mensagem do WhatsApp

   Segurança: nada entra como HTML (tudo por textContent ou elemento
   montado). O texto opcional da pessoa passa pela limpo() e só vai
   no link do WhatsApp, codificado. Nada é guardado.
   ============================================================ */
(function () {
  'use strict';
  const D = window.JC_CASOS;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const html = document.documentElement;
  html.classList.remove('sem-js');

  /* ---------- utilidades ---------- */
  /* tira caractere de controle, invisível e de inverter texto; junta espaços; corta.
     A lista é montada por código (e não escrita na regex) pra nenhum caractere
     invisível de verdade parar dentro do arquivo. */
  const INVISIVEIS = (function () {
    const faixas = [[0x0000, 0x0008], [0x000B, 0x000C], [0x000E, 0x001F], [0x007F, 0x009F],
      [0x200B, 0x200F], [0x2028, 0x202E], [0x2060, 0x206F], [0xFEFF, 0xFEFF], [0xFFF9, 0xFFFB]];
    const hex = n => '\\u' + n.toString(16).padStart(4, '0');
    return new RegExp('[' + faixas.map(f => hex(f[0]) + '-' + hex(f[1])).join('') + ']', 'g');
  })();
  function limpo(txt, max) {
    return String(txt || '').replace(INVISIVEIS, '').replace(/[ \t]+/g, ' ')
      .replace(/\n{3,}/g, '\n\n').trim().slice(0, max || 280);
  }
  function linkWhats(msg) {
    return 'https://wa.me/' + D.whats + '?text=' + encodeURIComponent(msg);
  }
  function el(tag, cls, texto) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (texto != null) e.textContent = texto;
    return e;
  }
  function icone(id) {
    const ns = 'http://www.w3.org/2000/svg';
    const s = document.createElementNS(ns, 'svg');
    s.setAttribute('aria-hidden', 'true');
    const u = document.createElementNS(ns, 'use');
    u.setAttribute('href', '#' + id);
    s.appendChild(u);
    return s;
  }
  const ABERTURA = 'Olá! Vim pelo site da JC Fortes.';

  /* ---------- ano no rodapé ---------- */
  const ano = $('#ano');
  if (ano) ano.textContent = String(new Date().getFullYear());

  /* ---------- cabeçalho e menu ---------- */
  const topo = $('#topo');
  const botaoMenu = $('#menu-botao');
  const menu = $('#menu');
  function aoRolar() { topo.classList.toggle('rolou', window.scrollY > 12); }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();
  function menuAberto(sim) {
    html.classList.toggle('menu-aberto', sim);
    botaoMenu.setAttribute('aria-expanded', sim ? 'true' : 'false');
    botaoMenu.querySelector('.escondido').textContent = sim ? 'Fechar menu' : 'Menu';
  }
  botaoMenu.addEventListener('click', () => menuAberto(!html.classList.contains('menu-aberto')));
  $$('a', menu).forEach(a => a.addEventListener('click', () => menuAberto(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && html.classList.contains('menu-aberto')) { menuAberto(false); botaoMenu.focus(); }
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 1020) menuAberto(false); });

  /* ---------- WhatsApp flutuante: aparece quando o topo sai da tela ---------- */
  const flutua = $('#whats-flutua');
  const entrada = $('#inicio');
  if ('IntersectionObserver' in window && entrada) {
    new IntersectionObserver(([v]) => flutua.classList.toggle('visivel', !v.isIntersecting), { threshold: 0.08 }).observe(entrada);
  } else {
    flutua.classList.add('visivel');
  }

  /* ---------- links com mensagem pronta ---------- */
  $$('[data-whats-advogado]').forEach(a => {
    const adv = D.advogados[a.getAttribute('data-whats-advogado')];
    if (adv) a.href = linkWhats(ABERTURA + '\nGostaria de falar com ' + adv.curto + '.');
  });
  $$('[data-whats-texto]').forEach(a => { a.href = linkWhats(limpo(a.getAttribute('data-whats-texto'), 400)); });

  /* ---------- qual é a sua situação ---------- */
  const caixaGrupos = $('#caso-grupos');
  const caixaItens = $('#caso-itens');
  if (!caixaGrupos || !caixaItens) return;
  const nome = $('#caso-nome'), oab = $('#caso-oab'), sigla = $('#caso-sigla'), nota = $('#caso-nota'), docs = $('#caso-docs');
  const texto = $('#caso-texto'), enviar = $('#caso-enviar');
  let grupoAtual = D.grupos[0];
  let itemAtual = grupoAtual.itens[0];

  D.grupos.forEach(g => {
    const b = el('button', 'grupo', g.nome);
    b.type = 'button';
    b.dataset.grupo = g.id;
    b.setAttribute('aria-pressed', g === grupoAtual ? 'true' : 'false');
    b.addEventListener('click', () => escolherGrupo(g));
    caixaGrupos.appendChild(b);
  });

  function escolherGrupo(g) {
    if (g === grupoAtual && caixaItens.childElementCount) return;
    grupoAtual = g;
    $$('.grupo', caixaGrupos).forEach(b => b.setAttribute('aria-pressed', b.dataset.grupo === g.id ? 'true' : 'false'));
    montarItens();
    escolherItem(g.itens[0], true);
  }

  function montarItens() {
    caixaItens.textContent = '';
    grupoAtual.itens.forEach((it, i) => {
      const rotulo = el('label', 'item');
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'caso-assunto';
      radio.value = it.id;
      radio.checked = i === 0;
      radio.addEventListener('change', () => { if (radio.checked) escolherItem(it); });
      rotulo.append(radio, el('span', null, it.t), icone('i-seta'));
      caixaItens.appendChild(rotulo);
    });
    if (window.JCAnim) window.JCAnim.itens($$('.item', caixaItens));
  }

  function escolherItem(it, trocouGrupo) {
    itemAtual = it;
    const adv = D.advogados[grupoAtual.quem];
    nome.textContent = adv.nome;
    oab.textContent = adv.oab;
    if (sigla) sigla.textContent = adv.sigla;
    const n = it.nota || grupoAtual.nota || '';
    nota.textContent = n;
    nota.hidden = !n;
    docs.textContent = '';
    it.docs.forEach(d => docs.appendChild(el('li', null, d)));
    atualizarLink();
    if (window.JCAnim) window.JCAnim.painel($$('li', docs), trocouGrupo);
  }

  function atualizarLink() {
    const adv = D.advogados[grupoAtual.quem];
    let msg = ABERTURA + '\nAssunto: ' + grupoAtual.nome + ' · ' + itemAtual.t +
      '\nGostaria de falar com ' + adv.curto + '.';
    const extra = limpo(texto.value, 280);
    if (extra) msg += '\n\nEm poucas palavras: ' + extra;
    enviar.href = linkWhats(msg);
  }
  texto.addEventListener('input', atualizarLink);

  montarItens();
  escolherItem(itemAtual);
})();
