// On narrow screens the sidebar sits above the content, and the framed intro
// on the home page (.research-frame) fills the rest of the first screen below
// it. Keep the sidebar's current height in the --sidebar-height custom
// property for that; it changes when the photo loads or the window resizes.
(function () {
  var sidebar = document.getElementById('sidebar');
  if (!sidebar) return;
  var root = document.documentElement;
  function update() {
    root.style.setProperty('--sidebar-height', sidebar.offsetHeight + 'px');
  }
  update();
  window.addEventListener('resize', update);
  if ('ResizeObserver' in window) new ResizeObserver(update).observe(sidebar);
})();
