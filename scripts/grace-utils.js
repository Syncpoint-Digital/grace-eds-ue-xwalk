import { moveInstrumentation } from './scripts.js';

export const arrow = '\u203a';

export function toKey(value) {
  return (value || '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');
}

export function textContent(element) {
  return element?.textContent?.replace(/\s+/g, ' ').trim() || '';
}

export function htmlContent(element) {
  return element?.innerHTML?.trim() || '';
}

export function findImage(element) {
  const img = element?.querySelector?.('img');
  if (img) {
    return {
      alt: img.getAttribute('alt') || '',
      src: img.currentSrc || img.getAttribute('src') || '',
    };
  }

  const text = textContent(element);
  if (/^https?:\/\//.test(text) || text.startsWith('/')) {
    return { alt: '', src: text };
  }

  return { alt: '', src: '' };
}

export function findLink(element) {
  const link = element?.querySelector?.('a[href]');
  if (link) {
    return {
      href: link.getAttribute('href') || '/',
      label: textContent(link),
    };
  }

  return {
    href: textContent(element) || '',
    label: '',
  };
}

export function blockFields(block) {
  const fields = {};

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = toKey(textContent(cells[0]));
      if (key) {
        [, fields[key]] = cells;
      }
    }

    row.querySelectorAll('[data-aue-prop]').forEach((field) => {
      const key = toKey(field.getAttribute('data-aue-prop'));
      if (key) fields[key] = field;
    });
  });

  return fields;
}

export function fieldText(fields, names, fallback = '') {
  const keys = Array.isArray(names) ? names : [names];
  const key = keys.map(toKey).find((candidate) => fields[candidate]);
  return key ? textContent(fields[key]) : fallback;
}

export function fieldHtml(fields, names, fallback = '') {
  const keys = Array.isArray(names) ? names : [names];
  const key = keys.map(toKey).find((candidate) => fields[candidate]);
  return key ? htmlContent(fields[key]) : fallback;
}

export function fieldImage(fields, names, fallback = '') {
  const keys = Array.isArray(names) ? names : [names];
  const key = keys.map(toKey).find((candidate) => fields[candidate]);
  const image = key ? findImage(fields[key]) : { alt: '', src: '' };
  return {
    alt: image.alt,
    src: image.src || fallback,
  };
}

export function fieldLink(fields, labelNames, hrefNames, fallback = {}) {
  const label = fieldText(fields, labelNames, fallback.label || '');
  const href = fieldText(fields, hrefNames, fallback.href || '');
  const linkedField = (Array.isArray(labelNames) ? labelNames : [labelNames])
    .map(toKey)
    .map((key) => fields[key])
    .find(Boolean);
  const authoredLink = linkedField ? findLink(linkedField) : {};

  return {
    href: href || authoredLink.href || fallback.href || '',
    label: label || authoredLink.label || fallback.label || '',
  };
}

export function rows(block, skipKeys = []) {
  const skip = new Set(skipKeys.map(toKey));
  return [...block.children].filter((row) => {
    const cells = [...row.children];
    const key = toKey(textContent(cells[0]));
    return cells.length > 0 && !skip.has(key);
  });
}

export function rowValues(row) {
  return [...row.children].map((cell) => ({
    cell,
    html: htmlContent(cell),
    image: findImage(cell),
    link: findLink(cell),
    text: textContent(cell),
  }));
}

export function valuesHaveContent(values) {
  return values.some((value) => value.text || value.image.src || value.link.href);
}

export function makeEl(tag, className, html = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (html) element.innerHTML = html;
  return element;
}

export function makeImage(src, alt = '') {
  if (!src) return null;
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  img.loading = 'lazy';
  return img;
}

export function makeButton({ className = '', href = '', label = '' } = {}) {
  if (!label) return null;
  const link = document.createElement('a');
  link.className = `grace-button ${className}`.trim();
  link.href = href || '/';
  link.innerHTML = `${label} <span aria-hidden="true">${arrow}</span>`;
  return link;
}

export function instrument(from, to) {
  if (from && to) moveInstrumentation(from, to);
  return to;
}

export function isEditorMode() {
  try {
    return window.location.hostname.includes('adobeaemcloud.com')
      || window.location.search.includes('aue')
      || window.self !== window.top;
  } catch {
    return false;
  }
}

export function hasRenderedContent(element) {
  if (!element) return false;
  const clone = element.cloneNode(true);
  clone.querySelectorAll('.grace-editor-placeholder, [aria-hidden="true"]').forEach((node) => node.remove());
  return Boolean(
    clone.textContent.trim()
      || clone.querySelector('img[src], video, iframe, a[href], button:not([aria-hidden="true"])'),
  );
}

export function finalizeBlock(block, replacement, label, hasContent = undefined) {
  const contentExists = hasContent ?? hasRenderedContent(replacement);
  if (contentExists) {
    block.replaceWith(replacement);
    return replacement;
  }

  if (isEditorMode()) {
    const placeholder = makeEl('div', 'grace-editor-placeholder');
    placeholder.textContent = `${label || 'Block'}: add content`;
    replacement.classList.add('grace-block-empty');
    replacement.replaceChildren(placeholder);
    block.replaceWith(replacement);
    return replacement;
  }

  block.remove();
  return null;
}

export function getVideoEmbedUrl(url) {
  try {
    const videoUrl = new URL(url);
    const isShortUrl = videoUrl.hostname.includes('youtu.be');
    const isYouTube = isShortUrl
      || videoUrl.hostname.includes('youtube.com')
      || videoUrl.hostname.includes('youtube-nocookie.com');
    const id = isShortUrl
      ? videoUrl.pathname.slice(1)
      : videoUrl.searchParams.get('v') || videoUrl.pathname.split('/').pop();

    if (isYouTube && id) {
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
    }
  } catch {
    return url;
  }

  return url;
}
