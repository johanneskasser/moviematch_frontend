<template>
  <div class="vue-template">
    <div id="screenIGuess" class="promo inner-block">
      <table v-if="movies">
        <tr>
          <th>Movie</th>
          <th>Description</th>
          <th>Rating</th>
        </tr>
        <tr v-for="(movie, index) in this.movies.data" :key="movie" >
            <td><img width=250 :src="movies.data[index].poster_path"><br><p><b>{{movies.data[index].original_title}}</b></p></td>
            <td>{{movies.data[index].overview}}<br><br><a v-if="movies.data[index].homepage !== ''" :href="movies.data[index].homepage" target="_blank">WATCH TRAILER</a></td>
            <td>Rating: {{movies.data[index].vote_average}}/10</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "CompletedMatches",
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  data() {
    return {
      movies: [],
    }
  },
  async mounted() {
    const loggedInUser = this.user._id;
    const otherUser = this.$route.params.otherUser

    try {
      this.movies = await axios.get('/getCommonMovies', {
        params: {
          requestingFriend: loggedInUser,
          requestedFriend: otherUser
        }
      })
      console.log(this.movies);

      for (let i = 0; i<this.movies.data.length; i++){
        let help = this.movies.data[i].poster_path;
        this.movies.data[i].poster_path = "https://image.tmdb.org/t/p/w500" + help;
      }
      console.log(this.movies);

    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped>

.promo {
  position: relative;
  align-content: center;
}


.inner-block {
  width: 80%;
  position: absolute;
  left: 10%;
  top: 10%;
  justify-content: center;
}

table{
  text-align: center;
}

th,td{
  padding: 15px;
}

</style>