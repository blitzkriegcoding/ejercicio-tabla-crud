<template>
  <div>
    <table class="fixed_header table_border">
      <thead>
        <tr>
          <th v-for="header in fields">{{ header.label }}</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="record in setVisibleRecords">
          <td v-for="field in fields">
            {{record[field.key]}}
          </td>
          <td>
            <b-button variant="primary">Primary</b-button>
            <b-button variant="danger" @click="deleteRecord(record.id)">Danger</b-button>
          </td>
        </tr>
      </tbody>
    </table>
<!--     <template slot>
      
    </template> -->
    <div>
      Ir a Página:  
      <select @change="onChange" v-model="selectedPage">
        <option v-for="i in getPagesList">
         {{i}}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';    
  export default {
  mounted() {
      this.$store.dispatch('fetchPeople');      
    },
    computed: {
      getPeople() {
        return this.$store.getters.getPeople;
      },
      setVisibleRecords(){
        return this.records.length == 0 ? getSlicePagination(this.getPeople) : this.records;
      },
      getPagesList(){
        return this.$store.getters.getPagesList;
      }
    },
    methods: {
      onChange(event){
        let page = event.target.value;
        this.records = getSlicePagination(this.$store.getters.getPeople, 10, page);        
      },
      setPeopleRecords(records){
        this.$store.commit('setPeople', records);
      },
      deleteRecord(id){        
        this.$store.dispatch('deletePerson', id);
        this.resetVisibleRecords(getSlicePagination(this.getPeople, 10, this.selectedPage));
      },
      resetVisibleRecords(visibleRecords){
        console.log(visibleRecords);
        this.$store.commit('setPageList', visibleRecords)
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
.fixed_header{
    width: 1000px;
    table-layout: fixed;
    border-collapse: collapse;
}

.fixed_header tbody{
  display:block;
  width: 100%;
  overflow: auto;
  height: 300px;
}

.fixed_header thead tr {
   display: block;
}

.fixed_header thead {
  background: black;
  color:#fff;
}

.fixed_header th, .fixed_header td {
  padding: 5px;
  text-align: left;
  width: 200px;
}
.table_border {
  border: 1px solid #000;
}
.align_td {
  text-align: center
}
</style>
