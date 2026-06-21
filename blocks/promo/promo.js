import {
  blockFields,
  fieldLink,
  fieldText,
  instrument,
  makeButton,
  makeEl,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const cta = fieldLink(fields, ['ctaLabel', 'linkText'], ['ctaHref', 'link', 'href'], {
    href: '',
    label: '',
  });
  const eyebrow = fieldText(fields, 'eyebrow');
  const body = fieldText(fields, ['body', 'description']);

  const section = makeEl('section', 'grace-promo grace-promo--pattern grace-scroll-block');
  instrument(block, section);
  const inner = makeEl('div', 'grace-container grace-promo__inner');
  const copy = makeEl('div', 'grace-promo__copy');
  if (eyebrow) copy.append(makeEl('span', '', eyebrow));
  if (body) copy.append(makeEl('p', '', body));
  if (cta.label) copy.append(makeButton(cta));

  const proof = makeEl('div', 'grace-promo__proof grace-reveal');
  proof.setAttribute('aria-label', 'Grace company highlights');

  inner.append(copy, proof);
  section.append(inner);
  block.replaceWith(section);
}
