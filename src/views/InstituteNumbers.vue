<template>
  <div class="container fit InstituteNumbers In">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="TheAdmin">The Administrator</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="TheModifications">Modifications</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Institute Numbers
        </li>
      </ol>
    </nav>
    <h1>
      <span>Institute Numbers</span>
      <button class="Save" @click="updateNumber">Save</button>
    </h1>

    <div class="content">
      <div class="box">
        <input type="number" :value="this.Students" />
        <div>Students</div>
      </div>
      <div class="box">
        <input type="number" :value="this.Experience" />
        <div>Years of Experience</div>
      </div>
      <div class="box">
        <input type="number" :value="this.Teachers" />
        <div>Teachers</div>
      </div>
      <div class="box">
        <input type="number" :value="this.Graduates" />
        <div>Graduates</div>
      </div>
    </div>
    <div class="Toast" v-show="show">
      <div class="Toast-header">
        <div>{{ message }}</div>
        <small class="text-body-secondary">just now</small>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getFirestore,
  doc,
  updateDoc,
  collection,
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
export default {
  name: "InstituteNumbers",
  mounted() {
    this.ShowData();
  },
  data() {
    return {
      Students: "",
      Experience: "",
      Teachers: "",
      Graduates: "",
      show: false,
      message: "Data has been updated",
    };
  },
  methods: {
    async updateNumber() {
      const db = getFirestore();
      const userRef = doc(db, "InstituteNumbers", "c5S5q8GHsbbT3QbNPBYN");
      try {
        await updateDoc(userRef, {
          Students: document.querySelectorAll(".content .box input")[0].value,
          Experience: document.querySelectorAll(".content .box input")[1].value,
          Teachers: document.querySelectorAll(".content .box input")[2].value,
          Graduates: document.querySelectorAll(".content .box input")[3].value,
        });
      } catch (error) {
        console.log(error);
      }
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 5000);
    },
    async ShowData() {
      const querySnapshot = await getDocs(collection(db, "InstituteNumbers"));
      querySnapshot.forEach((doc) => {
        this.Students = doc.data().Students;
        this.Experience = doc.data().Experience;
        this.Teachers = doc.data().Teachers;
        this.Graduates = doc.data().Graduates;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.container.fit {
  .content {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ddd;
    justify-content: space-between;
    .box {
      width: 231px;
      background: #eee;
      height: 231px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      gap: 10px;
      input {
        width: 130px;
        height: 50px;
        font-size: 20px;
        border-radius: 56px;
        padding: 5px 10px;
        text-align: center;
      }
      div {
        color: var(--main-color);
      }
    }
  }
}
</style>
