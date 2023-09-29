<template>
  <div class="table Yearly">
    <div class="buttons">
      <div class="active">Midterm Exam</div>
      <div>Final Exam</div>
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
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import boxstyle from "../sass/box.scss";
import MonthAndYear from "../sass/MonthAndYear.scss";

export default {
  name: "YearlyResults",
  props: [
    "YearlyStudentResults",
    "Theclass",
    "First_Name",
    "Last_Name",
    "RankingMidtermExam",
    "RankingFinalExam",
    "updateUserData",
    "updateUserDataRanking",
    "MidtermExamValue",
  ],
  mounted() {
    this.show();
    setTimeout(() => {
      this.showData();
      this.counter_on();
      this.counter();
      this.RankingMidtermExamfunction();
      this.RankingFinalExamfunction();
    }, 2000);
  },
  methods: {
    $style() {
      return boxstyle, MonthAndYear;
    },
    RankingMidtermExamfunction() {
      let RankingExam = this.RankingMidtermExam;
      let innerHTML = document
        .querySelectorAll(".table.Yearly table tbody")[0]
        .children[3].children[1].innerHTML.replace(/[^0-9.]/g, "");

      RankingExam.forEach((e, index) => {
        if (e === +innerHTML) {
          document.querySelectorAll(
            ".information .left .Ranking span"
          )[4].innerHTML = index + 1;
          let MidtermExamNum = index + 1;
          this.$emit("MidtermExamValue", MidtermExamNum);
        }
      });
    },
    RankingFinalExamfunction() {
      let RankingExam = this.RankingFinalExam;
      let innerHTML = document
        .querySelectorAll(".table.Yearly table tbody")[1]
        .children[3].children[1].innerHTML?.replace(/[^0-9.]/g, "");
      RankingExam.forEach((e, index) => {
        if (e === +innerHTML) {
          document.querySelectorAll(
            " .information .left .Ranking span"
          )[5].innerHTML = index + 1;
        }
      });
    },

    counter_on() {
      document
        .querySelectorAll(".table.Yearly table tbody tr input")
        .forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            this.counter();
            this.updateUserData();
            setTimeout(() => {
              this.RankingMidtermExamfunction();
              this.RankingFinalExamfunction();
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
        document.querySelectorAll(".table.Yearly  table tbody tr.MinorGrade ")
          .length;
        ii++
      ) {
        let MinorGrade = document.querySelectorAll(
          ".table.Yearly table tbody tr.MinorGrade "
        )[ii].children;
        let MajorGrade = document.querySelectorAll(
          ".table.Yearly table tbody tr.MajorGrade "
        )[ii].children;
        let StudentsGrade = document.querySelectorAll(
          ".table.Yearly table tbody tr.StudentsGrade "
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
          ".table.Yearly table tbody tr.MinorGrade .Total"
        )[ii].innerHTML = sum1;
        document.querySelectorAll(
          ".table.Yearly table tbody tr.MajorGrade .Total"
        )[ii].innerHTML = sum2;
        document.querySelectorAll(
          ".table.Yearly table tbody tr.StudentsGrade .Total"
        )[ii].innerHTML = sum3;
        document.querySelectorAll(
          ".table.Yearly table tbody tr.TeachersName .Total"
        )[ii].style.border = "2px solid var(--main-color)";
        document.querySelectorAll(".table.Yearly tbody tr.TeachersName .Total")[
          ii
        ].innerHTML = `${(
          (document.querySelectorAll(
            ".table.Yearly table tbody tr.StudentsGrade .Total"
          )[ii].innerHTML *
            100) /
          document.querySelectorAll(
            ".table.Yearly table tbody tr.MajorGrade .Total"
          )[ii].innerHTML
        ).toFixed(1)}%`;
      }
    },
    showData() {
      let Results = document.querySelectorAll(
        ".table.Yearly table .StudentsGrade input.Results"
      );
      let dataResults = Array.from(this.YearlyStudentResults) || [];
      for (let i = 0; i < Results.length; i++) {
        Results[i].value = dataResults[i]?.YearlyStudentResults;
      }
    },

    show() {
      let buttons = document.querySelectorAll(".table.Yearly .buttons div");
      let tbody = document.querySelectorAll(".table.Yearly tbody");
      let information = document.querySelectorAll(".table.Yearly .information");
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
