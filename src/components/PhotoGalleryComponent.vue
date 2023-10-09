<template>
  <div class="container fit PhotoGalleryComponent">
    <h2 class="Main_Title">Photo Gallery</h2>
    <router-link to="/PhotoGalleryView" class="See_All">See All</router-link>
    <div class="content">
      <div class="feat" v-for="(img, index) in images" :key="img">
        <img :src="img" alt="" @click="showModal(index)" />
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
        <img :src="images[currentIndex]" alt="" />
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
// import { Carousel, Slide } from "vue-carousel";
export default {
  name: "PhotoGalleryComponent",
  data() {
    return {
      images: [],
      showModalFlag: false,
      currentIndex: 0,
    };
  },
  mounted() {
    this.Get_Data();
  },

  methods: {
    async Get_Data() {
      const querySnapshot = await getDocs(collection(db, "PhotoGallery"));
      querySnapshot.forEach((doc) => {
        this.images.push(doc.data().img);
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
button {
  z-index: 14;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  &#Previous {
    left: 32%;
  }
  &:last-child {
    left: 68%;
  }
}
.content {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  background: var(--White-color);
  padding: 20px;
  border-radius: 5px;
  // filter: brightness(0.9);
  border: 1px solid #ddd;
  .feat {
    width: 24.1%;
    position: relative;
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
  transition: 0.3s;
  &:hover {
    color: #fff;
    background: var(--main-color);
  }
}
</style>
