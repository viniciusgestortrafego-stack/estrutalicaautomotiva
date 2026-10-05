'use strict';
const WHATSAPP = 'https://wa.me/551149630188?text=';
const modal = document.querySelector('#lead-modal');
const modalForm = document.querySelector('#popup-form');
window.dataLayer = window.dataLayer || [];
function track(event, data) { window.dataLayer.push(Object.assign({ event }, data)); }
// Receptor único de leads do grupo (Google Apps Script); grava na aba ESTRUTALICA AUTOMOTIVA.
const LEAD_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxAoy4dqn2MpZLo4XkhukZwYf2-eS-BAtvqsi4C2YQEbd872dRHULfAUbyQXZ_CAz7S/exec';
const sentLeads = new Map();
// Envio sem esperar resposta: o WhatsApp abre na hora. O mesmo cadastro reenviado usa o mesmo ID e não duplica a linha.
function sendLead(values, local) {
  const lead = { nome: values.get('nome').trim(), empresa: values.get('empresa').trim(), telefone: values.get('telefone').trim(), email: values.get('email').trim(), solucao: values.get('solucao'), origem: local };
  const signature = JSON.stringify(lead);
  if (!sentLeads.has(signature)) sentLeads.set(signature, crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(16).slice(2));
  try {
    fetch(LEAD_ENDPOINT, { method: 'POST', mode: 'no-cors', keepalive: true, headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ ...lead, brand: 'estrutalica-automotiva', requestId: sentLeads.get(signature) }) });
  } catch (error) {}
}

function buildSummary(values) {
  const visit = values.get('solucao') === 'Agendar uma visita';
  const intro = visit ? 'Olá, vi os anúncios e gostaria de agendar uma visita à Estrutálica.' : 'Olá, vi os anúncios e quero fazer um orçamento.';
  return `${intro}\n\nNome: ${values.get('nome').trim()}\nEmpresa: ${values.get('empresa').trim()}\nWhatsApp: ${values.get('telefone').trim()}\nE-mail: ${values.get('email').trim()}\nSolução: ${values.get('solucao')}`;
}

function setupForm(form) {
  const trigger = form.querySelector('.form-submit');
  const result = form.querySelector('.form-result');
  const summary = form.querySelector('.lead-summary');
  const status = form.querySelector('.form-status');
  const links = form.querySelectorAll('.form-submit, .form-continue');
  function prepare(event) {
    if (!form.reportValidity()) { event.preventDefault(); return; }
    const values = new FormData(form);
    summary.value = buildSummary(values);
    links.forEach(link => { link.href = WHATSAPP + encodeURIComponent(summary.value); });
    result.hidden = false;
    status.textContent = 'Seus dados já seguem na mensagem do WhatsApp. É só enviar a conversa para concluir seu contato. Se ela não abriu, use o link abaixo.';
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(summary.value).catch(() => {});
    const local = form.dataset.local;
    sendLead(values, local);
    track('whatsapp_click', { cta_texto: trigger.textContent.trim(), cta_local: local, cta_destino: values.get('solucao') === 'Agendar uma visita' ? 'visita' : 'orcamento' });
    track('lead_formulario', { solucao: values.get('solucao'), cta_local: local });
  }
  trigger.addEventListener('click', prepare);
  form.addEventListener('submit', event => { event.preventDefault(); trigger.click(); });
  form.querySelector('.form-continue').addEventListener('click', () => track('whatsapp_click', { cta_texto: 'Continuar no WhatsApp', cta_local: form.dataset.local + '_continuar', cta_destino: 'orcamento' }));
}
document.querySelectorAll('.lead-form').forEach(setupForm);

function ctaLocation(link) {
  if (link.closest('header')) return 'cabecalho';
  const section = link.closest('section');
  return section ? section.className.replace('section', '').trim() : 'outro';
}
// Os botões da página abrem o formulário em popup; sem suporte a <dialog>, seguem direto para o WhatsApp.
document.addEventListener('click', event => {
  const link = event.target.closest('a[data-cta]');
  if (!link || link.closest('.lead-form') || typeof modal.showModal !== 'function') return;
  event.preventDefault();
  const visit = link.href.includes('agendar');
  modalForm.elements.solucao.value = visit ? 'Agendar uma visita' : (link.dataset.solucao || '');
  modalForm.querySelector('.form-result').hidden = true;
  modal.showModal();
  track('popup_aberto', { cta_texto: link.textContent.trim(), cta_local: ctaLocation(link), cta_destino: visit ? 'visita' : 'orcamento' });
});
modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });
document.querySelectorAll('[data-track="rota"]').forEach(link => link.addEventListener('click', () => track('rota_click', { cta_local: 'localizacao' })));
document.querySelectorAll('.instagram').forEach(link => link.addEventListener('click', () => track('instagram_click', { cta_local: link.closest('footer') ? 'rodape' : 'localizacao' })));
document.querySelector('#year').textContent = new Date().getFullYear();
