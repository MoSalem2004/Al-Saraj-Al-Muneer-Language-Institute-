<template>
  <div class="container fit VacantJobs">
    <div
      class="main_popup"
      v-show="ShowApplication"
      @click="ShowApplicationFunction"
    ></div>
    <div class="Application" v-show="ShowApplication">
      <header>
        <h3>Applying For A Job</h3>
        <font-awesome-icon
          :icon="['fas', 'window-close']"
          @click="ShowApplicationFunction"
        />
      </header>
      <div class="Container">
        <div class="input-group mb-3 long">
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="NameTriple"
              placeholder="The name is triple"
              v-model="NameTriple"
            />

            <label for="NameTriple"
              ><font-awesome-icon :icon="['fas', 'user-edit']" /> The name is
              triple</label
            >
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="form-floating">
            <input
              type="email"
              class="form-control"
              id="CVEmail"
              placeholder="Email"
              v-model="Email"
            />

            <label for="CVEmail"
              ><font-awesome-icon :icon="['fas', 'at']" /> Email</label
            >
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="form-floating">
            <input
              type="number"
              class="form-control"
              id="CVPhoneNumbe"
              placeholder="The name is triple"
              v-model="NameTriple"
            />

            <label for="CVPhoneNumbe"
              ><font-awesome-icon :icon="['fas', 'phone']" /> Phone
              Number</label
            >
          </div>
        </div>
        <div class="input-group mb-3 long">
          <div class="form-floating">
            <textarea
              type="text"
              class="form-control"
              id="CVDefinition"
              placeholder="The name is triple"
              v-model="NameTriple"
            >
            </textarea>

            <label for="CVDefinition"
              ><font-awesome-icon :icon="['fas', 'address-card']" /> introduce
              yourself</label
            >
          </div>
        </div>
      </div>
      <div class="src" style="min-height: 24px"></div>
      <div class="footer">
        <label for="CV">
          <input
            type="file"
            name="CV"
            id="CV"
            style="display: none"
            @change="CVSrc"
          />
          <span><font-awesome-icon :icon="['fas', 'upload']" /></span>
          Upload your CV
        </label>
        <div class="progress">
          <span></span> <strong>Upload is 0% done</strong>
        </div>
        <button @click="UploadCV">
          <span><font-awesome-icon :icon="['fas', 'paper-plane']" /></span>
          <span>Send</span>
        </button>
      </div>
    </div>
    <div class="content">
      <div class="Box" v-for="box in Boxes" :key="box">
        <header>
          <div>
            <div class="title">{{ box.JobName }}</div>
            <div class="gender">{{ box.Gender }}</div>
            <div class="time">
              {{
                new Date(box.Time.toMillis()).toLocaleString(["en-US"], {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }}
            </div>
          </div>
        </header>
        <div class="body">
          <span>Job requirements : </span>
          <span>{{ box.JobRequirements }}</span>
        </div>
        <div class="footer">
          <button class="Applying" @click="ShowApplicationFunction">
            Applying
          </button>
        </div>
      </div>
    </div>
    <a href="/VacantJobsView" style="display: none" class="show_More Jpbs"
      >Show More</a
    >
  </div>
</template>
<script>
import { initializeApp } from "firebase/app";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCqVUbKEz4AGu5IxceUA7I-ql1CLAOCL6s",
  authDomain: "alseraj-almoner-school.firebaseapp.com",
  projectId: "alseraj-almoner-school",
  storageBucket: "alseraj-almoner-school.appspot.com",
  messagingSenderId: "983919871798",
  appId: "1:983919871798:web:817c3a70a169ed333f9597",
};

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default {
  name: "VacantJobsComponent",
  mounted() {
    this.GetDataOfJob();
    setTimeout(() => {
      this.ButtonActive();
    }, 2000);
  },
  data() {
    return {
      ShowApplication: false,
      Boxes: [],
      Ids: [],
    };
  },
  methods: {
    CVSrc() {
      document.querySelector(".src").innerHTML =
        document.getElementById("CV").value;
    },
    ButtonActive() {
      let buttons = document.querySelectorAll(
        ".container.fit.VacantJobs .content .Box .Applying"
      );
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = () => {
          buttons.forEach((e) => {
            e.classList.remove("active");
          });
          buttons[i].classList.add("active");
        };
      }
    },
    async UploadCV() {
      let file = document.getElementById("CV").files[0];
      if (
        file instanceof Blob &&
        document.querySelectorAll(
          ".form-floating > .form-control, .form-floating > .form-control-plaintext"
        )[0].value !== "" &&
        document.querySelectorAll(
          ".form-floating > .form-control, .form-floating > .form-control-plaintext"
        )[1].value !== "" &&
        document.querySelectorAll(
          ".form-floating > .form-control, .form-floating > .form-control-plaintext"
        )[2].value !== "" &&
        document.querySelectorAll(
          ".form-floating > .form-control, .form-floating > .form-control-plaintext"
        )[3].value !== ""
      ) {
        console.log("clicked");
        let src = document.getElementById("NameTriple").value;
        const filePath = src;
        const fileName = filePath.split("\\").pop();
        const storage = getStorage(app);
        const storageRef = ref(storage, "pdf/" + fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            document.querySelector(
              ".progress strong"
            ).innerHTML = ` Upload is ${(
              (snapshot.bytesTransferred / snapshot.totalBytes) *
              100
            ).toFixed(2)}% done`;
            document.querySelector(
              ".Application .footer .progress span"
            ).style.width = `${
              (snapshot.bytesTransferred / snapshot.totalBytes).toFixed(2) * 100
            }%`;
            if (
              (snapshot.bytesTransferred / snapshot.totalBytes).toFixed(2) *
                100 ===
              100
            ) {
              setTimeout(() => {
                this.ShowApplicationFunction();
              }, 1000);
            }
          },
          (error) => {
            console.log("Error", error);
          }
        );
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef, fileName);

        await addDoc(collection(db, "Application"), {
          Name: document.getElementById("NameTriple").value,
          Email: document.getElementById("CVEmail").value,
          Phone: document.getElementById("CVPhoneNumbe").value,
          Definition: document.getElementById("CVDefinition").value,
          CV: downloadURL,
          JobId: document.querySelector(
            ".container.fit.VacantJobs .content .Box .Applying.active"
          )?.parentElement?.parentElement?.classList[1],
          Time: serverTimestamp(),
        });
      }
    },
    ShowApplicationFunction() {
      setTimeout(() => {
        document.getElementById("NameTriple").value = "";
        document.getElementById("CVEmail").value = "";
        document.getElementById("CVPhoneNumbe").value = "";
        document.getElementById("CVDefinition").value = "";
        document.getElementById("CV").value = "";
        this.CVSrc();
        document.querySelector(
          ".progress strong"
        ).innerHTML = ` Upload is 0% done`;
        document.querySelector(
          ".Application .footer .progress span"
        ).style.width = "0";
      }, 100);
      this.ShowApplication = !this.ShowApplication;
    },
    async GetDataOfJob() {
      this.Boxes = [];
      const querySnapshot = await getDocs(collection(db, "VacantJobs"));
      querySnapshot.forEach((doc) => {
        this.Boxes.push(doc.data());
        this.Ids.push(doc.id);
        setTimeout(() => {
          for (let i = 0; i < this.Boxes.length; i++) {
            document
              .querySelectorAll(".container.fit.VacantJobs .content .Box")
              [i]?.classList.add(`${this.Ids[i]}`);
          }
        }, 1000);
      });
      this.Boxes.sort((a, b) => b.Time.toMillis() - a.Time.toMillis());
    },
  },
};
</script>
<style lang="scss" scoped>
.Application {
  background: #fff;
  position: fixed;
  z-index: 14;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  word-wrap: break-word;
  header {
    display: flex;
    justify-content: space-between;
    color: var(--main-color);
    & > svg {
      // margin-left: auto;
      margin-left: auto;
      font-size: 25px;
      cursor: pointer;
    }
  }
  .Container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .input-group:not(.long) {
      width: 48%;
    }
  }
  textarea {
    resize: none;
    height: 245px;
  }
  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button:last-child {
      background: var(--main-color);
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    label {
      cursor: pointer;
      margin: 0;
      background: var(--main-color);
      color: #fff;
      border: none;
      padding: 5px 10px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .progress {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px;
      border-radius: 30px;
      color: #fff;
      font-weight: bold;
      position: relative;
      z-index: 1;
      span {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        background: var(--main-color);
        height: 100%;
        z-index: -1;
      }
    }
  }
}
</style>
