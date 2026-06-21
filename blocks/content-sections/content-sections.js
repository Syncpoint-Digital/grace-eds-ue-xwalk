import {
  blockFields,
  fieldText,
  finalizeBlock,
  instrument,
  makeButton,
  makeEl,
  makeImage,
  rowValues,
  rows,
  valuesHaveContent,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const section = makeEl('section', 'grace-content-sections grace-section grace-scroll-block');
  instrument(block, section);
  const stack = makeEl('div', 'grace-container grace-content-sections__stack');
  const entries = rows(block, ['heading']).filter((row) => row.children.length > 1 && valuesHaveContent(rowValues(row)));

  entries.forEach((row) => {
    const values = rowValues(row);
    const image = values.find((value) => value.image.src)?.image;
    const article = makeEl('article', `grace-content-section ${image?.src ? 'grace-content-section--with-image' : ''} grace-reveal`);
    const img = makeImage(image?.src, image?.alt);
    if (img) article.append(img);
    const copy = makeEl('div');
    if (values[1]?.text) copy.append(makeEl('span', '', values[1].text));
    copy.append(makeEl('h2', '', values[2]?.text || values[0]?.text || fieldText(fields, 'heading')));
    copy.insertAdjacentHTML('beforeend', values[3]?.html || values[1]?.html || '');
    if (values[4]?.text) copy.append(makeButton({ href: values[5]?.link.href || values[5]?.text || '/', label: values[4].text }));
    article.append(copy);
    stack.append(article);
  });

  if (!entries.length && (fieldText(fields, 'heading') || fieldText(fields, ['body', 'description']))) {
    const article = makeEl('article', 'grace-content-section grace-reveal');
    article.append(makeEl('div', '', `<h2>${fieldText(fields, 'heading')}</h2><p>${fieldText(fields, ['body', 'description'])}</p>`));
    stack.append(article);
  }

  section.append(stack);
  finalizeBlock(block, section, 'Content Sections', Boolean(stack.children.length));
}
