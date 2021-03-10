<template>
<b-col>
  <div class="form-group">
    <div class="col-md-6 col-md-offset-3">
      <h2>Create show form</h2>
    </div>
  </div>
  <div class="form-group">
    <label for="start_time" class="col-md-3 control-label">Start</label>
    <div class="col-md-6">
      <input type="datetime-local" class="form-control" id="start_time" name="start_time" v-model="form.start_time" />
    </div>
    <div v-if="formErrors.start_time" class="col-md-3 error">
      {{ formErrors.start_time.message }}
    </div>
  </div>
  <div class="form-group">
    <label for="end_time" class="col-md-3 control-label">End</label>
    <div class="col-md-6">
      <input type="datetime-local" class="form-control" id="end_time" name="end_time" v-model="form.end_time" />
    </div>
    <div v-if="formErrors.end_time" class="col-md-3 error">
      {{ formErrors.end_time.message }}
    </div>
  </div>
  <div class="form-group">
    <label for="performer" class="col-md-3 control-label">Performer</label>
    <div class="col-md-6">
      <select v-model="form.performer" :required="true">
        <option disabled value="">Please select one</option>
        <option 
         v-for="performer in performers" 
         v-bind:value="{ _id: performer._id, title: performer.title }"
        >{{ performer.title }}</option>
      </select>
    </div>
    <div v-if="formErrors.performer" class="col-md-3 error">
      {{ formErrors.performer.message }}
    </div>
  </div>
  <div class="form-group">
    <label for="festival" class="col-md-3 control-label">Festival</label>
    <div class="col-md-6">
      <select v-model="form.festival" :required="true">
        <option disabled value="">Please select one</option>
        <option 
         v-for="festival in festivals" 
         v-bind:value="{ _id: festival._id, title: festival.title }"
        >{{ festival.title }}</option>
      </select>
    </div>
    <div v-if="formErrors.festival" class="col-md-3 error">
      {{ formErrors.festival.message }}
    </div>
  </div>
  <div class="form-group">
    <div class="col-md-6 col-md-offset-3">
      <a v-on:click="cancel()" class="btn btn-default">Cancel</a>
      <button class="btn btn-primary pull-right" v-on:click="submitForm()">Submit</button>
    </div>
  </div>
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
      form: {
        start_time: "",
        end_time: "",
        performer: {},
        festival: {}
      },
      formErrors: {},
      festivals: [],
      performers: []
    }
  },
  mounted() {
    this.getFestivals();
    this.getPerformers();
  },
  methods: {

    submitForm() {
      let formData = {
        start_time: this.form.start_time,
        end_time: this.form.end_time,
        performer_id: this.form.performer._id,
        performer_title: this.form.performer.title,
        festival_id: this.form.festival._id,
        festival_title: this.form.festival.title
      }
      
      api.post('/shows/', formData)
        .then(response => {
          console.log(response);
          this.$router.push({
            name: 'shows_index'
          });
        })
        .catch(error => {
          console.log(error);

          this.formErrors = error.response.data.errors;
        })
    },
    getFestivals() {
      api.get('/festivals/')
        .then(response => {
          console.log(response);
          this.festivals = response.data
        })
        .catch(error => console.log(error))
    },
    getPerformers() {
      api.get('/performers/')
        .then(response => {
          console.log(response);
          this.performers = response.data
        })
        .catch(error => console.log(error))
    },
    cancel() {
      this.$router.go(-1)
      // this.$router.push({
      //   name: 'shows_index'
      // });
    }
  }
};
</script>
