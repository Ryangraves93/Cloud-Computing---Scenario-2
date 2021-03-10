<template>
<b-col>
  <div class="form-group">
    <div class="col-md-6 col-md-offset-3">
      <h2>Create festival form</h2>
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
    <label for="city" class="col-md-3 control-label">City</label>
    <div class="col-md-6">
      <input type="text" class="form-control" id="city" name="city" v-model="form.city" />
    </div>
    <div v-if="formErrors.city" class="col-md-3 error">
      {{ formErrors.city.message }}
    </div>
  </div>
  <div class="form-group">
    <label for="start_date" class="col-md-3 control-label">Start Date</label>
    <div class="col-md-6">
      <input type="datetime-local" class="form-control" id="start_date" name="start_date" v-model="form.start_date" />
    </div>
    <div v-if="formErrors.start_date" class="col-md-3 error">
      {{ formErrors.start_date.message }}
    </div>
  </div>
  <div class="form-group">
    <label for="end_date" class="col-md-3 control-label">End Date</label>
    <div class="col-md-6">
      <input type="datetime-local" class="form-control" id="end_date" name="end_date" v-model="form.end_date" />
    </div>
    <div v-if="formErrors.end_date" class="col-md-3 error">
      {{ formErrors.end_date.message }}
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
  name: 'FestivalsIndex',
  components: {},
  data() {
    return {
      form: {
        title: "",
        description: "",
        city: "",
        start_date: "",
        end_date: ""
      },
      file: '',
      fileError: '',
      formErrors: {
        title: {
          message: ''
        },
        description: {
          message: ''
        },
        city: {
          message: ''
        },
        start_date: {
          message: ''
        },
        end_date: {
          message: ''
        }
      }
    }
  },
  mounted() {
    // this.getData();
  },
  methods: {

    submitForm() {
      let formData = new FormData();

      if (this.file) {
        formData.append('file', this.file);
      }

      formData.append('title', this.form.title);
      formData.append('description', this.form.description);
      formData.append('city', this.form.city);
      formData.append('start_date', this.form.start_date);
      formData.append('end_date', this.form.end_date);
      
      
      console.log(formData);
      
      api.post('/festivals/', formData, {
          headers: {
            // 'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response);
          this.$router.push({
            name: 'festivals_index'
          });
        })
        .catch(error => {
          console.log(error);
          console.log(error.response);

          // this.formErrors = error.response.data.errors;
        })
    },
    cancel() {
      this.$router.go(-1);
      // this.$router.push({
      //   name: 'festivals_index'
      // });
    },
    handleImageUpload() {

      let tempFile = this.$refs.file.files[0]

      if (tempFile['type'] === 'image/jpeg' || tempFile['type'] === 'image/jpg' || tempFile['type'] === 'image/png') {
        this.file = tempFile;
      } else {
        this.fileError = "Please make sure the file is a jpeg, jpg, or png"
      }
    }
  }
};
</script>
