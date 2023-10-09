<template>
  <div class="container fit classes">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="TheAdmin">The Administrator</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Classes</li>
      </ol>
    </nav>

    <h1>
      <span>School Grade</span>
    </h1>
    <div class="contain">
      <div class="box" v-for="Theclass in classes" :key="Theclass">
        <h3>{{ Theclass }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SchoolGrade",
  beforeMount() {
    setTimeout(() => {
      this.Grades();
    }, 1000);
  },
  data() {
    return {
      classes: [
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
      AllViews: [
        "SSG",
        "FSG",
        "TPreG",
        "SPreG",
        "FPreG",
        "SiPriG",
        "FiPriG",
        "FoPriG",
        "TPriG",
        "SePriG",
        "FirstPriG",
        "KG1G",
        "KG2G",
      ],
    };
  },
  methods: {
    Grades() {
      let boxes = document.querySelectorAll(".fit .contain .box");
      let AllViews = this.AllViews;
      boxes.forEach((e1, index1) => {
        AllViews.forEach((e2, index2) => {
          e1.addEventListener("click", () => {
            if (index1 === index2) {
              console.log("SSG");
              this.$router.push({ name: e2 });
              //   this.$router.push("/HomeView");
            }
          });
        });
      });
    },
  },
};
</script>
<style lang="scss">
.container.classes {
  margin: 70px auto 2px;
  nav {
    border-radius: 5px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    background: var(--White-color);
    filter: brightness(0.95);
    ol {
      margin: 0;
    }
  }
  .breadcrumb-item a {
    color: var(--main-color) !important;
    font-weight: bold;
  }
  .breadcrumb-item.active {
    color: var(--Black-color);
  }
  .breadcrumb-item + .breadcrumb-item::before {
    color: var(--Black-color);
  }
  h1 {
    color: var(--main-color);
    border-radius: 5px;
    background: var(--White-color);
    border-bottom: 1px solid var(--main-color);
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    filter: brightness(0.95);
    padding: 20px;
    margin: 10px auto 10px;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    svg {
      cursor: pointer;
    }
  }
  .contain {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .box {
      display: flex;
      border-radius: 5px;
      align-items: center;
      justify-content: space-between;
      background: var(--White-color);
      filter: brightness(0.95);
      padding: 10px 20px;
      color: #000000;
      transition: 0.3s;
      border: 1px solid transparent;
      cursor: pointer;
      &:hover {
        border: 1px solid var(--main-color);
        color: var(--main-color);
      }
      cursor: pointer;
      h3 {
        font-size: 20px;
        margin: 0;
      }
    }
    .feat {
      display: flex;
      gap: 10px;
      svg {
        background: #fff;
        transition: 0.3s;
        font-weight: 600;
        &:hover {
          transform: scale(1.1);
        }
        &:last-child {
          color: red;
        }
      }
    }
  }
}
</style>
