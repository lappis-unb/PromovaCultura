<template>
  <header>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,700,800|Poppins:300,400,500,600,700" rel="stylesheet">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
          <router-link class="navbar-brand" to="/">{{title}}</router-link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
              aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
          </button>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "NavbarMenu",
  data() {
    return {
      title: "Promova Cultura"
    };
  }
};
</script>

<style scoped>

h1,
h2,
h3,
h4,
h5,
h6 {
  color: #333;
}
h1 {
  font-weight: 700;
}
a {
  color: #333;
}
a:hover {
  opacity: 0.8;
  color: #333;
}

.navbar-brand {
  text-transform: uppercase;
  font-weight: 600;
  font-size: 24px;
}

.navbar-nav {
  font-size: 15px;
}
</style>
