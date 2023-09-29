<template>
  <div class="popup"></div>
  <div class="modal">
    <div class="modal_content">
      <p>{{ this.modalMessage }}</p>
      <button @click="closeModal">CLOSE</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TheModal",
  props: ["modalMessage"],
  emits: ["close_modal"],
  methods: {
    closeModal() {
      this.$emit("close_modal");
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: black;
  z-index: 10;
  opacity: 0.5;
}
.modal {
  width: fit-content;
  height: auto;
  background: var(--White-color);
  color: var(--Black-color);
  min-width: 300px;
  min-height: 150px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  // z-index: 14;
  button {
    border: none;
    padding: 10px 20px;
    background: var(--main-color);
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>
