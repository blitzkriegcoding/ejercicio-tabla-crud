<template>
  <div id="app">
    <ul>
      <li v-for="p in people">
        {{p.first_name}}
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'app',
    mounted() {
      axios.get('http://localhost:3000/people')
        .then(response => {
          this.$store.state.people = response.data;
        })
    },
    computed: {
      people() {
        return this.$store.state.people;
      }
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        
      }
    }
  }
</script>

<style>

</style>
