const gallery = document.querySelector('.prototype-grid');
const viewer = document.querySelector('.gallery-viewer');
const title = viewer.querySelector('#gallery-image-title');
const photo = viewer.querySelector('.gallery-photo');

gallery.addEventListener('click', (event) => {
  const link = event.target.closest('figure > a');
  if (!link || typeof viewer.showModal !== 'function' || event.defaultPrevented ||
      event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
    return;
  }

  event.preventDefault();
  title.textContent = link.closest('figure').querySelector('figcaption strong').textContent;
  const thumbnail = link.querySelector('img');
  const width = Number(thumbnail.getAttribute('width'));
  const height = Number(thumbnail.getAttribute('height'));
  const image = new Image(width, height);
  image.alt = thumbnail.alt;
  image.src = link.href;
  photo.classList.toggle('watermark-left', link.classList.contains('watermark-left'));
  photo.style.setProperty('--image-ratio', width / height);
  photo.replaceChildren(image);
  viewer.showModal();
});
