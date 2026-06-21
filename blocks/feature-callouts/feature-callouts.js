import {
  blockFields,
  fieldHtml,
  fieldImage,
  fieldLink,
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
    const itemFields = blockFields(row);
    if (Object.keys(itemFields).length) {
      const image = fieldImage(itemFields, 'image');
      const body = fieldHtml(itemFields, 'body');
      const cta = fieldLink(itemFields, ['ctaLabel'], ['ctaHref']);
      if (!image.src && !body && !cta.label) return;
      const article = makeEl('article', 'grace-callout grace-reveal');
      const img = makeImage(image.src, image.alt);
      if (img) article.append(img);
      if (body) article.append(makeEl('p', '', body));
      if (cta.label) {
        article.insertAdjacentHTML('beforeend', `<a href="${cta.href || '/'}">${cta.label} <span aria-hidden="true">&rsaquo;</span></a>`);
      }
      grid.append(article);
      return;
    }

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
