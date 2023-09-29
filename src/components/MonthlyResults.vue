<template v-if="!Admin">
  <div class="table Monthly">
    <div class="buttons">
      <div class="active">Monthly 1</div>
      <div>Monthly 2</div>
      <div>Monthly 3</div>
      <div>Monthly 4</div>
      <button>
        <font-awesome-icon :icon="['fas', 'print']" />
        <span>Print</span>
      </button>
    </div>
    <div class="Print">
      <div class="information active">
        <div class="left">
          <div class="name">
            The Name :
            {{
              `${this.$store.state.userData?.First_Name} ${this.$store.state.userData?.Last_Name}`
            }}
          </div>
          <div class="class">
            class : {{ this.$store.state.userData?.class }}
          </div>
          <div class="Ranking">
            Ranking : {{ this.$store.state.userData?.Rankingmonth1[0] }}
          </div>
        </div>
        <div class="right">
          <img src="../assets/logo-1.jpg" alt="" />
          <div>Al Saraj Al Muneer Language Institute</div>
        </div>
      </div>
      <div class="information">
        <div class="left">
          <div class="name">
            The Name :
            {{
              `${this.$store.state.userData?.First_Name} ${this.$store.state.userData?.Last_Name}`
            }}
          </div>
          <div class="class">
            class : {{ this.$store.state.userData?.class }}
          </div>
          <div class="Ranking">
            Ranking : {{ this.$store.state.userData?.Rankingmonth2[0] }}
          </div>
        </div>
        <div class="right">
          <img src="../assets/logo-1.jpg" alt="" />
          <div>Al Saraj Al Muneer Language Institute</div>
        </div>
      </div>
      <div class="information">
        <div class="left">
          <div class="name">
            The Name :
            {{
              `${this.$store.state.userData?.First_Name} ${this.$store.state.userData?.Last_Name}`
            }}
          </div>
          <div class="class">
            class : {{ this.$store.state.userData?.class }}
          </div>
          <div class="Ranking">
            Ranking : {{ this.$store.state.userData?.Rankingmonth3[0] }}
          </div>
        </div>
        <div class="right">
          <img src="../assets/logo-1.jpg" alt="" />
          <div>Al Saraj Al Muneer Language Institute</div>
        </div>
      </div>
      <div class="information">
        <div class="left">
          <div class="name">
            The Name :
            {{
              `${this.$store.state.userData?.First_Name} ${this.$store.state.userData?.Last_Name}`
            }}
          </div>
          <div class="class">
            class : {{ this.$store.state.userData?.class }}
          </div>
          <div class="Ranking">
            Ranking : {{ this.$store.state.userData?.Rankingmonth4[0] }}
          </div>
        </div>
        <div class="right">
          <img src="../assets/logo-1.jpg" alt="" />
          <div>Al Saraj Al Muneer Language Institute</div>
        </div>
      </div>
      <table>
        <thead>
          <tr class="Subjects">
            <th>Subjects</th>
            <th class="Total">The Total</th>
          </tr>
        </thead>
        <tbody class="active">
          <tr class="MinorGrade">
            <td>Minor Grade</td>
            <td class="Total"></td>
          </tr>
          <tr class="StudentsGrade">
            <td>Student's Grade</td>
            <td class="Total"></td>
          </tr>
          <tr class="MajorGrade">
            <td>Major Grade</td>
            <td class="Total"></td>
          </tr>
          <tr class="TeachersName">
            <td>Teacher's Name</td>
            <td class="Total">99%</td>
          </tr>

          <tr class="BehaviorAssessment">
            <td>Behavior Assessment</td>
            <td class="Total"></td>
          </tr>
        </tbody>

        <tbody>
          <tr class="MinorGrade">
            <td>Minor Grade</td>
            <td class="Total"></td>
          </tr>
          <tr class="StudentsGrade">
            <td>Student's Grade</td>
            <td class="Total"></td>
          </tr>
          <tr class="MajorGrade">
            <td>Major Grade</td>
            <td class="Total"></td>
          </tr>
          <tr class="TeachersName">
            <td>Teacher's Name</td>
            <td class="Total">99%</td>
          </tr>

          <tr class="BehaviorAssessment">
            <td>Behavior Assessment</td>
            <td class="Total"></td>
          </tr>
        </tbody>
        <tbody>
          <tr class="MinorGrade">
            <td>Minor Grade</td>
            <td class="Total"></td>
          </tr>
          <tr class="StudentsGrade">
            <td>Student's Grade</td>
            <td class="Total"></td>
          </tr>
          <tr class="MajorGrade">
            <td>Major Grade</td>
            <td class="Total"></td>
          </tr>
          <tr class="TeachersName">
            <td>Teacher's Name</td>
            <td class="Total">99%</td>
          </tr>

          <tr class="BehaviorAssessment">
            <td>Behavior Assessment</td>
            <td class="Total"></td>
          </tr>
        </tbody>
        <tbody>
          <tr class="MinorGrade">
            <td>Minor Grade</td>
            <td class="Total"></td>
          </tr>
          <tr class="StudentsGrade">
            <td>Student's Grade</td>
            <td class="Total"></td>
          </tr>
          <tr class="MajorGrade">
            <td>Major Grade</td>
            <td class="Total"></td>
          </tr>
          <tr class="TeachersName">
            <td>Teacher's Name</td>
            <td class="Total">99%</td>
          </tr>

          <tr class="BehaviorAssessment">
            <td>Behavior Assessment</td>
            <td class="Total"></td>
          </tr>
        </tbody>
      </table>
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

