<template>
  <header>
    <h1>Covid 19</h1>
  </header>
  <nav>
    <router-link to="/">Home</router-link>
  </nav>
  <router-view />

  <footer>footer here</footer>
</template>

<style>
header {
  background: #4cefb069;
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
  background: #4cefb069;
  padding: 5vh 0;
  text-align: center;
  position: relative;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h1 {
  font-family: cursive;
  font-size: 50px;
  margin-bottom: 20px;
}
</style>
