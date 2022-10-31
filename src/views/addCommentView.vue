<template>
  <div style="border: 1px solid black">
    <h3>Add comment</h3>
    <form @submit.prevent="saveComment">
      <input v-model="comment.comment" type="text" label="A feedback" />

      <p>By: {{ GStore.currentUser.name }}</p>

      <button type="submit" class="button-6">Submit</button>
    </form>
  </div>
</template>

<script>
import DoctorService from "@/services/DoctorService";
export default {
  inject: ["GStore"],
  props: ["id", "patients"],
  data() {
    return {
      comment: {
        comment: "",
        doctor: { id: this.GStore.currentUser.id },
        patients: { id: this.GStore.event.id },
      },
    };
  },
  methods: {
    saveComment() {
      return DoctorService.postComment(this.comment)
        .then((response) => {
          this.$router.go();
          this.GStore.flashMessage =
            "Successfully add comment to " + response.data.name;
          setTimeout(() => {
            this.GStore.flashMessage = "";
          }, 3000);
        })
        .catch(() => {
          this.$router.push("NetworkError");
        });
    },
    handleImages(files) {
      this.files = files;
    },
  },
};
</script>
<style scoped>
input {
  display: block;
  margin: 0 auto;
}
</style>
