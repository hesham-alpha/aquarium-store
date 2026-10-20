(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const gameGrid = document.querySelector('.game-grid');
  let lastEdgeRipple = 0;
  let lastGridRipple = 0;

  function addGridRipple(event) {
    if (!gameGrid || event.target !== gameGrid) return;
    const now = performance.now();
    if (now - lastGridRipple < 125) return;
    lastGridRipple = now;
    const bounds = gameGrid.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'grid-ripple';
    ripple.style.left = `${event.clientX - bounds.left}px`;
    ripple.style.top = `${event.clientY - bounds.top}px`;
    gameGrid.append(ripple);
    ripple.addEventListener('animationend', () => ripple.remove(), {once:true});
  }

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
    addGridRipple(event);
    addEdgeRipple(event);
  }, {passive:true});
})();
