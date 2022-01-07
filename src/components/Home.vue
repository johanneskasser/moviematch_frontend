<template>
  <div>
    <h3 v-if="user"> Hi, {{user.username}} </h3>
    <h3 v-else>You are not logged in!</h3>

    <div>
      <b-card no-body>
        <b-tabs content-class="mt-3" align="center">
          <b-tab title="Search" active>
            <div>
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
                <div class="userDisplay alert-success overflow-auto pre-scrollable" v-if="!searching && success">
                  <p>Name: {{this.searched_user.username}} <br>
                    Email: {{this.searched_user.email}}</p>
                  <div class="button_alignment buttons btn-group-vertical">
                    <p><strong>Would you like to request this user?</strong></p>
                    <button type="button" class="btn btn-outline-success" @click="sendFriendRequest">Yes</button>
                    <button type="button" class="btn btn-outline-danger" @click="getBack">No</button>
                  </div>
                </div>
                <div class="userDisplay alert-danger" v-if="!not_searched_yet && !searching && !success">
                  <p><strong>Error!</strong> Your requested User could not be found! Please enter another Username</p>
                </div>
              </form>
            </div>
          </b-tab>
          <b-tab title="Friend requests" @click="refreshFriends(false)">
            <b-card-text>
              <div class="container overflow-auto pre-scrollable">
                <div v-for="user in this.requested_friends" :key="user.username" class="alert alert-info">
                  <p>
                    Name: {{user.username}} <br> Email: {{user.email}}
                  </p>
                  <div class="container btn-group">
                    <button type="button" class="btn btn-outline-success" @click="manageFriendship(true, user._id)">Accept</button>
                    <button type="button" class="btn btn-outline-danger" @click="manageFriendship(false, user._id)">Decline</button>
                  </div>
                </div>
                <div class="alert alert-danger" v-if="this.requested_friends.length === 0">
                  <p>
                    <strong> Oh No! </strong> Seems that there are no friend requests for you!
                  </p>
                </div>
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title="Friends" @click="refreshFriends(true)">
            <b-card-text>
              <div class="container overflow-auto pre-scrollable">
                <div v-for="user in this.friends" :key="user.username" class="alert alert-info">
                  <p>
                    Name: {{user.username}} <br> Email: {{user.email}}
                  </p>
                  <div class="container btn-group">
                    <button type="button" class="btn btn-outline-success">Start Matching!</button>
                    <button type="button" class="btn btn-outline-danger">Delete Friend</button>
                  </div>
                </div>
                <div class="alert alert-danger" v-if="this.friends.length === 0">
                  <p>
                    <strong> Oh No! </strong> Seems that there are no friends yet. Search for some!
                  </p>
                </div>
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
    </div>

  </div>

</template>

<script>
import {mapGetters} from "vuex";
import {ContentLoader} from "vue-content-loader";
import axios from "axios";
import controller from "../services/controller"

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
      requested_friends: [],
      friends: [],
      not_searched_yet: true,
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
    },
    async sendFriendRequest(){
      try {
        await axios.put("requestUser", {
          requestingFriend: this.user._id,
          requestedFriend: this.searched_user._id
        })
      } catch (e) {
        console.log(e)
      }
    },
    getBack() {
      this.not_searched_yet = true
      this.success = false
    },
    async refreshFriends(accepted) {
      let yourFriends = null
      if(accepted) {
        yourFriends = this.user._id;
      }
      try {
        const response = await axios.get("/getFriends", {
          params: {
            id: this.user._id,
            yourFriends: yourFriends,
            accepted: accepted
          }
        })
        for (let i = 0; i < response.data.length; i++) {
          try {
            let user = ''
            if(response.data[i].requestingFriend === this.user._id){
              user = await axios.get("/getUser", {
                params: {
                  id: response.data[i].requestedFriend
                }
              })
            } else {
              user = await axios.get("/getUser", {
                params: {
                  id: response.data[i].requestingFriend
                }
              })
            }
            //console.log(user)
            if(accepted) {
              if(!controller.checkDuplicate(user.data, this.friends)){
                this.friends.push(user.data)
              }
            } else if(!accepted) {
              if(!controller.checkDuplicate(user.data, this.requested_friends)){
                this.requested_friends.push(user.data)
              }
            }
          } catch (e) {
            console.log(e)
          }
        }
        console.log(this.friends)
      } catch(e) {
        console.log(e)
      }
    },
    async manageFriendship(accept, requestingFriend) {
      //console.log(accept, requestingFriend, this.user._id)
      try {
        await axios.put('/manageFriendship', {
          requestingFriend: requestingFriend,
          requestedFriend: this.user._id,
          accept: accept
        })
        let index = controller.toErase(requestingFriend, this.user._id, this.requested_friends)
        this.requested_friends.splice(index, 1)
        await this.refreshFriends(accept)
      } catch (e) {
        console.log(e)
      }
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
    width: 100%;
    margin-bottom: 5%;
  }
  .pre-scrollable {
    max-height: 30rem;
    overflow-y: scroll;
  }
</style>