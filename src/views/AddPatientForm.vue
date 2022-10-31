<template>
  <div>
    <h1>Add Patient</h1>
    <form @submit.prevent="saveEvent">
      <label>Patient name</label>

      <input v-model="Patient.name" type="text" label="Name" class="field" />

      <label>Patient surname</label>

      <input
        v-model="Patient.surname"
        type="text"
        label="Surname"
        class="field"
      />

      <label>Home Town</label>

      <input v-model="Patient.homeTown" type="text" label="homeTown" />

      <label>Age</label>

      <input v-model="Patient.age" type="number" label="age" />

      <label>Vaccinate Status</label>
      <br />

      <table class="checkbox">
        <tr>
          <td>
            <input
              type="radio"
              id="one"
              value="First dose"
              v-model="Patient.vaccinateStatus"
              v-on:click="editValue(vaccineOne)"
            />
            <label for="First Dose">First Dose</label>
          </td>
          <td>
            <input
              type="radio"
              id="two"
              value="Second dose"
              v-model="Patient.vaccinateStatus"
              v-on:click="editValue(vaccineTwo)"
            />
            <label for="Second Dose">Second Dose</label>
          </td>
        </tr>
      </table>
      <br />

      <label>Doctor</label>
      <br />

      <select v-model="Patient.doctor.id">
        <option
          v-for="option in GStore.event"
          v-bind:value="option.id"
          :key="option.id"
        >
          {{ option.name }}
        </option>
      </select>
      <br />

      <label>Vaccine</label>
      <br />

      <div v-if="Patient.vaccinateStatus === 'First dose'">
        <select v-model="Patient.vaccines[0].id">
          <option
            v-for="option in vaccine"
            v-bind:value="option.id"
            :key="option.id"
          >
            {{ option.vaccineName }}
          </option>
        </select>
      </div>

      <div v-if="Patient.vaccinateStatus === 'Second dose'">
        <select v-model="Patient.vaccines[0].id">
          <option
            v-for="option in vaccine"
            v-bind:value="option.id"
            :key="option.id"
          >
            {{ option.vaccineName }}
          </option>
        </select>
        <select v-model="Patient.vaccines[1].id">
          <option
            v-for="option in vaccine"
            v-bind:value="option.id"
            :key="option.id"
          >
            {{ option.vaccineName }}
          </option>
        </select>
      </div>

      <div v-if="Patient.vaccinateStatus === 'First dose'">
        <label>First Dose Date</label>

        <input v-model="Patient.firstDate" type="date" label="firstDoseDate" />
      </div>

      <div v-if="Patient.vaccinateStatus === 'Second dose'">
        <label>First Dose Date</label>

        <input v-model="Patient.firstDate" type="date" label="firstDoseDate" />
        <label>Second Dose Date</label>

        <input
          v-model="Patient.secondDate"
          type="date"
          label="secondDoseDate"
        />
      </div>

      <h3>The image of the Patient</h3>
      <UploadImages @changed="handleImages" />

      <button
        style="margin: 30px 0px 200px 0px"
        type="submit"
        class="btn btn-primary"
      >
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import UploadImages from "vue-upload-drop-images";
import DoctorService from "@/services/DoctorService";
export default {
  inject: ["GStore"],
  components: {
    UploadImages,
  },
  data() {
    return {
      Patient: {
        name: "",
        surname: "",
        homeTown: "",
        age: null,
        vaccinateStatus: "",
        vaccines: [],
        doctor: { id: "" },
        firstDate: "",
        secondDate: "",
        imageUrls: [],
      },
      files: [],
      vaccine: null,
      vaccineOne: [{ id: "" }],
      vaccineTwo: [{ id: "" }, { id: "" }],
    };
  },
  methods: {
    editValue(value) {
      this.Patient.vaccines = value;
    },
    save() {
      console.log(this.Patient);
    },
    saveEvent() {
      Promise.all(
        this.files.map((file) => {
          return EventService.uploadFile(file);
        })
      ).then((response) => {
        this.Patient.imageUrls = response.map((r) => r.data);
        EventService.saveEvent(this.Patient)
          .then((response) => {
            console.log(response);
            this.$router.push({
              name: "PatientDetail",
              params: { id: response.data.id },
            });
            this.GStore.flashMessage =
              "You are successfully add a new patient " + response.data.name;
            setTimeout(() => {
              this.GStore.flashMessage = "";
            }, 3000);
          })
          .catch(() => {
            this.$router.push("NetworkError");
          });
      });
    },
    handleImages(files) {
      this.files = files;
    },
  },
  created() {
    DoctorService.getVaccine()
      .then((res) => {
        this.vaccine = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
<style scoped>
input {
  display: block;
  margin: 0 auto;
}
table {
  table-layout: fixed;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
td {
  border: 1px solid black;
  overflow: hidden;
}
input[type="radio"] {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #555555;
  border-radius: 50%;
  background-clip: content-box;
  padding: 3px;
  margin-top: 0.5em;
}

input[type="radio"]:checked {
  background-color: #555555;
}
</style>
