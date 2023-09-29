<template>
  <section>
    <nav class="container">
      <div class="branding">
        <router-link class="header" :to="{ name: 'HomeView' }"
          >FireBlogs</router-link
        >
      </div>
      <div class="nav-links">
        <ul>
          <router-link class="link" to="#">Home</router-link>
          <router-link class="link" to="#">Blogse</router-link>
          <router-link class="link" to="#">Create Post</router-link>
          <router-link class="link" to="#">Login / Register</router-link>
        </ul>
      </div>
    </nav>
  </section>
</template>

<script>
export default {
  name: "TheNavigation",
  components: {},
};
</script>

<style lang="scss" scoped>
.container {
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    text-decoration: none;
    color: black;
  }
  ul {
    display: flex;
    gap: 10px;
  }
}
</style>
