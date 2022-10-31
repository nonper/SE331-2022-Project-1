<template>
  <!--  need fix style before send work   -->
  <nav>
    <router-link
      :to="{ name: 'IndividualVaccDetail', params: { id: GStore.event.id } }"
      >VaccineDetails</router-link
    >
    ||
    <router-link
      v-if="isDoctor"
      :to="{
        name: 'DoctorComment',
        params: { id: GStore.event.id },
      }"
      >add Comment</router-link
    >
  </nav>

  <router-view />

  <div v-if="GStore">
    <h1 class="head name">
      Name: {{ GStore.event.name }} {{ GStore.event.surname }}
    </h1>
    <h2 class="head">Address: {{ GStore.event.homeTown }}</h2>
    <h2 class="head">Age: {{ GStore.event.age }}</h2>
    <h2>
      In care of Dr.{{ GStore.event.doctor.name }}
      {{ GStore.event.doctor.surname }}
    </h2>
    <img v-for="url in GStore.event.imageUrls" :key="url" :src="url" />

    <div
      style="border: 2px solid black"
      v-for="comment in GStore.event.comment"
      :key="comment.id"
    >
      <p>Comment: {{ comment.comment }}</p>
      <p>
        from: Dr.{{ comment.doctor.name }}
        {{ comment.doctor.surname }}
      </p>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService";
export default {
  inject: ["GStore"],
  errorCaptured: function (err) {
    console.log(err);
  },
  computed: {
    currentUser() {
      return localStorage.getItem("user");
    },
    isDoctor() {
      return AuthService.hasRoles("ROLE_DOCTOR");
    },
    isUser() {
      return AuthService.hasRoles("ROLE_USER");
    },
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Nunito);
input:focus {
  background: rgb(248, 248, 101);
}

.name {
  color: rgb(123, 16, 16);
}
.head {
  margin: 2vh 0;
}
div#Docform {
  border: 1px solid;
  margin: auto;
  background: rgba(255, 255, 255, 0.6);
  padding: 2vh;
  width: 600px;
  height: 300;
  position: center;
}
.a {
  margin: 2vh 0 2vh 0;
  display: inline-block;
  text-decoration: none;
  color: rgba(0, 0, 0, 1);
  -webkit-transition: color 0.25s;
  transition: color 0.25s;
  text-align: center;
  width: 800px;
}
.fade {
  background-color: #355ee7;
  color: #fff;
  transition: background-color 1s;
}

.fade:hover {
  background-color: #db1f48;
}

.fade:focus,
.fade:active {
  background-color: black;
  transition: none;
}

img {
  border: 1px solid #ddd; /* Gray border */
  border-radius: 4px; /* Rounded border */
  padding: 5px; /* Some padding */
  margin: 5px; /* Some margin */
  width: 150px; /* Set a small width */
}
/* Add a hover effect (blue shadow) */
img:hover {
  box-shadow: 0 0 2px 1px rgba(0, 140, 186, 0.5);
}
</style>
