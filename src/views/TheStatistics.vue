<template>
  <div class="container fit Statistics In">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="TheAdmin">The Administrator</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="TheModifications">Modifications</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Statistics</li>
      </ol>
    </nav>
    <h1>
      <span>Statistics</span>
      <button class="Save" @click="updateNumber">Save</button>
    </h1>
    <div style="height: 550px; overflow: hidden; width: 100%">
      <canvas ref="chartCanvas"></canvas>
    </div>
    <div class="Settings_Box">
      <div>
        <div>Success percentage</div>
        <span>{{ this.SuccessPercentage }}</span>
        <input
          type="range"
          v-model="this.SuccessPercentage"
          min="0"
          max="100"
          @change="updateChart"
        />
      </div>
      <div>
        <div>Excellence percentage</div>
        <span>{{ this.ExcellencePercentage }}</span>
        <input
          type="range"
          v-model="this.ExcellencePercentage"
          min="0"
          max="100"
          @change="updateChart"
        />
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
import { Chart } from "chart.js";
import "chart.js/auto";
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
  name: "TheStatistics",

  data() {
    return {
      chart: null,
      show: false,
      message: "Data has been updated",
      SuccessPercentage: "",
      ExcellencePercentage: "",
    };
  },
  mounted() {
    setTimeout(() => {
      this.ShowData();
    }, 1000);
    setTimeout(() => {
      this.renderChart();
    }, 1400);
  },
  methods: {
    async updateNumber() {
      const db = getFirestore();
      const userRef = doc(db, "TheStatistics", "GIjCPT2lMJzathiSF1Lv");
      try {
        await updateDoc(userRef, {
          SuccessPercentage: document.querySelectorAll(
            ".container.fit .Settings_Box > div span"
          )[0]?.innerHTML,
          ExcellencePercentage: document.querySelectorAll(
            ".container.fit .Settings_Box > div span"
          )[1]?.innerHTML,
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
      const querySnapshot = await getDocs(collection(db, "TheStatistics"));
      querySnapshot.forEach((doc) => {
        this.SuccessPercentage = doc.data().SuccessPercentage;
        this.ExcellencePercentage = doc.data().ExcellencePercentage;
        console.log(this.SuccessPercentage);
      });
    },
    renderChart() {
      if (this.chart) {
        this.chart.destroy(); // دمر المخطط السابق إذا كان موجودًا
      }
      const chartCanvas = this.$refs.chartCanvas;
      if (chartCanvas) {
        const ctx = chartCanvas.getContext("2d");
        this.chart = new Chart(ctx, {
          type: "bar",
          data: {
            labels: ["Success percentage", "Excellence percentage"],
            datasets: [
              {
                label: "The percentages %",
                data: [this.SuccessPercentage, this.ExcellencePercentage],
                // data: ["8", "20"],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                ],
                borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            maintainAspectRatio: true,
            responsive: true,
            width: 600,
            height: 400,
          },
        });
      }
    },
    updateChart() {
      this.renderChart();
    },
  },
};
</script>
<style lang="scss" scoped>
.container.fit {
  .Settings_Box {
    display: flex;
    align-items: center;
    background: #eee;
    justify-content: space-between;
    padding: 10px;
    & > div {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      input[type="range"]::-webkit-slider-thumb {
        appearance: none;
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
        cursor: pointer;
      }

      input[type="range"]::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
        cursor: pointer;
      }

      input[type="range"]::-ms-thumb {
        width: 20px;
        height: 20px;
        background-color: red;
        border-radius: 50%;
        cursor: pointer;
      }
      input[type="range"]::-webkit-slider-runnable-track {
        // background-color: black;
      }
      span {
        background: #fff;
        width: 70px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        border-radius: 5px;
      }
    }
  }
}
canvas {
  height: 512px !important;
  width: 100% !important;
}
</style>
