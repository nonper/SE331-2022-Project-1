<template>
  <div class="review-container">
    <h3>Comment from doctor:</h3>
    <ul style="list-style-type: none">
      <li v-for="(review, index) in reviews" :key="index">
        <br />
        "{{ review.comment }}"
        <br />
        <p style="color: rgba(65, 118, 250, 1)">from Dr.{{ review.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "DoctorList",
  props: {
    reviews: {
      type: Array,
      require: true,
    },
  },
};
</script>

<style>
.review-container {
  border: 1px solid;
  margin: 6vh 4vh;
  background: rgba(255, 255, 255, 0.6);
  padding: 2vh;
}
</style>
