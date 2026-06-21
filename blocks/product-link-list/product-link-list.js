import {
  blockFields, fieldText, instrument, makeEl, rowValues, rows,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const section = makeEl('section', 'grace-product-links grace-section grace-scroll-block');
  instrument(block, section);
  const container = makeEl('div', 'grace-container');
  const heading = fieldText(fields, 'heading');
  if (heading) container.append(makeEl('h2', '', heading));
  const grid = makeEl('div', 'grace-product-links__grid');
  let currentGroup;

  rows(block, ['heading']).forEach((row) => {
    const values = rowValues(row);
    const type = (values[0]?.text || '').toLowerCase();
    if (type === 'group' || values.length === 1) {
      currentGroup = makeEl('section', 'grace-product-links__group grace-reveal');
      currentGroup.append(makeEl('h3', '', values[1]?.text || values[0]?.text));
      currentGroup.append(makeEl('ul'));
      grid.append(currentGroup);
      return;
    }
    if (!currentGroup) {
      currentGroup = makeEl('section', 'grace-product-links__group grace-reveal');
      currentGroup.append(makeEl('ul'));
      grid.append(currentGroup);
    }
    const li = makeEl('li');
    li.innerHTML = `<a href="${values[2]?.link.href || values[1]?.link.href || values[1]?.text || '/products/'}">${values[1]?.text || values[0]?.text} <span aria-hidden="true">&rsaquo;</span></a>`;
    currentGroup.querySelector('ul').append(li);
  });

  container.append(grid);
  section.append(container);
  block.replaceWith(section);
}
