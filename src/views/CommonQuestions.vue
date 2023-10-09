<template>
  <div class="container fit CommonQuestions In">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="TheAdmin">The Administrator</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="TheModifications">Modifications</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Common Questions
        </li>
      </ol>
    </nav>
    <h1>
      <span>Common Questions</span>
      <font-awesome-icon
        :icon="['fas', 'plus']"
        style="margin-left: 10px; cursor: pointer"
        @click="ShowFunction"
      />
    </h1>
    <div class="content"></div>
  </div>
  <div class="main_popup" v-show="show"></div>
  <div class="window" v-show="show">
    <div class="Add_Qustion">
      <font-awesome-icon
        :icon="['fas', 'window-close']"
        @click="ShowFunction"
      />

      <input type="text" placeholder="Type your question here" />
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="Write the answer here"
      ></textarea>
      <button @click="CreatQu">Done</button>
    </div>
  </div>
</template>
<script>
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
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
import boxQuestionsscss from "../sass/boxQuestions.scss";

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default {
  name: "CommonQuestions",
  data() {
    return {
      show: null,
      Ids: [],
    };
  },
  mounted() {
    setTimeout(() => {
      this.Getdata();
    }, 1000);
  },
  methods: {
    $style() {
      return boxQuestionsscss;
    },
    Counter() {
      for (
        let i = 0;
        i < document.querySelectorAll(".content .box").length;
        i++
      ) {
        document.querySelectorAll(".content .box .Num")[i].innerHTML = i + 1;
      }
    },
    DeleteFunction() {
      console.log(document.querySelectorAll(".Delete"));
      for (let i = 0; i < document.querySelectorAll(".Delete").length; i++) {
        document.querySelectorAll(".Delete")[i].onclick = async () => {
          await deleteDoc(doc(db, "Question", this.Ids[i]));
          this.Ids = [];
          document.querySelector(".content").innerHTML = "";
          this.Getdata();
        };
      }
    },
    async CreatQu() {
      await addDoc(collection(db, "Question"), {
        Question: document.querySelector(".window .Add_Qustion input").value,
        Answer: document.querySelector(".window .Add_Qustion textarea").value,
      });
      document.querySelector(".window .Add_Qustion input").value = "";
      document.querySelector(".window .Add_Qustion textarea").value = "";
      document.querySelector(".content").innerHTML = "";
      this.Getdata();
      this.show = !this.show;
    },
    async Getdata() {
      const querySnapshot = await getDocs(collection(db, "Question"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        let box = `
     <div class="box">
        <div class="Tools">
          <div class="Num">1</div>
          <div>
             <button class="Delete">Delete</button>
          </div>
        </div>
        <div>
          <div class="Qu">Question : ${doc.data().Question} ?</div>
        </div>
        <div class="Answer">
          Answer : ${doc.data().Answer} .
        </div>
      </div>
        `;
        this.Ids.push(doc.id);
        document.querySelector(".content").innerHTML += box;
      });
      console.log(this.Ids);
      this.$style();
      this.DeleteFunction();
      // setTimeout(() => {
      this.Counter();
      // }, 1000);
    },
    ShowFunction() {
      this.show = !this.show;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.window {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffff;
  padding: 20px;
  border-radius: 5px;
  width: 90%;
  z-index: 14;
  .Add_Qustion {
    display: flex;
    flex-direction: column;
    gap: 10px;
    svg {
      margin-left: auto;
      font-size: 25px;
      color: var(--main-color);
      cursor: pointer;
    }
    textarea {
      border-radius: 5px;
      border: 1px solid #ddd;
    }
    input,
    textarea {
      padding: 5px;
      resize: none;
      &:focus {
        // border: none;
        outline: none;
      }
    }
    button {
      background: var(--main-color);
      border: none;
      padding: 10px;
      color: #fff;
      font-weight: bold;
      border-radius: 5px;
    }
  }
}
</style>
