<template>
  <div class="vue-template">
    <content-loader
        viewBox="0 0 476 124"
        primaryColor="#f3f3f3"
        secondaryColor="#cccccc"
        v-if="movies.length === 0"
        id="content-loader"
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="20" />
    </content-loader>
    <div class="promo" v-if="movies">
      <img class="image" width="100%" height="100%" :src="curr_image" />

      <div class="transparent_div">
        {{curr_title}} <br><br>
        <div class="description container overflow-auto pre-scrollable">
          <p>{{curr_description}}</p>
        </div>
          <div class="button_alignment buttons btn-group">
            <button class="btn btn-outline-success" @click="changeMovie(true)">Like</button>
            <button class="btn btn-outline-danger" @click="changeMovie(false)">Dislike</button> <br>
          </div>
        <div class = "container"><br>Rating: {{curr_rating}} out of 10</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {ContentLoader} from "vue-content-loader";

let counter = 0;
export default {
  name: "Match",
  data() {
    return {
      movies: [],
      curr_image: "",
      curr_title: "",
      curr_description: "",
      curr_rating: "",
      liked_movies: [],
      disliked_movies: [],
      moviesToDisplay: [],
      init: true
    }
  },
  components: {
    ContentLoader,
  },
  async mounted() {
    if(this.$route.params.init === "false") {
      this.init = false;
      try {
        this.movies = await axios.get('/getMoviesByID', {
          params: {
            requestingFriend: this.$route.params.userID,
            requestedFriend: this.$route.params.matchUserID
          }
        })
        console.log(this.movies.data)
        this.curr_image = "https://image.tmdb.org/t/p/w500" + this.movies.data[0].poster_path;
        this.curr_title = this.movies.data[0].original_title;
        this.curr_description = this.movies.data[0].overview;
        this.curr_rating = this.movies.data[0].vote_average;
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        this.movies = await axios.get('/getMovies', {
          params: {
            genres: this.$route.params.genreID
          }
        })
        console.log(this.movies)
        this.curr_image = "https://image.tmdb.org/t/p/w500" + this.movies.data[0].poster_path;
        this.curr_title = this.movies.data[0].original_title;
        this.curr_description = this.movies.data[0].overview;
        this.curr_rating = this.movies.data[0].vote_average;
      } catch (e) {
        console.log(e)
      }
    }
  //console.log(this.init)
  },
  methods: {
    async changeMovie(like) {
      this.moviesToDisplay.push(this.movies.data[counter].id)
      if (counter > 8) {
        counter = 0;
        try {
          //console.log(this.$route.params.userID, this.$route.params.matchUserID)
          await axios.post('/createMatch', {
              requestingFriend: this.$route.params.userID,
              requestedFriend: this.$route.params.matchUserID,
              moviesToDisplay: this.moviesToDisplay,
              likedMovies: this.liked_movies,
              matchedBack: !this.init,
          })
          await this.$router.push('/')
        } catch (e) {
          console.log(e)
        }
      }
      if (like) {
        this.liked_movies.push(this.movies.data[counter].id)
      } else if (!like) {
        this.disliked_movies.push(this.movies.data[counter].id)
      }
      counter++;
      this.curr_image = "https://image.tmdb.org/t/p/w500" + this.movies.data[counter].poster_path;
      this.curr_title = this.movies.data[counter].original_title;
      this.curr_description = this.movies.data[counter].overview;
      this.curr_rating = this.movies.data[counter].vote_average;
    },
  }
}
</script>

<style scoped>

  /* ToDo: Font sizes for title and description (careful to not contract cancer) */

  .description {
    height: 60%;
    position: center;
  }

  .promo {
    position: relative;
    align-content: center;
  }

  .transparent_div {
    display: none;
  }

  .transparent_div:hover {
    display: block;
    background-color: rgba(0,0,0,0.65);
    position: absolute;
    text-align: center;
    height: 100%;
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


  .image:hover + .transparent_div {
    display: block;
    background-color: rgba(0,0,0,0.65);
    position: absolute;
    text-align: center;
    height: 100%;
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
  #content-loader {
    margin-top: 5%;
  }

</style>