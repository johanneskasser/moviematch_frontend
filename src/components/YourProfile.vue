<template>
  <div class="vue-template">
    <h3 class="headline"> Your Profile Card : </h3>
    <p class="username">Username: {{this.user.username}}<img class="blankPic" src="../resources/userimage.png" height="50" width="50" alt="blankUserImage">
    </p>
    <p class="email">E-Mail: {{this.user.email}} </p>
    <p> In case of any issues and further questions, please do not hesitate to contact us via e-mail : <a href="mailto:noreply.moviematch@gmail.com">noreply.moviematch@gmail.com</a> </p>
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "YourProfile",
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
}
</script>

<style scoped>
.headline {font-family: "Franklin Gothic Heavy",serif}
.username {font-family: "Franklin Gothic Heavy",serif}
.email {font-family: "Franklin Gothic Heavy",serif}
.blankPic {
  position: relative; left: 50% ; top: 5px  }

</style>