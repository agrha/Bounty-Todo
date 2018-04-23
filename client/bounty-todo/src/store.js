import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert2'
let url = `http://localhost:3000`

Vue.use(Vuex)

const state = {
  todos: [],
  loading: false,
  loadingComplete: false,
  userId: ''
}

const getters = {
  todos: state => {
    return state.todos
  },
  article: state => {
    return state.oneArticle
  },
  loading: state => {
    return state.loading
  }
}

const actions = {
  fetchData ({commit}) {
    state.userId = localStorage.getItem('id')
    axios.get(`${url}/todos/${state.userId}`)
      .then(response => {
        console.log('hasil fetch', response.data.todo)
        commit('fetchData', response.data.todo)
      })
      .catch(err => {
        console.log('fetch failed', err.message)
      })
  },
  completeTodo ({commit}, payload) {
    axios.put(`${url}/todos/${payload}`, {}, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        console.log('edit', response.data.savedData)
        commit('complete', response.data.savedData)
      })
      .catch(err => {
        console.log('error edit', err)
      })
  },
  createTodo ({commit}, obj) {
    obj.userId = state.id
    state.loading = true
    axios.post(`${url}/todos`, obj, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        console.log(response.data.data)
        commit('addData', response.data.data)
        swal(
          'Create Todo Success',
          `${response.data.data.title} is created`,
          'success'
        )
        state.loading = false
      })
      .catch(err => {
        console.log(err.message)
        swal({
          type: 'error',
          title: 'Create Todo Failed',
          text: err.message
        })
        state.loading = false
      })
  },
  deleteTodo ({commit}, obj) {
    axios.delete(`${url}/todos/${obj}`, {headers: {token: localStorage.getItem('token')}})
      .then(response => {
        swal({
          title: 'Are you sure?',
          text: 'You will delete this todo?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Delete'
        }).then(result => {
          if (result.value) {
            swal(
              'Delete Todo Success',
              `${response.data.todo.name} is deleted`,
              'success'
            )
            commit('deleteData', obj)
          }
        })
      })
      .catch(err => {
        console.log('error when deleting article', err)
      })
  },
  getOne ({commit}, obj) {
    console.log(obj)
    axios.get(`${url}/blogs/${obj}`)
      .then(response => {
        console.log(response.data.blog)
        commit('fetchOneData', response.data.blog[0])
      })
      .catch(err => {
        console.log(err)
      })
  }
}

const mutations = {
  fetchData (state, payload) {
    state.todos = payload
  },
  addData (state, payload) {
    state.todos.push(payload)
  },
  complete (state, payload) {
    // console.log(payload)
    let index = state.todos.findIndex(todo => todo._id === payload._id)
    // console.log(index)
    state.todos.splice(index, 1, payload)
  },
  deleteData (state, payload) {
    state.todos.map((data, index) => {
      if (payload === data._id) {
        state.todos.splice(index, 1)
      }
    })
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
