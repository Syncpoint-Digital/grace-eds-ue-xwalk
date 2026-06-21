import {
  blockFields,
  fieldText,
  finalizeBlock,
  instrument,
  makeEl,
  makeImage,
  rowValues,
  rows,
  valuesHaveContent,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const section = makeEl('section', 'grace-locations grace-section grace-scroll-block');
  instrument(block, section);
  const container = makeEl('div', 'grace-container');
  const heading = fieldText(fields, 'heading');
  if (heading) container.append(makeEl('h2', '', heading));
  const grid = makeEl('div', 'grace-locations__grid');
  rows(block, ['heading']).forEach((row) => {
    const values = rowValues(row);
    if (!valuesHaveContent(values)) return;
    const location = makeEl('article', 'grace-location grace-reveal');
    const image = values.find((value) => value.image.src)?.image;
    const img = makeImage(image?.src, image?.alt);
    if (img) location.append(img);
    const copy = makeEl('div');
    if (values[1]?.text || values[0]?.text) copy.append(makeEl('span', '', values[1]?.text || values[0]?.text));
    if (values[2]?.text || values[1]?.text) copy.append(makeEl('h4', '', values[2]?.text || values[1]?.text));
    if (values[3]?.text) copy.append(makeEl('p', '', values[3].text));
    if (values[4]?.text) copy.append(makeEl('strong', '', values[4].text));
    location.append(copy);
    grid.append(location);
  });
  container.append(grid);
  section.append(container);
  finalizeBlock(block, section, 'Location Directory', Boolean(heading || grid.children.length));
}
