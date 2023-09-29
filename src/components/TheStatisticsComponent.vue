<template>
  <h2 class="Main_Title">Statistics</h2>
  <div><canvas ref="chartCanvas"></canvas></div>
</template>
<script>
import { Chart } from "chart.js";
import "chart.js/auto";
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
  name: "TheStatisticsComponent",
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
    }, 3000);
  },
  methods: {
    async ShowData() {
      const querySnapshot = await getDocs(collection(db, "TheStatistics"));
      querySnapshot.forEach((doc) => {
        this.SuccessPercentage = doc.data().SuccessPercentage;
        this.ExcellencePercentage = doc.data().ExcellencePercentage;
      });
    },
    renderChart() {
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
  },
};
</script>
