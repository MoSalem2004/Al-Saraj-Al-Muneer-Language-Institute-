<template>
  <h2 class="Main_Title">Common Questions</h2>

  <div class="accordion" id="accordionExample">
    <div class="accordion-item" v-for="(box, index) in boxes" :key="box">
      <h2 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          :data-bs-target="'#collapse_' + index"
          :aria-expanded="index === 0 ? 'true' : 'false'"
          :aria-controls="'collapse_' + index"
        >
          {{ box.Question }}
        </button>
      </h2>
      <div
        :id="'collapse_' + index"
        class="accordion-collapse collapse"
        :class="{ show: index === 0 }"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          {{ box.Answer }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";
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
  name: "CommonQuestionsComponent",
  data() {
    return {
      boxes: [],
    };
  },
  mounted() {
    this.Getdata();
  },
  methods: {
    async Getdata() {
      const querySnapshot = await getDocs(collection(db, "Question"));
      querySnapshot.forEach((doc) => {
        this.boxes.push(doc.data());
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.Main_Title {
  margin-bottom: 50px;
}
.accordion-button:not(.collapsed),
.accordion-button {
  background: transparent !important;
  opacity: 0.9;
  color: var(--main-color) !important;
}
.accordion-button:focus {
  outline: none;
  outline-color: transparent;
}
</style>
