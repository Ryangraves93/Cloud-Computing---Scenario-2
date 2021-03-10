<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">FestivalCloud</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link" to="/">Home</router-link>
          <router-link class="nav-link" to="/festivals">Festivals</router-link>
          <router-link class="nav-link" to="/stages">Stages</router-link>
          <router-link class="nav-link" to="/shows">Shows</router-link>
          <router-link class="nav-link" to="/performers">Performers</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  name: "MyNavBar",
};
</script>


<style>

</style>
