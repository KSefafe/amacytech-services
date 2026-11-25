const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !expanded;
});
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  mobileNav.hidden = true;
}
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) { closeMenu(); menuButton.focus(); }
});
const serviceSelect = document.querySelector('#service');
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => {
  serviceSelect.value = link.dataset.service;
}));
const form = document.querySelector('#enquiry-form');
function enquiryMessage() {
  return `Hi AmacyTech! I'm ${form.elements.name.value.trim()}.\n\nI need help with: ${serviceSelect.value}.\n\n${form.elements.problem.value.trim()}\n\nPlease let me know your availability and the next step.`;
}
function validEnquiry() {
  for (const field of [form.elements.name, form.elements.problem]) {
    field.setCustomValidity(field.value.trim() ? '' : 'Please add a little detail here.');
  }
  return form.reportValidity();
}
form.addEventListener('input', event => event.target.setCustomValidity?.(''));
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!validEnquiry()) return;
  window.open(`https://wa.me/27680065906?text=${encodeURIComponent(enquiryMessage())}`, '_blank', 'noopener,noreferrer');
  document.querySelector('#form-status').textContent = 'Your message is ready in WhatsApp. Send it there to request a slot; your booking is confirmed after we reply.';
});
document.querySelector('#email-button').addEventListener('click', () => {
  if (!validEnquiry()) { form.scrollIntoView({block: 'center'}); return; }
  window.location.href = `mailto:amacytechservices@gmail.com?subject=${encodeURIComponent(`Tech enquiry: ${serviceSelect.value}`)}&body=${encodeURIComponent(enquiryMessage())}`;
});
