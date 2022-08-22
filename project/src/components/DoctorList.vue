<template>
  <div class="review-container">
    <h3>Doctor comment:</h3>
    <ul>
      <li v-for="(review, index) in reviews" :key="index">
        <br />
        "{{ review.review }}"
        <br />
        {{ review.question }}
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
