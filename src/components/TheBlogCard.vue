<template>
  <div class="blog_card">
    <div v-show="editpost" class="Theicons">
      <div class="icon">
        <font-awesome-icon class="Edit" :icon="['fas', 'edit']" />
      </div>
      <div class="icon">
        <font-awesome-icon class="Delete" :icon="['fas', 'trash']" />
      </div>
    </div>
    <img :src="require(`../assets/blogCards/${post.BlogPhoto}.jpg`)" alt="" />
    <div class="info">
      <h4>
        {{ post.blogTitle }}
      </h4>
      <h6>Posted On : {{ post.blogDate }}</h6>
      <router-link class="link" to="#">
        View The Post <font-awesome-icon :icon="['fas', 'angle-right']" />
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheBlogCard",
  props: ["post"],
  computed: {
    editpost() {
      return this.$store.state.editpost;
    },
  },
};
</script>

<style lang="scss">
.blog_cards {
  display: flex;
  justify-content: space-between;
  .blog_card {
    background: #eee;
    position: relative;
    .Theicons {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-bottom: 10px;
      position: absolute;
      top: 10px;
      right: 5px;
      .icon {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        cursor: pointer;
        border-radius: 50%;
        padding: 5px;
      }
    }
    .info {
      padding: 20px;
    }
    img {
      width: 100%;
    }
  }
}
</style>
