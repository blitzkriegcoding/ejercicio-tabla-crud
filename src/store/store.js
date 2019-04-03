import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        people: []
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
        deletePerson(state, index){
            state.people.splice(index, 1);            
        }
    }
}); 

