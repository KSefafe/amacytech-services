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
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let bookingRipple;
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  serviceSelect.value = link.dataset.service;
  bookingRipple?.cancel();
  if (reducedMotion.matches || !link.animate) return;

  event.preventDefault();
  const startUrl = location.href;
  const wave = document.createElement('i');
  wave.className = 'booking-wave';
  wave.setAttribute('aria-hidden', 'true');
  link.append(wave);
  const ripple = wave.animate(
    [
      { transform: 'translate(-50%, -50%) scale(0)' },
      { transform: 'translate(-50%, -50%) scale(1)' }
    ],
    { duration: 240, easing: 'ease-out', fill: 'forwards' }
  );
  bookingRipple = ripple;
  ripple.oncancel = () => wave.remove();
  ripple.onfinish = () => {
    wave.remove();
    bookingRipple = undefined;
    if (location.href === startUrl) location.assign(link.href);
  };
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
