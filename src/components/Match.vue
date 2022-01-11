<template>
  <div class="vue-template">
    <div class="promo" v-if="movies">
      <img class="image" width="100%" height="100%" :src="curr_image" />

      <div class="transparent_div">
        {{curr_title}} <br>
        <div class="button_alignment buttons btn-group">
          <button class="btn btn-outline-success" @click="changeMovie(true)">Like</button>
          <button class="btn btn-outline-danger" @click="changeMovie(false)">Dislike</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

let counter = 0;
export default {
  name: "Match",
  data() {
    return {
      movies: [],
      curr_image: "",
      curr_title: "",
      curr_id: "",
      liked_movies: [],
      disliked_movies: []
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
      this.curr_image = "https://image.tmdb.org/t/p/w500" + this.movies.data.results[0].poster_path;
      this.curr_title = this.movies.data.results[0].original_title
    } catch (e) {
      console.log(e)
    }
  },
  methods: {
    changeMovie(like) {
      if(counter > 9) {
        //TODO: Axios request an das Backend mit dem Liked und Disliked Array
        this.$router.push('/')
      }
      if(like) {
        this.liked_movies.push(this.movies.data.results[counter].id)
      } else if(!like) {
        this.disliked_movies.push(this.movies.data.results[counter].id)
      }
      counter++;
      this.curr_image = "https://image.tmdb.org/t/p/w500" + this.movies.data.results[counter].poster_path;
      this.curr_title = this.movies.data.results[counter].original_title
    },
  }
}
</script>

<style scoped>
  .promo {
    position: relative;
    align-content: center;
  }

  .transparent_div {
    display: none;
  }

  .image:hover + .transparent_div {
    display: block;
    background-color: rgba(0,0,0,0.65);
    position: absolute;
    text-align: center;
    height: 20%;
    width: 100%;
    font-family: Verdana,sans-serif;
    color: #FFF;
    bottom: 0;
    z-index: 1;
    animation: fadeIn linear 0.5s;
    -webkit-animation: fadeIn linear 0.5s;
    -moz-animation: fadeIn linear 0.5s;
    -o-animation: fadeIn linear 0.5s;
    -ms-animation: fadeIn linear 0.5s;
  }

  @keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-moz-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-webkit-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-o-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }

  @-ms-keyframes fadeIn {
    0% {opacity:0;}
    100% {opacity:1;}
  }


</style>