<template>
  <div class="addAdmin">
    <h3>Enter user email to make them an admin</h3>
    <input
      type="email"
      name=""
      id=""
      placeholder="Email"
      v-model.trim="emailValue"
    />
    <div>{{ this.modalMessage }}</div>
    <button @click="closeModal">Add</button>
  </div>
  <div @click="closeTheModal" class="popup"></div>
</template>
<script>
export default {
  name: "AddAdmin",
  data() {
    return {
      emailValue: "",
      modalActive: "",
    };
  },
  props: ["modalMessage"],
  emits: ["close_modal", "closeTheModal"],
  methods: {
    closeModal() {
      this.$emit("close_modal", this.emailValue);
    },
    closeTheModal() {
      this.$emit("closeTheModal");
    },
  },
};
</script>
<style lang="scss" scoped>
.addAdmin {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 11;
}
.popup {
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  background: var(--Black-color);
  opacity: 0.5;
  width: 100%;
  height: 100%;
}
button {
  background: var(--main-color);
  border: none;
  color: var(--White-color);
  padding: 10px;
  border-radius: 5px;
}
</style>
