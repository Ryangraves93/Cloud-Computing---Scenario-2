<template>
<b-col>
  <h2>Show details</h2>
  <table id="table-show" class="table table-hover">
    <tbody>
      <tr>
        <td>Performer</td>
        <td><router-link class="btn-link" :to="{ name: 'performers_show', params: { id: show.performer_id }}">{{ show.performer_title }}</router-link></td>
      </tr>
      <tr>
        <td>Festival</td>
        <td><router-link class="btn-link" :to="{ name: 'festivals_show', params: { id: show.festival_id }}">{{ show.festival_title }}</router-link></td>
      </tr>
      <tr>
        <td width="20%">Start</td>
        <td>{{ show.start_time }}</td>
      </tr>
      <tr>
        <td>End</td>
        <td>{{ show.end_time }}</td>
      </tr>
    </tbody>
  </table>
  <p>
    <router-link class="btn btn-default" :to="{ name: 'shows_index' }">Cancel</router-link>
    <router-link class="btn btn-warning" :to="{ name: 'shows_edit', params: { id: show._id }}">Edit</router-link>
    <button class="btn btn-danger" @click="destroy()">Delete</button>
  </p>
</b-col>
</template>

<script>
// import TodoItem from "./TodoItem"
import api from '@/api'

export default {
  name: 'ShowsIndex',
  components: {},
  data() {
    return {
      show: {},
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.$route.params.id);
      api.get(`/shows/${this.$route.params.id}`)
        .then(response => {
          console.log(response);
          this.show = response.data
        })
        .catch(error => console.log(error))
    },
    destroy() {
      api.delete(`/shows/${this.$route.params.id}`)
        .then(response => {
          console.log(response);
          this.$router.push({
            name: 'shows_index'
          });
        })
        .catch(error => console.log(error))
    }
  }
};
</script>
