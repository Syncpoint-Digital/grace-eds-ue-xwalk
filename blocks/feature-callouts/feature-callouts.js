import {
  finalizeBlock,
  instrument,
  makeEl,
  makeImage,
  rowValues,
  rows,
  valuesHaveContent,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const section = makeEl('section', 'grace-callouts grace-section grace-scroll-block');
  instrument(block, section);
  const grid = makeEl('div', 'grace-container grace-callouts__grid');

  rows(block).forEach((row) => {
    const values = rowValues(row);
    if (values.length < 2 || !valuesHaveContent(values)) return;
    const article = makeEl('article', 'grace-callout grace-reveal');
    const image = values.find((value) => value.image.src)?.image;
    const img = makeImage(image?.src, image?.alt);
    if (img) article.append(img);
    article.append(makeEl('p', '', values[1]?.html || values[0]?.html));
    const label = values[2]?.text;
    if (label) {
      article.insertAdjacentHTML('beforeend', `<a href="${values[3]?.link.href || values[2]?.link.href || '/'}">${label} <span aria-hidden="true">&rsaquo;</span></a>`);
    }
    grid.append(article);
  });

  section.append(grid);
  finalizeBlock(block, section, 'Feature Callouts', Boolean(grid.children.length));
}
