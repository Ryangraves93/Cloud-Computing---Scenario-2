<template>
<b-col>
  <h2>Performers <router-link class="btn btn-primary pull-right" :to="{ name: 'performers_create' }">Add</router-link>
  </h2>
  <h4 v-if="performers.length === 0">No performers found</h4>
  <table v-else id="table-performers" class="table table-hover">
    <thead>
      <th>Title</th>
      <th>Contact Email</th>
      <th>Contact Phone</th>
    </thead>
    <tbody>
      <tr v-for="performer in performers" :key="performer._id">
        <td>
          <router-link class="btn-link" :to="{ name: 'performers_show', params: { id: performer._id }}">{{ performer.title }}</router-link>
        </td>
        <td>{{ performer.contact_email }}</td>
        <td>{{ performer.contact_phone }}</td>
      </tr>
    </tbody>
  </table>
</b-col>
</template>

<script>
// import TodoItem from "./TodoItem"
import api from '@/api'

export default {
  name: 'PerformersIndex',
  components: {},
  data() {
    return {
      performers: [],
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      api.get('/performers/')
        .then(response => {
          console.log(response);
          this.performers = response.data
        })
        .catch(error => console.log(error))
    }
  }
};
</script>
