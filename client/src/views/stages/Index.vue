<template>
<b-col>
  <h2>Stages <router-link class="btn btn-primary pull-right" :to="{ name: 'stages_create' }">Add</router-link>
  </h2>
  <h4 v-if="stages.length === 0">No stages found</h4>
  <table v-else id="table-stages" class="table table-hover">
    <thead>
      <th>Title</th>
      <th>Location</th>
      <th>Festival</th>
    </thead>
    <tbody>
      <tr v-for="stage in stages" :key="stage._id">
        <td>
          <router-link class="btn-link" :to="{ name: 'stages_show', params: { id: stage._id }}">{{ stage.title }}</router-link>
        </td>
        <td>{{ stage.location }}</td>
        <td><router-link class="btn-link" :to="{ name: 'festivals_show', params: { id: stage.festival_id }}">{{ stage.festival_title }}</router-link></td>
      </tr>
    </tbody>
  </table>
</b-col>
</template>

<script>
// import TodoItem from "./TodoItem"
import api from '@/api'

export default {
  name: 'StagesIndex',
  components: {},
  data() {
    return {
      stages: [],
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      api.get('/stages/')
        .then(response => {
          console.log(response);
          this.stages = response.data
        })
        .catch(error => console.log(error))
    }
  }
};
</script>
