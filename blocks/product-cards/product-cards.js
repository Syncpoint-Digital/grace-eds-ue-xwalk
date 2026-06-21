import {
  blockFields,
  fieldText,
  instrument,
  makeEl,
  makeImage,
  rowValues,
  rows,
} from '../../scripts/grace-utils.js';

const defaultCards = [
  [
    'https://grace.com/content/dam/grace-site/english/hero/materials-technologies/mt-adsorbents-employee-FINAL-3000x1360.jpg',
    'Adsorbents',
    'Purify your processes with precision.',
    '/products/adsorbents/',
  ],
  [
    'https://grace.com/content/dam/grace-site/english/hero/specialty-catalysts/sc_catalysts_employee.jpg',
    'Catalysts',
    'Power your performance at scale.',
    '/products/catalysts/',
  ],
  [
    'https://grace.scene7.com/is/image/grace/sc-chemicals-woman-lab-looking',
    'Fine Chemicals',
    'Advance your molecule to market.',
    '/products/fine-chemicals/',
  ],
  [
    'https://grace.com/content/dam/grace-site/english/hero/materials-technologies/mt-synthetic-silicas-worms-employee.jpg',
    'Synthetic Silicas',
    'Enhance your products and productivity.',
    '/products/synthetic-silicas/',
  ],
];

function renderCard([src, title, description, href]) {
  const card = makeEl('a', 'grace-product grace-reveal');
  card.href = href || '/products/';
  const img = makeImage(src, title);
  if (img) card.append(img);
  card.append(makeEl('h3', '', title));
  card.append(makeEl('p', '', description));
  return card;
}

export default function decorate(block) {
  const fields = blockFields(block);
  const section = makeEl('section', 'grace-products grace-section grace-scroll-block');
  instrument(block, section);
  const container = makeEl('div', 'grace-container');
  container.append(makeEl('h2', '', fieldText(fields, 'heading', 'Products solving next-generation problems')));
  const grid = makeEl('div', 'grace-products__grid');
  const authoredRows = rows(block, ['heading']);

  authoredRows.forEach((row) => {
    const values = rowValues(row);
    if (values.length < 2) return;
    const card = makeEl('a', 'grace-product grace-reveal');
    card.href = values[3]?.link.href || values[3]?.text || values[2]?.link.href || '/products/';
    const image = values.find((value) => value.image.src)?.image;
    const img = makeImage(image?.src, image?.alt);
    if (img) card.append(img);
    card.append(makeEl('h3', '', values[1]?.text || values[0]?.text));
    card.append(makeEl('p', '', values[2]?.text || ''));
    grid.append(card);
  });
  if (!grid.children.length) defaultCards.forEach((card) => grid.append(renderCard(card)));

  container.append(grid);
  section.append(container);
  block.replaceWith(section);
}
