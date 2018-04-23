<template>
  <nav class="navbar navbar-light fixed-top" role="navigation" style="background-color: #9999ff; margin-bottom: 0">
    <ul class="nav navbar-top-links navbar-right" style= "float: right;">
      <li v-if="token"><img alt="image" class="img-circle" :src="profileUrl" height="40px" /></li>
      <p style="margin-left:10px"><strong>WELCOME {{username}}</strong></p>
      <button @click="logout" class="btn btn-outline-danger my-2 my-sm-0" style="margin-left:10px"><strong>LogOut</strong></button>
      <CreateTodo style="margin-left:10px"></CreateTodo>
    </ul>
  </nav>
</template>

<script>
import CreateTodo from '@/components/CreateTodo'
export default {
  components: {
    CreateTodo
  },
  data () {
    return {
      token: localStorage.getItem('token') || null,
      profileUrl: localStorage.getItem('profileUrl') || null,
      username: localStorage.getItem('name') || null
    }
  },
  methods: {
    logout () {
      window.FB.getLoginStatus(function (response) {
        // console.log(response)
        if (response.status === 'connected') {
          window.FB.logout(function (response) {
            console.log('logout ', response)
            localStorage.clear()
          })
        }
      })
      this.$router.push('/')
    }
  }
}
</script>
