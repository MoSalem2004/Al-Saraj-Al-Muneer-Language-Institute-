<template>
  <TheForm
    v-if="modalActive"
    @close_modal="close_modal"
    :First_Name="user.First_Name"
    :Last_Name="user.Last_Name"
    :Phone_Number="user.Phone_Number"
    :Parents_Phone_Number="user.Parents_Phone_Number"
    :Theclass="user.Theclass"
    :Email="user.Email"
    :ID="user.ID"
    :MonthlyStudentResults="user.MonthlyStudentResults"
    :MonthlyStudentEvaluations="user.MonthlyStudentEvaluations"
    :Result="user.Result"
    :YearlyStudentResults="user.YearlyStudentResults"
    :Rankingmonth1="this.Rankingmonth1"
    :Rankingmonth2="this.Rankingmonth2"
    :Rankingmonth3="this.Rankingmonth3"
    :Rankingmonth4="this.Rankingmonth4"
    :RankingMidtermExam="this.RankingMidtermExam"
    :RankingFinalExam="this.RankingFinalExam"
    @results="results"
    :LiveResults="LiveResults"
  />
  <EditSubjects
    v-if="model_EditSubjects"
    @close_EditSubjects="close_EditSubjects"
    :Theclass="this.Theclass[0]"
  />
  <TheProgress
    v-if="modalActive_Progress"
    @close_modal_Progress="close_modal_Progress"
    :Theclass="this.Theclass[0]"
    :First_Name="this.First_Name"
    :Last_Name="this.Last_Name"
    :Result="this.Result"
  />
  <div class="container fit classes">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="TheAdmin">The Administrator</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="TheAdmin">Classes</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          The Second Secondary Grade
        </li>
      </ol>
    </nav>

    <h1>
      <span>The Second Secondary Grade</span>
      <div style="display: flex; align-items: center; gap: 30px">
        <font-awesome-icon
          :icon="['fas', 'list-ol']"
          @click="close_modal_Progress"
        />
        <font-awesome-icon
          :icon="['fas', 'users-cog']"
          @click="close_EditSubjects"
        />
      </div>
    </h1>
    <div class="contain">
      <div
        class="box"
        v-for="student in Class"
        :key="student"
        @click="close_modal"
      >
        <h3>{{ student }}</h3>
        <div class="feat">
          <font-awesome-icon :icon="['fas', 'user-times']" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TheForm from "../components/TheForm.vue";
