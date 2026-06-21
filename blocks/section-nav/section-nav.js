import {
  blockFields, fieldText, instrument, makeEl, rowValues, rows,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const nav = makeEl('nav', 'grace-page-nav grace-section-nav');
  instrument(block, nav);
  nav.setAttribute('aria-label', fieldText(fields, 'label', 'Section navigation'));
  const inner = makeEl('div', 'grace-container grace-page-nav__inner grace-section-nav__inner');
  rows(block, ['label']).forEach((row) => {
    const values = rowValues(row);
    const label = values[0]?.text;
    if (!label) return;
    const link = makeEl('a');
    link.href = values[1]?.link.href || values[1]?.text || '/';
    link.textContent = label;
    if (/true|active|current/i.test(values[2]?.text || '')) link.setAttribute('aria-current', 'page');
    inner.append(link);
  });
  nav.append(inner);
  block.replaceWith(nav);
}
