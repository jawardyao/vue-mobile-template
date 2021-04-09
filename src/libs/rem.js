const baseSize = 100;

function setRem() {
  const scale = document.documentElement.clientWidth / 375;
  document.documentElement.style.fontSize = baseSize * scale + 'px';
}
setRem();

window.addEventListener('resize', () => {
  setRem();
});
