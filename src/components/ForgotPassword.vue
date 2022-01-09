<template>
  <div class="vue-template">
    <form @submit.prevent="handleSubmit">
      <h3>Forgot Password</h3>

      <div class="form-group">
        <label>Email</label>
        <input type="text" class="form-control" v-model="email" placeholder="Email"/>
      </div>
      <button type="submit" class="btn btn-dark btn-lg btn-block button_alignment">Reset Password</button>
    </form>

    <div class="alert alert-danger alert-dismissible fade show" v-if="error">
       <strong> Error!</strong> User does not exist!
      <button type="button" class="btn-close" data-bs-dismiss="alert" @click="disableButton"></button>
    </div>
    <div class="alert alert-success alert-dismissible fade show" v-if="success">
      <strong> Success!</strong> Please check your Emails!
      <button type="button" class="btn-close" data-bs-dismiss="alert" @click="disableButton"></button>
    </div>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "ForgotPassword",
  data() {
    return {
      email: '',
      error: false,
      success: false
    }
  },
  methods: {
    async handleSubmit() {
      this.success = false
      this.error = false
      try {
        await axios({
          method: 'post',
          url: 'forgot-password',
          headers: {'Content-Type': 'application/json'},
          data: {
            email: this.email
          }
        })
        this.success = true
      } catch (e) {
        this.error = true
      }
    },
    disableButton(){
      this.success = false;
      this.error = false
    }
  }
}
</script>

<style scoped>
  @import "/src/assets/css/alert.css";
</style>