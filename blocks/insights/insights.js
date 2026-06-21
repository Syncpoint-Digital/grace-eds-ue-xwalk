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

const defaultInsights = [
  [
    'https://grace.scene7.com/is/image/grace/sc-chemicals-woman-lab-looking',
    'Article',
    'Science-led solutions for essential industries',
    '/insights/',
  ],
  [
    'https://grace.com/content/dam/grace-site/english/hero/specialty-catalysts/sc_catalysts_employee.jpg',
    'Innovation',
    'How Grace teams help customers move performance forward',
    '/insights/',
  ],
  [
    'https://grace.com/content/dam/grace-site/english/hero/materials-technologies/mt-synthetic-silicas-worms-employee.jpg',
    'Products',
    'Materials technologies designed for everyday impact',
    '/insights/',
  ],
];

function renderInsight(values, featured = false) {
  const link = makeEl('a', `grace-insight ${featured ? 'grace-insight--featured' : 'grace-insight--compact'} grace-reveal`);
  link.href = values[4]?.link.href || values[3]?.link.href || values[3]?.text || '/insights/';
  const image = values.find((value) => value.image.src)?.image;
  if (featured) {
    const img = makeImage(image?.src, image?.alt);
    if (img) link.append(img);
    link.append(makeEl('span', '', values[1]?.text || values[0]?.text));
    link.append(makeEl('h3', '', values[2]?.text || values[1]?.text));
    link.insertAdjacentHTML('beforeend', '<strong>Read more &rsaquo;</strong>');
  } else {
    const copy = makeEl('div');
    copy.append(makeEl('span', '', values[1]?.text || values[0]?.text));
    copy.append(makeEl('h3', '', values[2]?.text || values[1]?.text));
    copy.insertAdjacentHTML('beforeend', '<strong>Read more &rsaquo;</strong>');
    link.append(copy);
    const img = makeImage(image?.src, image?.alt);
    if (img) link.append(img);
  }
  return link;
}

export default function decorate(block) {
  const fields = blockFields(block);
  const section = makeEl('section', 'grace-insights grace-section grace-scroll-block');
  instrument(block, section);
  const container = makeEl('div', 'grace-container');
  container.append(makeEl('h2', '', fieldText(fields, 'heading', 'Insights from Grace')));
  const layout = makeEl('div', 'grace-insights__layout');
  const items = rows(block, ['heading', 'ctaLabel', 'ctaHref']).map(rowValues).filter((values) => values.length >= 3);
  if (!items.length) {
    defaultInsights.forEach((values) => items.push(values.map((text, index) => ({
      html: text,
      image: index === 0 ? { alt: values[2], src: text } : { alt: '', src: '' },
      link: { href: index === 3 ? text : '/', label: '' },
      text,
    }))));
  }
  if (items[0]) layout.append(renderInsight(items[0], true));
  const list = makeEl('div', 'grace-insights__list');
  items.slice(1).forEach((values) => list.append(renderInsight(values)));
  layout.append(list);
  container.append(layout);
  container.append(makeButton(fieldLink(fields, ['ctaLabel'], ['ctaHref'], { href: '/insights/', label: 'View all insights' })));
  section.append(container);
  block.replaceWith(section);
}
