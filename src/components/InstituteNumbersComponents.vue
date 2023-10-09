<template>
  <h2 class="Main_Title">Institute numbers</h2>
  <div class="content">
    <div class="box">
      <div>
        <span class="Num">{{ this.Students }}</span>
        <span>+</span>
      </div>
      <div>Students</div>
    </div>
    <div class="box">
      <div>
        <span class="Num">{{ this.Experience }}</span>
        <span>+</span>
      </div>
      <div>Years of Experience</div>
    </div>
    <div class="box">
      <div>
        <span class="Num">{{ this.Teachers }}</span>
        <span>+</span>
      </div>
      <div>Teachers</div>
    </div>
    <div class="box">
      <div>
        <span class="Num">{{ this.Graduates }}</span>
        <span>+</span>
      </div>
      <div>Graduates</div>
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
  name: "InstituteNumbersComponents",
  mounted() {
    this.scroll();
  },
  data() {
    return {
      Students: 0,
      Experience: 0,
      Teachers: 0,
      Graduates: 0,
    };
  },
  methods: {
    scroll() {
      const handleScroll = () => {
        if (window.scrollY >= 2266) {
          this.ShowData();
          window.removeEventListener("scroll", handleScroll); // إزالة الحدث بعد تنفيذ الوظيفة
        }
      };

      window.addEventListener("scroll", handleScroll);
    },
    // scroll() {
    //   window.onscroll = () => {
    //     if (window.scrollY >= 2136 && window.scrollY < 2140) {
    //       this.ShowData();
    //     }
    //   };
    // },
    async ShowData() {
      const querySnapshot = await getDocs(collection(db, "InstituteNumbers"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const targetStudents = data.Students;
        const targetExperience = data.Experience;
        const targetTeachers = data.Teachers;
        const targetGraduates = data.Graduates;
        this.startCounter(
          targetStudents,
          targetExperience,
          targetTeachers,
          targetGraduates
        );
      });
    },
    startCounter(
      targetStudents,
      targetExperience,
      targetTeachers,
      targetGraduates
    ) {
      const duration = 1500;
      const increment = 10;

      const stepsStudents = Math.ceil(targetStudents / increment);
      let currentStudents = 0;
      let currentExperience = 0;
      let currentTeachers = 0;
      let currentGraduates = 0;

      const timer = setInterval(() => {
        currentStudents += increment;
        currentExperience += increment;
        currentTeachers += increment;
        currentGraduates += increment;

        if (currentStudents >= targetStudents) {
          currentStudents = targetStudents;
          clearInterval(timer);
        }
        if (currentExperience >= targetExperience) {
          currentExperience = targetExperience;
        }
        if (currentTeachers >= targetTeachers) {
          currentTeachers = targetTeachers;
        }
        if (currentGraduates >= targetGraduates) {
          currentGraduates = targetGraduates;
        }

        this.Students = currentStudents;
        this.Experience = currentExperience;
        this.Teachers = currentTeachers;
        this.Graduates = currentGraduates;
      }, duration / stepsStudents);
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  .box {
    background: var(--White-color);
    filter: brightness(0.95);
    padding: 10px;
    width: 200px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    & > div:first-child {
      color: var(--main-color);
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 26px;
      .Num {
        font-size: 50px;
      }
    }
  }
}
</style>
