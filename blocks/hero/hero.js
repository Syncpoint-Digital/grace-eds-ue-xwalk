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
    'https://grace.com/content/dam/grace-site/english/hero/home/homepage-option-7-one-grace.jpg',
  );
  const cta = fieldLink(fields, ['ctaLabel', 'linkText', 'buttonText'], ['ctaHref', 'link', 'href'], {
    href: '/products/',
    label: 'Discover Innovative Solutions',
  });

  const section = makeEl('section', 'grace-hero grace-scroll-block');
  instrument(block, section);
  if (image.src) section.style.backgroundImage = `url("${image.src}")`;
  section.append(makeEl('div', 'grace-hero__shade'));

  const content = makeEl('div', 'grace-hero__content');
  content.append(makeEl('h1', '', fieldText(fields, ['heading', 'title'], 'It\u2019s not just about science - it\u2019s about people.')));
  content.append(makeButton(cta));
  section.append(content);
  block.replaceWith(section);
}
