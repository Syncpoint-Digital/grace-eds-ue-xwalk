import {
  blockFields, fieldText, instrument, makeEl, rowValues, rows,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const section = makeEl('section', 'grace-awards grace-section grace-scroll-block');
  instrument(block, section);
  const container = makeEl('div', 'grace-container');
  container.append(makeEl('h2', '', fieldText(fields, 'heading', 'Awards and Recognition')));
  const years = makeEl('div', 'grace-awards__years');
  let currentYear;
  rows(block, ['heading']).forEach((row) => {
    const values = rowValues(row);
    if (/^\d{4}$/.test(values[0]?.text || '') || (values[0]?.text || '').toLowerCase() === 'year') {
      currentYear = makeEl('section', 'grace-awards__year grace-reveal');
      currentYear.append(makeEl('h3', '', values[1]?.text || values[0]?.text));
      currentYear.append(makeEl('ul'));
      years.append(currentYear);
      return;
    }
    if (!currentYear) {
      currentYear = makeEl('section', 'grace-awards__year grace-reveal');
      currentYear.append(makeEl('h3', '', 'Awards'));
      currentYear.append(makeEl('ul'));
      years.append(currentYear);
    }
    const href = values[1]?.link.href || values[1]?.text;
    const title = values[0]?.text;
    currentYear.querySelector('ul').insertAdjacentHTML('beforeend', `<li>${href ? `<a href="${href}">${title}</a>` : title}</li>`);
  });
  container.append(years);
  section.append(container);
  block.replaceWith(section);
}
