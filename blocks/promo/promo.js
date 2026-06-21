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
    href: '/about-grace/',
    label: 'Learn about Grace',
  });

  const section = makeEl('section', 'grace-promo grace-promo--pattern grace-scroll-block');
  instrument(block, section);
  const inner = makeEl('div', 'grace-container grace-promo__inner');
  const copy = makeEl('div', 'grace-promo__copy');
  copy.append(makeEl('span', '', fieldText(fields, 'eyebrow', 'Grace at a glance')));
  copy.append(makeEl('p', '', fieldText(
    fields,
    ['body', 'description'],
    'A global leader in specialty chemicals, Grace produces high-performance chemicals and science-based solutions that enable industries to enhance modern life.',
  )));
  copy.append(makeButton(cta));

  const proof = makeEl('div', 'grace-promo__proof grace-reveal');
  proof.setAttribute('aria-label', 'Grace company highlights');
  ['Global|Serving essential industries worldwide', 'Specialty|Chemistry built for complex processes', 'Science-led|Solutions that help improve modern life']
    .forEach((item) => {
      const [title, text] = item.split('|');
      proof.insertAdjacentHTML('beforeend', `<div><strong>${title}</strong><span>${text}</span></div>`);
    });

  inner.append(copy, proof);
  section.append(inner);
  block.replaceWith(section);
}
