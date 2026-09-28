'use strict';
const form = document.querySelector('#lead-form');
const trigger = document.querySelector('#form-cta');
const result = document.querySelector('#form-result');
const summary = document.querySelector('#lead-summary');
const status = document.querySelector('#form-status');
function prepare(event) {
  if (!form.reportValidity()) { event.preventDefault(); return; }
  const values = new FormData(form);
  summary.value = `Olá, vi os anúncios e quero fazer um orçamento.\n\nNome: ${values.get('nome').trim()}\nEmpresa: ${values.get('empresa').trim()}\nWhatsApp: ${values.get('telefone').trim()}\nE-mail: ${values.get('email').trim()}\nSolução: ${values.get('solucao')}`;
  result.hidden = false;
  status.textContent = 'Cadastro preparado. Copie o resumo abaixo e envie na conversa do WhatsApp para concluir seu contato.';
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(summary.value).then(() => {
      status.textContent = 'Dados copiados. Cole e envie na conversa do WhatsApp para concluir seu contato. Se a conversa não abriu, use o link abaixo.';
    }).catch(() => { summary.focus(); summary.select(); });
  } else { summary.focus(); summary.select(); }
}
trigger.addEventListener('click', prepare);
form.addEventListener('submit', event => { event.preventDefault(); trigger.click(); });
document.querySelector('#year').textContent = new Date().getFullYear();
