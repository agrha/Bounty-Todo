<template>
  <div class="col-md-4">
    <div class="image-flip" ontouchstart="this.classList.toggle('hover');">
      <div class="mainflip">
        <div class="frontside">
            <div class="card">
              <div class="card-body text-center">
                <p><img class=" img-fluid" :src="todo.image"></p>
                <h4 class="card-title">{{todo.name}}</h4>
                <button v-if="todo.status===false" class="btn btn-outline-danger my-2 my-sm-0"><strong>Masih Ngutang</strong></button>
                <button v-if="todo.status===true" class="btn btn-outline-success my-2 my-sm-0"><strong>Lunas</strong></button>
              </div>
            </div>
        </div>
        <div class="backside col md-4">
          <div class="card">
              <h4 class="card-title">Rincian</h4>
              <label><strong>Jenis Hutang</strong></label>
              <p class="card-text">{{todo.description}}</p>
              <label><strong>Jumlah Hutang</strong></label>
              <p class="card-text">{{todo.hutang | rupiah}}</p>
              <button @click="completeTodo(todo._id)" class="btn btn-outline-success my-2 my-sm-0"><strong>Lunas?</strong></button>
              <button @click="deleteTodo(todo._id)" class="btn btn-outline-success my-2 my-sm-0"><strong>Delete</strong></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  props: ['todo'],
  methods: {
    ...mapActions([
      'deleteTodo',
      'completeTodo'
    ])
  },
  filters: {
    rupiah: function (value) {
      return 'Rp. ' + value.toLocaleString()
    }
  }
}
</script>
