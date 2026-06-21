import {
  blockFields,
  fieldImage,
  fieldLink,
  fieldText,
  instrument,
  makeButton,
  makeEl,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const image = fieldImage(
    fields,
    ['image', 'backgroundImage', 'backgroundMedia'],
  );
  const cta = fieldLink(fields, ['ctaLabel', 'linkText', 'buttonText'], ['ctaHref', 'link', 'href'], {
    href: '',
    label: '',
  });
  const heading = fieldText(fields, ['heading', 'title']);

  const section = makeEl('section', 'grace-hero grace-scroll-block');
  instrument(block, section);
  if (image.src) section.style.backgroundImage = `url("${image.src}")`;
  section.append(makeEl('div', 'grace-hero__shade'));

  const content = makeEl('div', 'grace-hero__content');
  if (heading) content.append(makeEl('h1', '', heading));
  if (cta.label) content.append(makeButton(cta));
  section.append(content);
  block.replaceWith(section);
}
