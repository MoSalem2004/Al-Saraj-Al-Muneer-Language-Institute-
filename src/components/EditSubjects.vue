<template>
  <div class="CreatSubject" v-if="close_SubModel">
    <font-awesome-icon
      :icon="['fas', 'times-circle']"
      class="close"
      @click="close_Sub"
    />
    <h2>CreatSubject</h2>
    <div class="content">
      <div class="input-group mb-3">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="SubName"
            placeholder="SubName"
            v-model="SubName"
          /><label for="SubName"
            ><font-awesome-icon :icon="['fas', 'chalkboard']" /> Subject
            Name</label
          >
        </div>
      </div>
      <div class="input-group mb-3">
        <div class="form-floating">
          <input
            type="text"
            class="form-control"
            id="SubTeacher"
            placeholder="SubTeacher"
            v-model="SubTeacher"
          /><label for="SubTeacher"
            ><font-awesome-icon :icon="['fas', 'chalkboard-teacher']" /> Subject
            teacher</label
          >
        </div>
      </div>
      <div class="input-group mb-3">
        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            id="MinorDegree"
            placeholder="MinorDegree"
            v-model="SubMinor"
          /><label for="MinorDegree"
            ><font-awesome-icon :icon="['fas', 'sort-numeric-down-alt']" />
            Minor degree</label
          >
        </div>
      </div>
      <div class="input-group mb-3">
        <div class="form-floating">
          <input
            type="number"
            class="form-control"
            id="MajorDegree"
            placeholder="MajorDegree"
            v-model="SubMajor"
          /><label for="MajorDegree"
            ><font-awesome-icon :icon="['fas', 'sort-numeric-up-alt']" /> Major
            degree</label
          >
        </div>
      </div>
    </div>
    <button @click="Done">Done</button>
  </div>
  <div class="popup"></div>
  <div class="EditSubjects">
    <header>
      <h1>Edit subjects for {{ this.Theclass }}</h1>
      <font-awesome-icon :icon="['fas', 'window-close']" @click="closeModal" />
    </header>
    <nav>
      <span
        >Number of study subjects :
        <strong>{{ this.subjectsnumber }}</strong></span
      >
      <font-awesome-icon :icon="['fas', 'plus']" @click="close_Sub" />
    </nav>
    <div class="subjects"></div>
  </div>
