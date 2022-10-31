<template>
  <div id="pagedd">
    <div class="events">
      <PatientInCare
        v-for="event in GStore.event.patients"
        :key="event.id"
        :event="event"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PatientInCare from "@/components/PatientInCare.vue";
// import axios from 'axios'
export default {
  name: "PatientList",
  components: {
    PatientInCare, // register it as a child component
  },
  inject: ["GStore"],
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  min-height: 120vh;
  background-color: rgb(234, 242, 255);
}

input {
  display: block;
  width: 350px;
  margin: 20px auto;
  padding: 10px 45px;
  background-size: 15px 15px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
}

.events {
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
