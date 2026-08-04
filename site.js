
// Ajusta o quadro do protótipo à altura do próprio conteúdo, para não ficar
// uma rolagem dentro da rolagem da página. Se o navegador bloquear o acesso ao
// documento embutido (acontece ao abrir por file://), mantém a altura do CSS.
(function () {
  var quadro = document.querySelector('iframe.proto');
  if (!quadro) return;

  function ajusta() {
    try {
      var doc = quadro.contentDocument;
      if (doc && doc.documentElement) {
        quadro.style.height = doc.documentElement.scrollHeight + 'px';
      }
    } catch (e) {
      /* origem distinta: fica a altura definida no CSS */
    }
  }

  quadro.addEventListener('load', ajusta);
  window.addEventListener('resize', function () { setTimeout(ajusta, 150); });
  ajusta();
})();

// Botão de cópia em cada bloco de texto preparado para a solicitação.
(function () {
  document.querySelectorAll('pre').forEach(function (pre) {
    var b = document.createElement('button');
    b.className = 'copiar';
    b.type = 'button';
    b.textContent = 'Copiar';
    b.addEventListener('click', function () {
      var texto = pre.querySelector('code').innerText;
      navigator.clipboard.writeText(texto).then(function () {
        b.textContent = 'Copiado';
        b.classList.add('ok');
        setTimeout(function () {
          b.textContent = 'Copiar';
          b.classList.remove('ok');
        }, 1800);
      });
    });
    pre.appendChild(b);
  });
})();
