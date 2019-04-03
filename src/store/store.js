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
		}
	},
	mutations: {
		setPeople(state, people) {
			state.people = people;			
		},
		setPageList(state, visibleRecords){
			this.state.visibleRecords = visibleRecords;
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
			}		
	}
}); 

