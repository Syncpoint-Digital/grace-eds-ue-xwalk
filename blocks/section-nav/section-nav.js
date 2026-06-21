import {
  blockFields, fieldText, finalizeBlock, instrument, makeEl, rowValues, rows, valuesHaveContent,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const nav = makeEl('nav', 'grace-page-nav grace-section-nav');
  instrument(block, nav);
  nav.setAttribute('aria-label', fieldText(fields, 'label') || 'Page navigation');
  const inner = makeEl('div', 'grace-container grace-page-nav__inner grace-section-nav__inner');
  rows(block, ['label']).forEach((row) => {
    const values = rowValues(row);
    if (!valuesHaveContent(values)) return;
    const label = values[0]?.text;
    if (!label) return;
    const link = makeEl('a');
    link.href = values[1]?.link.href || values[1]?.text || '/';
    link.textContent = label;
    if (/true|active|current/i.test(values[2]?.text || '')) link.setAttribute('aria-current', 'page');
    inner.append(link);
  });
  nav.append(inner);
  finalizeBlock(block, nav, 'Section Nav', Boolean(inner.children.length));
}
