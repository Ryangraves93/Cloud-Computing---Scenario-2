<template>
<b-col>
  <div class="form-group">
    <div class="col-md-6 col-md-offset-3">
      <h2>Create performer form</h2>
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
    <label for="contact_email" class="col-md-3 control-label">Contact Email</label>
    <div class="col-md-6">
      <input type="email" class="form-control" id="contact_email" name="contact_email" v-model="form.contact_email" />
    </div>
    <div v-if="formErrors.contact_email" class="col-md-3 error">
      {{ formErrors.contact_email.message }}
    </div>
  </div>
  <div class="form-group">
    <label for="contact_phone" class="col-md-3 control-label">Contact Phone</label>
    <div class="col-md-6">
      <input type="tel" class="form-control" id="contact_phone" name="contact_phone" v-model="form.contact_phone" />
    </div>
    <div v-if="formErrors.contact_phone" class="col-md-3 error">
      {{ formErrors.contact_phone.message }}
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
  name: 'PerformersIndex',
  components: {},
  data() {
    return {
      form: {
        title: "",
        description: "",
        contact_email: "",
        contact_phone: ""
      },
      file: '',
      fileError: '',
      formErrors: {}
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
      formData.append('contact_email', this.form.contact_email);
      formData.append('contact_phone', this.form.contact_phone);
      
      api.post('/performers/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          console.log(response);
          this.$router.push({
            name: 'performers_index'
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
      //   name: 'performers_index'
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
