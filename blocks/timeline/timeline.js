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
  const section = makeEl('section', 'grace-timeline grace-section grace-scroll-block');
  instrument(block, section);
  const container = makeEl('div', 'grace-container');
  const heading = fieldText(fields, 'heading');
  if (heading) container.append(makeEl('h2', '', heading));
  const eras = makeEl('div', 'grace-timeline__eras');
  let currentEra;
  rows(block, ['heading']).forEach((row) => {
    const values = rowValues(row);
    if (!valuesHaveContent(values)) return;
    if ((values[0]?.text || '').toLowerCase() === 'era' || values.length === 1) {
      currentEra = makeEl('section', 'grace-timeline__era');
      currentEra.append(makeEl('h3', '', values[1]?.text || values[0]?.text));
      currentEra.append(makeEl('div', 'grace-timeline__events'));
      eras.append(currentEra);
      return;
    }
    if (!currentEra) {
      currentEra = makeEl('section', 'grace-timeline__era');
      currentEra.append(makeEl('div', 'grace-timeline__events'));
      eras.append(currentEra);
    }
    const event = makeEl('article', 'grace-timeline__event grace-reveal');
    const image = values.find((value) => value.image.src)?.image;
    const img = makeImage(image?.src, image?.alt);
    if (img) event.append(img);
    event.append(makeEl('strong', '', values[1]?.text || values[0]?.text));
    event.append(makeEl('p', '', values[2]?.text || values[1]?.text || ''));
    currentEra.querySelector('.grace-timeline__events').append(event);
  });
  container.append(eras);
  section.append(container);
  finalizeBlock(block, section, 'Timeline', Boolean(heading || eras.children.length));
}