import boxstyle from "../sass/box.scss";
export default {
  name: "MonthlyResults",
  computed: {
    Admin() {
      console.log(this.$store.state.userAdmin);
      return this.$store.state.userAdmin;
    },
  },
  mounted() {
    this.show();
    setTimeout(() => {
      this.ShowGeneratedData();
      setTimeout(() => {
        this.showData();
        this.counter();
        console.log(this.$store.state.userData?.Rankingmonth1[0]);
      }, 1000);
    }, 1000);
  },

  methods: {
    $style() {
      return boxstyle;
    },
    counter() {
      let month_1 = [];
      let month_2 = [];
      let month_3 = [];
      let month_4 = [];
      for (
        let ii = 0;
        ii <
        document.querySelectorAll(".table.Monthly tbody tr.MinorGrade ").length;
        ii++
      ) {
        let MinorGrade = document.querySelectorAll(
          "table tbody tr.MinorGrade "
        )[ii].children;
        let MajorGrade = document.querySelectorAll(
          "table tbody tr.MajorGrade "
        )[ii].children;
        let StudentsGrade = document.querySelectorAll(
          "table tbody tr.StudentsGrade "
        )[ii].children;
        let collect1 = [];
        let collect2 = [];
        let collect3 = [];
        for (let i = 2; i < MinorGrade.length; i++) {
          collect1.push(+MinorGrade[i].innerHTML);
          collect2.push(+MajorGrade[i].innerHTML);
          collect3.push(+StudentsGrade[i].innerHTML);
        }
        const sum1 = collect1.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        const sum2 = collect2.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );
        const sum3 = collect3.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0
        );

        document.querySelectorAll("table tbody tr.MinorGrade .Total")[
          ii
        ].innerHTML = sum1;
        document.querySelectorAll("table tbody tr.MajorGrade .Total")[
          ii
        ].innerHTML = sum2;
        document.querySelectorAll("table tbody tr.StudentsGrade .Total")[
          ii
        ].innerHTML = sum3;
        month_1.push(sum3);
        month_2.push(sum3);
        month_3.push(sum3);
        month_4.push(sum3);
        console.log(sum3);
        document.querySelectorAll("table tbody tr.TeachersName .Total")[
          ii
        ].style.border = "2px solid var(--main-color)";
        document.querySelectorAll("table tbody tr.TeachersName .Total")[
          ii
        ].innerHTML = `${(
          (document.querySelectorAll("table tbody tr.StudentsGrade .Total")[ii]
            .innerHTML *
            100) /
          document.querySelectorAll("table tbody tr.MajorGrade .Total")[ii]
            .innerHTML
        ).toFixed(1)}%`;
      }
      const array1 = Array.from(month_1)[0];
      const array2 = Array.from(month_2)[1];
      const array3 = Array.from(month_3)[2];
      const array4 = Array.from(month_4)[3];
      console.log(array1); // [1, 2, 3]
      this.$emit("month1", array1);
      this.$emit("month2", array2);
      this.$emit("month3", array3);
      this.$emit("month4", array4);
    },
    async ShowGeneratedData() {
      let str = this.$store.state.userData?.class;
      let newStr = str.replace(/ /g, "");
      const querySnapshot = await getDocs(collection(db, newStr));
      querySnapshot.forEach((doc) => {
        let th = `
        <th>${doc.data().SubName}</th>
        `;
        let tdMinorGrade = `
         <td>${doc.data().SubMinor}</td>
        `;
        let tdMajorGrade = `
         <td>${doc.data().SubMajor}</td>
        `;
        let tdTeachersName = `
         <td>${doc.data().SubTeacher}</td>
        `;
        let tdResults = `
             <td class="Results"></td>
           `;
        let tdBehavior = `
             <td class="Evaluations" ></td>
           `;
        document
          .querySelectorAll("table thead tr.Subjects ")
          .forEach((e) => (e.innerHTML += th));
        document
          .querySelectorAll("table tbody tr.MinorGrade ")
          .forEach((e) => (e.innerHTML += tdMinorGrade));
        document
          .querySelectorAll("table tbody tr.MajorGrade ")
          .forEach((e) => (e.innerHTML += tdMajorGrade));
        document
          .querySelectorAll("table tbody tr.TeachersName ")
          .forEach((e) => (e.innerHTML += tdTeachersName));
        document
          .querySelectorAll(" table tr.StudentsGrade")
          .forEach((e) => (e.innerHTML += tdResults));
        document
          .querySelectorAll(".table.Monthly table tr.BehaviorAssessment")
          .forEach((e) => (e.innerHTML += tdBehavior));
        this.$style;
      });
    },
    showData() {
      let Results = document.querySelectorAll(
        ".table.Monthly table td.Results"
      );
      let Evaluations = document.querySelectorAll(
        ".table.Monthly table td.Evaluations"
      );
      let dataResults =
        Array.from(this.$store.state.userData?.MonthlyStudentResults) || [];
      let dataGrade =
        Array.from(this.$store.state.userData?.MonthlyStudentEvaluations) || [];
      for (let i = 0; i < Results.length; i++) {
        Results[i].innerHTML = dataResults[i]?.MonthlyStudentResults;
        Evaluations[i].innerHTML = dataGrade[i]?.MonthlyStudentEvaluations;
      }
    },
    show() {
      let buttons = document.querySelectorAll(".table.Monthly .buttons div");
      let tbody = document.querySelectorAll(".table.Monthly tbody");
      let information = document.querySelectorAll(
        ".table.Monthly .information"
      );
      buttons.forEach((e1, index1) => {
        tbody.forEach((e2, index2) => {
          information.forEach((e3, index3) => {
            e1.addEventListener("click", function () {
              buttons.forEach((e) => e.classList.remove("active"));
              tbody[index2].classList.remove("active");
              information[index3].classList.remove("active");
              e1.classList.add("active");
              if (index1 === index2) {
                e2.classList.add("active");
              }
              if (index1 === index3) {
                e3.classList.add("active");
              }
            });
          });
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
p {
  margin: 0;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-track {
  background: var(--White-color);
}
::-webkit-scrollbar-thumb {
  background: var(--main-color);
}
.information {
  display: flex;
  display: none;
  justify-content: space-between;
  align-items: center;
  font-family: monospace;
  font-weight: bold;
  &.active {
    display: flex;
  }
  .left {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .right {
    text-align: center;
    img {
      width: 100px;
      margin-bottom: 10px;
    }
    div {
      font-size: 13px;
    }
  }
}
.table {
  position: relative;
  max-height: 400px;
  overflow: auto;
  margin-bottom: 0;
  display: flex;
  gap: 5px;
  flex-direction: column;
  .buttons {
    display: flex;
    gap: 5px;
    align-items: center;
    & button {
      margin-right: 15px;
      margin-left: auto;
      border: none;
      padding: 10px 20px;
      font-weight: bold;
      border-radius: 6px;
      display: flex;
      gap: 5px;
      border: 1px solid transparent;
      align-items: center;
      background: var(--White-color);
      transition: 0.3s;
      filter: brightness(0.95);
      &:hover {
        border: 1px solid var(--main-color);
      }
      span {
        padding: 0;
        background: transparent;
      }
      svg {
        padding: 0;
        font-size: 16px;
      }
    }
    div {
      background: var(--White-color);
      filter: brightness(0.95);
      color: var(--Black-color);
      border-radius: 6px;
      padding: 10px;
      cursor: pointer;
      border: 1px solid transparent;
      transition: 0.3s;
      font-weight: bold;
      font-size: 13px;
      text-align: center;
      width: 112px;
      &.active {
        border: 1px solid var(--main-color);
        color: var(--main-color);
      }
    }
  }
  table {
    width: 100%;
    flex: 1;
    text-align: center;
    tbody {
      display: none;
      &.active {
        display: table-row-group;
      }
    }
    tr {
      display: flex;
      // &.Subjects {
      // }
      td:first-child {
        width: 206px;
        &.active {
          color: var(--White-color);
          background: var(--main-color);
        }
      }
    }
    th,
    td,
    p {
      padding: 7px;
      text-align: center;
      border-bottom: 1px solid #ddd;
    }
    th {
      background: var(--White-color);
      color: var(--Black-color);
      filter: brightness(0.95);
      width: 206px;
      border: 1px solid #ddd;
      background: var(--White-color);
      color: var(--Black-color);
      width: 206px !important;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      border: 2px solid #ddd;
      &.Total {
        order: 1;
      }
    }
    td {
      background: var(--White-color);
      color: var(--Black-color);
      width: 100px;
      flex: 1;
      border: 1px solid #ddd;
      &.Total {
        order: 1;
      }
    }
  }
}
</style>
