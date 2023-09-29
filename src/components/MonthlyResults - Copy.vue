<template>
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
            {{ `${this.First_Name} ${this.Last_Name}` }}
          </div>
          <div class="class">class : {{ this.Theclass }}</div>
          <div class="Ranking">Ranking : <span></span></div>
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
            {{ `${this.First_Name} ${this.Last_Name}` }}
          </div>
          <div class="class">class : {{ this.Theclass }}</div>
          <div class="Ranking">Ranking : <span></span></div>
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
            {{ `${this.First_Name} ${this.Last_Name}` }}
          </div>
          <div class="class">class : {{ this.Theclass }}</div>
          <div class="Ranking">Ranking : <span></span></div>
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
            {{ `${this.First_Name} ${this.Last_Name}` }}
          </div>
          <div class="class">class : {{ this.Theclass }}</div>
          <div class="Ranking">Ranking : <span></span></div>
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
            <td class="Total"></td>
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
            <td class="Total"></td>
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
            <td class="Total"></td>
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
            <td class="Total"></td>
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
import {
  // doc,
  // deleteDoc,
  getFirestore,
  collection,
  // addDoc,
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

import boxstyle from "../sass/box.scss";
import MonthAndYear from "../sass/MonthAndYear.scss";

export default {
  name: "MonthlyResults",
  props: [
    "MonthlyStudentResults",
    "MonthlyStudentEvaluations",
    "Theclass",
    "First_Name",
    "Last_Name",
    "Rankingmonth1",
    "Rankingmonth2",
    "Rankingmonth3",
    "Rankingmonth4",
    "updateUserData",
    "updateUserDataRanking",
  ],
  mounted() {
    this.show();
    setTimeout(() => {
      this.ShowGeneratedData();
    }, 1000);
    setTimeout(() => {
      this.showData();
      this.counter_on();
      this.counter();
      this.Rankingmonth1function();
      this.Rankingmonth2function();
      this.Rankingmonth3function();
      this.Rankingmonth4function();
    }, 2000);
  },
  beforeUnmount() {
    this.beforeunmount();
  },
  methods: {
    $style() {
      return boxstyle, MonthAndYear;
    },
    Rankingmonth1function() {
      let Rankingmonth = this.Rankingmonth1;
      let innerHTML = document
        .querySelectorAll(".table.Monthly table tbody")[0]
        .children[3].children[1].innerHTML.replace(/[^0-9.]/g, "");

      Rankingmonth.forEach((e, index) => {
        if (e === +innerHTML) {
          document.querySelectorAll(
            ".information .left .Ranking span"
          )[0].innerHTML = index + 1;
        }
      });
    },
    Rankingmonth2function() {
      let Rankingmonth = this.Rankingmonth2;
      let innerHTML = document
        .querySelectorAll(".table.Monthly table tbody")[1]
        .children[3].children[1].innerHTML?.replace(/[^0-9.]/g, "");
      Rankingmonth.forEach((e, index) => {
        if (e === +innerHTML) {
          document.querySelectorAll(
            " .information .left .Ranking span"
          )[1].innerHTML = index + 1;
        }
      });
    },
    Rankingmonth3function() {
      let Rankingmonth = this.Rankingmonth3;
      let innerHTML = document
        .querySelectorAll(".table.Monthly table tbody")[2]
        .children[3].children[1].innerHTML?.replace(/[^0-9.]/g, "");
      Rankingmonth.forEach((e, index) => {
        if (e === +innerHTML) {
          document.querySelectorAll(
            " .information .left .Ranking span"
          )[2].innerHTML = index + 1;
        }
      });
    },
    Rankingmonth4function() {
      let Rankingmonth = this.Rankingmonth4;
      let innerHTML = document
        .querySelectorAll(".table.Monthly table tbody")[3]
        .children[3].children[1].innerHTML?.replace(/[^0-9.]/g, "");
      Rankingmonth.forEach((e, index) => {
        if (e === +innerHTML) {
          document.querySelectorAll(
            ".information .left .Ranking span"
          )[3].innerHTML = index + 1;
        }
      });
    },
    beforeunmount() {
      document
        .querySelectorAll("table thead tr.Subjects ")
        .forEach(
          (e) =>
            (e.innerHTML = "<th>Subjects</th> <th class='Total'>The Total</th>")
        );
      document
        .querySelectorAll("table tbody tr.MinorGrade ")
        .forEach(
          (e) => (e.innerHTML = "<td>Minor Grade</td> <td class='Total'></td>")
        );
      document
        .querySelectorAll("table tbody tr.MajorGrade ")
        .forEach(
          (e) =>
            (e.innerHTML =
              "<td>Major Grade</td> <td class='Total'>The Total</td>")
        );
      document
        .querySelectorAll("table tbody tr.TeachersName ")
        .forEach(
          (e) =>
            (e.innerHTML =
              "<td>Teacher's Name</td> <td class='Total'>The Total</td>")
        );
      document
        .querySelectorAll(".table table tbody tr.StudentsGrade")
        .forEach(
          (e) =>
            (e.innerHTML =
              "<td>Student's Grade</td> <td class='Total'>The Total</td>")
        );
      document
        .querySelectorAll(".table table tbody tr.BehaviorAssessment")
        .forEach(
          (e) =>
            (e.innerHTML =
              "<td>Behavior Assessment</td> <td class='Total'>The Total</td>")
        );
    },
    counter_on() {
      document
        .querySelectorAll(".table.Monthly table tbody tr input")
        .forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            this.counter();
            this.updateUserData();
            setTimeout(() => {
              this.Rankingmonth1function();
              this.Rankingmonth2function();
              this.Rankingmonth3function();
              this.Rankingmonth4function();
            }, 1000);
            setTimeout(() => {
              this.updateUserDataRanking();
            }, 1100);
          });
        });
    },
    counter() {
      for (
        let ii = 0;
        ii <
        document.querySelectorAll(".table.Monthly  table tbody tr.MinorGrade ")
          .length;
        ii++
      ) {
        let MinorGrade = document.querySelectorAll(
          ".table.Monthly table tbody tr.MinorGrade "
        )[ii].children;
        let MajorGrade = document.querySelectorAll(
          ".table.Monthly table tbody tr.MajorGrade "
        )[ii].children;
        let StudentsGrade = document.querySelectorAll(
          ".table.Monthly table tbody tr.StudentsGrade "
        )[ii].children;
        let collect1 = [];
        let collect2 = [];
        let collect3 = [];
        for (let i = 2; i < MinorGrade.length; i++) {
          collect1.push(+MinorGrade[i].innerHTML);
          collect2.push(+MajorGrade[i].innerHTML);
          collect3.push(+StudentsGrade[i].value);
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

        document.querySelectorAll(
          ".table.Monthly table tbody tr.MinorGrade .Total"
        )[ii].innerHTML = sum1;
        document.querySelectorAll(
          ".table.Monthly table tbody tr.MajorGrade .Total"
        )[ii].innerHTML = sum2;
        document.querySelectorAll(
          ".table.Monthly table tbody tr.StudentsGrade .Total"
        )[ii].innerHTML = sum3;
        document.querySelectorAll(
          ".table.Monthly table tbody tr.TeachersName .Total"
        )[ii].style.border = "2px solid var(--main-color)";
        document.querySelectorAll("table tbody tr.TeachersName .Total")[
          ii
        ].innerHTML = `${(
          (document.querySelectorAll(
            ".table.Monthly table tbody tr.StudentsGrade .Total"
          )[ii].innerHTML *
            100) /
          document.querySelectorAll(
            ".table.Monthly table tbody tr.MajorGrade .Total"
          )[ii].innerHTML
        ).toFixed(1)}%`;
      }
    },
    async ShowGeneratedData() {
      let str = this.Theclass;
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
        let inputResults = `
            <input type="text" class="Results" />
           `;
        let inputBehavior = `
            <input type="text" class="Evaluations" />
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
          .querySelectorAll(".table table tbody tr.StudentsGrade")
          .forEach((e) => (e.innerHTML += inputResults));
        document
          .querySelectorAll(".table table tbody tr.BehaviorAssessment")
          .forEach((e) => (e.innerHTML += inputBehavior));
        this.$style;
      });
    },
    showData() {
      let Results = document.querySelectorAll(
        ".table.Monthly table .StudentsGrade input.Results"
      );
      let Evaluations = document.querySelectorAll(
        ".table.Monthly table .BehaviorAssessment input.Evaluations"
      );
      let dataResults = Array.from(this.MonthlyStudentResults) || [];
      let dataEvaluations = Array.from(this.MonthlyStudentEvaluations) || [];
      for (let i = 0; i < Results.length; i++) {
        Results[i].value = dataResults[i]?.MonthlyStudentResults;
        Evaluations[i].value = dataEvaluations[i]?.MonthlyStudentEvaluations;
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
