import {
  blockFields,
  fieldImage,
  fieldText,
  getVideoEmbedUrl,
  instrument,
  makeEl,
  makeImage,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const index = document.querySelectorAll('.grace-video').length + 1;
  const modalId = `grace-video-modal-${index}`;
  const heading = fieldText(fields, 'heading', 'Where innovation meets opportunity.');
  const label = fieldText(fields, ['ctaLabel', 'buttonText'], 'Watch the video');
  const embedUrl = getVideoEmbedUrl(fieldText(fields, ['videoUrl', 'url'], 'https://youtu.be/n1hZEU19AfI'));
  const image = fieldImage(
    fields,
    ['image', 'poster'],
    'https://grace.com/content/dam/grace-site/english/video-still/Video-Still-We-Are-Grace.jpg',
  );

  const section = makeEl('section', 'grace-video grace-section grace-scroll-block');
  instrument(block, section);
  const panel = makeEl('div', 'grace-container grace-video__panel');
  const copy = makeEl('div', 'grace-video__copy');
  copy.append(makeEl('p', '', fieldText(fields, 'eyebrow', 'We Are Grace')));
  copy.append(makeEl('h2', '', heading));
  copy.insertAdjacentHTML('beforeend', `<button data-grace-video-open="${modalId}" data-grace-video-src="${embedUrl}" type="button">${label} <span aria-hidden="true">&rsaquo;</span></button>`);

  const imageButton = makeEl('button', 'grace-video__image');
  imageButton.type = 'button';
  imageButton.setAttribute('aria-label', `${label}: ${heading}`);
  imageButton.setAttribute('data-grace-video-open', modalId);
  imageButton.setAttribute('data-grace-video-src', embedUrl);
  const img = makeImage(image.src, image.alt);
  if (img) imageButton.append(img);
  imageButton.insertAdjacentHTML('beforeend', '<span aria-hidden="true" class="grace-video__play">&#9654;</span>');

  panel.append(copy, imageButton);
  section.append(panel);
  section.insertAdjacentHTML('beforeend', `
    <div aria-hidden="true" class="grace-video-modal" id="${modalId}">
      <button aria-label="Close video" class="grace-video-modal__backdrop" data-grace-video-close type="button"></button>
      <div aria-label="${heading}" aria-modal="true" class="grace-video-modal__dialog" role="dialog">
        <button aria-label="Close video" class="grace-video-modal__close" data-grace-video-close type="button">&#215;</button>
        <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin" title="${heading}"></iframe>
      </div>
    </div>
  `);
  block.replaceWith(section);
}
