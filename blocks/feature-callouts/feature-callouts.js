import {
  instrument,
  makeEl,
  makeImage,
  rowValues,
  rows,
} from '../../scripts/grace-utils.js';

const defaultCallouts = [
  [
    'https://grace.com/content/dam/grace-site/english/hero/materials-technologies/mt-adsorbents-employee-FINAL-3000x1360.jpg',
    'We partner with customers to solve complex chemistry, manufacturing, and performance challenges.',
    'Explore Products',
    '/products/',
  ],
  [
    'https://grace.com/content/dam/grace-site/english/hero/specialty-catalysts/sc_catalysts_employee.jpg',
    'Our global teams bring technical expertise and practical support to the industries that shape daily life.',
    'Meet Grace',
    '/about-grace/',
  ],
];

function renderCallout([src, body, label, href]) {
  const article = makeEl('article', 'grace-callout grace-reveal');
  const img = makeImage(src, label);
  if (img) article.append(img);
  article.append(makeEl('p', '', body));
  article.insertAdjacentHTML('beforeend', `<a href="${href || '/'}">${label || 'Learn more'} <span aria-hidden="true">&rsaquo;</span></a>`);
  return article;
}

export default function decorate(block) {
  const section = makeEl('section', 'grace-callouts grace-section grace-scroll-block');
  instrument(block, section);
  const grid = makeEl('div', 'grace-container grace-callouts__grid');

  rows(block).forEach((row) => {
    const values = rowValues(row);
    if (values.length < 2) return;
    const article = makeEl('article', 'grace-callout grace-reveal');
    const image = values.find((value) => value.image.src)?.image;
    const img = makeImage(image?.src, image?.alt);
    if (img) article.append(img);
    article.append(makeEl('p', '', values[1]?.html || values[0]?.html));
    article.insertAdjacentHTML('beforeend', `<a href="${values[3]?.link.href || values[2]?.link.href || '/'}">${values[2]?.text || 'Learn more'} <span aria-hidden="true">&rsaquo;</span></a>`);
    grid.append(article);
  });
  if (!grid.children.length) {
    defaultCallouts.forEach((callout) => grid.append(renderCallout(callout)));
  }

  section.append(grid);
  block.replaceWith(section);
}
