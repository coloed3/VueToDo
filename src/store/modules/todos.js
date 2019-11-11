/* eslint-disable no-console */
import Axios from 'axios';

const state = {
  todos: []
};

const getters = {
  allTodos: state => state.todos
};
//actions used to "get something, mutations to do something"

const actions = {
  //get all todos
  async fetchTodos({ commit }) {
    const response = await Axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    );
    console.log(response.data);
    commit('setTodos', response.data);
  },
  //add todos
  async addTodo({ commit }, title) {
    const response = await Axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      { title, completed: false }
    );
    console.log(response.data);
    commit('newTodo', response.data);
  },
  //delete todos
  async deleteTodo({ commit }, id) {
    await Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    commit('removeTodo', id);
  },
  //filter todos
  async filterTodos({ commit }, e) {
    //get selected number
    const limit= parseInt(e.target.options[e.target.options.selectedIndex].innerText);
     const response = await Axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);
    commit('setTodos', response.data);
  },

  //update if todos is complete
  async updateTodo({ commit }, updTodo) {
    const response = await Axios.put(
        `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
        updTodo
    );

    console.log(response.data);

    commit('updateTodo', response.data);
  }
};

const mutations = {
  setTodos: (state, todos) => (state.todos = todos),
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) => (state.todos = state.todos.filter(todo => todo.id !== id)),
  updateTodo: (state, updTodo) => {
    const index = state.todos.findIndex(todo => todo.id === updTodo.id);
    if (index !== -1) {
      state.todos.splice(index, 1, updTodo);
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
