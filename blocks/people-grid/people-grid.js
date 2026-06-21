import {
  blockFields, fieldText, instrument, makeEl, makeImage, rowValues, rows,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const section = makeEl('section', 'grace-people grace-section grace-scroll-block');
  instrument(block, section);
  const container = makeEl('div', 'grace-container');
  const heading = fieldText(fields, 'heading');
  if (heading) container.append(makeEl('h2', '', heading));
  const grid = makeEl('div', 'grace-people__grid');
  rows(block, ['heading']).forEach((row) => {
    const values = rowValues(row);
    const person = makeEl('article', 'grace-person grace-reveal');
    const image = values.find((value) => value.image.src)?.image;
    const img = makeImage(image?.src, image?.alt);
    if (img) person.append(img);
    person.append(makeEl('h3', '', values[1]?.text || values[0]?.text));
    person.append(makeEl('p', '', values[2]?.text || ''));
    const href = values[3]?.link.href || values[3]?.text;
    if (href) person.insertAdjacentHTML('beforeend', `<a href="${href}">${values[3]?.link.label || values[3]?.text || values[1]?.text} <span aria-hidden="true">&rsaquo;</span></a>`);
    grid.append(person);
  });
  container.append(grid);
  section.append(container);
  block.replaceWith(section);
}
