<template>
  <div class="vue-template">
    <h3 v-if="movies">{{this.movies.data.results[1].original_title}}</h3>
    <button @click="method">Click me</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Match",
  data() {
    return {
      movies: []
    }
  },
  async mounted() {
    try {
      this.movies = await axios.get('/getMovies', {
        params: {
          genres: this.$route.params.genreID
        }
      })
      console.log(this.movies)
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    method() {
      console.log("Hello")
    }
  }
}
</script>

<style scoped>

</style>