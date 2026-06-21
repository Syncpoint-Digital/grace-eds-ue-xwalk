import {
  blockFields,
  fieldLink,
  fieldText,
  instrument,
  makeButton,
  makeEl,
  makeImage,
  rowValues,
  rows,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const heading = fieldText(fields, 'heading');
  const section = makeEl('section', 'grace-industries grace-section grace-scroll-block');
  instrument(block, section);
  const layout = makeEl('div', 'grace-container grace-industries__layout');
  if (heading) layout.append(makeEl('h2', '', heading));
  const grid = makeEl('div', 'grace-industries__grid');

  rows(block, ['heading', 'ctaLabel', 'ctaHref']).forEach((row) => {
    const values = rowValues(row);
    if (values.length < 2) return;
    const link = makeEl('a', 'grace-industry grace-reveal');
    link.href = values[2]?.link.href || values[2]?.text || '/industries/';
    const image = values.find((value) => value.image.src)?.image;
    const img = makeImage(image?.src, image?.alt);
    if (img) link.append(img);
    link.insertAdjacentHTML('beforeend', `<span>${values[1]?.text || values[0]?.text} <span aria-hidden="true">&rsaquo;</span></span>`);
    grid.append(link);
  });

  const button = makeButton({
    ...fieldLink(fields, ['ctaLabel'], ['ctaHref']),
    className: 'grace-button--white',
  });
  if (button) grid.append(button);
  layout.append(grid);
  section.append(layout);
  block.replaceWith(section);
}
