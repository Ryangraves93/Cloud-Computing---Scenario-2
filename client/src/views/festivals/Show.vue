<template>
<b-col>
  <h2>Festival details</h2>
  <table id="table-festival" class="table table-hover">
    <tbody>
      <tr>
        <td><img :src="festival.image_path" height="200px" /></td>
      </tr>
      <tr>
        <td width="20%">Title</td>
        <td>{{ festival.title }}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>{{ festival.description }}</td>
      </tr>
      <tr>
        <td>City</td>
        <td>{{ festival.city }}</td>
      </tr>
      <tr>
        <td>Start</td>
        <td>{{ festival.start_date }}</td>
      </tr>
      <tr>
        <td>End</td>
        <td>{{ festival.end_date }}</td>
      </tr>
    </tbody>
  </table>
  <p>
    <router-link class="btn btn-default" :to="{ name: 'festivals_index' }">Cancel</router-link>
    <router-link class="btn btn-warning" :to="{ name: 'festivals_edit', params: { id: festival._id }}">Edit</router-link>
    <button class="btn btn-danger" @click="destroy()">Delete</button>
  </p>
</b-col>
</template>

<script>
// import TodoItem from "./TodoItem"
import api from '@/api'
import s3 from '@/api/s3.js'

export default {
  name: 'FestivalsIndex',
  components: {},
  data() {
    return {
      festival: {},
      s3_url: s3
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.$route.params.id);
      api.get(`/festivals/${this.$route.params.id}`)
        .then(response => {
          let resultFestival = response.data;
          if(resultFestival.image_path)
          {
            resultFestival.image_path = this.s3_url + resultFestival.image_path;
          }

          console.log(response);
          this.festival = resultFestival;
        })
        .catch(error => console.log(error))
    },
    destroy() {
      api.delete(`/festivals/${this.$route.params.id}`)
        .then(response => {
          console.log(response);
          this.$router.push({
            name: 'festivals_index'
          });
        })
        .catch(error => console.log(error))
    }
  }
};
</script>
