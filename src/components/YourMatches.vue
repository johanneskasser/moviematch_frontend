<template>
  <div class="vue-template">
    <h3>Matches</h3>
    <b-card no-body>
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="Pending Matches" @click="getMatches(false)" active>
            <div class="container overflow-auto pre-scrollable" v-if="this.dataArrived">
              <div v-for="(user,index) in this.userMatched" :key="user.username" class="alert alert-info"> <!-- HERE IS A BUG -->
                <p>
                  Name: {{user.username}} <br> Email: {{user.email}}
                </p>
                <div class="container btn-group">
                  <button type="button" class="btn btn-outline-success" @click="manageMatch(false, true, index)">Match Back</button>
                  <button type="button" class="btn btn-outline-danger" @click="manageMatch(false, false, index)">Decline</button>
                </div>
              </div>
              <div class="alert alert-danger" v-if="this.userMatched.length === 0">
                <p>
                  <strong> Oh No! </strong> Seems that there are no match requests for you!
                </p>
              </div>
            </div>
        </b-tab>
        <b-tab title="Previous Matches" @click="getMatches(true)">
          <div class="container overflow-auto pre-scrollable">
            <div v-for="(user, index) in this.userMatched" :key="user.username" class="alert alert-info">
              <p>
                Name: {{user.username}} <br> Email: {{user.email}}
              </p>
              <div class="container btn-group">
                <button type="button" class="btn btn-outline-success" @click="viewMatches(index)">View Results</button>
                <button type="button" class="btn btn-outline-danger" @click="manageMatch(true ,false , index)">Delete Match</button>
              </div>
            </div>
            <div class="alert alert-danger" v-if="this.userMatched.length === 0">
              <p>
                <strong> Oh No! </strong> Seems that there are no previous maches!
              </p>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>


</template>

<script>
import {mapGetters} from "vuex";
import axios from "axios";

export default {
  name: "YourMatches",
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  data() {
    return {
      matches: [],
      userMatched: [],
      dataArrived: false,
      noResult: true,
    }
  },
  beforeMount() {
    this.getMatches(false)
  },
  methods: {
    async getMatches(matchedBack) {
      this.userMatched = []
      this.matches = []
      this.dataArrived = false
      try {
        const result = await axios.get('/getMatches', {
          params: {
            requestedFriend: this.user._id,
            matchedBack: matchedBack
          }
        })
        this.matches = result.data;
        for (let i = 0; i < this.matches.length; i++) {
          let search_user = this.matches[i].requestingFriend;
          if(this.matches[i].requestingFriend === this.user._id) {
            search_user = this.matches[i].requestedFriend;
          }
          const result = await axios.get('getUser', {
            params: {id: search_user},
          })
          this.userMatched[i] = result.data
          this.noResult = false
        }
        this.dataArrived = true;
        //console.log(this.matches, this.userMatched)
      } catch (e) {
        console.log(e);
      }
    },
    async manageMatch(pending, accepted, index) {
      if(accepted) {
        await this.$router.push('/match/:userID/:matchUserID/:init'.replace(':userID', this.matches[index].requestingFriend).replace(':matchUserID', this.user._id).replace(':init', "false"))
      } else {
        await axios.delete('/deleteMatch', {
          params: {
            _id: this.matches[index]._id
          }
        })
        await this.getMatches(pending)
      }
    },
    async viewMatches(index) {
      console.log(index)
      let otherUser = ''
      if(this.matches[index].requestedFriend === this.user._id) {
        otherUser = this.matches[index].requestingFriend;
      } else {
        otherUser = this.matches[index].requestedFriend
      }
      await this.$router.push("/completedMatches/:otherUser".replace(':otherUser', otherUser))
    }
  }

}
</script>

<style scoped>

</style>