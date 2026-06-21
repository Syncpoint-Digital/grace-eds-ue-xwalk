import {
  blockFields, fieldHtml, fieldText, instrument, makeEl, rows,
} from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const fields = blockFields(block);
  const section = makeEl('section', 'grace-product-overview grace-section grace-scroll-block');
  instrument(block, section);
  const inner = makeEl('div', 'grace-container grace-product-overview__inner');
  const heading = fieldText(fields, 'heading');
  if (heading) inner.append(makeEl('h2', '', heading));
  const body = makeEl('div');
  const authored = fieldHtml(fields, ['body', 'description', 'paragraphs']);
  if (authored) {
    body.innerHTML = authored;
  } else {
    rows(block, ['heading']).forEach((row) => {
      const text = row.textContent.trim();
      if (text) body.append(makeEl('p', '', text));
    });
  }
  inner.append(body);
  section.append(inner);
  block.replaceWith(section);
}
