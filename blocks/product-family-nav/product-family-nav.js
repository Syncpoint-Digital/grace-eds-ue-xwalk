import {
  finalizeBlock, instrument, makeEl, rowValues, rows, valuesHaveContent,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const nav = makeEl('nav', 'grace-page-nav grace-product-nav');
  instrument(block, nav);
  nav.setAttribute('aria-label', 'Product families');
  const inner = makeEl('div', 'grace-container grace-page-nav__inner grace-product-nav__inner');
  rows(block).forEach((row) => {
    const values = rowValues(row);
    if (!valuesHaveContent(values)) return;
    const label = values[0]?.text;
    if (!label) return;
    const link = makeEl('a');
    link.href = values[1]?.link.href || values[1]?.text || '/products/';
    link.textContent = label;
    if (/true|active|current/i.test(values[2]?.text || '')) link.setAttribute('aria-current', 'page');
    inner.append(link);
  });
  nav.append(inner);
  finalizeBlock(block, nav, 'Product Family Nav', Boolean(inner.children.length));
}
