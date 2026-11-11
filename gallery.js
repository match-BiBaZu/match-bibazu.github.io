const gallery = document.querySelector('.prototype-grid');
const viewer = document.querySelector('.gallery-viewer');
const title = document.querySelector('#gallery-image-title');
const frame = viewer.querySelector('.gallery-image-frame');
const zoom = document.querySelector('#gallery-zoom');
const close = document.querySelector('#gallery-close');
const image = new Image();
frame.append(image);

gallery.addEventListener('click', (event) => {
  const link = event.target.closest('figure > a');
  if (!link || typeof viewer.showModal !== 'function' || event.defaultPrevented ||
      event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
    return;
  }

  event.preventDefault();
  title.textContent = link.closest('figure').querySelector('figcaption strong').textContent;
  image.alt = link.querySelector('img').alt;
  image.classList.remove('is-zoomed');
  image.style.removeProperty('width');
  zoom.textContent = 'Zoom in';
  zoom.disabled = true;
  image.src = link.href;
  if (image.complete && image.naturalWidth) zoom.disabled = false;
  viewer.showModal();
  frame.scrollTo(0, 0);
});

image.addEventListener('load', () => {
  zoom.disabled = false;
});

zoom.addEventListener('click', () => {
  if (image.classList.contains('is-zoomed')) {
    image.classList.remove('is-zoomed');
    image.style.removeProperty('width');
    zoom.textContent = 'Zoom in';
    frame.scrollTo(0, 0);
  } else {
    const width = image.clientWidth;
    const height = image.clientHeight;
    image.style.width = `${width * 2}px`;
    image.classList.add('is-zoomed');
    zoom.textContent = 'Zoom out';
    frame.scrollTo(width / 2, height / 2);
  }
});

close.addEventListener('click', () => viewer.close());
