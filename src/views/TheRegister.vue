<template v-if="!this.$store.state.user">
  <div v-show="errorEmailMsg_stat" class="Error_Email_Msg">
    <div>{{ this.errorEmailMsg }}</div>
    <button @click="errorEmailMsg_stat = false">Done</button>
  </div>
  <div class="container_1 fit">
    <section>
      <div class="img">
        <img src="../assets/register.png" alt="" />
      </div>
      <form action="POST">
        <h2>create your <strong>account now :</strong></h2>
        <p>
          Enter your data correctly to get the best experience within the site
        </p>
        <div class="small_container">
          <div class="input-group mb-3">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="First_Name"
                placeholder="First Name"
                v-model="user.First_Name"
              />

              <label for="First_Name"
                ><font-awesome-icon :icon="['fas', 'user-edit']" /> First
                Name</label
              >
            </div>
          </div>
          <div>
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="Last_Name"
                  placeholder="Last Name"
                  v-model="user.Last_Name"
                />

                <label for="Last_Name"
                  ><font-awesome-icon :icon="['fas', 'user-edit']" /> Last
                  Name</label
                >
              </div>
            </div>
          </div>
          <div>
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="Phone_Number"
                  placeholder="Phone Number"
                  v-model="user.Phone_Number"
                />

                <label for="Phone_Number"
                  ><font-awesome-icon :icon="['fas', 'phone']" /> Phone
                  Number</label
                >
              </div>
            </div>
          </div>
          <div>
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="Parents_Phone_Number"
                  placeholder="Parent's Phone Number"
                  v-model="user.Parents_Phone_Number"
                />

                <label for="Parents_Phone_Number"
                  ><font-awesome-icon :icon="['fas', 'phone']" /> Parent&apos;s
                  phone number</label
                >
              </div>
            </div>
          </div>
          <div class="form-floating long">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              @change="handleSelectChange($event)"
            >
              <option
                v-for="(option, index) in options"
                :key="index"
                :value="option"
                @click="classActiveOption"
              >
                {{ option }}
              </option>
            </select>
            <label for="floatingSelect">Choose your class</label>
          </div>
          <div>
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="email"
                  class="form-control"
                  id="Email"
                  placeholder="Email"
                  v-model="user.Email"
                />

                <label for="Email"
                  ><font-awesome-icon :icon="['fas', 'at']" /> Email</label
                >
              </div>
            </div>
          </div>
          <div>
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="number"
                  class="form-control"
                  id="ID"
                  placeholder="ID"
                  v-model="user.ID"
                />

                <label for="ID"
                  ><font-awesome-icon :icon="['fas', 'id-card']" /> ID
                  number</label
                >
              </div>
            </div>
          </div>
          <div>
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="Password"
                  placeholder="Password"
                  v-model="user.Password"
                />

                <label for="Password"
                  ><font-awesome-icon :icon="['fas', 'lock']" /> Password</label
                >
              </div>
            </div>
          </div>
          <div>
            <div class="input-group mb-3">
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="Password_2"
                  placeholder="Password_2"
                  v-model="user.Password_2"
                />

                <label for="Password_2"
                  ><font-awesome-icon :icon="['fas', 'lock']" /> password
                  confirmation</label
                >
              </div>
            </div>
          </div>
        </div>
        <div class="error" v-show="error">{{ this.errorMsg }}</div>
        <div class="Register_Login">
          <div class="social_media">
            <p>Or sign up with</p>
            <div class="icons_social">
              <font-awesome-icon :icon="['fab', 'facebook']" />
              <font-awesome-icon :icon="['fab', 'google']" />
            </div>
          </div>
          <div>
            <button @click.prevent="register" class="btn btn-primary">
              <!-- <router-link :to="{ name: 'HomeView' }"> -->
              Register
              <!-- </router-link> -->
            </button>
          </div>
        </div>
        <div class="TheLogin">
          Already have an account?
          <router-link to="/TheLogin">Log in to your account now!</router-link>
        </div>
      </form>
    </section>
  </div>
  <div id="user"></div>
