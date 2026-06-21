import {
  blockFields,
  fieldImage,
  fieldLink,
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

function renderInsight(values, featured = false) {
  const link = makeEl('a', `grace-insight ${featured ? 'grace-insight--featured' : 'grace-insight--compact'} grace-reveal`);
  link.href = values[4]?.link.href || values[3]?.link.href || values[3]?.text || '/insights/';
  const image = values.find((value) => value.image.src)?.image;
  if (featured) {
    const img = makeImage(image?.src, image?.alt);
    if (img) link.append(img);
    link.append(makeEl('span', '', values[1]?.text || values[0]?.text));
    link.append(makeEl('h3', '', values[2]?.text || values[1]?.text));
  } else {
    const copy = makeEl('div');
    copy.append(makeEl('span', '', values[1]?.text || values[0]?.text));
    copy.append(makeEl('h3', '', values[2]?.text || values[1]?.text));
    link.append(copy);
    const img = makeImage(image?.src, image?.alt);
    if (img) link.append(img);
  }
  return link;
}

export default function decorate(block) {
  const fields = blockFields(block);
  const heading = fieldText(fields, 'heading');
  const section = makeEl('section', 'grace-insights grace-section grace-scroll-block');
  instrument(block, section);
  const container = makeEl('div', 'grace-container');
  if (heading) container.append(makeEl('h2', '', heading));
  const layout = makeEl('div', 'grace-insights__layout');
  const items = rows(block, ['heading', 'ctaLabel', 'ctaHref'])
    .map((row) => {
      const itemFields = blockFields(row);
      if (Object.keys(itemFields).length) {
        const image = fieldImage(itemFields, 'image');
        const category = fieldText(itemFields, 'category');
        const title = fieldText(itemFields, 'title');
        const link = fieldLink(itemFields, ['title'], ['link']);
        return [
          { image, text: image.src, link: { href: '', label: '' } },
          { image: { alt: '', src: '' }, text: category, link: { href: '', label: '' } },
          { image: { alt: '', src: '' }, text: title, link: { href: '', label: '' } },
          { image: { alt: '', src: '' }, text: link.href, link: { href: link.href, label: link.label } },
        ];
      }
      return rowValues(row);
    })
    .filter((values) => values.length >= 3 && valuesHaveContent(values));
  if (items[0]) layout.append(renderInsight(items[0], true));
  const list = makeEl('div', 'grace-insights__list');
  items.slice(1).forEach((values) => list.append(renderInsight(values)));
  layout.append(list);
  container.append(layout);
  const button = makeButton(fieldLink(fields, ['ctaLabel'], ['ctaHref']));
  if (button) container.append(button);
  section.append(container);
  finalizeBlock(block, section, 'Insights', Boolean(heading || items.length || button));
}
