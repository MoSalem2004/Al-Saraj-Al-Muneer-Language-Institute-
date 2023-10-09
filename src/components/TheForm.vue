<template>
  <div class="popup"></div>
  <div class="TheProfile">
    <font-awesome-icon :icon="['fas', 'window-close']" @click="closeModal" />
    <h1 class="fit">
      {{ `Profile of ${this.First_Name} ${this.Last_Name}` }}
    </h1>
    <div class="container_Profile fit">
      <div class="box">
        <div class="feat active">Modify student data</div>

        <div class="feat">Monthly Results</div>
        <div class="feat">Yearly Results</div>
      </div>
      <div class="box">
        <EditAccount
          class="content active"
          :First_Name="First_Name"
          :Last_Name="Last_Name"
          :Phone_Number="Phone_Number"
          :Parents_Phone_Number="Parents_Phone_Number"
          :Theclass="Theclass"
          :Email="Email"
          :ID="ID"
        />
        <MonthlyResults
          class="content"
          :MonthlyStudentResults="MonthlyStudentResults"
          :MonthlyStudentEvaluations="MonthlyStudentEvaluations"
          :First_Name="First_Name"
          :Last_Name="Last_Name"
          :Theclass="Theclass"
          :Rankingmonth1="Rankingmonth1"
          :Rankingmonth2="Rankingmonth2"
          :Rankingmonth3="Rankingmonth3"
          :Rankingmonth4="Rankingmonth4"
          :updateUserData="updateUserData"
          :updateUserDataRanking="updateUserDataRanking"
        />
        <YearlyResults
          class="content"
          :First_Name="First_Name"
          :Last_Name="Last_Name"
          :Theclass="Theclass"
          :YearlyStudentResults="YearlyStudentResults"
          :RankingMidtermExam="RankingMidtermExam"
          :RankingFinalExam="RankingFinalExam"
          :updateUserData="updateUserData"
          :updateUserDataRanking="updateUserDataRanking"
          @MidtermExamValue="MidtermExamValue"
        />
      </div>
      <div class="Save" @click.prevent="updateUserData">Save Change</div>
    </div>
  </div>
</template>
<script>
import MonthlyResults from "./MonthlyResults - Copy.vue";
import YearlyResults from "./YearlyResults - Copy.vue";
import EditAccount from "./EditAccount - Copy.vue";
import { getFirestore, doc, updateDoc } from "firebase/firestore";

