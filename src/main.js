import { createApp } from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Vuescrollactive from "vue-scrollactive";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import App from "./App.vue";
import TheProfile from "./views/TheProfile.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "../src/sass/app.scss";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap-vue/dist/bootstrap-vue.css";

const firebaseConfig = {
  apiKey: "AIzaSyCqVUbKEz4AGu5IxceUA7I-ql1CLAOCL6s",
  authDomain: "alseraj-almoner-school.firebaseapp.com",
  projectId: "alseraj-almoner-school",
  storageBucket: "alseraj-almoner-school.appspot.com",
  messagingSenderId: "983919871798",
  appId: "1:983919871798:web:817c3a70a169ed333f9597",
};

const app = initializeApp(firebaseConfig);
library.add(fas, fab);

let state;
const auth = getAuth(app);
auth.onAuthStateChanged(() => {
  if (!state) {
    const app = createApp(App);
    app.use(router);
    app.use(store);
    app.use(app);
    app.use(Vuescrollactive);
    app.component("font-awesome-icon", FontAwesomeIcon);
    app.mount("#app");

    createApp(TheProfile).use(router).mount("#the-profile");
    state = true;
  }
});
