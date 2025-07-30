import { loadNavbar } from './components/navbar.js'
import { loadFooter } from './components/footer.js'
console.log('main.js cargado')

document.addEventListener('DOMContentLoaded', () => {
  loadNavbar()
  loadFooter()

  const loginBtn = document.getElementById('btn-login')
  const registerBtn = document.getElementById('btn-register')

  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      window.location.href = '/src/pages/login.html'
    })
  }

  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      window.location.href = '/src/pages/register.html'
    })
  }
})
