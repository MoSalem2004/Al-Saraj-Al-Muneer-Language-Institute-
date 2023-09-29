<template>
  <TheHeader />
  <TheSettings />
  <router-view />
  <TheFooter />
</template>

<script>
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TheHeader from "./components/TheHeader.vue";
import TheSettings from "./components/TheSettings.vue";
import TheFooter from "./components/TheFooter.vue";

// import { userData } from "./store/index";
const firebaseConfig = {
  apiKey: "AIzaSyCqVUbKEz4AGu5IxceUA7I-ql1CLAOCL6s",
  authDomain: "alseraj-almoner-school.firebaseapp.com",
  projectId: "alseraj-almoner-school",
  storageBucket: "alseraj-almoner-school.appspot.com",
  messagingSenderId: "983919871798",
  appId: "1:983919871798:web:817c3a70a169ed333f9597",
};

const app = initializeApp(firebaseConfig);
export default {
  name: "app",
  show: false,
  created() {
    // this.checkRoute();
    onAuthStateChanged(getAuth(app), (user) => {
      this.$store.commit("UpdateUser", user);
      if (user) {
        this.$store.dispatch("getCurrentUser");
        this.$store.dispatch("getUserData");
        this.$store.dispatch("AllAdmins");
        this.$store.dispatch("UpdateID");
        setTimeout(() => {
          console.log(this.$store.state.user?.uid);
        }, 1000);
      }
      // console.log(this.$store.getters.getAllData);
    });
  },

  methods: {
    // checkRoute() {
    //   if (
    //     this.$route.name === "TheLogin" ||
    //     this.$route.name === "TheRegister" ||
    //     this.$route.name === "ForgotPassword"
    //   ) {
    //     this.navigation = true;
    //     return;
    //   } else {
    //     this.navigation = false;
    //   }
    // },
  },
  components: {
    TheHeader,

    TheSettings,
    TheFooter,
  },
  data() {
    return {
      selectedColor: "#ff0000",
      selectedBackground: "#ffffff",
    };
  },
};
</script>

<style lang="scss">
:root {
  --main-color: #0088ff;
  --main-transition: 0.3s;
  --White-color: #fff;
  --Black-color: #22272b;
}
* {
  font-family: cursive;
}
#app {
  min-height: 100vh !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
body {
  margin: 0;
  background: var(--White-color) !important;
  font-family: Bahnschrift SemiBold;
}

::-webkit-scrollbar {
  width: 55px;
}
::-webkit-scrollbar-track {
  background: var(--White-color);
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: var(--main-color);
  width: 70px;
}
.Thepopup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  background: #222;
  opacity: 0.5;
}
.fit {
  width: 90%;
  margin: 0 auto;
}
a {
  color: #000;
  text-decoration: none !important;
}
ul {
  list-style-type: none;
  padding: 0 !important;
  margin: 0 !important;
}
input {
  border: none !important;
}
input:focus {
  border: none !important;
  outline: none !important;
  box-shadow: transparent !important;
}
.form-select:focus {
  box-shadow: 0 0 0 0.25rem transparent !important;
  border-color: var(--main-color) !important;
}

.form-control:focus {
  box-shadow: 0 0 0 0.25rem transparent !important;
}

.popup {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // background: #3333333d;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}
.controls {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

h1 {
  text-align: center;
}

.preview {
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.link-light {
  color: #fff;
}
.btn.remove:active {
  border: 1px solid #fff !important;
}
.error {
  text-align: center;
  font-size: 12px;
  color: red;
}
.btn:hover {
  color: var(--Black-color);
}
.btn.remove:hover {
  color: var(--Black-color);
}
.Main_Title {
  text-align: center;
  margin: 100px auto 20px;
  color: var(--Black-color);
}
.main_popup {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgb(51 51 51 / 46%);
}
.Toast {
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.Toast-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  & > div {
    color: var(--main-color);
    font-weight: bold;
  }
}
.container.fit.In {
  margin: 70px auto 2px;
  position: relative;
  nav {
    border-radius: 5px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    background: var(--White-color);
    filter: brightness(0.95);
    ol {
      margin: 0;
    }
  }
  .breadcrumb-item a {
    color: var(--main-color) !important;
    font-weight: bold;
  }
  .breadcrumb-item.active {
    color: var(--Black-color);
  }
  .breadcrumb-item + .breadcrumb-item::before {
    color: var(--Black-color);
  }
  h1 {
    color: var(--main-color);
    border-radius: 5px;
    background: var(--White-color);
    border-bottom: 1px solid var(--main-color);
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    filter: brightness(0.95);
    padding: 20px;
    margin: 10px auto 10px;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }
}
button.Save {
  background: var(--main-color);
  border: none;
  color: #fff;
  width: 100px;
  height: auto;
  border-radius: 5px;
  font-size: 20px;
}
textarea {
  resize: none;
}
.show_More {
  width: 100% !important;
  background: var(--main-color);
  color: #fff;
  padding: 10px;
  display: inline-block;
  margin: 12px;
  text-align: center;
  border-radius: 5px;
}
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
</style>
