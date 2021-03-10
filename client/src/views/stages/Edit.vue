<template>
<b-col>
  <div class="form-group">
    <div class="col-md-6 col-md-offset-3">
      <h2>Edit stage form</h2>
    </div>
  </div>
  <div class="form-group">
    <label for="title" class="col-md-3 control-label">Title</label>
    <div class="col-md-6">
      <input type="text" class="form-control" id="title" name="title" v-model="form.title" />
    </div>
    <div v-if="formErrors.title" class="col-md-3 error">
      {{ formErrors.title.message }}
    </div>
  </div>
  <div class="form-group">
    <label for="description" class="col-md-3 control-label">Description</label>
    <div class="col-md-6">
      <textarea id="description" name="description" v-model="form.description" rows="4" cols="50"></textarea>
    </div>
    <div v-if="formErrors.description" class="col-md-3 error">
      {{ formErrors.description.message }}
    </div>
  </div>
  <div class="form-group">
    <label for="location" class="col-md-3 control-label">Location</label>
    <div class="col-md-6">
      <input type="text" class="form-control" id="location" name="location" v-model="form.location" />
    </div>
    <div v-if="formErrors.location" class="col-md-3 error">
      {{ formErrors.location.message }}
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
    <label for="image_path" class="col-md-3 control-label">Image</label>
    <div class="col-md-6">
      <input type="file" class="form-control" id="file" name="file" ref="file" v-on:change="handleImageUpload()" />
    </div>

    <div class="col-md-3 error">
      {{ fileError }}
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
  name: 'StagesIndex',
  components: {},
  data() {
    return {
      stage: {},
      form: {
        title: "",
        description: "",
        location: "",
        festival: {}
      },
      file: '',
      fileError: '',
      formErrors: {},
      festivals: []
    }
  },
  mounted() {
    this.getData();
    this.getFestivals();
  },
  methods: {
    
    getData() {
      console.log(this.$route.params.id);
      api.get(`/stages/${this.$route.params.id}`)
        .then(response => {
          console.log(response);
          this.stage = response.data
          
          this.form.title = this.stage.title
          this.form.description = this.stage.description
          this.form.location = this.stage.location
        })
        .catch(error => console.log(error))
    },

    submitForm() {
      let formData = new FormData();

      if (this.file) {
        formData.append('file', this.file);
      }

      formData.append('title', this.form.title);
      formData.append('description', this.form.description);
      formData.append('location', this.form.location);
      formData.append('festival_id', this.form.festival._id);
      formData.append('festival_title', this.form.festival.title);
      
      api.put(`/stages/${this.$route.params.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log("Edit");
          console.log(response);
          this.$router.push({
            name: 'stages_index'
          });
        })
        .catch(error => {
          console.log(error);

          this.formErrors = error.response.data.errors;
        })
    },
    cancel() {
      this.$router.go(-1);
      // this.$router.push({
      //   name: 'stages_index'
      // });
    },
    handleImageUpload() {

      let tempFile = this.$refs.file.files[0]

      if (tempFile['type'] === 'image/jpeg' || tempFile['type'] === 'image/jpg' || tempFile['type'] === 'image/png') {
        this.file = tempFile;
      } else {
        this.fileError = "Please make sure the file is a jpeg, jpg, or png"
      }
    },
    getFestivals() {
      api.get('/festivals/')
        .then(response => {
          console.log(response);
          this.festivals = response.data
          
          this.form.festival = {
            _id: this.stage.festival_id,
            title: this.stage.festival_title,
          }
        })
        .catch(error => console.log(error))
    }
  }
};
</script>
