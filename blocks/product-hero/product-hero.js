import {
  blockFields,
  fieldImage,
  fieldText,
  finalizeBlock,
  instrument,
  makeEl,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const image = fieldImage(fields, ['image', 'backgroundImage', 'backgroundMedia']);
  const heading = fieldText(fields, 'heading');
  const eyebrow = fieldText(fields, 'eyebrow');
  const summary = fieldText(fields, ['summary', 'body', 'description']);
  const section = makeEl('section', 'grace-product-hero grace-scroll-block');
  instrument(block, section);
  if (image.src) section.style.backgroundImage = `url("${image.src}")`;
  section.innerHTML = `
    <div class="grace-product-hero__shade"></div>
    <div class="grace-container grace-product-hero__inner">
      <nav aria-label="Breadcrumb" class="grace-product-hero__breadcrumbs">
        <a href="/">Home</a>
        <a href="/products/">Products</a>
        <span>${heading}</span>
      </nav>
      <div class="grace-product-hero__copy">
        ${eyebrow ? `<span>${eyebrow}</span>` : ''}
        ${heading ? `<h1>${heading}</h1>` : ''}
        ${summary ? `<p>${summary}</p>` : ''}
      </div>
    </div>
  `;
  finalizeBlock(block, section, 'Product Hero', Boolean(image.src || heading || eyebrow || summary));
}
