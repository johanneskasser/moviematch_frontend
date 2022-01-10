<template>
  <div class="vue-template">
    <form @submit.prevent="handleSubmit">
      <h3>MovieMatch</h3>
      <div class="form-group">
        <label>Choose your favourite Genre: </label>
        <select class="form-select" aria-label="Genre selection" id="select">
          <option selected>No specific Genre</option>
          <option value="28">Action</option>
          <option value="12">Adventure</option>
          <option value="35">Comedy</option>
          <option value="80">Crime</option>
          <option value="99">Documentary</option>
          <option value="27">Horror</option>
          <option value="10749">Romance</option>
          <option value="878">Science Fiction</option>
          <option value="53">Thriller</option>
        </select>
      </div>

      <button type="submit" class="btn btn-dark btn-lg btn-block button_alignment">Start Matching!</button>


    </form>
  </div>

</template>

<script>

  export default {
    name: "Match",
    methods: {
      async handleSubmit() {
        let select = document.getElementById('select')
        const genreID = select.options[select.selectedIndex].value
        await this.$router.push('/match/:userID/:matchUserID/:genreID/:init'.replace(':userID', this.$route.params.userID).replace(':matchUserID', this.$route.params.matchUserID).replace(':genreID', genreID).replace(':init', true))
      }
    }
  }
</script>

<style scoped>

</style>