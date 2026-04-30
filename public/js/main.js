const htmlRoot = document.getElementById('html-root');
const darkToggle = document.getElementById('dark-toggle');
const darkIcon = document.getElementById('dark-icon');

const stored = localStorage.getItem('theme');
if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  htmlRoot.classList.add('dark');
}

function syncIcon() {
  if (!darkIcon) return;
  darkIcon.className = htmlRoot.classList.contains('dark')
    ? 'fa-solid fa-sun'
    : 'fa-solid fa-moon';
}

syncIcon();

if (darkToggle) {
  darkToggle.addEventListener('click', () => {
    htmlRoot.classList.toggle('dark');
    localStorage.setItem('theme', htmlRoot.classList.contains('dark') ? 'dark' : 'light');
    syncIcon();
  });
}
