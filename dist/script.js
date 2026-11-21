(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('#site-nav');

  if (menuToggle && navigation) {
    const desktop = window.matchMedia('(min-width: 760px)');

    function setMenu(open) {
      document.documentElement.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
    }

    menuToggle.addEventListener('click', () => {
      setMenu(!desktop.matches && menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    navigation.addEventListener('click', (event) => {
      if (event.target.closest('a[href], [data-quote-open]')) setMenu(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuToggle.focus();
      }
    });

    desktop.addEventListener('change', () => setMenu(false));
    setMenu(false);
    document.documentElement.classList.add('menu-enhanced');
    menuToggle.hidden = false;
  }

  const dialog = document.querySelector('#quote-dialog');
  const form = document.querySelector('#quote-form');
  const service = form?.elements.namedItem('service');
  const message = document.querySelector('#quote-message');
  const result = document.querySelector('[data-quote-result]');
  const whatsappLink = document.querySelector('[data-quote-whatsapp]');
  const copyButton = document.querySelector('[data-quote-copy]');
  const status = document.querySelector('#quote-status');
  const openButtons = document.querySelectorAll('[data-quote-open]');
  const closeButtons = document.querySelectorAll('[data-quote-close]');

  if (typeof dialog?.showModal !== 'function' || !service || !message || !result ||
      !whatsappLink || !copyButton || !status || !openButtons.length || !closeButtons.length) {
    return;
  }

  const whatsappUrl = whatsappLink.href;
  let opener;
  let quoteRevision = 0;

  function clearResult() {
    quoteRevision += 1;
    message.value = '';
    whatsappLink.href = whatsappUrl;
    status.textContent = '';
    result.hidden = true;
  }

  for (const button of openButtons) {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      if (dialog.open) return;

      opener = button;
      form.reset();
      clearResult();
      if (button.dataset.service) service.value = button.dataset.service;
      dialog.showModal();
    });
  }

  for (const button of closeButtons) {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      dialog.close();
    });
  }

  dialog.addEventListener('close', () => {
    clearResult();
    if (opener?.getClientRects().length) {
      opener.focus({ preventScroll: true });
    } else if (menuToggle?.getClientRects().length) {
      menuToggle.focus({ preventScroll: true });
    }
    opener = undefined;
  });

  form.addEventListener('input', clearResult);
  form.addEventListener('change', clearResult);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = new FormData(form);
    const selected = fields.get('service')?.trim();
    const city = fields.get('city')?.trim();
    const details = fields.get('details')?.trim();
    if (!selected) return;

    const lines = [
      'Olá, equipe da Top Clim!',
      `Gostaria de solicitar um orçamento para ${selected.toLocaleLowerCase('pt-BR')} de ar-condicionado.`,
    ];
    if (city) lines.push(`Cidade ou bairro: ${city}`);
    if (details) lines.push(`Detalhes: ${details}`);
    lines.push('Agradeço desde já!');

    quoteRevision += 1;
    message.value = lines.join('\n');
    const chatUrl = new URL(whatsappUrl);
    chatUrl.searchParams.set('text', message.value);
    whatsappLink.href = chatUrl.href;
    result.hidden = false;
    message.focus();
    status.textContent = 'Mensagem pronta para abrir no WhatsApp.';
  });

  copyButton.addEventListener('click', async () => {
    const value = message.value;
    const revision = quoteRevision;
    if (!value) return;

    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        copied = true;
      }
    } catch {
      // Selecting the text also lets visitors copy it manually.
    }

    if (!dialog.open || revision !== quoteRevision) return;

    if (!copied) {
      message.focus({ preventScroll: true });
      message.select();
      message.setSelectionRange(0, value.length);
      try {
        copied = document.execCommand('copy');
      } catch {
        copied = false;
      }
    }

    status.textContent = copied
      ? 'Mensagem copiada.'
      : 'O texto está selecionado. Use a opção Copiar do seu dispositivo.';
  });

  for (const button of openButtons) button.hidden = false;
  for (const link of document.querySelectorAll('[data-quote-fallback]')) link.hidden = true;
})();
