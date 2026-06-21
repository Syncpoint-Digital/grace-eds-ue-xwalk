export default async function decorate(block) {
  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'grace-footer';
  footer.innerHTML = `
    <div class="grace-footer__inner">
      <div class="grace-footer__brand">
        <img src="/grace-logo-color.png" alt="Grace">
        <p>High-performance specialty chemicals and materials for the products and processes that move industries forward.</p>
        <div class="grace-footer__standard">A standard industries company</div>
      </div>
      <nav aria-label="Footer navigation" class="grace-footer__nav">
        <div class="grace-footer__group">
          <h2>Grace</h2>
          <a href="/about-grace/">About Grace</a>
          <a href="/products/">Products</a>
          <a href="/industries/">Industries</a>
          <a href="/insights/">Insights</a>
          <a href="/about-grace/locations/">Locations</a>
        </div>
        <div class="grace-footer__group">
          <h2>People</h2>
          <a href="/people-and-careers/">Careers</a>
          <a href="/people-and-careers/life-at-grace/">Life at Grace</a>
          <a href="/ethics-hotline/">Ethics Hotline</a>
          <a href="https://www.linkedin.com/company/w-r-grace/">LinkedIn</a>
        </div>
        <div class="grace-footer__group">
          <h2>Support</h2>
          <a href="/contact-us/">Contact Us</a>
          <a href="/compliance/">Compliance</a>
          <a href="/vendors-and-suppliers/">Vendors and Suppliers</a>
          <a href="/logos/">Logos</a>
        </div>
      </nav>
    </div>
    <div class="grace-footer__legal">
      <p>&copy; 2026 W. R. Grace &amp; Co.-Conn. All rights reserved.</p>
      <nav aria-label="Legal navigation">
        <a href="/cookie-policy/">Cookie Policy</a>
        <a href="/privacy-policy/">Privacy Policy</a>
        <a href="/terms-of-use/">Terms of Use</a>
      </nav>
      <p><strong>GRACE</strong>&reg; is a registered trademark in the United States and/or other countries, of W. R. Grace &amp; Co.-Conn.</p>
    </div>
  `;

  block.append(footer);
}
