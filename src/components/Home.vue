<template>
  <div>
    <h3 v-if="user"> Hi, {{user.username}} </h3>
    <h3 v-else>You are not logged in!</h3>
    <form @submit.prevent="getUser">
      <div class="form-group">
        <label>Find your friend: </label>
        <input type="text" class="form-control form-control-lg" v-model='username' placeholder="Username"/>
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block button_alignment">Search</button>

      <content-loader
          viewBox="0 0 476 124"
          primaryColor="#f3f3f3"
          secondaryColor="#cccccc"
          v-if="searching"
          id="content-loader"
      >
        <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
        <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
        <rect x="0" y="56" rx="3" ry="3" width="410" height="6" />
        <rect x="0" y="72" rx="3" ry="3" width="380" height="6" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <circle cx="20" cy="20" r="20" />
      </content-loader>
      <div class="userDisplay alert-success" v-if="!searching && success">
        <p>Name: {{this.searched_user.username}} <br>
        Email: {{this.searched_user.email}}</p>
        <div class="button_alignment buttons btn-group-vertical">
          <p><strong>Would you like to request this user?</strong></p>
          <button type="button" class="btn btn-success">Yes</button>
          <button type="button" class="btn btn-danger">No</button>
        </div>
      </div>
      <div class="userDisplay alert-danger" v-if="!not_searched_yet && !searching && !success">
        <p><strong>Error!</strong> Your requested User could not be found! Please enter another Username</p>
      </div>
    </form>

  </div>

</template>

<script>
import {mapGetters} from "vuex";
import {ContentLoader} from "vue-content-loader";
import axios from "axios";

export default {
  name: "Home",
  //props: ['user']
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  components: {
    ContentLoader,
  },
  data(){
    return {
      searching: false,
      username: '',
      success: false,
      searched_user: '',
      not_searched_yet: true
    }
  },
  methods: {
    async getUser(){
      this.success = false
      this.searching = true
      this.not_searched_yet = false
      try {
        const result = await axios.get("getUser", {
          params: {
            username: this.username
          }
        })
        this.searched_user = result.data
        this.success = true
      } catch (e) {
        console.log()
      }
      this.searching = false
    }
  }
}

</script>

<style scoped>
  #content-loader {
    margin-top: 5%;
  }

  .userDisplay {
    margin-top: 5%;
    padding: 5%;
  }
  .buttons {
  }
</style>