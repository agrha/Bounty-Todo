<template>
  <fb-signin-button
    :params="fbSignInParams"
    @success="onSignInSuccess"
    @error="onSignInError">
    Sign in with Facebook
  </fb-signin-button>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      fbSignInParams: {
        scope: 'email',
        return_scopes: true
      },
      url: 'http://localhost:3000/users'
    }
  },
  methods: {
    onSignInSuccess (response) {
      let fbtoken = response.authResponse.accessToken
      axios.post(`${this.url}/loginfb`, {'token': fbtoken})
        .then(response => {
          console.log(response.data)
          let id = response.data.id
          let fbtoken = response.data.apptoken
          let email = response.data.email
          let name = response.data.name
          let profileUrl = response.data.profileUrl
          localStorage.setItem('token', fbtoken)
          localStorage.setItem('email', email)
          localStorage.setItem('id', id)
          localStorage.setItem('name', name)
          localStorage.setItem('profileUrl', profileUrl)
          this.$router.push('/todo')
        })
        .catch(err => {
          console.log(err)
        })
    },
    onSignInError (error) {
      console.log('OH NOES', error)
    }
  }
}
</script>

<style>
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
</style>
