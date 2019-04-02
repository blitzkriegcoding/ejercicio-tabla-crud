<template>
  <div>
    <div>
      <b-table striped hover :items="records" :fields="fields"></b-table>
    </div> Ir a Página:  
    <select @change="onChange" v-model="selectedPage">
      <option v-for="i in (getPeople.length / 10)">
       {{i}}
      </option>
    </select>
  </div>
</template>
<script>
  import axios from 'axios';    
  export default {
  mounted() {
      // 
      axios.get('http://localhost:3000/people')
      .then(response => {
        this.setPeopleRecords(response.data);

        this.records = getSlicePagination(this.getPeople);
      });
    },
    computed: {
      getPeople() {
        return this.$store.getters.getPeople;
      }
    },
    methods: {
      onChange(event){
        let page = event.target.value;
        this.records = getSlicePagination(this.$store.getters.getPeople, 10, page);        
      },
      setPeopleRecords(records){
        this.$store.commit('setPeople', records);
      }
  },

  data () {
      return {
        fields: [
          {
            key: 'id',
            label: 'Person ID'
          },
          {
            key: 'first_name',
            label: 'First Name'
          },
          {
            key: 'last_name',
            label: 'Last Name'
          },
          {
            key: 'email',
            label: 'Unique Email'
          }

        ],        
        selectedPage: 1,
        records: []
      }
    }
  }
</script>
<style>
  
</style>