export default {
  name: "TheForm",
  emits: ["close_modal"],
  props: [
    "First_Name",
    "Last_Name",
    "Phone_Number",
    "Parents_Phone_Number",
    "Theclass",
    "Email",
    "ID",
    "MonthlyStudentResults",
    "MonthlyStudentEvaluations",
    "YearlyStudentResults",
    "Rankingmonth1",
    "Rankingmonth2",
    "Rankingmonth3",
    "Rankingmonth4",
    "RankingMidtermExam",
    "RankingFinalExam",
    "LiveResults",
  ],
  components: {
    EditAccount,
    MonthlyResults,
    YearlyResults,
  },
  mounted() {
    this.MidtermExamValue();
    this.ChoseFeat();
    this.ChoseContent();
    this.closeBtnSave();
  },
  data() {
    return {
      MidtermExamData: "",
    };
  },
  methods: {
    closeBtnSave() {
      document.querySelector(".Save").onclick = () => {
        this.$emit("close_modal");
      };
    },
    MidtermExamValue(MidtermExamNum) {
      console.log(MidtermExamNum);
      this.MidtermExamData = MidtermExamNum;
      return MidtermExamNum;
    },
    closeModal() {
      console.log("close");
      document
        .querySelectorAll(
          ".TheProfile .container_Profile .box:nth-child(2) > div"
        )
        .forEach(() => {
          document
            .querySelectorAll(
              ".TheProfile .container_Profile .box:nth-child(2) > div"
            )
            .forEach((e) => {
              e.classList.remove("active");
            });
          document
            .querySelectorAll(
              ".TheProfile .container_Profile .box:nth-child(2) > div"
            )[0]
            .classList.add("active");
        });
      this.$emit("close_modal");
    },
    ChoseFeat() {
      document
        .querySelectorAll(
          ".TheProfile .container_Profile .box:nth-child(1) > div"
        )
        .forEach((ele) => {
          ele.addEventListener("click", function () {
            document
              .querySelectorAll(
                ".TheProfile .container_Profile .box:nth-child(1) > div"
              )
              .forEach((e) => {
                e.classList.remove("active");
              });
            ele.classList.add("active");
          });
        });
    },
    ChoseContent() {
      let contents = document.querySelectorAll(
        ".TheProfile .container_Profile .box:nth-child(2) > div"
      );
      let buttons = document.querySelectorAll(
        ".TheProfile .container_Profile .box:nth-child(1) > div"
      );
      contents.forEach((e1, index1) => {
        buttons.forEach((e2, index2) => {
          e2.addEventListener("click", function () {
            contents[index1].classList.remove("active");
            if (index1 === index2) {
              e1.classList.add("active");
            }
          });
        });
      });
    },
    async updateData() {
      const db = getFirestore();
      const userRef = doc(db, "users", this.ID);
      const MonthlyResults = Array.from(
        document.querySelectorAll(
          ".table.Monthly table .StudentsGrade input.Results"
        )
      )
        .map((e) => e.value)
        .map((Result) => {
          return {
            MonthlyStudentResults: Result,
          };
        });
      const MonthlyEvaluations = Array.from(
        document.querySelectorAll(".table.Monthly table input.Evaluations")
      )
        .map((e) => e.value)
        .map((Evaluations) => {
          return {
            MonthlyStudentEvaluations: Evaluations,
          };
        });

      try {
        await updateDoc(userRef, {
          MonthlyStudentResults: MonthlyResults,
          MonthlyStudentEvaluations: MonthlyEvaluations,
        });
      } catch (error) {
        console.log(error);
      }
    },
    async updateUserDataRanking() {
      const db = getFirestore();
      const userRef = doc(db, "users", this.ID);
      let Rankingmonthone = document.querySelectorAll(
        ".table.Monthly .information .left .Ranking span"
      )[0].innerHTML;
      let Rankingmonthtwo = document.querySelectorAll(
        ".table.Monthly .information .left .Ranking span"
      )[1].innerHTML;
      let Rankingmonththree = document.querySelectorAll(
        ".table.Monthly .information .left .Ranking span"
      )[2].innerHTML;
      let Rankingmonthfour = document.querySelectorAll(
        ".table.Monthly .information .left .Ranking span"
      )[3].innerHTML;
      let RankingMidtermExamValue = document.querySelectorAll(
        ".table.Yearly .information .left .Ranking span"
      )[0].innerHTML;
      let RankingFinalExamValue = document.querySelectorAll(
        ".table.Yearly .information .left .Ranking span"
      )[1].innerHTML;
      try {
        await updateDoc(userRef, {
          Rankingmonth1: Rankingmonthone,
          Rankingmonth2: Rankingmonthtwo,
          Rankingmonth3: Rankingmonththree,
          Rankingmonth4: Rankingmonthfour,
          RankingMidtermExam: RankingMidtermExamValue,
          RankingFinalExam: RankingFinalExamValue,
        });
        // this.$emit("close_modal");

        // setTimeout(() => {
        //   window.location.reload();
        // }, 4000);
      } catch (error) {
        console.log(error);
      }
    },
    async updateUserData() {
      console.log("MidtermData", this.MidtermExamData);
      this.LiveResults();
      if (this.LiveResults) {
        console.log("this.LiveResults");
        const db = getFirestore();
        const userRef = doc(db, "users", this.ID);
        const MonthlyResults = Array.from(
          document.querySelectorAll(
            ".table.Monthly table .StudentsGrade input.Results"
          )
        ).map((e) => e.value);

        const TheResults = MonthlyResults.map((Result) => {
          return {
            MonthlyStudentResults: Result,
          };
        });
        const MonthlyEvaluations = Array.from(
          document.querySelectorAll(".table.Monthly table  input.Evaluations")
        ).map((e) => e.value);

        const TheEvaluations = MonthlyEvaluations.map((Evaluations) => {
          return {
            MonthlyStudentEvaluations: Evaluations,
          };
        });
        const YearlyStudentResultsValue = Array.from(
          document.querySelectorAll(".table.Yearly table  input.Results")
        )
          .map((e) => e.value)
          .map((Results) => {
            return {
              YearlyStudentResults: Results,
            };
          });
        let month1 = document.querySelectorAll(
          ".table.Monthly table tbody tr.TeachersName .Total"
        )[0].innerHTML;
        let month2 = document.querySelectorAll(
          ".table.Monthly table tbody tr.TeachersName .Total"
        )[1].innerHTML;
        let month3 = document.querySelectorAll(
          ".table.Monthly table tbody tr.TeachersName .Total"
        )[2].innerHTML;
        let month4 = document.querySelectorAll(
          ".table.Monthly table tbody tr.TeachersName .Total"
        )[3].innerHTML;
        let MidtermExam = document.querySelectorAll(
          ".table.Yearly table tbody tr.TeachersName .Total"
        )[0].innerHTML;

        let FinalExam = document.querySelectorAll(
          ".table.Yearly table tbody tr.TeachersName .Total"
        )[1].innerHTML;
        let results = [];
        results.push(month1, month2, MidtermExam, month3, month4, FinalExam);
        let resultsValue = results;
        console.log(resultsValue);
        this.$emit("results", resultsValue);
        // let Rankingmonthone = document.querySelectorAll(
        //   ".table.Monthly .information .left .Ranking span"
        // )[0].innerHTML;
        // let Rankingmonthtwo = document.querySelectorAll(
        //   ".table.Monthly .information .left .Ranking span"
        // )[1].innerHTML;
        // let Rankingmonththree = document.querySelectorAll(
        //   ".table.Monthly .information .left .Ranking span"
        // )[2].innerHTML;
        // let Rankingmonthfour = document.querySelectorAll(
        //   ".table.Monthly .information .left .Ranking span"
        // )[3].innerHTML;
        // let RankingMidtermExamValue = document.querySelectorAll(
        //   ".table.Yearly .information .left .Ranking span"
        // )[0].innerHTML;
        // let RankingFinalExamValue = document.querySelectorAll(
        //   ".table.Yearly .information .left .Ranking span"
        // )[1].innerHTML;
        try {
          await updateDoc(userRef, {
            First_Name: document.querySelectorAll(
              ".container_1 section form .small_container > div input.form-control"
            )[0].value,
            Last_Name: document.querySelectorAll(
              ".container_1 section form .small_container > div input.form-control"
            )[1].value,
            Phone_Number: document.querySelectorAll(
              ".container_1 section form .small_container > div input.form-control"
            )[2].value,
            Parents_Phone_Number: document.querySelectorAll(
              ".container_1 section form .small_container > div input.form-control"
            )[3].value,
            class: document.querySelector(".form-floating > .form-select")
              .value,
            Email: document.querySelectorAll(
              ".container_1 section form .small_container > div input.form-control"
            )[4].value,
            ID: this.ID,
            MonthlyStudentResults: TheResults,
            MonthlyStudentEvaluations: TheEvaluations,
            Result: results,
            YearlyStudentResults: YearlyStudentResultsValue,
            // Rankingmonth1: Rankingmonthone,
            // Rankingmonth2: Rankingmonthtwo,
            // Rankingmonth3: Rankingmonththree,
            // Rankingmonth4: Rankingmonthfour,
            // RankingMidtermExam: RankingMidtermExamValue,
            // RankingFinalExam: RankingFinalExamValue,
          });
          //

          // setTimeout(() => {
          //   window.location.reload();
          // }, 4000);
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("############");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.Save {
  position: absolute;
  bottom: 17px;
  right: 30px;
  background: var(--main-color);
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
}
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  background: #222;
  opacity: 0.5;
}
.TheProfile {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 12;
  width: 90%;
  background: #fff;
  border-radius: 5px;
  padding: 50px 0px;
  height: 98vh;
  & > svg {
    position: absolute;
    cursor: pointer;
    top: 10px;
    right: 10px;
    font-size: 28px;
    color: var(--main-color);
  }
  h1 {
    color: var(--main-color);
    border-radius: 5px;
    background: var(--White-color);
    filter: brightness(0.95);
    padding: 10px;
    margin-bottom: 5px;
  }
  .container_Profile {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .box {
      width: 50%;
      flex: auto;

      &.long {
        width: 100%;
      }
      &:nth-child(1) {
        display: flex;
        flex-direction: column;

        gap: 10px;
        width: 0%;
        padding: 20px;
        border-radius: 5px;
        filter: brightness(0.95);
        background: var(--White-color);
        height: 476px;
        & > div {
          filter: none;
          border-radius: 6px;
          padding: 15px 10px;
          cursor: pointer;
          color: var(--main-color);
          text-align: center;
          font-weight: bold;
          border: 2px solid transparent;
          transition: 0.3s;
          display: flex;
          gap: 10px;
          justify-content: center;
          align-items: center;
          &.active,
          &:hover {
            border: 2px solid var(--main-color);
          }
        }
      }
      &:nth-child(2) {
        > div {
          display: none;
          &.active {
            display: flex;
          }
        }
      }
      &:nth-child(3) {
        background: var(--White-color);
        filter: brightness(0.95);
        padding: 15px;
        h4 {
          color: var(--main-color);
          font-weight: bold;
          font-size: 30px;
        }
        span {
          color: var(--Black-color);
        }
      }
    }
  }
  .AverageResults {
    background: red;
  }
}
</style>
