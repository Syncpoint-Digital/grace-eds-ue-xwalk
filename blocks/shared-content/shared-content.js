import { finalizeBlock, instrument, makeEl } from '../../scripts/grace-utils.js';

export default function decorate(block) {
  const section = makeEl('section', 'grace-shared-content grace-section grace-scroll-block');
  instrument(block, section);
  const container = makeEl('div', 'grace-container');
  while (block.firstElementChild) container.append(block.firstElementChild);
  section.append(container);
  finalizeBlock(block, section, 'Shared Content', Boolean(container.textContent.trim() || container.querySelector('img, a, video, iframe')));
}
