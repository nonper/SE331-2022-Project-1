<template>
  <div>
    <!-- <input type="text" placeholder="Search patient..." /> -->
    <div class="events" v-if="GStore.event">
      <div class="event-card">
        <table class="styled-table" style="border: none">
          <thead>
            <tr>
              <th class="IDColumn">ID</th>
              <th>Name</th>
              <th>Vaccinates</th>
              <th>Date</th>
            </tr>
          </thead>
          <tr>
            <td class="IDColumn">{{ GStore.event.id }}</td>
            <td>{{ GStore.event.name }}_{{ GStore.event.surname }}</td>
            <td v-if="GStore.event.vaccinateStatus == 'First dose'">
              {{ GStore.event.vaccines[0].vaccineName }}
            </td>
            <td v-if="GStore.event.vaccinateStatus == 'Second dose'">
              {{ GStore.event.vaccines[0].vaccineName }}
              <p style="color: red">and</p>
              {{ GStore.event.vaccines[1].vaccineName }}
            </td>
            <td v-if="GStore.event.vaccinateStatus == 'First dose'">
              {{ GStore.event.firstDate }}
            </td>
            <td v-if="GStore.event.vaccinateStatus == 'Second dose'">
              {{ GStore.event.firstDate }}
              <p style="color: red">and</p>
              {{ GStore.event.secondDate }}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: "PatientList",
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
  min-height: 30px;
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

.styled-table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
.styled-table thead tr {
  background-color: #8a96db;
  color: #ffffff;
  text-align: left;
}
.styled-table th,
.styled-table td {
  padding: 12px 15px;
}
.styled-table tbody tr {
  border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
  background-color: #f3f3f3;
}
</style>
