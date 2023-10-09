<template>
  <div class="blog-wrapper no_user">
    <div class="blog-content">
      <div>
        <h2 v-if="post.WelcomeScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.title }}</h2>
        <p v-if="post.WelcomeScreen">{{ post.BlogPost }}</p>
        <p class="content-preview" v-else>{{ post.BlogHtml }}</p>
        <router-link class="link link-light" v-if="post.WelcomeScreen" to="#">
          Login / Register
          <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </router-link>
        <router-link class="link link-light" v-else to="#">
          View The Post
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img
        v-if="post.WelcomeScreen"
        :src="require(`../assets/blogPhotos/${post.Photo}.jpg`)"
        alt=""
      />
      <img
        v-else
        :src="require(`../assets/blogPhotos/${post.BlogPhoto}.jpg`)"
        alt=""
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogPost",
  props: ["post"],
};
</script>

<style lang="scss" scoped>
.blog-wrapper {
  margin-left: 40px;
  img {
    width: 375px;
    object-fit: cover;
  }
}
.no_user {
  &:first-child {
    .blog-content {
      background: #303030;
      color: #fff;
    }
  }
}
</style>
