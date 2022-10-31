<template>
  <div id="flashMessage" v-if="GStore.flashMessage">
    {{ GStore.flashMessage }}
  </div>
  <header>
    <h1>Covid 19</h1>
  </header>
  <nav>
    <router-link v-if="isUser || isAdmin || isDoctor" to="/patientList"
      >All Patient ||</router-link
    >
    <router-link v-if="!isUser && !isAdmin && !isDoctor" to="/login">
      Login ||</router-link
    >
    <router-link v-if="!isUser && !isAdmin && !isDoctor" to="/register">
      Register ||</router-link
    >
    <router-link v-if="isDoctor" :to="{ name: 'PatientInCareView' }">
      Patient In Care ||</router-link
    >
    <a v-if="isUser || isAdmin || isDoctor" class="nav-link" @click="logout">
      LogOut ||</a
    >
    <router-link v-if="isAdmin" to="/adminpanel"> Admin Panel ||</router-link>
    <p v-if="GStore.currentUser">
      Welcome! <u style="color: red">{{ GStore.currentUser.name }}</u>
    </p>
  </nav>
  <router-view />
  <footer>
    @For SE331 Final Project -:
    <p style="color: white">{{ localTime }}</p>
  </footer>
</template>

<script>
import AuthService from "./services/AuthService";
export default {
  inject: ["GStore"],
  data: function () {
    return {
      localTime: "",
    };
  },
  computed: {
    currentUser() {
      return localStorage.getItem("user");
    },
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    },
    isUser() {
      return AuthService.hasRoles("ROLE_USER");
    },
    isDoctor() {
      return AuthService.hasRoles("ROLE_DOCTOR");
    },
  },
  methods: {
    showLocaleTime: function () {
      var time = this;
      setInterval(function () {
        time.localTime = new Date().toLocaleTimeString();
      }, 100);
    },
    logout() {
      AuthService.logout();
      this.$router.push("/");
    },
  },
  mounted() {
    this.showLocaleTime();
  },
};
</script>

<style>
@keyframes colorfade {
  from {
    background: rgb(78, 238, 211);
  }
  to {
    background: transparent;
  }
}
#flashMessage {
  animation-name: colorfade;
  animation-duration: 3s;
}
body {
  height: 1150px;
}
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
