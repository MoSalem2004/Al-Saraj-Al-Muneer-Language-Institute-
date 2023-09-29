<template>
  <div class="Thepopup" @click="close"></div>
  <div class="fit TheProgress">
    <header>
      <h2>Ranking of the {{ this.Theclass }}</h2>
      <font-awesome-icon :icon="['fas', 'window-close']" @click="close" />
    </header>
    <nav>
      <ul>
        <li class="active">First month</li>
        <li>Second month</li>
        <li>Midterm exam</li>
        <li>Third month</li>
        <li>Fourth month</li>
        <li>Final exam</li>
      </ul>
    </nav>
    <div class="content active">
      <div
        class="box"
        v-for="(First_Name, index) in this.First_Name"
        :key="First_Name"
      >
        <div class="Ranking">1</div>
        <div class="name">{{ `${First_Name} ${this.Last_Name[index]} ` }}</div>
        <div class="result">{{ this.Result[index][0] }}</div>
      </div>
    </div>
    <div class="content">
      <div
        class="box"
        v-for="(First_Name, index) in this.First_Name"
        :key="First_Name"
      >
        <div class="Ranking">1</div>
        <div class="name">{{ `${First_Name} ${this.Last_Name[index]} ` }}</div>
        <div class="result">{{ this.Result[index][1] }}</div>
      </div>
    </div>
    <div class="content">
      <div
        class="box"
        v-for="(First_Name, index) in this.First_Name"
        :key="First_Name"
      >
        <div class="Ranking">1</div>
        <div class="name">{{ `${First_Name} ${this.Last_Name[index]} ` }}</div>
        <div class="result">{{ this.Result[index][2] }}</div>
      </div>
    </div>
    <div class="content">
      <div
        class="box"
        v-for="(First_Name, index) in this.First_Name"
        :key="First_Name"
      >
        <div class="Ranking">1</div>
        <div class="name">{{ `${First_Name} ${this.Last_Name[index]} ` }}</div>
        <div class="result">{{ this.Result[index][3] }}</div>
      </div>
    </div>
    <div class="content">
      <div
        class="box"
        v-for="(First_Name, index) in this.First_Name"
        :key="First_Name"
      >
        <div class="Ranking">1</div>
        <div class="name">{{ `${First_Name} ${this.Last_Name[index]} ` }}</div>
        <div class="result">{{ this.Result[index][4] }}</div>
      </div>
    </div>
    <div class="content">
      <div
        class="box"
        v-for="(First_Name, index) in this.First_Name"
        :key="First_Name"
      >
        <div class="Ranking">1</div>
        <div class="name">{{ `${First_Name} ${this.Last_Name[index]} ` }}</div>
        <div class="result">{{ this.Result[index][5] }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheProgress",
  props: ["Theclass", "First_Name", "Last_Name", "Result"],
  beforeMount() {
    setTimeout(() => {
      this.ChoseContent();
      setTimeout(() => {
        this.progress();
        this.IfValueSame();
      }, 1);
    }, 1);
  },
  methods: {
    IfValueSame() {
      const boxes = document.querySelectorAll(
        ".TheProgress .content.active .box"
      );
      // for (let i = 0; i < boxes.length - 1; i++) {
      //   if (
      //     document.querySelectorAll(".TheProgress .content.active .box")[i]
      //       .children[2].innerHTML ===
      //     document.querySelectorAll(".TheProgress .content.active .box")[i + 1]
      //       .children[2].innerHTML
      //   ) {
      //     document
      //       .querySelectorAll(".TheProgress .content.active .box")
      //       [i].classList.add("ValueSame");
      //   }
      // }
      for (let i = 0; i < boxes.length - 1; i++) {
        if (
          document.querySelectorAll(".TheProgress .content.active .box")[i]
            .children[2].innerHTML ===
          document.querySelectorAll(".TheProgress .content.active .box")[i + 1]
            .children[2].innerHTML
        ) {
          document
            .querySelectorAll(".TheProgress .content.active .box")
            [i].classList.add("ValueSame");
          document.querySelectorAll(".TheProgress .content.active .box")[
            i
          ].children[0].innerHTML = document.querySelectorAll(
            ".TheProgress .content.active .box"
          )[i].children[0].innerHTML;
        }
      }
    },

    progress() {
      const boxes = document.querySelectorAll(
        ".TheProgress .content.active .box:not(.ValueSame)"
      );
      const sortedBoxes = Array.from(boxes).sort((a, b) => {
        const resultA = parseInt(a.querySelector(".result").textContent);
        const resultB = parseInt(b.querySelector(".result").textContent);
        return resultB - resultA;
      });
      const container = document.querySelector(".TheProgress .content.active");
      sortedBoxes.forEach((box) => {
        container.appendChild(box);
      });
      setTimeout(() => {
        let Ranking = document.querySelectorAll(
          ".TheProgress .content.active .box:not(.ValueSame) .Ranking"
        );
        for (let i = 0; i < Ranking.length; i++) {
          Ranking[i].innerHTML = i + 1;
        }
      }, 1);
    },
    close() {
      this.$emit("close_modal_Progress");
    },
    ChoseContent() {
      let contents = document.querySelectorAll(".TheProgress .content");
      let buttons = document.querySelectorAll(".TheProgress nav ul li");
      contents.forEach((e1, index1) => {
        buttons.forEach((e2, index2) => {
          e2.addEventListener("click", () => {
            contents[index1].classList.remove("active");
            buttons[index1].classList.remove("active");
            if (index1 === index2) {
              e1.classList.add("active");
              e2.classList.add("active");
              setTimeout(() => {
                this.progress();
                this.IfValueSame();
              }, 1);
            }
          });
        });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.TheProgress {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 13;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  width: 90%;
  overflow: scroll;
  height: 98vh;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--main-color);
    h2 {
      font-family: cursive;
      margin: 0;
    }
    svg {
      font-size: 25px;
      cursor: pointer;
    }
  }
  nav {
    margin: 20px 0;
    ul {
      display: flex;
      justify-content: space-between;
      background: #eee;
      align-items: center;
      padding: 0 20px !important;
      li {
        padding: 10px;
        font-family: cursive;
        cursor: pointer;
        position: relative;
        transition: 0.3s;
        &::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 3px;
          background: var(--main-color);
          transition: 0.3s;
          transform: translateX(-50%);
        }
        &:hover::before {
          width: 100%;
        }
        &:hover {
          opacity: 0.7;
        }
        &.active {
          opacity: 0.7;
          &::before {
            width: 100%;
          }
        }
      }
    }
  }
  .content {
    display: none;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    &.content.active {
      display: flex;
    }
    .box {
      width: 100%;
      padding: 10px;
      border-radius: 6px;
      background: #eee;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: row !important;

      .Ranking {
        background: var(--main-color);
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-weight: bold;
        border-radius: 3px;
      }
      .name {
        font-weight: bold;
        font-family: monospace;
      }
      .result {
        width: 75px;
        height: 30px;
        background: #fafafa;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        font-weight: bold;
      }
    }
  }
}
</style>
