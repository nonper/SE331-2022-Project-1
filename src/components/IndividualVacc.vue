<template>
  <div>
    <!-- <input type="text" placeholder="Search patient..." /> -->
    <div class="events" v-if="GStore.event">
      <div class="event-card">
        <table style="border: none">
          <tr>
            <th class="IDColumn">ID</th>
            <th>Name</th>
            <th>Vaccinates</th>
            <th>Date</th>
          </tr>
          <tr>
            <td class="IDColumn">{{ GStore.event.id }}</td>
            <td>{{ GStore.event.name }}_{{ GStore.event.surname }}</td>
            <td>
              {{ GStore.event.firstDose }}
              <p style="color: red">and</p>
              {{ GStore.event.secondDose }}
            </td>
            <td>
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
