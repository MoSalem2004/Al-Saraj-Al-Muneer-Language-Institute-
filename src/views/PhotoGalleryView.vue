<template>
  <div class="container fit">
    <h2>Photo Gallery</h2>
    <nav>
      <button class="active">All</button>
      <button v-for="section in sections" :key="section">{{ section }}</button>
    </nav>
    <div class="content">
      <div
        class="feat"
        v-for="(image, index) in images"
        :key="image"
        :class="removeSpaces(image?.section)"
      >
        <img :src="image?.img" alt="" @click="showModal(index)" />
      </div>
    </div>
    <div class="Modal" v-if="showModalFlag">
      <font-awesome-icon
        :icon="['fas', 'chevron-left']"
        @click="previousImage"
        v-show="this.currentIndex"
        style="
          position: absolute;
          left: 30px;
          font-size: 30px;
          color: var(--main-color);
          cursor: pointer;
        "
      />
      <img :src="images[currentIndex].img" alt="" />
      <font-awesome-icon
        :icon="['fas', 'chevron-right']"
        @click="nextImage"
        v-show="this.currentIndex < this.images.length - 1"
        style="
          position: absolute;
          right: 30px;
          font-size: 30px;
          color: var(--main-color);
          cursor: pointer;
        "
      />
      <font-awesome-icon
        :icon="['fas', 'times']"
        @click="closeModal"
        style="
          position: absolute;
          top: 20px;
          right: 30px;
          font-size: 30px;
          color: var(--main-color);
          cursor: pointer;
        "
      />
    </div>
  </div>
</template>
<script>
import { getFirestore, collection, getDocs } from "firebase/firestore";
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
  name: "PhotoGalleryView",
  data() {
    return {
      images: [],
      sections: [],
      showModalFlag: false,
      currentIndex: 0,
    };
  },
  mounted() {
    this.Get_Data_Img();
    this.Get_Data_Section();
    setTimeout(() => {
      this.Chose_Section();
    }, 1000);
  },
  methods: {
    Chose_Section() {
      let images = document.querySelectorAll(".content .feat");
      let buttons = document.querySelectorAll("nav button");
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = async () => {
          buttons.forEach((e) => {
            e.classList.remove("active");
          });
          buttons[i].classList.add("active");
          for (let ii = 0; ii < this.images.length; ii++) {
            if (buttons[i].innerHTML.replace(/\s/g, "") === "All") {
              document.querySelectorAll(`.content .feat `).forEach((e) => {
                e.classList.remove("Hide");
              });
            }
            if (
              buttons[i].innerHTML.replace(/\s/g, "") ===
              images[ii].classList[1]
            ) {
              document
                .querySelectorAll(
                  `.content .feat:not(.${buttons[i].innerHTML.replace(
                    /\s/g,
                    ""
                  )}) `
                )
                .forEach((e) => {
                  e.classList.add("Hide");
                });
            } else {
              document
                .querySelectorAll(
                  `.content .feat.${buttons[i].innerHTML.replace(/\s/g, "")} `
                )
                .forEach((e) => {
                  e.classList.remove("Hide");
                });
            }
          }
        };
      }
    },
    removeSpaces(text) {
      return text.replace(/\s/g, "");
    },
    async Get_Data_Img() {
      const querySnapshot = await getDocs(collection(db, "PhotoGallery"));
      querySnapshot.forEach((doc) => {
        this.images.push(doc.data());
      });
    },
    async Get_Data_Section() {
      const querySnapshot = await getDocs(
        collection(db, "SectionsOfPhotoGallery")
      );
      querySnapshot.forEach((doc) => {
        this.sections.push(doc.data().SectionName);
      });
    },
    showModal(index) {
      this.currentIndex = index;
      this.showModalFlag = true;
    },
    closeModal() {
      this.showModalFlag = false;
    },
    previousImage() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextImage() {
      if (this.currentIndex < this.images.length - 1) {
        this.currentIndex++;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
h2 {
  margin: 20px 0;
}
nav {
  display: flex;
  gap: 10px;
  button {
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    background: var(--main-color);
    color: #fff;
    &.active {
      background: var(--White-color);
      filter: brightness(0.9);
      color: var(--Black-color);
    }
  }
}
.content {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  background: var(--White-color);
  padding: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  .feat {
    width: 24.1%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    &.Hide {
      display: none;
    }
    img {
      width: 100%;
      cursor: zoom-in;
      border-radius: 6px;
      z-index: 1;
      transition: 0.3s;
      &:hover {
        transform: scale(1.03);
      }
    }
  }
}
.Modal {
  width: 100%;
  background: var(--White-color);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 14;
}
.See_All {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid var(--main-color);
  color: var(--main-color);
}
</style>
