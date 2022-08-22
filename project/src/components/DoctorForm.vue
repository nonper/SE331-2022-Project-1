<template>
    <form class="review-form" @submit.prevent="onSubmit">
        <h3>Leave a review</h3>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
        <label for="Comment">Comment:</label>
        <textarea id="Comment" v-model="Comment"></textarea>
        <label for="question"> Doctor's comment </label>
        <textarea id="question" v-model="question"></textarea>
        <input class="button" type="submit" value="Submit">
    </form>
</template>
    <script>
    export default {
        name: "DoctorForm",
        props: {
            event: {
                type: Object,
                required: true,
            },
    
        }
        , data() {
            return {
                name: '',
                review: '',
                rating: null,
                question: '',
            }
        },
        methods: {
            onSubmit() {
                if (this.name === '' || this.review === '' || this.rating === '') {
                    alert('Review is incomplete. Please fill out every field')
                    return
                }
    
    
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    question: this.question,
    
                }
                this.$emit('review-submitted', productReview)
    
                this.name = ''
                this.review = ''
                this.rating = ''
                this.question = ''
            }
    
    
        }
    };
    
    
    </script>

})
