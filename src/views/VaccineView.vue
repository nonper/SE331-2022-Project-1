<template>
  <div>
    <!-- <input type="text" placeholder="Search patient..." /> -->
    <div class="events" v-if="events">
      <div class="event-card">
        <table id="Table_id">
          <tr>
            <th class="IDColumn">ID</th>
            <th>Name</th>
            <th>Vaccinates</th>
          </tr>
          <tr v-for="events in events" :key="events.id">
            <td class="IDColumn">{{ events.id }}</td>
            <td>{{ events.name }}_{{ events.surname }}</td>
            <td>
              {{ events.firstDose }}
              <p style="color: red">and</p>
              {{ events.secondDose }}
            </td>
          </tr>
        </table>
      </div>

      <div class="pagination">
        <router-link
          id="page-prev"
          :to="{ name: 'vaccineDetail', query: { page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
        >
          Prev Page
        </router-link>
        ||
        <router-link
          id="page-next"
          :to="{ name: 'vaccineDetail', query: { page: page + 1 } }"
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
  data() {
    return {
      events: null,
      totalEvents: 0,
    };
  },
  computed: {
    hasNextPage() {
      let totalPages = Math.ceil(this.totalEvents / 10);
      return this.page < totalPages;
    },
  },
  // eslint-disable-next-line no-unused-vars
  beforeRouteEnter(routeTo, routeFrom, next) {
    EventService.getEvents(10, parseInt(routeTo.query.page) || 1)
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
    EventService.getEvents(10, parseInt(routeTo.query.page) || 1)
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

table,
th,
td {
  margin-left: auto;
  font-size: 20px;
  margin-right: auto;
  border: 1px solid black;
}

body {
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

.IDColumn {
  color: red;
}
</style>
