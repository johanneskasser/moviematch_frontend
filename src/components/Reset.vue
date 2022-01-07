<template>
  <div class="vue-template">
    <form @submit.prevent="handleSubmit">
      <h3>Enter new Password</h3>

      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control form-control-lg" v-model='password' placeholder="Password"/>
      </div>

      <div class="form-group">
        <label>Please Repeat Password</label>
        <input type="password" class="form-control form-control-lg" v-model='password_repeat' placeholder="Password Repeat"/>
      </div>


      <button type="submit" class="btn btn-dark btn-lg btn-block button_alignment">Change Password</button>
    </form>
    <div class="alert alert-danger alert-dismissible fade show" v-if="pw_error">
      <strong> Error!</strong> Passwords do not match!
      <button type="button" class="btn-close" data-bs-dismiss="alert" @click="disableButton"></button>
    </div>
    <div class="alert alert-danger alert-dismissible fade show" v-if="error">
      <strong> Error!</strong> Token has expired! Please try again!
      <button type="button" class="btn-close" data-bs-dismiss="alert" @click="disableButton"></button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Reset",
  data() {
    return {
      password: '',
      password_repeat: '',
      pw_error: false,
      error: false
    }
  },
  methods: {
    async handleSubmit() {
      this.pw_error = false
      this.error = false
      if (this.password !== this.password_repeat) {
        this.pw_error = true
        return
      }
      try {
        await axios({
          method: 'post',
          url: 'reset',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          data: {
            token: this.$route.params.token,
            userId: this.$route.params.id,
            password: this.password
          }
        })
        await this.$router.push('/login')
      } catch (e) {
          this.error = true
      }
    },
    disableButton(){
      this.pw_error = false;
      this.error = false
    }
  }
}
</script>

<style scoped>

</style>