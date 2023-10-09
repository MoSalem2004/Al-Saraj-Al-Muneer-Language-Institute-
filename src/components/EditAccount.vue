<template>
  <div
    class="container_1 fit"
    style="height: 383px; overflow: auto; width: 100%"
  >
    <TheModal
      v-if="modalActive"
      :modalMessage="modalMessage"
      @close_modal="close_modal"
    />
    <TheLoading v-if="Lodaing" />
    <section>
      <form action="POST" style="width: 97%">
        <div class="small_container">
          <div class="input-group mb-3">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="First_Name"
                placeholder="First Name"
                v-model="First_Name"
              />

              <label for="First_Name"
                ><font-awesome-icon :icon="['fas', 'user-edit']" /> First
                Name</label
              >
            </div>
          </div>
          <div>
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="Last_Name"
                  placeholder="Last Name"
                  v-model="Last_Name"
                />

                <label for="Last_Name"
                  ><font-awesome-icon :icon="['fas', 'user-edit']" /> Last
                  Name</label
                >
              </div>
            </div>
          </div>
          <div>
            <div class="input-group mb-3">
              <div
                class="form-floating"
                style="display: flex; align-items: center"
              >
                <input
                  type="text"
                  class="form-control"
                  id="Phone_Number"
                  placeholder="Phone Number"
                  v-model="Phone_Number"
                />

                <label for="Phone_Number"
                  ><font-awesome-icon :icon="['fas', 'phone']" /> Phone
                  Number</label
                >
                <font-awesome-icon
                  :icon="['fas', 'edit']"
                  color="var(--main-color)"
                />
              </div>
            </div>
          </div>
          <div v-if="!Admin">
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="Parents_Phone_Number"
                  placeholder="Parent's Phone Number"
                  v-model="Parents_Phone_Number"
                />

                <label for="Parents_Phone_Number"
                  ><font-awesome-icon :icon="['fas', 'phone']" /> Parent&apos;s
                  phone number</label
                >
              </div>
            </div>
          </div>
          <div class="form-floating long" v-if="!Admin">
            <input
              type="text"
              id="class"
              class="form-control"
              :value="this.$store.state.userData?.class"
            />
            <label for="floatingSelect">Your class</label>
          </div>
          <div>
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="email"
                  class="form-control"
                  id="Email"
                  placeholder="Email"
                  :value="Email"
                />

                <label for="Email"
                  ><font-awesome-icon :icon="['fas', 'at']" /> Email</label
                >
              </div>
            </div>
          </div>
          <div>
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="ID"
                  placeholder="ID"
                  :value="this.$store.state.user?.uid"
                />

                <label for="ID"
                  ><font-awesome-icon :icon="['fas', 'id-card']" /> ID
                  number</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="Register_Login">
          <div>
            <button
              @click.prevent="DeleteAccount"
              class="btn btn-primary"
              style="background-color: red"
            >
              Delete account
            </button>
          </div>
          <div>
            <button
              @click.prevent="resetPassword"
              class="btn btn-primary"
              style="
                background-image: linear-gradient(
                  to right,
                  red,
                  var(--main-color)
                );
              "
            >
              Forgot your password
            </button>
          </div>
          <div>
            <button @click.prevent="updateUserData" class="btn btn-primary">
              Save Changes
            </button>
          </div>
          <p v-if="error">{{ error }}</p>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
import TheModal from "../components/TheModal.vue";
import TheLoading from "../components/TheLoading.vue";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
export default {
  name: "EditAccount",
  modalActive: null,
  modalMessage: null,
  Lodaing: null,
  thename: "mo",

  methods: {
    DeleteAccount() {
      getAuth()
        .currentUser.delete(this.$store.state.user.uid)
        .then(() => {
          console.log("Successfully deleted user");
          this.$router.push({ name: "HomeView" });
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error deleting user:", error);
        });
    },
    updateUserData() {
      this.$store.dispatch("updateUserData");
    },
    resetPassword() {
      let input = document.querySelectorAll(
        ".container_1 section form .small_container > div input.form-control"
      )[4];
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
  computed: {
    Admin() {
      return this.$store.state.userAdmin;
    },
    First_Name: {
      get() {
        return this.$store.state.userData?.First_Name;
      },
    },
    Last_Name: {
      get() {
        return this.$store.state.userData?.Last_Name;
      },
    },
    Phone_Number: {
      get() {
        return this.$store.state.userData?.Phone_Number;
      },
    },
    Parents_Phone_Number: {
      get() {
        return this.$store.state.userData?.Parents_Phone_Number;
      },
    },
    Email: {
      get() {
        return this.$store.state.userData?.Email;
      },
    },
    ID: {
      get() {
        return this.$store.state.userData?.ID;
      },
    },
    // Password: {
    //   get() {
    //     return this.$store.state.userData?.Password;
    //   },
    //   set(payload) {
    //     this.$store.commit("ChangePassword", payload);
    //   },
    // },
  },
  components: {
    TheModal,
    TheLoading,
  },
  data() {
    return {
      modalMessage: "Changes were saved",
      modalActive: false,
      options: [
        "The Second Secondary Grade",
        "The First Secondary Grade",
        "The Third Preparatory grade",
        "The Second Preparatory grade",
        "The First Preparatory grade",
        "The Sixth Primary grade",
        "The Fifth Primary grade",
        "The Fourth Primary grade",
        "The Third Primary grade",
        "The Second Primary grade",
        "The First Primary grade",
        "KG 2",
        "KG 1",
      ],
      error: null,
      // First_Name: "",
      // Last_Name: "",
      // Phone_Number: "",
      // Parents_Phone_Number: "",
      // // SelectClass: "",
      // Email: "",
      // ID: "",
      // Password: "",
    };
  },
};
</script>
<style lang="scss" scoped>
.container_1 section form .small_container > div input.form-control {
  pointer-events: none;
  &#Phone_Number {
    pointer-events: auto;
  }
  // &#Parents_Phone_Number {
  //   pointer-events: auto;
  // }
}
</style>
