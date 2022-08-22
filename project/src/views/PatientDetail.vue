<template>
  <!--  need fix style before send work   -->
  <div v-if="event">
    <h1 style="margin: 2vh 0">{{ event.name }} {{ event.surname }}</h1>
    <h2 style="margin: 2vh 0">Address: {{ event.homeTown }}</h2>
    <h2 style="margin: 2vh 0">Age: {{ event.age }}</h2>

    <nav>
      <router-link to="/addDoctorsComment">Add Doctor's comment</router-link>
    </nav>

    <router-view />
    <!--doctor form should be here?  ก็อปform จากlab เก่า ไว้ใน components-->
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
export default {
  props: ["id"],
  data() {
    return {
      event: null,
      name: "",
      Comment: "",
      question: "",
    };
  },
  created() {
    EventService.getEventId(this.id)
      .then((response) => {
        this.event = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onSubmit() {
      if (this.name === "" || this.Comment === "") {
        alert("Comment is incomplete. Please fill out every field");
        return;
      }

      let DoctorComment = {
        name: this.name,
        review: this.review,
        rating: this.rating,
        question: this.question,
      };
      this.$emit("Commented", DoctorComment);

      this.name = "";
      this.Comment = "";
      this.question = "";
    },
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Nunito);

a {
  margin: 2vh 0 2vh 0;
  display: inline-block;
  text-decoration: none;
  color: rgba(0, 0, 0, 1);
  -webkit-transition: color 0.25s;
  transition: color 0.25s;
  text-align: left;
}

a div {
  text-shadow: 1px 1px 1px black;
}

a:hover {
  color: rgba(0, 255, 0, 1);
}

a span {
  color: black;
  font-size: 16px;

  position: absolute;
  top: 10px;
  right: 50%;
  margin-right: -430px;

  padding: 50px 50px;

  border-style: solid;
  border-radius: 175px;

  transform: scale(0);
  -webkit-transform: scale(0);

  transition: opacity 1s, transform 1.5s;
  -webkit-transition: opacity 1s, transform 1.5s;
  transition-delay: 0.5s;
  -webkit-transition-delay: 0.5s;

  opacity: 0;
}

a div:hover ~ span {
  opacity: 1;
  transform: scale(1);
  -webkit-transform: scale(1);
}

a svg {
  position: absolute;
  top: 50%;
  margin-top: -70px;
  left: 50%;
  margin-left: 100px;
}

a svg circle {
  fill-opacity: 0;
  opacity: 0;
}

a svg #c1 {
  transition: opacity 1s;
  -webkit-transition: opacity 1s;
}

a svg #c2 {
  transition: opacity 2s;
  -webkit-transition: opacity 2s;
}

a svg #c3 {
  transition: opacity 3s;
  -webkit-transition: opacity 3s;
}

a div:hover ~ svg circle {
  opacity: 1;
}

a div {
  cursor: pointer;
}
</style>
