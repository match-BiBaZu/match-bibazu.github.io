const gallery = document.querySelector('.prototype-grid');
const viewer = document.querySelector('.gallery-viewer');
const title = viewer.querySelector('#gallery-image-title');
const frame = viewer.querySelector('.gallery-image-frame');

gallery.addEventListener('click', (event) => {
  const link = event.target.closest('figure > a');
  if (!link || typeof viewer.showModal !== 'function' || event.defaultPrevented ||
      event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
    return;
  }

  event.preventDefault();
  title.textContent = link.closest('figure').querySelector('figcaption strong').textContent;
  const image = new Image();
  image.alt = link.querySelector('img').alt;
  image.src = link.href;
  frame.replaceChildren(image);
  viewer.showModal();
});
