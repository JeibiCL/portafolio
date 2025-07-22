<template>
  <div id="app">
    <h1>Academic Manager</h1>

    <!-- Pantalla de login -->
    <div v-if="vista === 'login'">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <input v-model="correo" type="email" placeholder="Correo" required />
        <input v-model="contraseña" type="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
      <p v-if="error" style="color: red">{{ error }}</p>
    </div>

    <!-- Pantalla del dashboard -->
    <div v-else-if="vista === 'dashboard'">
      <h2>Bienvenida, {{ correo }}</h2>
      <button @click="cerrarSesion">Cerrar sesión</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      correo: '',
      contraseña: '',
      vista: 'login', // 'dashboard' al cambiar de vista
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            correo: this.correo,
            contraseña: this.contraseña
          })
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.mensaje || 'Error al iniciar sesión');
        }

        const data = await res.json();
        localStorage.setItem('token', data.token);
        this.vista = 'dashboard';
        this.error = '';
      } catch (err) {
        this.error = err.message;
      }
    },
    cerrarSesion() {
      localStorage.removeItem('token');
      this.vista = 'login';
      this.correo = '';
      this.contraseña = '';
    }
  }
};
</script>

<style>
#app {
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  font-family: sans-serif;
  border: 1px solid #ccc;
  border-radius: 8px;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
}
button {
  width: 100%;
  padding: 0.6rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}
</style>
