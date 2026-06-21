import {
  blockFields,
  fieldImage,
  fieldLink,
  fieldText,
  finalizeBlock,
  findImage,
  findLink,
  instrument,
  makeButton,
  makeEl,
  rows,
  textContent,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const authoredRows = rows(block);
  const rowCells = authoredRows.map((row) => row.children[0]).filter(Boolean);
  const fieldImageValue = fieldImage(
    fields,
    ['image', 'backgroundImage', 'backgroundMedia'],
  );
  const image = fieldImageValue.src ? fieldImageValue : findImage(rowCells[0]);
  const fieldCta = fieldLink(fields, ['ctaLabel', 'linkText', 'buttonText'], ['ctaHref', 'link', 'href'], {
    href: '',
    label: '',
  });
  const rowLink = findLink(rowCells[3]);
  const cta = {
    href: fieldCta.href || rowLink.href || '',
    label: fieldCta.label || textContent(rowCells[2]),
  };
  const heading = fieldText(fields, ['heading', 'title']) || textContent(rowCells[1]);

  const section = makeEl('section', 'grace-hero grace-scroll-block');
  instrument(block, section);
  if (image.src) section.style.backgroundImage = `url("${image.src}")`;
  section.append(makeEl('div', 'grace-hero__shade'));

  const content = makeEl('div', 'grace-hero__content');
  if (heading) content.append(makeEl('h1', '', heading));
  if (cta.label) content.append(makeButton(cta));
  section.append(content);
  finalizeBlock(block, section, 'Hero', Boolean(image.src || heading || cta.label));
}
