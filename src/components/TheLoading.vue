<template>
  <div class="Lodaing">
    <span></span>
  </div>
</template>

<script>
export default {
  name: "TheLoading",
};
</script>
<style lang="scss" scoped>
.Lodaing {
  display: flex;
  z-index: 11;
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  @keyframes span {
    to {
      transform: rotateZ(360deg);
    }
  }
  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 3px solid transparent;
    border-top-color: #fff;
    border-bottom-color: #fff;
    border-radius: 50%;
    animation: span ease 1000ms infinite;
  }
}
</style>
