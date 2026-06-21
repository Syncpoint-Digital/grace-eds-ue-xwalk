import {
  blockFields,
  fieldImage,
  fieldText,
  instrument,
  makeEl,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const image = fieldImage(fields, ['image', 'backgroundImage', 'backgroundMedia']);
  const heading = fieldText(fields, 'heading');
  const eyebrow = fieldText(fields, 'eyebrow');
  const summary = fieldText(fields, ['summary', 'body', 'description']);
  const section = makeEl('section', 'grace-page-hero grace-scroll-block');
  instrument(block, section);
  if (image.src) section.style.backgroundImage = `url("${image.src}")`;
  section.innerHTML = `
    <div class="grace-page-hero__shade"></div>
    <div class="grace-container grace-page-hero__inner">
      <nav aria-label="Breadcrumb" class="grace-page-hero__breadcrumbs">
        <a href="/">Home</a>
        <span>${heading}</span>
      </nav>
      <div class="grace-page-hero__copy">
        ${eyebrow ? `<span>${eyebrow}</span>` : ''}
        ${heading ? `<h1>${heading}</h1>` : ''}
        ${summary ? `<p>${summary}</p>` : ''}
      </div>
    </div>
  `;
  block.replaceWith(section);
}
