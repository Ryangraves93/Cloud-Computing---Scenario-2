<template>
<b-col>
  <h2>Stage details</h2>
  <table id="table-stage" class="table table-hover">
    <tbody>
      <tr>
        <td><img :src="s3_url+stage.image_path" height="200px" /></td>
      </tr>
      <tr>
        <td width="20%">Title</td>
        <td>{{ stage.title }}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>{{ stage.description }}</td>
      </tr>
      <tr>
        <td>Location</td>
        <td>{{ stage.location }}</td>
      </tr>
      <tr>
        <td>Festival</td>
        <td><router-link class="btn-link" :to="{ name: 'festivals_show', params: { id: stage.festival_id }}">{{ stage.festival_title }}</router-link></td>
      </tr>
    </tbody>
  </table>
  <p>
    <router-link class="btn btn-default" :to="{ name: 'stages_index' }">Cancel</router-link>
    <router-link class="btn btn-warning" :to="{ name: 'stages_edit', params: { id: stage._id }}">Edit</router-link>
    <button class="btn btn-danger" @click="destroy()">Delete</button>
  </p>
</b-col>
</template>

<script>
// import TodoItem from "./TodoItem"
import api from '@/api'
import s3 from '@/api/s3.js'

export default {
  name: 'StagesIndex',
  components: {},
  data() {
    return {
      stage: {},
      s3_url: s3
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.$route.params.id);
      api.get(`/stages/${this.$route.params.id}`)
        .then(response => {
          console.log(response);
          this.stage = response.data
        })
        .catch(error => console.log(error))
    },
    destroy() {
      api.delete(`/stages/${this.$route.params.id}`)
        .then(response => {
          console.log(response);
          this.$router.push({
            name: 'stages_index'
          });
        })
        .catch(error => console.log(error))
    }
  }
};
</script>
