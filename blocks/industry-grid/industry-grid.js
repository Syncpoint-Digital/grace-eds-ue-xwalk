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

const defaultIndustries = [
  [
    'https://grace.com/content/dam/grace-site/english/hero/materials-technologies/mt-adsorbents-employee-FINAL-3000x1360.jpg',
    'Packaging',
    '/industries/packaging/',
  ],
  [
    'https://grace.com/content/dam/grace-site/english/hero/specialty-catalysts/sc_catalysts_employee.jpg',
    'Energy',
    '/industries/energy/',
  ],
  [
    'https://grace.scene7.com/is/image/grace/sc-chemicals-woman-lab-looking',
    'Pharmaceuticals',
    '/industries/pharmaceuticals/',
  ],
  [
    'https://grace.com/content/dam/grace-site/english/hero/materials-technologies/mt-synthetic-silicas-worms-employee.jpg',
    'Food and Beverage',
    '/industries/food-and-beverage/',
  ],
];

function renderIndustry([src, title, href]) {
  const link = makeEl('a', 'grace-industry grace-reveal');
  link.href = href || '/industries/';
  const img = makeImage(src, title);
  if (img) link.append(img);
  link.insertAdjacentHTML('beforeend', `<span>${title} <span aria-hidden="true">&rsaquo;</span></span>`);
  return link;
}

export default function decorate(block) {
  const fields = blockFields(block);
  const section = makeEl('section', 'grace-industries grace-section grace-scroll-block');
  instrument(block, section);
  const layout = makeEl('div', 'grace-container grace-industries__layout');
  layout.append(makeEl('h2', '', fieldText(fields, 'heading', 'Specialty chemistry for essential industries')));
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
  if (!grid.children.length) {
    defaultIndustries.forEach((industry) => grid.append(renderIndustry(industry)));
  }

  grid.append(makeButton({
    ...fieldLink(fields, ['ctaLabel'], ['ctaHref'], { href: '/industries/', label: 'View all Industries' }),
    className: 'grace-button--white',
  }));
  layout.append(grid);
  section.append(layout);
  block.replaceWith(section);
}
