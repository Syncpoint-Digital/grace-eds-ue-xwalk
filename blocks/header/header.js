const isDesktop = window.matchMedia('(min-width: 900px)');

const navItems = [
  {
    label: 'Industries',
    href: '/industries/',
    primary: ['Refining Technologies', 'Chemical Processing', 'Plastics and Polymers', 'Coatings', 'General Industrial', 'Pharmaceutical Solutions', 'Nutraceutical Solutions', 'Agriculture', 'Personal Care', 'Food and Beverage', 'Biofuels'],
    image: 'https://grace.scene7.com/is/image/grace/rt-refining-technologies-men-blue-jumpsuits-refinery',
  },
  {
    label: 'Products',
    href: '/products/',
    primary: ['Adsorbents', 'Catalysts', 'Fine Chemicals', 'Synthetic Silicas'],
    image: 'https://grace.scene7.com/is/image/grace/sc-chemicals-woman-lab-looking',
  },
  {
    label: 'Resources',
    href: '/resources/',
    primary: ['Insights', 'Product Stewardship', 'Quality Management', 'Catalagram Archive', 'Contact Resources'],
    image: 'https://grace.scene7.com/is/image/grace/blog-hero-scientist-lab-looking-tablet',
  },
  {
    label: 'People and Careers',
    href: '/people-and-careers/',
    primary: ['Careers', 'Life at Grace', 'Open Jobs', 'Ethics Hotline', 'LinkedIn'],
    image: 'https://grace.scene7.com/is/image/grace/Grace_Employees_680x300?qlt=85&dpr=off',
  },
  {
    label: 'About Grace',
    href: '/about-grace/',
    primary: ['This is Grace', 'Leadership Team', 'Sustainability', 'Locations', 'Awards and Recognition', 'Community', 'History'],
    image: 'https://grace.scene7.com/is/image/grace/blog-hero-south-haven-laboratory-two-women',
  },
  { label: 'Contact Us', href: '/contact-us/' },
];

function slug(label) {
  return label.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export default async function decorate(block) {
  block.textContent = '';
  const header = document.createElement('div');
  header.className = 'grace-header grace-header--top';

  header.innerHTML = `
    <div class="grace-header__utility"><a href="/contact-us/">Contact Us</a></div>
    <div class="grace-header__main">
      <a class="grace-header__logo" href="/" aria-label="Grace home">
        <img src="/grace-logo-color.png" alt="Grace">
      </a>
      <button class="grace-header__menu" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="grace-nav">
        <span></span><span></span><span></span>
      </button>
      <nav id="grace-nav" class="grace-header__nav" aria-label="Primary navigation"></nav>
    </div>
  `;

  const nav = header.querySelector('.grace-header__nav');
  navItems.forEach((item) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'grace-header__nav-item';
    const children = item.primary || [];
    wrapper.innerHTML = `
      <a class="grace-header__nav-link" href="${item.href}">${item.label}</a>
      ${children.length ? `
        <div class="grace-mega">
          <div class="grace-mega__inner">
            <div class="grace-mega__intro">
              <span>Explore</span>
              <h2>${item.label}</h2>
              <a href="${item.href}">View overview</a>
            </div>
            <div class="grace-mega__primary">
              ${children.slice(0, 8).map((label) => `<a href="${item.href}${slug(label)}/">${label} <span aria-hidden="true">&rsaquo;</span></a>`).join('')}
            </div>
            <div class="grace-mega__groups">
              <section>
                <h3>Featured</h3>
                ${children.slice(0, 4).map((label) => `<a href="${item.href}${slug(label)}/">${label}</a>`).join('')}
              </section>
              <section>
                <h3>More</h3>
                ${children.slice(4, 8).map((label) => `<a href="${item.href}${slug(label)}/">${label}</a>`).join('')}
              </section>
            </div>
            <a class="grace-mega__feature" href="${item.href}">
              <img src="${item.image}" alt="">
              <span>Explore ${item.label}</span>
              <p>Find Grace expertise, solutions, and resources.</p>
              <strong>Learn more</strong>
            </a>
          </div>
        </div>` : ''}
    `;
    nav.append(wrapper);
  });

  const button = header.querySelector('.grace-header__menu');
  const syncMenu = () => {
    if (isDesktop.matches) {
      nav.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    }
  };
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', open ? 'false' : 'true');
    button.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !open);
  });
  isDesktop.addEventListener('change', syncMenu);

  block.append(header);
}
