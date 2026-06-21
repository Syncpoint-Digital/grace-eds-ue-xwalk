import {
  blockFields, fieldText, instrument, makeEl, makeImage, rowValues, rows,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const section = makeEl('section', 'grace-about-hub grace-section grace-scroll-block');
  instrument(block, section);
  const container = makeEl('div', 'grace-container');
  const heading = fieldText(fields, 'heading');
  if (heading) container.append(makeEl('h2', '', heading));
  const grid = makeEl('div', 'grace-about-hub__grid');
  rows(block, ['heading']).forEach((row) => {
    const values = rowValues(row);
    if (values.length < 2) return;
    const card = makeEl('a', 'grace-about-card grace-reveal');
    card.href = values[3]?.link.href || values[3]?.text || '/about-grace/';
    const image = values.find((value) => value.image.src)?.image;
    const img = makeImage(image?.src, image?.alt);
    if (img) card.append(img);
    card.append(makeEl('h3', '', values[1]?.text || values[0]?.text));
    card.append(makeEl('p', '', values[2]?.text || ''));
    grid.append(card);
  });
  container.append(grid);
  section.append(container);
  block.replaceWith(section);
}
