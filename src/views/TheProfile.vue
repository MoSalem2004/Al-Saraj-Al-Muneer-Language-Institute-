<template v-if="this.$store.state.user">
  <div class="TheProfile">
    <h1 class="fit">Profile</h1>
    <div class="container_Profile fit">
      <!-- <div class="box long">
        <div class="Average_Teacher">
          <div class="score">Very Good</div>
          <span>Average Teachers' Ratings</span>
        </div>
        <div class="Average_Results">
          <div class="score">90%</div>
          <span>Average results1</span>
        </div>
      </div> -->
      <div class="box">
        <div class="feat active">
          <font-awesome-icon :icon="['fas', 'user-edit']" />
          <span> Edit your account</span>
        </div>
        <div class="feat" v-if="!Admin">
          <font-awesome-icon :icon="['fas', 'trophy']" />
          <span>Monthly results</span>
        </div>
        <div class="feat" v-if="!Admin">
          <font-awesome-icon :icon="['fas', 'trophy']" />
          <span> Yearly results</span>
        </div>
      </div>
      <div class="box">
        <EditAccount class="content active" />
        <MonthlyResults
          class="content"
          v-if="!Admin"
          @month1="month1"
          @month2="month2"
          @month3="month3"
          @month4="month4"
          @term1="term1"
          @term2="term2"
        />
        <YearlyResults class="content" v-if="!Admin" />
      </div>
      <div class="box long" v-if="!Admin">
        <h4>Level Indicator</h4>
        <span>total grades : {{ Total }}</span>
        <div>
          <canvas class="" ref="StudentChart"></canvas>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import MonthlyResults from "../components/MonthlyResults.vue";
import YearlyResults from "../components/YearlyResults.vue";
import EditAccount from "../components/EditAccount.vue";
import { Chart } from "chart.js";
import "chart.js/auto";

export default {
  name: "TheProfile",
  computed: {
    Admin() {
      return this.$store.state.userAdmin;
    },
  },
  components: {
    EditAccount,
    MonthlyResults,
    YearlyResults,
  },
  mounted() {
    this.ChoseFeat();
    this.ChoseContent();
    setTimeout(() => {
      this.term1();
      this.renderChart();
      this.TotalGrad();
    }, 3000);
  },
  data() {
    return {
      Total: null,
      results1: null,
      results2: null,
      results3: null,
      results4: null,
      term_1Value: null,
      term_2Value: null,
    };
  },
  methods: {
    TotalGrad() {
      this.Total = +document.querySelectorAll(".table table td.Total")[2]
        ?.innerHTML;
    },
    month1(array1) {
      this.results1 = array1;
    },
    month2(array2) {
      this.results2 = array2;
    },
    month3(array3) {
      this.results3 = array3;
    },
    month4(array4) {
      this.results4 = array4;
    },
    term1(array5) {
      this.term_1Value = array5;
      console.log(this.term_1Value);
    },
    term2(array6) {
      this.term_2Value = array6;
    },
    async renderChart() {
      const ctx = this.$refs.StudentChart.getContext("2d");

      new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "first month",
            "second month",
            "midterm exam",
            "first month",
            "second month",
            "final exam",
          ],

          datasets: [
            {
              label: "Student's total grades ",
              data: [
                this.results1,
                this.results2,
                this.results4,
                this.results3,
                this.results4,
                this.term_2Value,
              ],
              borderColor: `var(--main-color)`,
              backgroundColor: [
                "#0088ff73",
                "#34bf497d",
                "#bc1d5385",
                "#f4892480",
                "#4d4f5387",
                "rgba(153, 102, 255, 0.5)",
              ],
            },
          ],
        },
        options: {},
      });
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
            // feat.classList.add("active");
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
  },
};
</script>
<style lang="scss" scoped>
.TheProfile {
  h1 {
    color: var(--main-color);
    border-radius: 5px;
    background: var(--White-color);
    filter: brightness(0.95);
    padding: 10px;
    margin: 70px auto 2px;
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
      // &:first-child {
      //   display: flex;
      //   padding: 20px;
      //   justify-content: space-around;
      //   color: var(--main-color);
      //   border-radius: 5px;
      //   background: var(--White-color);
      //   filter: brightness(0.95);
      //   & > div {
      //     display: flex;
      //     flex-direction: column;
      //     align-items: center;
      //     gap: 5px;
      //     .score {
      //       font-size: 30px;
      //       font-weight: bold;
      //     }
      //     span {
      //       font-size: 14px;
      //     }
      //   }
      // }
      &:nth-child(1) {
        display: flex;
        flex-direction: column;

        gap: 10px;
        width: 0%;
        padding: 20px;
        border-radius: 5px;
        filter: brightness(0.95);
        background: var(--White-color);
        & > div {
          filter: none;
          // background: var(--White-color);
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
  .canvas {
    width: 100% !important;
    margin: auto !important;
  }
}
</style>
