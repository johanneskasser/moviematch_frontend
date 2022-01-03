<template>
  <div class="vue-template">
  <form @submit.prevent="handleSubmit">
    <h3>Register</h3>

    <div class="form-group">
      <label>Username</label>
      <input type="text" class="form-control" v-model="username" placeholder="Username"/>
    </div>

    <div class="form-group">
      <label>E-Mail</label>
      <input type="email" class="form-control" v-model="email" placeholder="E-Mail"/>
    </div>

    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" v-model="password" placeholder="Password"/>
    </div>

    <div class="form-group">
      <label>Repeat Password</label>
      <input type="password" class="form-control" v-model="password_repeat" placeholder="Repeat Password"/>
    </div>

    <button class="btn btn-dark btn-lg btn-block button_alignment">Create</button>
  </form>
     <div class="alert" v-if="password_error">
      <p>
        <strong> Error!</strong> Passwords do not match!
      </p>
     </div>
    <div class="alert" v-if="error">
      <p>
        <strong> Error!</strong> User does already exist
      </p>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
export default {
  name: "Register",
  data() {
    return {
      username: '',
      email: '',
      password: '',
      password_repeat: '',
      password_error: false,
      error: false
    }
  },
  methods: {
    async handleSubmit(){
      this.password_error = false
      if(this.password !== this.password_repeat) {
        this.password_error = true;
        //console.log('here')
        return
      }
      try {
        const response = await axios({
          method: 'post',
          url: 'register',
          headers: {'Content-Type': 'application/json'},
          data: {
            username: this.username,
            email: this.email,
            password: this.password
          }
        })
        console.log(response)
        await this.$router.push('/login')
      } catch (e) {
        this.error = true
      }
    }
  }
}
</script>

<style scoped>
  @import "/src/assets/css/alert.css";
</style>