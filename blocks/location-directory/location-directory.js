import {
  blockFields, fieldText, instrument, makeEl, makeImage, rowValues, rows,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const section = makeEl('section', 'grace-locations grace-section grace-scroll-block');
  instrument(block, section);
  const container = makeEl('div', 'grace-container');
  container.append(makeEl('h2', '', fieldText(fields, 'heading', 'Locations')));
  const grid = makeEl('div', 'grace-locations__grid');
  rows(block, ['heading']).forEach((row) => {
    const values = rowValues(row);
    const location = makeEl('article', 'grace-location grace-reveal');
    const image = values.find((value) => value.image.src)?.image;
    const img = makeImage(image?.src, image?.alt);
    if (img) location.append(img);
    const copy = makeEl('div');
    copy.append(makeEl('span', '', values[1]?.text || values[0]?.text || 'Grace location'));
    copy.append(makeEl('h4', '', values[2]?.text || values[1]?.text || 'Location'));
    copy.append(makeEl('p', '', values[3]?.text || ''));
    copy.append(makeEl('strong', '', values[4]?.text || ''));
    location.append(copy);
    grid.append(location);
  });
  container.append(grid);
  section.append(container);
  block.replaceWith(section);
}
