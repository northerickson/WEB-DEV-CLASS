// Minimal nav enhancement script
// Enhances the existing <nav> into a responsive menu with a toggle and dropdown support.
(function(){
  document.addEventListener('DOMContentLoaded', function(){
    const nav = document.querySelector('nav');
    if (!nav) return;

    // If nav already has our structure, do nothing
    if (nav.classList.contains('enhanced')) return;

    // Collect existing links
    const links = Array.from(nav.querySelectorAll('a'));

    // Build new structure
    const container = document.createElement('div'); container.className = 'nav-container';
    const button = document.createElement('button');
    button.className = 'nav-toggle';
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-controls','nav-list');
    button.textContent = '☰ Menu';

    const ul = document.createElement('ul'); ul.id = 'nav-list'; ul.className = 'nav-list';

    links.forEach(a => {
      const li = document.createElement('li');
      // If link has data-dropdown attribute, parse it as comma-separated submenu items
      const submenu = a.getAttribute('data-dropdown');
      if (submenu) {
        li.classList.add('has-dropdown');
        const topLink = a.cloneNode(true);
        topLink.innerHTML = topLink.innerHTML + ' ▾';
        li.appendChild(topLink);
        const subUl = document.createElement('ul'); subUl.className = 'dropdown';
        submenu.split('|').forEach(item => {
          const [text, href] = item.split('::');
          const subLi = document.createElement('li');
          const subA = document.createElement('a');
          subA.href = href || '#';
          subA.textContent = text || href || 'link';
          subLi.appendChild(subA);
          subUl.appendChild(subLi);
        });
        li.appendChild(subUl);
      } else {
        const newA = a.cloneNode(true);
        li.appendChild(newA);
      }
      ul.appendChild(li);
    });

    // Clear original nav and append enhanced structure
    nav.textContent = '';
    nav.classList.add('enhanced');
    container.appendChild(button);
    container.appendChild(ul);
    nav.appendChild(container);

    // Toggle behavior
    button.addEventListener('click', function(){
      const open = ul.classList.toggle('open');
      this.setAttribute('aria-expanded', String(open));
    });

    // Dropdown toggle on small screens
    nav.addEventListener('click', function(e){
      const link = e.target.closest('.has-dropdown > a');
      if (!link) return;
      const parent = link.parentElement;
      if (!parent) return;
      // On small screens, toggle the dropdown instead of navigating
      if (window.matchMedia('(max-width:800px)').matches) {
        e.preventDefault();
        parent.classList.toggle('open');
      }
    });
  });
})();
