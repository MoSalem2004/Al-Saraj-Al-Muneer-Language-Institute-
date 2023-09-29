import { createStore } from "vuex";
import { onAuthStateChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

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
export default createStore({
  state: {
    SampleBlogCards: [],
    editpost: null,
    userData: null,
    userAdmin: "",
    user: "",
    First_Name: "mo",
    Last_Name: "so",
    Phone_Number: "",
    Parents_Phone_Number: "",
    SelectClass: "",
    Email: "",
    ID: "",
  },
  getters: {
    getAllData(state) {
      return state;
    },
  },
  mutations: {
    toggelEditPost(state, payload) {
      state.editpost = payload;
    },
    UpdateUser(state, payload) {
      state.user = payload;
    },
    UpdateUserData(state, payload) {
      state.userData = payload;
    },
    UpdateID(state, payload) {
      state.userData = payload;
    },
    UpdateSampleBlogCards(state, payload) {
      state.SampleBlogCards = payload;
    },
    setInfo(state, doc) {
      state.First_Name = doc.data().First_Name;
      state.Last_Name = doc.data().Last_Name;
      state.Phone_Number = doc.data().Phone_Number;
      state.Parents_Phone_Number = doc.data().Parents_Phone_Number;
      state.Email = doc.data().Email;
      state.ID = doc.data().ID;
    },
    setAdmin(state, payload) {
      state.userAdmin = payload;
      console.log(payload);
    },
  },
  actions: {
    async UpdateID(context) {
      const db = getFirestore();
      const userRef = doc(db, "users", context.state.user.uid);
      console.log(context.state.user.uid);
      try {
        await updateDoc(userRef, {
          ID: context.state.user.uid,
        });
        console.log("تم تحديث بيانات المستخدم بنجاح!");
      } catch (error) {
        console.log(error);
      }
    },
    async getCurrentUser({ commit }) {
      onAuthStateChanged(getAuth(), (user) => {
        if (user) {
          commit("UpdateUser", user);
          console.log(user);
        } else {
          commit("UpdateUser", null);
        }
      });
    },
    async getUserData({ commit, state }) {
      const email = state.user.email;
      console.log(email);
      const db = getFirestore();
      const userRef = doc(db, "users", state.user.uid);
      try {
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          commit("UpdateUserData", userData);
          console.log(userData);

          commit("UpdateUser", {
            ...state.user,
            First_Name: userData.First_Name,
            Last_Name: userData.Last_Name,
            Phone_Number: userData.Phone_Number,
            Parents_Phone_Number: userData.Parents_Phone_Number,
            SelectClass: userData.SelectClass,
            Email: userData.Email,
            ID: userData.ID,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateUserData(context) {
      const db = getFirestore();
      const userRef = doc(db, "users", context.state.user.uid);

      try {
        await updateDoc(userRef, {
          Phone_Number: document.querySelectorAll(
            ".container_1 section form .small_container > div input.form-control"
          )[2].value,
          // Parents_Phone_Number: document.querySelectorAll(
          //   ".container_1 section form .small_container > div input.form-control"
          // )[3].value,
        });
        console.log("تم تحديث بيانات المستخدم بنجاح!");
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async fetchSampleBlogCards({ commit }) {
      const db = getFirestore();
      const sampleBlogCardsRef = collection(db, "sampleBlogCards");
      try {
        const snapshot = await getDocs(sampleBlogCardsRef);
        const sampleBlogCardsData = [];
        snapshot.forEach((doc) => {
          sampleBlogCardsData.push(doc.data());
        });
        commit("UpdateSampleBlogCards", sampleBlogCardsData);
        console.log(sampleBlogCardsData);
      } catch (error) {
        console.log(error);
      }
    },
    async AllAdmins({ commit }) {
      const querySnapshot = await getDocs(collection(db, "Admins"));
      querySnapshot.forEach((doc) => {
        console.log(this.state.user?.email === doc.data().email);
        if (this.state.user?.email === doc.data().email) {
          commit("setAdmin", this.state.user?.email === doc.data().email);
          console.log("AdminEmail =>", doc.data().email);
        }
      });
    },
  },
  modules: {},
});
