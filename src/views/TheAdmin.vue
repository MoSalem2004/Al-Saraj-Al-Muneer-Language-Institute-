<template v-if="this.$store.state.user">
  <AddAdmin
    v-if="modalActive"
    :modalMessage="modalMessage"
    @close_modal="close_modal"
    @closeTheModal="closeTheModal"
  />
  <div class="TheAdmin">
    <div class="countainer fit">
      <h1>The Administrator</h1>
      <div class="con">
        <router-link to="/SchoolGrade" class="box">
          <font-awesome-icon :icon="['fas', 'chalkboard-teacher']" />
          <div>Classes</div>
        </router-link>
        <router-link to="/TheModifications" class="box">
          <font-awesome-icon :icon="['fas', 'cogs']" />
          <div>Modifications</div>
        </router-link>
        <router-link to="#" class="box">
          <font-awesome-icon :icon="['fas', 'envelope']" />
          <div>Incoming</div>
        </router-link>
      </div>
      <div class="AllAdmin">
        <div class="head">
          <span>All Admin</span>
          <div class="add">
            <font-awesome-icon @click="addAdmin" :icon="['fas', 'plus']" />
          </div>
        </div>
        <div class="body">
          <div
            class="feat"
            v-for="email in emails"
            :key="email"
            :style="this.$store.state.user.email === email ? ' order: -1' : ''"
          >
            <div class="user">
              <div class="email">
                {{ email }}
              </div>
              <span v-if="this.$store.state.user.email === email">you</span>
            </div>
            <font-awesome-icon
              v-if="this.$store.state.user.email !== email"
              :icon="['fas', 'user-times']"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AddAdmin from "../components/AddAdmin.vue";
import {
  doc,
  deleteDoc,
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCqVUbKEz4AGu5IxceUA7I-ql1CLAOCL6s",
  authDomain: "alseraj-almoner-school.firebaseapp.com",
  projectId: "alseraj-almoner-school",
  storageBucket: "alseraj-almoner-school.appspot.com",
  messagingSenderId: "983919871798",
  appId: "1:983919871798:web:817c3a70a169ed333f9597",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
// import { getAuth, listUsers } from "firebase/auth";
export default {
  name: "TheAdmin",
  data() {
    return {
      modalMessage: null,
      modalActive: false,
      emails: [],
      Ids: [],
      emailValue: "",
    };
  },
  beforeMount() {
    // this.yourEmail();
    this.AllAdmins();
    this.deleteAdmin();
    setTimeout(() => {
      this.delete();
    }, 1000);
  },

  components: {
    AddAdmin,
  },
  methods: {
    closeTheModal() {
      this.modalActive = false;
    },
    // async yourEmail() {
    //   try {
    //     const docRef = await addDoc(collection(db, "Admins"), {
    //       email: this.$store.state.user?.email,
    //     });
    //     console.log("Document written with ID: ", docRef.id);
    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    // },
    async close_modal(email) {
      var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      let emailtrue;
      let em = document.querySelectorAll(
        ".TheAdmin .AllAdmin .body .feat .user .email"
      );
      for (let i = 0; i < em.length; i++) {
        if (
          email !== "" &&
          email !== em[i].innerHTML &&
          regex.test(email) === true
        ) {
          emailtrue = true;
        } else {
          emailtrue = false;
        }
      }
      if (emailtrue === true) {
        this.modalActive = false;
        this.emailValue = email;
        try {
          const docRef = await addDoc(collection(db, "Admins"), {
            email: this.emailValue,
          });
          console.log("Document written with ID: ", docRef.id);
          this.emails = [];
          this.AllAdmins();
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    },
    async AllAdmins() {
      const querySnapshot = await getDocs(collection(db, "Admins"));
      querySnapshot.forEach((doc) => {
        this.emails.push(doc.data().email);
      });
    },
    async addAdmin() {
      this.modalActive = true;
    },
    async deleteAdmin() {
      const querySnapshot = await getDocs(collection(db, "Admins"));
      querySnapshot.forEach((doc) => {
        this.Ids.push(doc.id);
      });
      console.log(this.Ids);
    },
    async delete() {
      let svg = document.querySelectorAll(".TheAdmin .AllAdmin .body svg");
      let TheIds = this.Ids;
      svg.forEach((e1, index1) => {
        TheIds.forEach((e2, index2) => {
          e1.addEventListener("click", async () => {
            console.log("e1");
            if (index1 === index2) {
              console.log(e2);
              await deleteDoc(doc(db, "Admins", e2));
              this.Ids = [];
              this.deleteAdmin();
              this.emails = [];
              this.AllAdmins();
              window.location.reload();
            }
          });
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.TheAdmin {
  h1 {
    color: var(--main-color);
    border-radius: 5px;
    background: var(--White-color);
    filter: brightness(0.95);
    padding: 20px 10px;
    margin: 70px auto 2px;
  }
  .con {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-top: 10px;
    .box {
      background: #eee;
      padding: 20px;
      border-radius: 5px;
      width: 30%;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
      color: var(--main-color);
      svg {
        font-size: 30px;
      }
    }
  }
  .AllAdmin {
    .head {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      background: #eee;
      margin-top: 20px;
      align-items: center;
      border-radius: 5px;
      color: var(--main-color);
      font-size: 22px;
      font-weight: bold;
      .add {
        cursor: pointer;
      }
    }
    .body {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
      .feat {
        background: #eee;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-radius: 5px;
        gap: 10px;
        .user {
          display: flex;
          justify-content: space-between;
          flex: 1;
          span {
            color: #838383;
            font-size: 14px;
            font-weight: bold;
          }
        }
      }
    }
    svg {
      cursor: pointer;
      transition: 0.3s;
      &:not(:first-child) {
        color: black;
      }
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>
