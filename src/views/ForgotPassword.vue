<template>
  <div class="container fit" style="margin-top: 30px">
    <div class="reset_password">
      <TheModal
        v-if="modalActive"
        :modalMessage="modalMessage"
        @close_modal="close_modal"
      />
      <TheLoading v-if="Lodaing" />
      <div class="form_wrap">
        <form action="" class="reset">
          <h2>Reset Password</h2>
          <p>Forgot Your Password : Enter Your Email To Reset It</p>
          <div class="inputs">
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="email"
                  class="form-control"
                  id="Email"
                  placeholder="Email"
                  v-model="Email"
                />

                <label id="toggel" for="Email">
                  <font-awesome-icon :icon="['fas', 'at']" />

                  <span> Email</span>
                </label>
              </div>
            </div>
          </div>
          <button @click.prevent="resetPassword" class="btn btn-primary">
            Reset
          </button>
          <div class="angle"></div>
        </form>
        <div class="background"></div>
      </div>
    </div>
  </div>
</template>
<script>
import TheModal from "../components/TheModal.vue";
import TheLoading from "../components/TheLoading.vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
  name: "ForgotPassword",
  components: {
    TheModal,
    TheLoading,
  },
  data() {
    return {
      Email: "",
      modalActive: null,
      modalMessage: null,
      Lodaing: null,
    };
  },
  methods: {
    resetPassword() {
      let input = document.querySelector(".form-floating > .form-control");
      if (input.value) {
        this.Lodaing = true;
        const auth = getAuth();
        sendPasswordResetEmail(auth, this.Email)
          .then(() => {
            this.modalMessage =
              "If your account exist , you will recive a mail";
            this.Lodaing = false;
            this.modalActive = true;
          })
          .catch((error) => {
            const errorMessage = error.toString();
            const userNotFoundError = errorMessage.match(/\(([^)]+)\)/)[1];
            console.log(userNotFoundError);
            this.modalMessage = userNotFoundError;
            this.Lodaing = false;
            this.modalActive = true;
          });
      }
    },
    close_modal() {
      this.modalActive = false;
      this.Email = "";
    },
  },
};
</script>
