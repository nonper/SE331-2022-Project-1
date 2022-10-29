<template>
  <div id="pagedd">
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />

      <div class="pagination">
        <router-link
          id="page-prev"
          :to="{ name: 'PatientList', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
        >
          Prev Page
        </router-link>
        ||
        <router-link
          id="page-next"
          :to="{ name: 'PatientList', query: { page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
        >
          Next Page
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";
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
      totalEvents: 0,
      search: "",
    };
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / 3);
      return this.page < totalPages;
    },
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getEvents(3, parseInt(routeTo.query.page) || 1)
      .then((response) => {
        next((comp) => {
          comp.events = response.data;
          comp.totalEvents = response.headers["x-total-count"];
        });
      })
      .catch(() => {
        next({ name: "NetworkError " });
      });
  },
  beforeRouteUpdate(routeTo, routeFrom, next) {
    EventService.getEvents(3, parseInt(routeTo.query.page) || 1)
      .then((res) => {
        this.events = res.data;
        this.totalEvents = res.headers["x-total-count"];
        next();
      })
      .catch(() => {
        next({ name: "NetworkError" });
      });
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
