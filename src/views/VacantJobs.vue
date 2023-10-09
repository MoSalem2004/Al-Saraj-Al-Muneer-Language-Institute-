<template>
  <div class="container fit VacantJobs In">
    <div class="main_popup" v-show="ShowJop"></div>
    <div class="Make_Job" v-show="ShowJop">
      <font-awesome-icon :icon="['fas', 'window-close']" @click="ShowMakeJob" />
      <input type="text" placeholder="The job" />
      <div class="Gender">
        <div class="active">Genders</div>
        <div>Male</div>
        <div>Famale</div>
      </div>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        placeholder="Job requirements"
      ></textarea>
      <button @click="MakeJob">Done</button>
    </div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="TheAdmin">The Administrator</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="TheModifications">Modifications</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Vacant Jobs</li>
      </ol>
    </nav>
    <h1>
      <span> Vacant Jobs </span>
      <div>
        <!-- <button @click="Delete_All">Delete all submissions</button> -->
        <span
          ><font-awesome-icon :icon="['fas', 'plus']" @click="ShowMakeJob"
        /></span>
      </div>
    </h1>
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
          <button>Delete</button>
        </header>
        <div class="body">
          <span>Job requirements : </span>
          <span>{{ box.JobRequirements }}</span>
        </div>
        <div class="footer">
          <div class="feat" @click="ShowApplicants">
            <span>Job applicants ( <span>0</span> )</span>
            <font-awesome-icon :icon="['fas', 'chevron-circle-down']" />
          </div>
          <div class="JobApplicants" v-show="applicants">
            <div
              class="applicants"
              v-for="app in Application"
              :key="app"
              :class="app.JobId"
            >
              <!-- v-show="ShowRightData" -->
              <!-- v-show="app.JobId === box" -->
              <div class="Row">
                <div class="name">{{ app.Name }}</div>
                <div class="time">
                  {{
                    new Date(app.Time.toMillis()).toLocaleString(["en-US"], {
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
              <div class="Row">
                <span class="SpanPhone">{{ app.Phone }}</span>
                <span @click="copyText_1">copy</span>
              </div>
              <div class="Row">
                <span class="SpanEmail">{{ app.Email }}</span>
                <span @click="copyText_2">copy</span>
              </div>
              <div>
                <span class="Definition">Definition : </span>
                <span>{{ app.Definition }} </span>
              </div>
              <a :href="app.CV">View CV</a>
            </div>
          </div>
        </div>
      </div>
    </div>
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
  deleteDoc,
  doc,
} from "firebase/firestore";
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
  name: "VacantJobs",
  mounted() {
    this.SelectGender();
    this.GetDataOfJob();
    this.GetDataOfApplication();
    setTimeout(() => {
      this.Delete_Jobs();
      // setTimeout(() => {
      this.AddApplicationInJob();
      this.CounerApp();
    }, 2000);
    // }, 2000);
  },
  data() {
    return {
      ShowJop: false,
      selectedGender: "",
      applicants: false,
      Boxes: [],
      Ids: [],
      Application: [],
    };
  },
  methods: {
    // async Delete_All() {
    //   await deleteDoc(doc(db, "Application"));
    // },
    copyText_1(event) {
      event.target.style.background = "#34bf49";
      const textToCopy = document.querySelector(".SpanPhone").innerHTML;
      const input = document.createElement("input");
      input.value = textToCopy;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    },
    copyText_2(event) {
      event.target.style.background = "#34bf49";
      const textToCopy = document.querySelector(".SpanEmail").innerHTML;
      const input = document.createElement("input");
      input.value = textToCopy;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    },
    CounerApp() {
      let counter = document.querySelectorAll(
        ".container.fit.VacantJobs .content .Box .footer .feat span span"
      );
      for (let i = 0; i < counter.length; i++) {
        counter[i].innerHTML = document.querySelectorAll(
          ".container.fit.VacantJobs .content .Box .footer .JobApplicants"
        )[i].childElementCount;
      }
    },
    AddApplicationInJob() {
      let app = document.querySelectorAll(
        ".container.fit.VacantJobs .content .Box .footer .JobApplicants .applicants"
      );
      for (let i = 0; i < app.length; i++) {
        if (
          app[i]?.classList[1] !==
          app[i]?.parentElement?.parentElement?.parentElement?.classList[1]
        ) {
          app[i].remove();
        }
      }
    },
    Delete_Jobs() {
      let Delete_Button = document.querySelectorAll(
        ".container.fit.VacantJobs .content .Box header button"
      );
      for (let i = 0; i < Delete_Button.length; i++) {
        Delete_Button[i].onclick = async () => {
          Delete_Button[i].parentElement.parentElement.remove();
          await deleteDoc(
            doc(
              db,
              "VacantJobs",
              Delete_Button[i].parentElement.parentElement.classList[1]
            )
          );
        };
      }
    },
    async GetDataOfApplication() {
      this.Application = [];
      const querySnapshot = await getDocs(collection(db, "Application"));
      querySnapshot.forEach((doc) => {
        this.Application.push(doc.data());
      });
      this.Application.sort((a, b) => b.Time.toMillis() - a.Time.toMillis());
    },
    async GetDataOfJob() {
      this.Boxes = [];
      const querySnapshot = await getDocs(collection(db, "VacantJobs"));
      querySnapshot.forEach((doc) => {
        this.Boxes.push(doc.data());
        this.Ids.push(doc.id);
        setTimeout(() => {
          // this.Boxes.sort();
          for (let i = 0; i < this.Boxes.length; i++) {
            document
              .querySelectorAll(".container.fit.VacantJobs .content .Box")
              [i]?.classList.add(`${this.Ids[i]}`);
          }
        }, 1000);
      });
      setTimeout(() => {
        this.Boxes.sort((a, b) => b.Time.toMillis() - a.Time.toMillis());
      }, 1100);
    },
    ShowApplicants() {
      this.applicants = !this.applicants;
    },
    SelectGender() {
      let div = document.querySelectorAll(".Gender div");
      for (let i = 0; i < div.length; i++) {
        div[i].onclick = () => {
          div.forEach((e) => {
            e.classList.remove("active");
          });
          div[i].classList.add("active");
        };
      }
    },

    ShowMakeJob() {
      this.ShowJop = !this.ShowJop;
    },
    async MakeJob() {
      if (
        document.querySelector(".container.fit.VacantJobs .Make_Job textarea")
          .value !== "" &&
        document.querySelector(".container.fit.VacantJobs .Make_Job input")
          .value !== ""
      ) {
        await addDoc(collection(db, "VacantJobs"), {
          JobName: document.querySelector(".Make_Job input").value,
          JobRequirements: document.querySelector(".Make_Job textarea").value,
          Gender: document.querySelector(".Gender div.active").innerHTML,
          Time: serverTimestamp(),
        });
        this.ShowJop = !this.ShowJop;
        this.GetDataOfJob();
        document.querySelector(".Make_Job input").value = "";
        document.querySelector(".Make_Job textarea").value = "";
        setTimeout(() => {
          this.AddApplicationInJob();
        }, 100);
      }
    },
  },
};
</script>
<style lang="scss">
.container.fit.VacantJobs {
  h1 {
    div {
      button {
        font-size: 16px;
        padding: 5px 10px;
        border: none;
        background: var(--main-color);
        color: #fff;
        border-radius: 5px;
      }
    }
    svg {
      cursor: pointer;
    }
  }
  .Make_Job {
    position: fixed;
    z-index: 14;
    display: flex;
    flex-direction: column;
    gap: 5px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    svg {
      margin-left: auto;
      color: var(--main-color);
      font-size: 25px;
      cursor: pointer;
    }
    textarea,
    input {
      resize: none;
      padding: 10px;
      border: none;
      // border-bottom: 1px solid #ddd !important;
      &:focus {
        outline: none;
      }
    }
    textarea {
      border: none !important;
    }
    .Gender {
      display: flex;
      justify-content: space-between;
      text-align: center;
      gap: 10px;
      div {
        border: 1px solid #ddd;
        padding: 10px;
        cursor: pointer;
        width: 32%;
        &.active {
          border-color: var(--main-color);
          color: var(--main-color);
        }
      }
    }
    button {
      background: var(--main-color);
      border: none;
      color: #fff;
      padding: 5px;
      border-radius: 5px;
    }
  }
  .content {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    .Box {
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: var(--White-color);
      padding: 15px;
      border-radius: 5px;
      border: 1px solid #ddd;
      width: 100%;
      header {
        display: flex;
        justify-content: space-between;
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        .title {
          font-size: 20px;
          font-weight: bold;
        }
        .gender {
          color: #737373;
          font-size: 14px;
        }
        button {
          height: fit-content;
          background: red;
          border: none;
          color: #fff;
          border-radius: 5px;
        }
      }
      .body {
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd;
        span {
          word-wrap: break-word;
        }
        span:first-child {
          color: var(--main-color);
          font-weight: bold;
        }
      }
      .footer {
        .feat {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: var(--White-color);

          filter: brightness(0.95);
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
          svg {
            color: var(--main-color);
          }
        }
        .JobApplicants {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 10px;
          .applicants {
            border: 1px solid #ddd;
            padding: 10px;
            display: flex;
            flex-direction: column;
            gap: 10px;
            border-radius: 5px;
            .Row {
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid #ddd;
              padding-bottom: 10px;
              align-items: center;
              span:first-child {
                color: #737373;
                font-size: 14px;
              }
              span:last-child {
                background: var(--main-color);
                padding: 2px 10px;
                color: #fff;
                border-radius: 5px;
                cursor: pointer;
              }
              .name {
                font-size: 20px;
                font-weight: bold;
                color: var(--main-color);
              }
            }
            .Definition {
              color: var(--main-color);
              font-weight: bold;
            }
            span {
              word-wrap: break-word;
            }
            a {
              background: var(--main-color);
              border: none;
              padding: 10px;
              color: #fff;
              font-weight: bold;
              border-radius: 5px;
              cursor: pointer;
              text-align: center;
            }
          }
        }
      }
      .Applying {
        background: var(--main-color);
        color: #fff;
        border: none;
        padding: 5px 10px;
        border-radius: 5px;
      }
    }
  }
}
.Hide {
  display: none !important;
}
</style>
