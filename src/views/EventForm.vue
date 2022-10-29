<template>
  <div>
    <h1>Create an event</h1>
    <form @submit.prevent="saveEvent">
      <div class="form-group">
        <label for="exampleInputEmail1">Category</label>
        <input
          v-model="event.category"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Title</label>
        <input
          v-model="event.title"
          type="text"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter title"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Description</label>
        <input
          v-model="event.description"
          type="text"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Description"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Location</label>
        <input
          v-model="event.location"
          type="text"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Location"
        />
      </div>
      <div class="form-group">
        <b-form-select
          v-model="event.organizer.id"
          :options="GStore.organizers"
          size="sm"
          class="mt-3"
        ></b-form-select>
      </div>
      <h3>The image of the Event</h3>
      <UploadImages @changed="handleImages" />
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <pre>{{ event }}</pre>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import UploadImages from "vue-upload-drop-images";
export default {
  inject: ["GStore"],
  components: {
    UploadImages,
  },
  data() {
    return {
      event: {
        name: "",
        surname: "",
        homeTown: "",
        vaccinateStatus: "",
        organizer: { id: "", name: "" },
        imageUrls: [],
      },
      files: [],
    };
  },
  methods: {
    saveEvent() {
      Promise.all(
        this.files.map((file) => {
          return EventService.uploadFile(file);
        })
      ).then((response) => {
        this.event.imageUrls = response.map((r) => r.data);
        EventService.saveEvent(this.event)
          .then((response) => {
            console.log(response);
            this.$router.push({
              name: "PatientDetail",
              params: { id: response.data.id },
            });
            this.GStore.flashMessage =
              "You are successfully add a new event for " + response.data.title;
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
};
</script>
<style scoped></style>
