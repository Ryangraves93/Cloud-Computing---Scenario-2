<template>
<b-col>
  <h2>Festivals <router-link class="btn btn-primary pull-right" :to="{ name: 'festivals_create' }">Add</router-link>
  </h2>
  <h4 v-if="festivals.length === 0">No festivals found</h4>
  <table v-else id="table-festivals" class="table table-hover">
    <thead>
      <th>Title</th>
      <th>City</th>
      <th>Start</th>
      <th>End</th>
    </thead>
    <tbody>
      <tr v-for="festival in festivals" :key="festival._id">
        <td>
          <router-link class="btn-link" :to="{ name: 'festivals_show', params: { id: festival._id }}">{{ festival.title }}</router-link>
        </td>
        <td>{{ festival.city }}</td>
        <td>{{ festival.start_date }}</td>
        <td>{{ festival.end_date }}</td>
      </tr>
    </tbody>
  </table>
</b-col>
</template>

<script>
// import TodoItem from "./TodoItem"
import api from '@/api'

export default {
  name: 'FestivalsIndex',
  components: {},
  data() {
    return {
      festivals: [],
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      api.get('/festivals/')
        .then(response => {
          console.log(response);
          this.festivals = response.data
        })
        .catch(error => console.log(error))
    }
  }
};
</script>
