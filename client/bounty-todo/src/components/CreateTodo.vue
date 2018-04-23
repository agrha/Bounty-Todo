<template>
  <div>
    <button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal" data-target="#createArticle"><strong>Create Blog</strong></button>
    <div class="modal fade" id="createArticle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Create Blog</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Photo:</label>
                <input type="file" class="form-control" id="recipient-name" @change="takePhoto">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Title</label>
                <input v-model="title" type="text" class="form-control" id="recipient-name">
              </div>
              <div class="form-group">
                <label for="recipient-name" class="col-form-label">Description</label>
                <input v-model="description" type="text" class="form-control" id="recipient-name">
              </div>
              <div class="form-group">
                <label for="message-text" class="col-form-label">Text</label>
                <textarea v-model="text" class="form-control" id="message-text"></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button @click="createBlog" type="button" class="btn btn-primary">Create Blog</button>
            <icon v-show="loading" name="sync" spin></icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  data () {
    return {
      name: '',
      description: '',
      text: '',
      file: null,
      formData: new FormData()
    }
  },
  methods: {
    takePhoto (event) {
      this.file = event.target.files[0]
      console.log(this.file)
    },
    createBlog () {
      this.formData.set('image', this.file)
      this.formData.set('title', this.title)
      this.formData.set('description', this.description)
      this.formData.set('text', this.text)
      this.createTodo(this.formData)
    },
    ...mapActions([
      'writeBlog'
    ])
  },
  computed: {
    ...mapGetters([
      'loading'
    ])
  }
}
</script>

<style>
.modal-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    background-color: #000;
}
</style>