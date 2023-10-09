<template>
  <footer class="text-center text-lg-start bg-white text-muted mt-5">
    <section
      class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom bottom"
    >
      <div class="me-5 d-none d-lg-block">
        <span>Get connected with us on social networks:</span>
      </div>

      <div>
        <a
          href="
https://www.facebook.com/alserajalmuner/"
          class="me-4 link-secondary"
        >
          <font-awesome-icon :icon="['fab', 'facebook']" />
        </a>
        <a
          href="
https://www.alserajalmoneer@yahoo.com"
          class="me-4 link-secondary"
        >
          <font-awesome-icon :icon="['fas', 'envelope']" />
        </a>
      </div>
    </section>
    <div
      class="text-center p-4 bottom"
      style="background-color: rgba(0, 0, 0, 0.025)"
    >
      © 2024 Copyright:
      <a
        class="text-reset fw-bold Copyright"
        href="https://www.facebook.com/profile.php?id=61551365201853"
        >SALEM</a
      >
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>
<style lang="scss" scoped>
footer {
  .bottom {
    background: var(--White-color) !important;
    filter: brightness(0.95) !important;
    svg {
      color: var(--main-color) !important;
    }
    .Copyright {
      color: var(--main-color) !important;
    }
  }
}
</style>