import EditSubjects from "../components/EditSubjects.vue";
import TheProgress from "../components/TheProgress.vue";
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
  name: "SSG",
  beforeMount() {
    this.Allclass();
    setTimeout(() => {
      this.getdata();
    }, 1000);
  },
  data() {
    return {
      modalActive: false,
      modalActive_Progress: false,
      model_EditSubjects: false,

      Class: [],
      First_Name: [],
      Last_Name: [],
      Phone_Number: [],
      Parents_Phone_Number: [],
      Theclass: [],
      Email: [],
      ID: [],
      MonthlyStudentResults: [],
      MonthlyStudentEvaluations: [],
      Result: [],
      YearlyStudentResults: [],
      Rankingmonth1: [],
      Rankingmonth2: [],
      Rankingmonth3: [],
      Rankingmonth4: [],
      RankingMidtermExam: [],
      RankingFinalExam: [],
      resultsArray: [],

      user: {
        First_Name: "",
        Last_Name: "",
        Phone_Number: "",
        Parents_Phone_Number: "",
        Theclass: "",
        Email: "",
        ID: "",
        MonthlyStudentResults: [],
        MonthlyStudentEvaluations: [],
        Result: [],
        YearlyStudentResults: [],
        Rankingmonth1: [],
        Rankingmonth2: [],
        Rankingmonth3: [],
        Rankingmonth4: [],
        RankingMidtermExam: [],
        RankingFinalExam: [],
      },
    };
  },
  components: {
    TheForm,
    EditSubjects,
    TheProgress,
  },
  methods: {
    results(resultsValue) {
      return resultsValue;
    },
    close_modal() {
      this.modalActive = !this.modalActive;
    },
    close_modal_Progress() {
      this.modalActive_Progress = !this.modalActive_Progress;
    },
    close_EditSubjects() {
      this.model_EditSubjects = !this.model_EditSubjects;
    },
    getdata() {
      let boxes = document.querySelectorAll(".contain .box");
      let First_Name = this.First_Name;
      let Last_Name = this.Last_Name;
      let Phone_Number = this.Phone_Number;
      let Parents_Phone_Number = this.Parents_Phone_Number;
      let Theclass = this.Theclass;
      let Email = this.Email;
      let ID = this.ID;
      let MonthlyStudentResults = this.MonthlyStudentResults;
      let MonthlyStudentEvaluations = this.MonthlyStudentEvaluations;
      let Result = this.Result;
      let YearlyStudentResults = this.YearlyStudentResults;
      let Rankingmonth1 = this.Rankingmonth1;
      let Rankingmonth2 = this.Rankingmonth2;
      let Rankingmonth3 = this.Rankingmonth3;
      let Rankingmonth4 = this.Rankingmonth4;
      let RankingMidtermExam = this.RankingMidtermExam;
      let RankingFinalExam = this.RankingFinalExam;
      for (let i = 0; i < boxes.length; i++) {
        boxes[i].onclick = () => {
          this.user.First_Name = First_Name[i];
          this.user.Last_Name = Last_Name[i];
          this.user.Phone_Number = Phone_Number[i];
          this.user.Parents_Phone_Number = Parents_Phone_Number[i];
          this.user.Theclass = Theclass[i];
          this.user.Email = Email[i];
          this.user.ID = ID[i];
          this.user.MonthlyStudentResults = MonthlyStudentResults[i];
          this.user.MonthlyStudentEvaluations = MonthlyStudentEvaluations[i];
          this.user.Result = Result[i];
          this.user.YearlyStudentResults = YearlyStudentResults[i];
          this.user.Rankingmonth1 = Rankingmonth1[i];
          this.user.Rankingmonth2 = Rankingmonth2[i];
          this.user.Rankingmonth3 = Rankingmonth3[i];
          this.user.Rankingmonth4 = Rankingmonth4[i];
          this.user.RankingMidtermExam = RankingMidtermExam[i];
          this.user.RankingFinalExam = RankingFinalExam[i];

          this.modalActive = true;
        };
      }
    },

    async Allclass() {
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        if (doc.data().class === "The Second Secondary Grade") {
          this.Class.push(`${doc.data().First_Name}  ${doc.data().Last_Name}`);
          this.First_Name.push(doc.data().First_Name);
          this.Last_Name.push(doc.data().Last_Name);
          this.Phone_Number.push(doc.data().Phone_Number);
          this.Parents_Phone_Number.push(doc.data().Parents_Phone_Number);
          this.Theclass.push(doc.data().class);
          this.Email.push(doc.data().Email);
          this.ID.push(doc.data().ID);
          this.MonthlyStudentResults.push(doc.data().MonthlyStudentResults);
          this.MonthlyStudentEvaluations.push(
            doc.data().MonthlyStudentEvaluations
          );
          this.Result.push(doc.data().Result);
          this.YearlyStudentResults.push(doc.data().YearlyStudentResults);
          this.Rankingmonth1.push(doc.data().Rankingmonth1);
          this.Rankingmonth2.push(doc.data().Rankingmonth2);
          this.Rankingmonth3.push(doc.data().Rankingmonth3);
          this.Rankingmonth4.push(doc.data().Rankingmonth4);
          this.RankingMidtermExam.push(doc.data().RankingMidtermExam);
          this.RankingFinalExam.push(doc.data().RankingFinalExam);
        }
      });
      let arr = [];
      let arr2 = [];
      for (let i = 0; i < this.Result.length; i++) {
        arr.push(this.Result[i][0]);
        const text = arr[i];
        const numbersOnly = text?.replace(/[^0-9.]/g, "");
        arr2.push(+numbersOnly);
      }
      const numbers = arr2;
      const sortedNumbers = numbers.sort((a, b) => b - a);
      this.Rankingmonth1 = Array.from(new Set(sortedNumbers));
      ////
      let arr22 = [];
      let arr222 = [];
      for (let i = 0; i < this.Result.length; i++) {
        arr22.push(this.Result[i][1]);
        const text = arr22[i];
        const numbersOnly = text?.replace(/[^0-9.]/g, "");
        arr222.push(+numbersOnly);
      }
      const numbers2 = arr222;
      const sortedNumbers2 = numbers2.sort((a, b) => b - a);
      this.Rankingmonth2 = Array.from(new Set(sortedNumbers2));
      ////
      let arr33 = [];
      let arr333 = [];
      for (let i = 0; i < this.Result.length; i++) {
        arr33.push(this.Result[i][3]);
        const text = arr33[i];
        const numbersOnly = text?.replace(/[^0-9.]/g, "");
        arr333.push(+numbersOnly);
      }
      const numbers3 = arr333;
      const sortedNumbers3 = numbers3.sort((a, b) => b - a);
      this.Rankingmonth3 = Array.from(new Set(sortedNumbers3));
      ////
      let arr44 = [];
      let arr444 = [];
      for (let i = 0; i < this.Result.length; i++) {
        arr44.push(this.Result[i][4]);
        const text = arr44[i];
        const numbersOnly = text?.replace(/[^0-9.]/g, "");
        arr444.push(+numbersOnly);
      }
      const numbers4 = arr444;
      const sortedNumbers4 = numbers4.sort((a, b) => b - a);
      this.Rankingmonth4 = Array.from(new Set(sortedNumbers4));
      ////
      let arrM = [];
      let arrME = [];
      for (let i = 0; i < this.Result.length; i++) {
        arrM.push(this.Result[i][2]);
        const text = arrM[i];
        const numbersOnly = text?.replace(/[^0-9.]/g, "");
        arrME.push(+numbersOnly);
      }
      const numbersM = arrME;
      const sortedNumbersM = numbersM.sort((a, b) => b - a);
      this.RankingMidtermExam = Array.from(new Set(sortedNumbersM));
      ////
      let arrF = [];
      let arrFE = [];
      for (let i = 0; i < this.Result.length; i++) {
        arrF.push(this.Result[i][5]);
        const text = arrF[i];
        const numbersOnly = text?.replace(/[^0-9.]/g, "");
        arrFE.push(+numbersOnly);
      }
      const numbersF = arrFE;
      const sortedNumbersF = numbersF.sort((a, b) => b - a);
      this.RankingFinalExam = Array.from(new Set(sortedNumbersF));
    },

    async LiveResults() {
      const querySnapshot = await getDocs(collection(db, "users"));
      this.Result = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().class === "The Second Secondary Grade") {
          this.Result.push(doc.data().Result);

          let arr = [];
          let arr2 = [];
          for (let i = 0; i < this.Result.length; i++) {
            arr.push(this.Result[i][0]);
            const text = arr[i];
            const numbersOnly = text?.replace(/[^0-9.]/g, "");
            arr2.push(+numbersOnly);
          }
          const numbers = arr2;
          const sortedNumbers = numbers.sort((a, b) => b - a);
          this.Rankingmonth1 = Array.from(new Set(sortedNumbers));

          ////
          let arr22 = [];
          let arr222 = [];
          for (let i = 0; i < this.Result.length; i++) {
            arr22.push(this.Result[i][1]);
            const text = arr22[i];
            const numbersOnly = text?.replace(/[^0-9.]/g, "");
            arr222.push(+numbersOnly);
          }
          const numbers2 = arr222;
          const sortedNumbers2 = numbers2.sort((a, b) => b - a);
          this.Rankingmonth2 = Array.from(new Set(sortedNumbers2));
          ////
          let arr33 = [];
          let arr333 = [];
          for (let i = 0; i < this.Result.length; i++) {
            arr33.push(this.Result[i][3]);
            const text = arr33[i];
            const numbersOnly = text?.replace(/[^0-9.]/g, "");
            arr333.push(+numbersOnly);
          }
          const numbers3 = arr333;
          const sortedNumbers3 = numbers3.sort((a, b) => b - a);
          this.Rankingmonth3 = Array.from(new Set(sortedNumbers3));
          ////
          let arr44 = [];
          let arr444 = [];
          for (let i = 0; i < this.Result.length; i++) {
            arr44.push(this.Result[i][4]);
            const text = arr44[i];
            const numbersOnly = text?.replace(/[^0-9.]/g, "");
            arr444.push(+numbersOnly);
          }
          const numbers4 = arr444;
          const sortedNumbers4 = numbers4.sort((a, b) => b - a);
          this.Rankingmonth4 = Array.from(new Set(sortedNumbers4));
          ////
          let arrM = [];
          let arrME = [];
          for (let i = 0; i < this.Result.length; i++) {
            arrM.push(this.Result[i][2]);
            const text = arrM[i];
            const numbersOnly = text?.replace(/[^0-9.]/g, "");
            arrME.push(+numbersOnly);
          }
          const numbersM = arrME;
          const sortedNumbersM = numbersM.sort((a, b) => b - a);
          this.RankingMidtermExam = Array.from(new Set(sortedNumbersM));
          ////
          let arrF = [];
          let arrFE = [];
          for (let i = 0; i < this.Result.length; i++) {
            arrF.push(this.Result[i][5]);
            const text = arrF[i];
            const numbersOnly = text?.replace(/[^0-9.]/g, "");
            arrFE.push(+numbersOnly);
          }
          const numbersF = arrFE;
          const sortedNumbersF = numbersF.sort((a, b) => b - a);
          this.RankingFinalExam = Array.from(new Set(sortedNumbersF));
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
h1 {
  svg {
    color: var(-main-color);
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
