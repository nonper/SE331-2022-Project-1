<template>
  <!--  need fix style before send work   -->
  <nav>
    <router-link
      :to="{ name: 'IndividualVaccDetail', params: { id: GStore.event.id } }"
      >VaccineDetails</router-link
    >
  </nav>

  <router-view />

  <div v-if="GStore">
    <h1 class="head name">
      {{ GStore.event.name }} {{ GStore.event.surname }}
    </h1>
    <h2 class="head">Address: {{ GStore.event.homeTown }}</h2>
    <h2 class="head">Age: {{ GStore.event.age }}</h2>

    <DoctorCommentList class="a" v-if="reviews.length" :reviews="reviews" />

    <!--doctor form should be here?  ก็อปform จากlab เก่า ไว้ใน components-->
    <div id="Docform">
      <form class="review-form" @submit.prevent="onSubmit">
        <h3 style="margin-bottom: 2vh">Add Patient's Comment</h3>
        <label for="name">Doctor's Name:</label>
        <input id="name" v-model="name" />
        <label for="Comment">Doctor's Comment:</label>
        <input id="Comment" v-model="comment" />
        <input
          class="button fade"
          @click="register(), scrollToTop()"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  </div>
</template>

<script>
import DoctorCommentList from "@/components/DoctorList.vue";
export default {
  inject: ["GStore"],
  components: {
    DoctorCommentList,
  },
  data() {
    return {
      reviews: [
        { name: "Supachok Jrirarojkul", comment: "Good health condition." },
      ],
      name: "",
      comment: "",
    };
  },
  methods: {
    addReview(review) {
      this.reviews.push(review);
    },
    onSubmit() {
      if (this.name === "" || this.comment === "") {
        alert("Review is incomplete. Please fill out every field");
        return;
      }

      let productReview = {
        name: this.name,
        comment: this.comment,
      };
      this.addReview(productReview);

      this.name = "";
      this.comment = "";
    },
    register() {
      //Assuming successful API call to register them
      //Set a flash message to appear on the next page loaded which says
      //'You are successfully registered for' + this.event.title
      this.GStore.flashMessage =
        "You are successfully commented for " +
        this.GStore.event.name +
        "'s Profile";
      setTimeout(() => {
        //After 3 seconds remove it
        this.GStore.flashMessage = "";
      }, 3000);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Nunito);
input:focus {
  background: rgb(248, 248, 101);
}

.name {
  color: rgb(123, 16, 16);
}
.head {
  margin: 2vh 0;
}
div#Docform {
  border: 1px solid;
  margin: auto;
  background: rgba(255, 255, 255, 0.6);
  padding: 2vh;
  width: 600px;
  height: 300;
  position: center;
}
.a {
  margin: 2vh 0 2vh 0;
  display: inline-block;
  text-decoration: none;
  color: rgba(0, 0, 0, 1);
  -webkit-transition: color 0.25s;
  transition: color 0.25s;
  text-align: center;
  width: 800px;
}
.fade {
  background-color: #355ee7;
  color: #fff;
  transition: background-color 1s;
}

.fade:hover {
  background-color: #db1f48;
}

.fade:focus,
.fade:active {
  background-color: black;
  transition: none;
}
</style>
