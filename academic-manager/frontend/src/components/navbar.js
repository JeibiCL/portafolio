export function loadNavbar() {
  const navbar = document.createElement('nav')
  navbar.innerHTML = `
    <nav>
      <a href="/index.html">Inicio</a>
      <a href="/src/pages/login.html">Iniciar Sesión</a>
      <a href="/src/pages/register.html">Registrarse</a>
    </nav>
  `
  const main = document.querySelector('main')
  if (main && main.parentNode) {
    main.parentNode.insertBefore(navbar, main)
  } else {
    document.body.insertBefore(navbar, document.body.firstChild)
  }

}