</template>
<script>
import boxstyle from "../sass/box.scss";
import {
  doc,
  deleteDoc,
  getFirestore,
  collection,
  addDoc,
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
  name: "EditSubjects",
  emits: ["close_modal"],
  props: ["Theclass"],
  computed: {
    $style() {
      return boxstyle;
    },
  },
  beforeMount() {
    this.showdata();
    setTimeout(() => {
      this.delete();
    }, 1000);
  },
  data() {
    return {
      close_SubModel: false,
      subjectsnumber: 0,
      SubName: "",
      SubTeacher: "",
      SubMinor: "",
      SubMajor: "",
    };
  },
  methods: {
    async delete() {
      let str = this.Theclass;
      let newStr = str.replace(/ /g, "");
      let id = [];
      const querySnapshot = await getDocs(collection(db, newStr));
      querySnapshot.forEach((doc) => {
        id.push(doc.id);
      });

      id.forEach((e1, index1) => {
        document
          .querySelectorAll(".subjects .box button")
          .forEach((e2, index2) => {
            e2.addEventListener("click", async () => {
              if (index1 === index2) {
                await deleteDoc(doc(db, newStr, e1));
                e2.parentElement.remove();
                this.close_SubModel = false;
                document
                  .querySelectorAll(".subjects .number")
                  .forEach((e, index) => {
                    e.innerHTML = index + 1;
                  });
                this.subjectsnumber =
                  document.querySelectorAll(".subjects .box").length;
              }
            });
          });
      });
    },
    closeModal() {
      this.$emit("close_EditSubjects");
    },
    close_Sub() {
      this.close_SubModel = !this.close_SubModel;
    },
    async showdata() {
      let str = this.Theclass;
      let newStr = str.replace(/ /g, "");
      const querySnapshot = await getDocs(collection(db, newStr));
      querySnapshot.forEach((doc) => {
        this.close_SubModel = false;
        let boxes = document.querySelectorAll(".subjects .box");
        let box = `
        <div class="box">
        <div class="number">${boxes.length + 1}</div>
        <div class="title">${doc.data().SubName}</div>
        <div class="teacher">${doc.data().SubTeacher}</div>
        <table>
          <thead>
            <tr>
              <th>Minor Grade</th>
              <th>Major Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="MinorGrade">${doc.data().SubMinor}</td>
              <td class="MajorGrade">${doc.data().SubMajor}</td>
            </tr>
          </tbody>
        </table>
        <button>Delete</button>
      </div>
      `;
        this.SubName = "";
        this.SubTeacher = "";
        this.SubMinor = "";
        this.SubMajor = "";
        document.querySelector(".subjects").innerHTML += box;
        this.subjectsnumber =
          document.querySelectorAll(".subjects .box").length;
        this.delete();
        this.$style;
      });
    },
    async Done() {
      if (
        this.SubName !== "" &&
        this.SubTeacher !== "" &&
        this.SubMinor !== "" &&
        this.SubMajor !== ""
      ) {
        try {
          let str = this.Theclass;
          let newStr = str.replace(/ /g, "");
          const docRef = await addDoc(collection(db, newStr), {
            SubName: this.SubName,
            SubTeacher: this.SubTeacher,
            SubMinor: this.SubMinor,
            SubMajor: this.SubMajor,
          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }

        this.close_SubModel = false;
        let boxes = document.querySelectorAll(".subjects .box");
        let box = `
        <div class="box">
        <div class="number">${boxes.length + 1}</div>
        <div class="title">${this.SubName}</div>
        <div class="teacher">${this.SubTeacher}</div>
        <table>
          <thead>
            <tr>
              <th>Minor Grade</th>
              <th>Major Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="MinorGrade">${this.SubMinor}</td>
              <td class="MajorGrade">${this.SubMajor}</td>
            </tr>
          </tbody>
        </table>
        <button @click="DeleteSub">Delete</button>
      </div>
      `;
        this.SubName = "";
        this.SubTeacher = "";
        this.SubMinor = "";
        this.SubMajor = "";
        document.querySelector(".subjects").innerHTML += box;
        this.subjectsnumber =
          document.querySelectorAll(".subjects .box").length;
        this.$style;
        this.delete();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.EditSubjects {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  background: #fff;
  border-radius: 5px;
  z-index: 12;
  padding: 20px;
  overflow: scroll;
  height: 99vh;
  header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    h1 {
      margin: 0;
      font-size: 30px;
    }
    svg {
      font-size: 28px;
      color: var(--main-color);
      cursor: pointer;
    }
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #eee;
    padding: 10px 15px;
    border-radius: 5px;
    svg {
      cursor: pointer;
      font-size: 20px;
      transition: 0.3s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
  .subjects {
    display: flex;
    gap: 20px;
    margin-top: 10px;
    flex-wrap: wrap;
    // justify-content: space-between;
  }
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
.CreatSubject {
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  z-index: 13;
  background: #eee;
  padding: 20px;
  border: 1px solid var(--main-color);
  border-radius: 5px;
  box-shadow: 0 0 10px #ddd;

  .close {
    position: absolute;
    right: 27px;
    font-size: 25px;
    cursor: pointer;
    color: var(--main-color);
  }

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: var(--main-color);
    font-family: cursive;
  }

  .content {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;

    .input-group {
      width: 48% !important;
    }
  }

  button {
    margin-right: auto;
    float: right;
    border: none;
    background: var(--main-color);
    color: #fff;
    padding: 5px 15px;
    border-radius: 6px;
  }
}
</style>
