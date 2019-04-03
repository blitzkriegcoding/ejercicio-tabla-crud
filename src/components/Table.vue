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
            <b-button variant="primary" v-b-modal.modal-update @click="updateRecord(record)">Edit</b-button>
            <b-button variant="danger" @click="deleteRecord(record.id)">Delete</b-button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      Ir a Página:  
      <select @change="onChange" v-model="selectedPage">
        <option v-for="i in getPagesList">
         {{i}}
        </option>
      </select>
      <br/><br>
        <b-button variant="success" v-b-modal.modal-prevent>Add New Record</b-button>
      <br/>      
    </div>

    <!-- Modal Component -->
    <b-modal
      id="modal-prevent"
      ref="modalAdd"
      title="Submit a new record"
      @ok="handleAddOk"
      >
      <form @submit.stop.prevent="handleSubmitAdd">
        <b-form-input v-model="newRecord.first_name" placeholder="First name"></b-form-input>
        <hr/>
        <b-form-input v-model="newRecord.last_name" placeholder="Last name"></b-form-input>
        <hr/>
        <b-form-input v-model="newRecord.email" placeholder="Email"></b-form-input>
      </form>
    </b-modal>

    <b-modal
      id="modal-update"
      ref="modalUpdate"
      title="Edit a record"
      @ok="handleUpdateOk"
      >
      <form @submit.stop.prevent="handleSubmitUpdate">
        <b-form-input v-model="editRecord.first_name" placeholder="First name"></b-form-input>
        <hr/>
        <b-form-input v-model="editRecord.last_name" placeholder="Last name"></b-form-input>
        <hr/>
        <b-form-input v-model="editRecord.email" placeholder="Email"></b-form-input>
      </form>
    </b-modal>
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
        return getSlicePagination(this.getPeople, 10, this.selectedPage);
      },
      getPagesList(){
        return this.$store.getters.getPagesList;
      },
    },
    methods: {
      onChange(event){
        let page = event.target.value;
        this.records = getSlicePagination(this.$store.getters.getPeople, 10, page);        
      },
      setPeopleRecords(records){
        this.$store.commit('setPeople', records);
      },
      clearModel(){
        this.newRecord = {
          first_name: "",
          last_name: "",
          email: ""
        };
        this.editRecord = {
          id: null,
          first_name: "",
          last_name: "",
          email: ""
        };
      }, 
      updateRecord(record){
        this.editRecord.id = record.id;
        this.editRecord.first_name = record.first_name;
        this.editRecord.last_name = record.last_name;
        this.editRecord.email = record.email;
        console.log(this.editRecord);
      },
      deleteRecord(id){        
        this.$store.dispatch('deletePerson', id);
        this.resetVisibleRecords(getSlicePagination(this.getPeople, 10, this.selectedPage));
      },
      resetVisibleRecords(visibleRecords){        
        this.$store.commit('setPageList', visibleRecords)
      },  
      handleAddOk(evt) {
        // Prevent modal from closing
        evt.preventDefault()
        if (this.newRecord.first_name =="" || this.newRecord.last_name == "" || this.newRecord.email == "") {
          alert('Please enter the missing field...')          
        } else {
          this.handleSubmitAdd()
        }
      },
      handleUpdateOk(evt) {
        // Prevent modal from closing
        evt.preventDefault()
        if (this.editRecord.first_name =="" || this.editRecord.last_name == "" || this.editRecord.email == "") {
          alert('Please enter the missing field...')          
        } else {
          this.handleSubmitUpdate()
        }
      }, 

      handleSubmitAdd() {
        this.$store.dispatch('addPerson', this.newRecord);        
        this.$nextTick(() => {
          // Wrapped in $nextTick to ensure DOM is rendered before closing
          this.$refs.modalAdd.hide();
          this.clearModel();
        })
      },
      handleSubmitUpdate() {
        this.$store.dispatch('updatePerson', this.editRecord);        
        this.$nextTick(() => {
          // Wrapped in $nextTick to ensure DOM is rendered before closing
          this.$refs.modalUpdate.hide();
          this.clearModel();          
        })
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
            label: 'Email'
          }
        ],        
        selectedPage: 1,
        records: [],
        newRecord:{
          first_name: "",
          last_name: "",
          email: ""
        },
        editRecord: {
          id: null,
          first_name: "",
          last_name: "",
          email: ""          
        }
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
