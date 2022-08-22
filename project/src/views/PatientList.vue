<template>
  <div>
    <!-- <input type="text" placeholder="Search patient..." /> -->
    <div class="events">
      Patient Card in here Maybe 3 columns
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";

// import axios from 'axios'
export default {
  name: "PatientList",
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  components: {
    EventCard, // register it as a child component
  },

  data() {
    return {
      events: null,
      totalEvents: 0, // <--- Added this to store totalEvents
    };
  },
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
  padding: 20px;
  min-height: 100vh;
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
