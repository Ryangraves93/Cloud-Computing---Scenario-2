<template>
<b-col>
  <h2>Shows <router-link class="btn btn-primary pull-right" :to="{ name: 'shows_create' }">Add</router-link>
  </h2>
  <h4 v-if="shows.length === 0">No shows found</h4>
  <table v-else id="table-shows" class="table table-hover">
    <thead>
      <th>Performer</th>
      <th>Festival</th>
      <th>Start</th>
      <th>End</th>
    </thead>
    <tbody>
      <tr v-for="show in shows" :key="show._id">
        <td><router-link class="btn-link" :to="{ name: 'performers_show', params: { id: show.performer_id }}">{{ show.performer_title }}</router-link></td>
        <td><router-link class="btn-link" :to="{ name: 'festivals_show', params: { id: show.festival_id }}">{{ show.festival_title }}</router-link></td>
        <td>
          <router-link class="btn-link" :to="{ name: 'shows_show', params: { id: show._id }}">{{ show.start_time }}</router-link>
        </td>
        <td>{{ show.end_time }}</td>
      </tr>
    </tbody>
  </table>
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
      shows: [],
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      api.get('/shows/')
        .then(response => {
          console.log(response);
          this.shows = response.data
        })
        .catch(error => console.log(error))
    }
  }
};
</script>
