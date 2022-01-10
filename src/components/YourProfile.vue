<template>
  <div class="vue-template">
    <h3>Your Profile</h3>
    <p>Name: {{this.user.username}}</p>
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

</style>