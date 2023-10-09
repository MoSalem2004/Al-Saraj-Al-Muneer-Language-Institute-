<template>
  <div class="settings" @click="toggelsettings">
    <font-awesome-icon :icon="['fas', 'cog']" />
  </div>

  <div class="offcanvas offcanvas-start">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasScrollingLabel">Settings</h5>
      <button type="button" class="btn remove" @click="remove">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
    </div>
    <div class="offcanvas-body">
      <div class="box">
        <h4>Choose your favorite color</h4>
        <ul class="colors">
          <li class="active" data-color="#0088ff"></li>
          <li data-color="#34bf49"></li>
          <li data-color="#bc1d53"></li>
          <li data-color="#f48924"></li>
          <li data-color="#4d4f53"></li>
        </ul>
      </div>
      <div class="box Theme">
        <h4>Theme</h4>
        <label id="label">
          <input
            @click="toggle_Theme"
            title="toggle_Theme"
            class="toggle-checkbox Them"
            type="checkbox"
          />
          <div class="icons">
            <font-awesome-icon :icon="['fas', 'sun']" />
            <font-awesome-icon :icon="['fas', 'moon']" />
          </div>
        </label>
      </div>
      <div class="box lang">
        <h4>Choose the language</h4>
        <label id="label">
          <input
            @click="Toggel_Lang"
            title="lang"
            class="toggle-checkbox lang"
            type="checkbox"
          />
          <div class="icons">
            <span>E</span>
            <span>ع</span>
          </div>
        </label>
      </div>
      <div class="box delete_all">Delete changes</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheSettings",
  methods: {
    hello() {
      console.log("hello");
    },
    remove() {
      if (document.querySelector(".popup")) {
        document.querySelector(".popup").remove();
      }
      document
        .querySelector(".offcanvas.offcanvas-start")
        .classList.remove("show");
    },
    toggelsettings() {
      document
        .querySelector(".offcanvas.offcanvas-start")
        .classList.add("show");
      let popup = document.createElement("div");
      popup.className = "popup";
      popup.onclick = function () {
        popup.remove();
        document
          .querySelector(".offcanvas.offcanvas-start")
          .classList.remove("show");
      };
      document.querySelector("body").appendChild(popup);
      // let root = document.querySelector(":root");
      document.querySelectorAll(".box .colors li").forEach((e) => {
        document.querySelector(".box.Theme input").onclick = function () {
          document.querySelector(".icons").classList.toggle("checked");
          if (document.querySelector(".icons.checked")) {
            // root.style.cssText = `--White-color: #22272b; --Black-color: white;--main-color : ${e.dataset.color};`;
            document.querySelector(".icons svg:first-child").style.cssText =
              "z-index: -1; left: 44px;";
            document.querySelector(".icons svg:last-child").style.cssText =
              "z-index: 2; left: 44px;";
            document.documentElement.style.setProperty(
              `--White-color`,
              ` #22272b`
            );
            document.documentElement.style.setProperty(
              `--Black-color`,
              `  white`
            );
          } else {
            document.querySelector(".icons svg:first-child").style.cssText =
              "z-index: 2; left: 8px;";
            document.querySelector(".icons svg:last-child").style.cssText =
              "z-index: -1; left: 8px;";
            // root.style.cssText = `--White-color: white; --Black-color: #22272b;--main-color : ${e.dataset.color};`;
            document.documentElement.style.setProperty(
              `--White-color`,
              `  white`
            );
            document.documentElement.style.setProperty(
              `--Black-color`,
              ` #22272b `
            );
          }
        };
        e.onclick = function ColorsFunction() {
          document.querySelectorAll(".box li").forEach((ele) => {
            ele.classList.remove("active");
          });
          e.classList.add("active");
          // root.style.cssText = `--main-color : ${e.dataset.color};}`;
          document.documentElement.style.setProperty(
            `--main-color`,
            ` ${e.dataset.color}`
          );
        };
      });
    },
    toggle_Theme() {
      document.querySelector("input.Them").classList.toggle("checked");
      if (document.querySelector("input.Them.checked")) {
        document.querySelector(".icons svg:first-child").style.cssText =
          "z-index: -1; left: 44px;";
        document.querySelector(".icons svg:last-child").style.cssText =
          "z-index: 2; left: 44px;";
      } else {
        document.querySelector(".icons svg:first-child").style.cssText =
          "z-index: 2; left: 8px;";
        document.querySelector(".icons svg:last-child").style.cssText =
          "z-index: -1; left: 8px;";
      }
    },
    Toggel_Lang() {
      document.querySelector("input.lang").classList.toggle("checked");
      if (document.querySelector("input.lang.checked")) {
        document.querySelector(".icons span:first-child").style.cssText =
          "z-index: -1; left: 44px;";
        document.querySelector(".icons span:last-child").style.cssText =
          "z-index: 2; left: 44px;";
      } else {
        document.querySelector(".icons span:first-child").style.cssText =
          "z-index: 2; left: 8px;";
        document.querySelector(".icons span:last-child").style.cssText =
          "z-index: -1; left: 8px;";
      }
    },
  },
};
</script>
<style lang="scss">
.offcanvas-title {
  color: var(--Black-color);
  font-size: 26px;
}
.offcanvas.offcanvas-start.show {
  background: var(--White-color);
}
.btn.remove {
  font-size: 25px;
  color: var(--Black-color);
  font-weight: bold;
}

div.settings {
  z-index: 10;
  color: var(--main-color);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: fixed;
  top: 110px;
  left: 0px;
  background: var(--White-color);
  font-size: 20px;
  filter: brightness(0.9);
  border-radius: 5px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 11;
}
.offcanvas.offcanvas-start {
  transition: 0.3s;
}
.lang {
  display: flex;
  gap: 10px;
  align-items: center;
}
.offcanvas-body {
  display: flex;
  gap: 10px;
  flex-direction: column;
  .box {
    background: #d6d6d6e3;
    padding: 20px;
    border-radius: 6px;
    color: #fff;
    &.Theme {
      display: flex;
      justify-content: space-between;
    }
  }
  ul.colors {
    display: flex;
    gap: 10px;
    justify-content: space-evenly;
    margin: 20px auto 10px !important;
    li {
      background: red;
      width: 35px;
      height: 35px;
      border-radius: 4px;
      cursor: pointer;
      border-width: 2px;
      border-color: #fff;
      opacity: 0.5;
      &.active {
        opacity: 1;
        border-style: double;
      }
    }
    li:nth-child(1) {
      background: #0088ff;
    }
    li:nth-child(2) {
      background: #34bf49;
    }
    li:nth-child(3) {
      background: #bc1d53;
    }
    li:nth-child(4) {
      background: #f48924;
    }
    li:nth-child(5) {
      background: #4d4f53;
    }
  }
}
.icons {
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
    font-size: 30px;
    color: var(--main-color);
    font-family: var(--fa-style-family-classic);
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
  span {
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--main-color);
    font-family: var(--fa-style-family-classic);
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
.delete_all {
  text-align: center;
  background: red !important;
  cursor: pointer;
  border-radius: 6px !important;
  font-weight: bold;
  font-size: 18px;
}
</style>
