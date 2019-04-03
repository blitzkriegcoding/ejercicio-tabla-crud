import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		people: [],
		visibleRecords: []
	},
	getters: {
		getPeople(state){			
			return state.people;
		},
    getPagesList(state){
      return Math.floor(state.people.length / 10);
    }		
	},
	mutations: {
		setPeople(state, people) {
			state.people = people;
			store.commit('sortRecords');
		},
		setPageList(state, visibleRecords){
			this.state.visibleRecords = visibleRecords;
		},
		sortRecords(state){			
			state.people.sort((a,b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0)); 			
		}

	},
	actions: {
		fetchPeople(context){
		  axios.get('http://localhost:3000/people')
		  .then(response => {		  	
				context.commit('setPeople', response.data);
		  });            
		},		
		deletePerson(context, personId){
			axios.delete(`http://localhost:3000/people/${personId}`)
				.then((response) => {
					context.dispatch('fetchPeople');
			})
		},
		addPerson(context, payload){
			console.log(payload);
			axios.post('http://localhost:3000/people', payload)
				.then((resolve) => {
					if(resolve.status == 201) {						
						context.dispatch('fetchPeople');
					}
			}) 
		},
		updatePerson(context, payload, id){			
			axios.put(`http://localhost:3000/people/${id}`, payload)
				.then((resolve) => {
					if(resolve.status == 204) {						
						context.dispatch('fetchPeople');
					}
			}) 
		}		

	}
}); 

