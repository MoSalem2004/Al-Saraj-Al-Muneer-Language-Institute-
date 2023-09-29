<template>
  <header>
    <div class="container_1 fit">
      <router-link to="/">
        <div class="logo">
          <img src="../assets/logo-1.jpg" alt="" />
          <strong>Al Saraj Al Muneer Language Institute </strong>
        </div>
      </router-link>
      <div class="box">
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'home']" />
          Home
        </router-link>
        <router-link :to="{ name: 'PhotoGalleryView' }">
          <font-awesome-icon :icon="['fas', 'images']" />
          Photo Gallery
        </router-link>
        <router-link :to="{ name: 'TheBlogs' }">
          <font-awesome-icon :icon="['fas', 'newspaper']" />
          latest news
        </router-link>
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'thumbs-up']" />
          Connect us
        </router-link>
      </div>
      <div class="box">
        <div class="sign">
          <router-link v-if="!user" :to="{ name: 'TheRegister' }">
            <div class="register">register</div>
          </router-link>
          <router-link v-if="!user" :to="{ name: 'TheLogin' }">
            <div class="login">Login</div>
          </router-link>
          <span v-if="user" class="user">
            <div @click="TheUser" class="TheUser">
              {{
                `${this.$store.state.userData?.First_Name[0]?.toUpperCase()} ${this.$store.state.userData?.Last_Name[0]?.toUpperCase()}`
              }}
            </div>
            <span class="userbox">
              <div class="TheUserBox" style="position: absolute">
                <div class="row_1">
                  <div class="logo">
                    {{
                      `${this.$store.state.userData?.First_Name[0]?.toUpperCase()} ${this.$store.state.userData?.Last_Name[0]?.toUpperCase()}`
                    }}
                  </div>
                  <div class="TheName">
                    <div class="name">
                      {{
                        `${this.$store.state.userData?.First_Name} 
                        ${this.$store.state.userData?.Last_Name}`
                      }}
                    </div>
                    <div class="Email">
                      {{ this.$store.state.userData?.Email }}
                    </div>
                  </div>
                </div>
                <div class="row_2">
                  <router-link to="/TheProfile">
                    <font-awesome-icon :icon="['fas', 'user']">
                    </font-awesome-icon>
                    <span>Profile</span>
                  </router-link>
                </div>
                <div class="row_3" v-if="Admin">
                  <router-link to="/TheAdmin">
                    <font-awesome-icon :icon="['fas', 'user-cog']" />
                    <span>Admin</span>
                  </router-link>
                </div>
                <div @click="signout" class="row_4">
                  <router-link :to="{ name: 'HomeView' }">
                    <font-awesome-icon :icon="['fas', 'sign-out-alt']" />
                    <span>Sign Out</span>
                  </router-link>
                </div>
              </div>
            </span>
          </span>
        </div>
        <div class="menu">
          <font-awesome-icon @click="ToggleOpen" :icon="['fas', 'bars']" />
          <div class="container_1">
            <div class="image">
              <img src="../assets/over_view-removebg-preview.png" alt="" />
            </div>
            <ul class="links">
              <li class="feat">
                <a href="#">
                  <font-awesome-icon :icon="['fas', 'question']" />
                  <div class="font">Al Saraj Al Muneer Language Institute</div>
                </a>
              </li>
              <li class="feat">
                <a href="#">
                  <font-awesome-icon :icon="['fas', 'newspaper']" />
                  <div class="font">latest news</div>
                </a>
              </li>
              <li class="feat">
                <a href="#">
                  <font-awesome-icon :icon="['fas', 'history']" />
                  <div class="font">School history</div>
                </a>
              </li>
              <li class="feat">
                <a href="#">
                  <font-awesome-icon :icon="['fas', 'envelope']" />
                  <div class="font">School message</div>
                </a>
              </li>
              <li class="feat">
                <a href="#">
                  <font-awesome-icon :icon="['fas', 'list-ol']" />
                  <div class="font">Institute numbers</div>
                </a>
              </li>
            </ul>
            <ul class="links">
              <li class="feat">
                <a href="#">
                  <font-awesome-icon :icon="['fas', 'chart-bar']" />
                  <div class="font">statistics</div>
                </a>
              </li>
              <li class="feat">
                <a href="#">
                  <font-awesome-icon :icon="['fas', 'images']" />
                  <div class="font">Photo Gallery</div>
                </a>
              </li>
              <li class="feat">
                <a href="/VacantJobsView">
                  <font-awesome-icon :icon="['fas', 'file-signature']" />
                  <div class="font">vacant jobs</div>
                </a>
              </li>
              <li class="feat">
                <a href="#">
                  <font-awesome-icon :icon="['fas', 'comments']" />
                  <div class="font">common questions</div>
                </a>
              </li>
              <li class="feat">
                <a href="#">
                  <font-awesome-icon :icon="['fas', 'thumbs-up']" />
                  <div class="font">Connect us</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script>
