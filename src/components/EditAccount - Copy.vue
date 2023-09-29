<template>
  <div class="container_1 fit" style="height: 383px; overflow: auto">
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
                :value="First_Name"
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
                  :value="Last_Name"
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
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="Phone_Number"
                  placeholder="Phone Number"
                  :value="Phone_Number"
                />

                <label for="Phone_Number"
                  ><font-awesome-icon :icon="['fas', 'phone']" /> Phone
                  Number</label
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
                  id="Parents_Phone_Number"
                  placeholder="Parent's Phone Number"
                  :value="Parents_Phone_Number"
                />

                <label for="Parents_Phone_Number"
                  ><font-awesome-icon :icon="['fas', 'phone']" /> Parent&apos;s
                  phone number</label
                >
              </div>
            </div>
          </div>
          <!-- <div class="long">
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="class"
                  placeholder="Parent's Phone Number"
                  :value="Theclass"
                />

                <label for="class"
                  ><font-awesome-icon :icon="['fas', 'chalkboard-teacher']" />
                  class</label
                >
              </div>
            </div>
            </div> -->
          <div class="form-floating long">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              @change="handleSelectChange($event)"
              :value="Theclass"
            >
              <option
                v-for="(option, index) in options"
                :key="index"
                :value="option"
                @click="classActiveOption"
              >
                {{ option }}
              </option>
            </select>
            <label for="floatingSelect">Select the student's class</label>
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
            <div class="input-group mb-3" style="align-items: center">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="ID"
                  placeholder="ID"
                  :value="ID"
                />
                <label for="ID">
                  <font-awesome-icon :icon="['fas', 'id-card']" /> ID
                  number</label
                >
              </div>
              <font-awesome-icon
                :icon="['fas', 'copy']"
                @click="copyID"
                style="color: var(--main-color); cursor: pointer"
              />
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

          <p v-if="error">{{ error }}</p>
        </div>
      </form>
    </section>
  </div>
</template>
<script>
import { getAuth } from "firebase/auth";
export default {
  name: "EditAccount",
  modalActive: null,
  modalMessage: null,
  selectedValue: "",
  props: [
    "First_Name",
    "Last_Name",
    "Phone_Number",
    "Parents_Phone_Number",
    "Theclass",
    "Email",
    "ID",
  ],
  mounted() {
    // console.log(this.First_Name);
    // console.log(this.StuFirst_Name);
    // console.log(this.TheFirst_Name);
  },
  methods: {
    copyID() {
      const input = document.getElementById("ID");
      input.select();
      document.execCommand("copy");
    },
    handleSelectChange(event) {
      this.selectedValue = event.target.value;
      // this.Theclass = event.target.value;
    },
    DeleteAccount() {
      getAuth()
        .currentUser.delete(this.ID)
        .then(() => {
          console.log("Successfully deleted user");
          this.$router.push({ name: "HomeView" });
          window.location.reload();
        })
        .catch((error) => {
          console.log("Error deleting user:", error);
        });
      // const admin = require("firebase-admin/app");

      // admin.initializeApp({
      //   apiKey: "AIzaSyCqVUbKEz4AGu5IxceUA7I-ql1CLAOCL6s",
      //   authDomain: "alseraj-almoner-school.firebaseapp.com",
      //   projectId: "alseraj-almoner-school",
      //   storageBucket: "alseraj-almoner-school.appspot.com",
      //   messagingSenderId: "983919871798",
      //   appId: "1:983919871798:web:817c3a70a169ed333f9597",
      // });

      // const uid = this.ID; // استبدل USER_UID بمعرف المستخدم الذي ترغب في حذفه

      // admin
      //   .auth()
      //   .deleteUser(uid)
      //   .then(() => {
      //     console.log("تم حذف المستخدم بنجاح");
      //   })
      //   .catch((error) => {
      //     console.log("حدث خطأ أثناء حذف المستخدم:", error);
      //   });
    },
    updateUserData() {
      this.$store.dispatch("updateUserData");
    },
    close_modal() {
      this.modalActive = false;
      // this.Email = "";
    },
  },

  data() {
    return {
      modalMessage: "Changes were saved",
      modalActive: false,

      error: null,
      TheFirst_Name: this.First_Name,
      options: [
        "",
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
.container_1 section form .small_container > div input.form-control#ID {
  pointer-events: none;
  font-size: 12px;
}
</style>
