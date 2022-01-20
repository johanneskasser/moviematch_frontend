<template>
  <div class="vue-template">
    <div id="screenIGuess" class="promo inner-block">
      <table>
        <tr>
          <th>Movie</th>
          <th>Description</th>
          <th>Rating</th>
        </tr>
        <tr v-for="movie in 10" :key="movie" >
            <td><img width=250 src="https://www.joblo.com/wp-content/uploads/2022/01/blacklight-neeson.jpg" alt="fuckoff"><br><p><b>Ur cooler Film oida</b></p></td>
            <td>Travis Block is a government operative coming to terms with his shadowy past. When he discovers a plot targeting U.S. citizens, Block finds himself in the crosshairs of the FBI director he once helped protect.</td>
            <td>Rating 8/10</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "CompletedMatches",
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