import { signOut, getAuth } from "firebase/auth";
// const auth = getAuth();
export default {
  name: "TheHeader",
  // ProfileMenu: true,
  computed: {
    user() {
      return this.$store.state.userData;
    },
    Admin() {
      return this.$store.state.userAdmin;
    },
  },
  methods: {
    signout() {
      console.log("signOut");
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push({ name: "HomeView" });
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    ToggleOpen() {
      let con = document.querySelector(
        "header > .container_1 .box .menu > .container_1[data-v-9a9f6144]"
      );
      con.classList.toggle("open");
      let popup = document.createElement("div");
      popup.className = "popup";
      document.querySelector("body").appendChild(popup);
      popup.onclick = function () {
        popup.remove();
        con.classList.remove("open");
      };
    },
    TheUser() {
      //       let theUser = `
      // <div class="TheUserBox" style="
      //     position: absolute;
      // "><div class="row_1">
      //         <div class="logo">MS</div>
      //         <div class="TheName">
      //           <div class="name">Mohamed Salem</div>
      //           <div class="Email">mas2022mas2004@gmail.com</div>
      //         </div>
      //       </div><div class="row_2">
      //         <font-awesome-icon :icon="['fas', 'user']">
      //         <span>Profile</span>
      //       </font-awesome-icon></div><div class="row_3">
      //         <font-awesome-icon :icon="['fas', 'admin']">
      //         <span>Admin</span>
      //       </font-awesome-icon></div><div class="row_4">
      //         <font-awesome-icon :icon="['fas', 'sign-out']">
      //         <span>Sign Out</span>
      //       </font-awesome-icon></div></div>
      //       `;
      //       let TheUserBox = document.createElement("div");
      //       TheUserBox.className = "TheUserBox";
      //       let row_1 = document.createElement("div");
      //       row_1.className = "row_1";
      //       row_1.innerHTML = `
      //         <div class="logo">MS</div>
      //         <div class="TheName">
      //           <div class="name">Mohamed Salem</div>
      //           <div class="Email">mas2022mas2004@gmail.com</div>
      //         </div>
      //       `;
      //       let row_2 = document.createElement("div");
      //       row_2.className = "row_2";
      //       row_2.innerHTML = `
      //         <font-awesome-icon :icon="['fas', 'user']" />
      //         <span>Profile</span>
      //       `;
      //       let row_3 = document.createElement("div");
      //       row_3.className = "row_3";
      //       row_3.innerHTML = `
      //         <font-awesome-icon :icon="['fas', 'admin']" />
      //         <span>Admin</span>
      //       `;
      //       let row_4 = document.createElement("div");
      //       row_4.className = "row_4";
      //       row_4.innerHTML = `
      //         <font-awesome-icon :icon="['fas', 'sign-out']" />
      //         <span>Sign Out</span>
      //       `;
      // TheUserBox.appendChild(row_1);
      // TheUserBox.appendChild(row_2);
      // TheUserBox.appendChild(row_3);
      // TheUserBox.appendChild(row_4);
      // document.querySelector(".sign .user").appendChild(TheUserBox);
      document
        .querySelector(".sign .user .userbox .TheUserBox")
        .classList.toggle("show");
      let popup = document.createElement("div");
      popup.className = "popup";
      popup.onclick = function () {
        popup.remove();
        document
          .querySelector(".sign .user .userbox .TheUserBox")
          .classList.remove("show");
      };
      document;
      document.body.appendChild(popup);
      document
        .querySelectorAll(
          "header > .container_1 .box .sign .user .TheUserBox > div a"
        )
        .forEach((e) => {
          e.onclick = function () {
            popup.remove();
            document
              .querySelector(".sign .user .userbox .TheUserBox")
              .classList.remove("show");
          };
        });
    },
  },
};
</script>
<style lang="scss" scoped>
header {
  background: var(--White-color);

  box-shadow: 0 0 10px #ddd;

  & > .container_1 {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      img {
        height: 70px;
        width: 70px;
        border-radius: 50%;
      }
      strong {
        color: var(--main-color);
      }
    }
    .box {
      display: flex;
      align-items: center;
      gap: 20px;
      & > a {
        color: var(--main-color);
      }
      .sign {
        display: flex;
        gap: 10px;
        & > a {
          background: var(--main-color);
          padding: 10px;
          border-radius: 6px;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          text-decoration: none;
        }

        .user {
          position: relative;
          .TheUser {
            width: 40px;
            height: 40px;
            background: var(--main-color);
            border-radius: 50%;
            color: var(--White-color);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
          .TheUserBox {
            min-width: 200px;
            z-index: 11;
            &::before {
              content: "";
              width: 10px;
              height: 10px;
              top: -28px;
              position: absolute;
              right: 9px;
              border-width: 15px;
              border-color: transparent transparent var(--main-color);
              border-style: solid;
            }
            &.show {
              display: block;
            }

            display: none;
            position: absolute;
            top: calc(100% + 25px);
            background: var(--main-color);
            padding: 10px;
            left: -200px;
            color: var(--White-color);
            & > div {
              display: flex;
              gap: 10px;
              padding: 10px 5px 10px;
              transition: 0.3s;
              & > a {
                color: var(--White-color) !important ;
                width: 100%;
                display: flex;
                gap: 10px;
              }

              & > span {
                font-size: 14px;
              }
            }
            & > div:not(:last-child) {
              border-bottom: 1px solid var(--White-color) !important;
            }
            & > div:not(:first-child) {
              cursor: pointer;
              &:hover {
                transform: translateX(5px);
              }
            }
            .row_1 {
              .logo {
                background: var(--White-color) !important;
                color: var(--main-color) !important;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 53px;
                height: 53px;
                border-radius: 50%;
                font-weight: bold;
              }
              .Email {
                font-size: 12px;
              }
            }
          }
        }
      }
      .offcanvas-backdrop.show {
        background: red;
      }
      .menu {
        & > svg {
          font-size: 37px;
          color: var(--main-color);
          cursor: pointer;
        }
        & > .container_1 {
          box-shadow: 0px 1px 7px 1px #ddd;
          position: absolute;
          background: var(--White-color);
          width: 100%;
          left: 0px;
          gap: 40px;
          border-bottom: 3px solid var(--main-color);
          display: flex;
          justify-content: space-between;
          z-index: -1;
          opacity: 0;
          top: 0;
          padding: 30px;
          flex-wrap: wrap;
          &.open {
            opacity: 1;
            z-index: 100;
            top: calc(100% + 1px);
          }
          .image {
            img {
              height: 200px;
              width: 251px;
            }
          }
          ul {
            flex: 1;
            li:not(:last-child) {
              border-bottom: 1px solid #e9e6e6;
            }
            li {
              position: relative;
              z-index: 1;
              min-width: 311px;
              &::before {
                content: "";
                position: absolute;
                left: 0;
                top: 0;
                width: 0;
                height: 100%;
                background-color: #fafafa;
                z-index: -1;
                transition: var(--main-transition);
              }
              &:hover::before {
                width: 100%;
              }
              a {
                color: var(--main-color);
                padding: 15px 10px;
                display: block;
                font-size: 18px;
                font-weight: bold;
                display: flex;
                align-items: center;
                gap: 10px;

                .font {
                  font-size: 15px;
                }
              }
            }
          }
          .image {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>
