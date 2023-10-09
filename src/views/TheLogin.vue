<template v-if="!this.$store.state.user">
  <div class="container_1 login fit">
    <section>
      <div class="img">
        <img src="../assets/login-1-dark-removebg-preview.png" alt="" />
      </div>
      <form action="post">
        <h2>Login</h2>
        <p>
          Subscribe to the confirmed subscription with the phone number and
          password registered with it before
        </p>
        <div class="small_container">
          <div class="input-group mb-3">
            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="Email"
                placeholder="Email"
                v-model="user.EmailAndNumber"
              />

              <label id="toggel" for="Email">
                <font-awesome-icon :icon="['fas', 'at']" />
                <font-awesome-icon class="delete" :icon="['fas', 'phone']" />

                <span> Email</span>
              </label>
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
                  v-model="ID"
                />

                <label for="ID"
                  ><font-awesome-icon :icon="['fas', 'id-card']" /> ID
                  number</label
                >
              </div>
            </div>
          </div>
          <div class="input-group mb-3 long">
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
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
        <div class="Other_way">
          <router-link :to="{ name: 'ForgotPassword' }"
            ><div class="forget_password">
              Forgot Your Password ?
            </div></router-link
          >
          <div class="social">
            <label id="label">
              <input
                @click="toggel"
                title="toggle"
                class="toggle-checkbox"
                type="checkbox"
              />
              <div class="toggle-switch">
                <font-awesome-icon :icon="['fas', 'at']" />
                <font-awesome-icon :icon="['fas', 'phone']" />
              </div>
            </label>
            <span>Or register by number</span>
          </div>
        </div>
        <div class="Register_Login">
          <div class="social_media">
            <p>Or Login with</p>
            <div class="icons_social">
              <font-awesome-icon :icon="['fab', 'facebook']" />
              <font-awesome-icon :icon="['fab', 'google']" />
            </div>
          </div>
          <div>
            <button @click.prevent="Login" class="btn btn-primary">
              Login
            </button>
          </div>
        </div>
        <div class="TheLogin">
          Don't have an account?

          <router-link to="/TheRegister">Create your account now!</router-link>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default {
  name: "TheLogin",
  data() {
    return {
      at: "at",
      error: null,
      errorMsg: "",
      user: {
        Phone_Number: "",
        EmailAndNumber: "",
        ID: "",
        Password: "",
      },
    };
  },
  methods: {
    async Login() {
      const auth = getAuth();
      signInWithEmailAndPassword(
        auth,
        this.user.EmailAndNumber,
        this.user.Password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user.uid);
          // ...
          this.error = false;
          this.errorMsg = "";
          this.$router.push({ name: "HomeView" });
          window.location.reload();
        })
        .catch((error) => {
          this.error = true;
          this.errorMsg = error.code;
        });
    },
    toggel() {
      document.querySelector(".toggle-switch ").classList.toggle("checked");
      if (document.querySelector(".toggle-switch.checked")) {
        document.querySelector(
          ".toggle-switch svg:first-child "
        ).style.cssText = "z-index: -1;left: 44px; ";
        document.querySelector(".toggle-switch svg:last-child ").style.cssText =
          "z-index: 2; left: 44px;";
        document.querySelector(".form-floating input").type = "number";
        document.querySelector(".form-floating input").value = "";
        document
          .querySelector(".form-floating label svg:first-child")
          .classList.add("delete");
        document.querySelectorAll("#toggel svg")[1].classList.remove("delete");
        document.querySelector(".form-floating label span").innerHTML =
          " number";
      } else {
        document.querySelector(
          ".toggle-switch svg:first-child "
        ).style.cssText = "z-index: 2; left: 8px;";
        document.querySelector(".form-floating input").type = "email";
        document.querySelector(".form-floating input").value = "";
        document.querySelector(".toggle-switch svg:last-child ").style.cssText =
          "z-index: -1; left: 8px; ";
        document
          .querySelector(".form-floating label svg:first-child")
          .classList.remove("delete");
        document.querySelectorAll("#toggel svg")[1].classList.add("delete");
        document.querySelector(".form-floating label span").innerHTML =
          " Email";
      }
    },
  },
};
</script>

<style lang="scss">
.Other_way {
  position: relative;
  gap: 10px;
  align-items: flex-start;
  margin: 15px auto;
  display: flex;
  flex-direction: column-reverse;

  .forget_password {
    color: var(--Black-color);
    margin: 10px auto;
    text-align: center;
    cursor: pointer;
    color: var(--main-color);
  }
  .social {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
  }
}
.input-group {
  label {
    &#toggel {
      svg {
        &.delete {
          display: none;
        }
      }
    }
  }
}
#label {
  //   position: absolute;
  top: 20px;
  .toggle-checkbox {
    -webkit-appearance: none;
    appearance: none;
    display: none;
  }
  .toggle-switch {
    background-color: #e2e8f0;
    width: 83px;
    height: 40px;
    border-radius: 33px;
    position: relative;
    transition: 0.3s;
    cursor: pointer;
    &.checked {
      background-color: var(--main-color);
    }
    cursor: pointer;
    svg {
      color: var(--main-color);
      font-family: var(--fa-style-family-classic);
      //   font-weight: 900;
      width: 24px;
      height: 24px;
      position: absolute;
      border-radius: 50%;
      top: 5px;
      left: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 30px;
      height: 30px;
      background: #fff;
      padding: 8px;
      transition: 0.3s;
      z-index: 1;
      &:first-child {
        z-index: 2;
      }
      &:last-child {
        z-index: -1;
      }
    }
  }
}
.TheLogin {
  color: var(--Black-color);
  margin-top: 20px !important;
}
.social_media {
  .icons_social {
  }
}
</style>
