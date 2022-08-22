<template>
  <header>
    <h1>Covid 19</h1>
  </header>
  <nav>
    <router-link to="/">Home</router-link> ||
    <router-link to="/">Vaccinates</router-link>
  </nav>
  <router-view />
  <footer>footer here</footer>
</template>

<style>
header {
  background: #8a96db;
  text-align: center;
  width: 100%;
  height: auto;
  background-size: cover;
  background-attachment: fixed;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 85% 85% / 30%;
}

footer {
  background: #8a96db;
  padding: 5vh 0;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  margin: 7vh 0 5vh 0;
  color: #6070ca;
  text-decoration: underline;
}

h1 {
  font-family: cursive;
  font-size: 50px;
}
</style>
