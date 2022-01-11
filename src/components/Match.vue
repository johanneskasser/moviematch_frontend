<template>
  <div id="screen" class="vue-template">
    <h3>This is just here so that the other shit moves down on the page without CSS xd and a bit more SmileyFace</h3>
    <!-- <h3 id="title" v-if="movies">{{this.movies.data.results[0].original_title}}</h3> -->
    <!-- <img src = "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg"> -->
    <!-- <p id="rating" v-if="movies">Rating: {{this.movies.data.results[0].vote_average}} out of 10</p> -->
    <button id ="start" @click="initialBuildUp">Start Matching!</button>
    <button id ="like" class="like" @click="like">Like</button>
    <button id = "dislike" class="dislike" @click="changeContent">Dislike</button>
  </div>
</template>

<script>
import axios from "axios";

let counter = 0;
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
    initialBuildUp() {

      let screen = document.getElementById("screen");

      let title = document.createElement("h3");
      title.id = "title";
      title.innerText = this.movies.data.results[0].original_title;


      let startButton = document.getElementById("start");
      startButton.remove();

      let moviePoster = document.createElement("img");
      moviePoster.id = "poster";
      moviePoster.src = "https://image.tmdb.org/t/p/w500" + this.movies.data.results[0].poster_path;

      let rating = document.createElement("p");
      rating.innerText = "Rating: " + this.movies.data.results[0].vote_average + " out of 10";


      screen.appendChild(title);
      screen.appendChild(moviePoster);
      screen.appendChild(rating);

    },

    changeContent() {
      counter++;

      let title = document.getElementById("title");
      let moviePoster = document.getElementById("poster");
      //let rating = document.getElementById("rating");


      /** DAS HIER FUNKTIONIERT ZWAR PRINZIPIELL, ABER IRGENDWAS IST NOCH BUGGY **/
      if(counter > 9){
        counter = 0;
      /*let screen = document.getElementById("screen");
        let like = document.getElementById("like");
        let dislike = document.getElementById("dislike");

        like.remove();
        dislike.remove();
        title.remove();
        moviePoster.remove();
        rating.remove();

        let congrats = document.createElement("p");
        congrats.innerText = "Yay you did it. Now wait for your friend to complete their matches!"

        let returnButton = document.createElement("button");
        returnButton.innerText = "Return";
        returnButton.onclick = function(){
            //return to landing page
            console.log("Let me in.. LET ME IIIIIIIIIIIIIIN!!")
        }

        screen.appendChild(congrats);
        screen.appendChild(returnButton);

        //go to landing page pls mit router push blabla
      */}


      title.innerText = this.movies.data.results[counter].original_title;


      moviePoster.src = "https://image.tmdb.org/t/p/w500" + this.movies.data.results[counter].poster_path;


      //rating.innerHTML = "Rating: " + this.movies.data.results[counter].vote_average + " out of 10";


    },

    like(){
      let addToDataBase = this.movies.data.results[counter].id;
      console.log(addToDataBase);
      // add movie to database
      this.changeContent();
    }

  }
}
</script>

<style scoped>

</style>