</template>
<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
  name: "TheRegister",
  selectedValue: "",
  methods: {
    handleSelectChange(event) {
      this.selectedValue = event.target.value;
    },
    async register() {
      if (
        this.user.First_Name !== "" &&
        this.user.Last_Name !== "" &&
        // this.user.Phone_Number !== "" &&
        // this.user.Parents_Phone_Number !== "" &&
        this.selectedValue !== "" &&
        // this.user.ID !== "" &&
        // this.user.Password_2 !== "" &&
        this.user.Email !== "" &&
        this.user.Password !== ""
      ) {
        const auth = getAuth();
        createUserWithEmailAndPassword(
          auth,
          this.user.Email,
          this.user.Password
        )
          .then(async (userCredential) => {
            const Theuser = userCredential.user;
            console.log(Theuser.uid);
            try {
              const userRef = doc(db, "users", Theuser.uid);
              await setDoc(userRef, {
                First_Name: this.user.First_Name,
                Last_Name: this.user.Last_Name,
                Phone_Number: this.user.Phone_Number,
                Parents_Phone_Number: this.user.Parents_Phone_Number,
                ID: this.user.ID,
                Email: this.user.Email,
                class: this.selectedValue,
                MonthlyStudentResults: [],
                MonthlyStudentEvaluations: [],
                Result: [],
                Rankingmonth1: "",
                Rankingmonth2: "",
                Rankingmonth3: "",
                Rankingmonth4: "",
                RankingMidtermExam: "",
                RankingFinalExam: "",
                YearlyStudentResults: [],
              });
              this.errorEmailMsg_stat = false;
            } catch (e) {
              console.error("Error adding document: ", e);
            }
            this.$router.push({ name: "HomeView" });
            window.location.reload();
          })
          .catch(() => {
            this.errorEmailMsg = "The Email already in use";
            this.errorEmailMsg_stat = true;
            // ..
          });
        this.error = false;
        this.errorMsg = "";
        return;
      } else {
        this.error = true;
        this.errorMsg = "Please Fill out all the fields";
      }
      return;
    },
  },
  data() {
    return {
      user: {
        First_Name: "",
        Last_Name: "",
        Phone_Number: "",
        Parents_Phone_Number: "",
        SelectClass: "",
        Email: "",
        ID: "",
        Password: "",
      },
      error: null,
      errorMsg: "",
      errorEmailMsg: "",
      errorEmailMsg_stat: null,
      options: [
        "",
        "The Second Secondary Grade",
        "The First Secondary Grade",
        "The Third Preparatory grade",
        "The Second Preparatory grade",
        "The First Preparatory grade",
        "The Sixth Primary grade",
        "The Fifth Primary grade",
        "The Fourth Primary grade",
        "The Third Primary grade",
        "The Second Primary grade",
        "The First Primary grade",
        "KG 2",
        "KG 1",
      ],
    };
  },
};
</script>

<style lang="scss">
input {
  &.form-control {
    border-bottom: 1px solid #333 !important;
    border-radius: 0;
  }
}
.container_1 {
  section {
    display: flex;
    .imges {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      img {
        width: 100%;
        z-index: -1;
      }
    }
    .img {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 50%;
      img {
        width: 100%;
        z-index: -1;
      }
    }
    form {
      font-family: Century Gothic;
      width: 50%;
      h2 {
        margin: 10px auto;
        color: var(--Black-color);

        strong {
          color: var(--main-color);
        }
      }
      p {
        color: var(--Black-color);
      }
      .small_container {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: space-between;
        & > div {
          position: relative;
          width: 48%;
          &.long {
            width: 100%;
          }
          label {
            svg {
              color: var(--main-color);
            }
          }
          input {
            &.form-control {
              border-bottom: 1px solid #333 !important;
              border-radius: 0;
            }
          }
        }
      }
      .Register_Login {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px auto;
        button {
          min-width: 150px;
          background: var(--main-color);
          border: none;
          min-height: 37px;
          font-weight: 700;
        }
        .social_media {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          p {
            margin: 0;
            color: var(--Black-color);
          }
          .icons_social {
            display: flex;
            gap: 10px;
            align-items: center;
            svg {
              cursor: pointer;
              border-radius: 4px;
              padding: 5px;
              width: 30px;
              height: 30px;
              color: #fff;
              &:first-child {
                background-color: #3b5998;
              }
              &:last-child {
                background-color: rgb(234, 67, 53);
              }
            }
          }
        }
      }
      .TheLogin {
        font-size: 14px;
        margin: 15px auto 0;
      }
    }
  }
}
.Error_Email_Msg {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 12;
  background: var(--main-color);
  min-width: 300px;
  transform: translate(-50%, -50%);
  min-height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  color: #fff;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  font-size: 20px;
  div {
    font-weight: bold;
  }
  button {
    border: none;
    border-radius: 6px;
    background: #fff;
    font-size: 18px;
    cursor: pointer;
    padding: 6px 12px;
  }
}
</style>
