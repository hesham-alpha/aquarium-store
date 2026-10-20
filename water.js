(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let lastEdgeRipple = 0;

  function addEdgeRipple(event) {
    if (event.target.closest?.('.app-shell')) return;
    const now = performance.now();
    if (now - lastEdgeRipple < 130) return;
    lastEdgeRipple = now;
    const ripple = document.createElement('span');
    ripple.className = 'water-ripple';
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    document.body.append(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), {once:true});
  }

  document.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    addEdgeRipple(event);
  }, {passive:true});
})();
