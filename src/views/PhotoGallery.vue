<template>
  <div class="container fit PhotoGallery In">
    <div class="main_popup" v-show="Show_Add_Section"></div>
    <div class="Add_Section" v-show="Show_Add_Section">
      <header>
        <h3>Add Section</h3>
        <font-awesome-icon
          :icon="['fas', 'window-close']"
          @click="Show_Add_Section_Function"
        />
      </header>
      <div class="Add_Input">
        <input type="text" placeholder="section name" id="SectionName" />
        <button class="Save" @click="Add_Section_Name">Add</button>
      </div>
      <h4>Sections</h4>
      <div class="Sections"></div>
    </div>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="TheAdmin">The Administrator</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="TheModifications">Modifications</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Photo Gallery
        </li>
      </ol>
    </nav>
    <h1>
      <span>Photo Gallery</span>
      <div>
        <div class="AddSection" @click="Show_Add_Section_Function">
          <font-awesome-icon :icon="['fas', 'cog']" />
          <span> Sections </span>
        </div>
      </div>
    </h1>
    <div class="AddImg">
      <div class="top">
        <div>
          <input type="file" name="img" id="img" @change="handleFileUpload" />
          <label for="img">Upload a photo</label>
          <select v-model="selectedSection">
            <option>Choose a section</option>
            <option v-for="option in options" :key="option">
              {{ option }}
            </option>
          </select>
          <div class="progress">
            <span class="Progress"></span>
            <span class="pro">Upload is 0% done</span>
          </div>
        </div>
        <div>
          <img id="Img_View" src="" alt="" />
        </div>
      </div>
      <button class="Save" @click="Send_Img">Done</button>
    </div>
    <div class="counter">( <span></span> ) Photo</div>
    <div class="content">
      <!-- <div class="box" v-for="img in Images" :key="img">
        <img :src="img.img" alt="" />
        <button class="Delete_Img delete">Delete</button>
      </div> -->
    </div>
  </div>
  <div class="Toast" v-show="show">
    <div class="Toast-header">
      <div>{{ message }}</div>
      <small class="text-body-secondary">just now</small>
    </div>
  </div>
</template>
<script>
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

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
import PhotoGalleryScss from "../sass/PhotoGallery.scss";
export default {
  name: "PhotoGallery",
  mounted() {
    // setTimeout(() => {
    this.Get_Section_Data_1();
    this.Get_Section_Data_2();
    // }, 100);
  },
  data() {
    return {
      Show_Add_Section: false,
      Ids_1: [],
      Ids_2: [],
      options: [],
      selectedSection: "Choose a section",
      result: "",
      message: "Image has been uploaded",
      show: false,
      Images: [],
    };
  },
  methods: {
    ProgressFunction() {},
    Counter() {
      if (document.querySelector(".counter span")) {
        document.querySelector(".counter span").innerHTML =
          document.querySelectorAll(".content > .box").length;
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      const uploadedImage = document.getElementById("Img_View");
      reader.onload = async function (e) {
        uploadedImage.src = e.target.result;
      };
      this.result = uploadedImage.src;

      reader.readAsDataURL(file);
    },
    async Send_Img() {
      let file = document.getElementById("img").files[0];
      if (file instanceof Blob && this.selectedSection !== "Choose a section") {
        console.log(true);
        let src = document.getElementById("img").value;
        const filePath = src;
        const fileName = filePath.split("\\").pop();
        const storage = getStorage(app);
        const storageRef = ref(storage, "images/" + fileName);

        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef, fileName);
        console.log(fileName);
        await addDoc(collection(db, "PhotoGallery"), {
          img: downloadURL,
          section: this.selectedSection,
          name: fileName,
        });
        this.show = true;
        setTimeout(() => {
          this.show = false;
        }, 5000);
        // src.value = "";
        // this.selectedSection = "Choose a section";
        document.querySelector(".content").innerHTML = "";
        this.Get_Section_Data_2();

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on("state_changed", (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          document.querySelector(".progress span.pro").innerHTML =
            "Upload is " + progress + "% done";
          document.querySelector(
            ".progress span.Progress"
          ).style.width = ` ${progress}%`;
        });
        setTimeout(() => {
          document.querySelector(".progress span.pro").innerHTML =
            "Upload is 0% done";
          document.querySelector(".progress span.Progress").style.width = `0%`;
          document.getElementById("img").value = "";
          this.selectedSection = "Choose a section";
          document.getElementById("Img_View").src = "";
        }, 2000);
      }
    },
    $style() {
      return PhotoGalleryScss;
    },
    Show_Add_Section_Function() {
      this.Show_Add_Section = !this.Show_Add_Section;
    },
    async Add_Section_Name() {
      await addDoc(collection(db, "SectionsOfPhotoGallery"), {
        SectionName: document.getElementById("SectionName").value,
      });
      document.getElementById("SectionName").value = "";
      document.querySelector(".Sections").innerHTML = "";
      this.Get_Section_Data_1();
    },
    async Get_Section_Data_1() {
      const querySnapshot = await getDocs(
        collection(db, "SectionsOfPhotoGallery")
      );
      querySnapshot.forEach((doc) => {
        let Section_feat = `
        <div class="Section_feat">
          <div class="Section_Name">${doc.data().SectionName}</div>
          <button class="Delete_Section delete">Delete</button>
        </div>
        `;
        // this.Ids_1 = [];
        this.Ids_1.push(doc.id);
        this.Ids_1 = Array.from(new Set(this.Ids_1));

        // console.log(uniqueArray);
        document.querySelector(".Sections").innerHTML += Section_feat;
      });
      this.options = [];
      for (
        let i = 0;
        i <
        document.querySelectorAll(".Sections .Section_feat .Section_Name")
          .length;
        i++
      ) {
        this.options.push(
          document.querySelectorAll(".Sections .Section_feat .Section_Name")[i]
            .innerHTML
        );
      }

      this.$style();
      this.Delete_Section();
    },
    Delete_Section() {
      let buttons = document.querySelectorAll(
        ".PhotoGallery .Sections > div button"
      );
      let Ids = this.Ids_1;
      console.log(Ids);
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = async () => {
          buttons[i].parentElement.remove();
          await deleteDoc(doc(db, "SectionsOfPhotoGallery", this.Ids_1[i]));
          this.options = [];
          console.log(this.options);
          for (
            let i = 0;
            i <
            document.querySelectorAll(".Sections .Section_feat .Section_Name")
              .length;
            i++
          ) {
            this.options.push(
              document.querySelectorAll(
                ".Sections .Section_feat .Section_Name"
              )[i].innerHTML
            );
          }
        };
      }
    },
    async Get_Section_Data_2() {
      const querySnapshot = await getDocs(collection(db, "PhotoGallery"));
      querySnapshot.forEach((doc) => {
        this.Images.push(doc.data());
        let Section_feat = `
        <div class="box">
        <div>
          <div class="section">Section : ${doc.data().section}</div>
          <button class="Delete_Img delete">Delete</button>
        </div>
          <img src="${doc.data().img}" alt="" name="${doc.data().name}"/>
        </div>
          `;
        this.Ids_2.push(doc.id);
        document.querySelector(".content").innerHTML += Section_feat;
      });

      this.$style();
      this.Delete_Section_2();
      this.Counter();
    },
    Delete_Section_2() {
      let Delete_Img = document.querySelectorAll(
        ".PhotoGallery .content > div button.Delete_Img"
      );
      let names = document.querySelectorAll(".content > .box img");
      for (let i = 0; i < Delete_Img.length; i++) {
        Delete_Img[i].onclick = async () => {
          Delete_Img[i].parentElement.parentElement.remove();
          await deleteDoc(doc(db, "PhotoGallery", this.Ids_2[i]));
          const storage = getStorage();
          const desertRef = ref(storage, `images/${names[i]?.name}`);
          deleteObject(desertRef);

          this.Counter();
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.PhotoGallery {
  h1 {
    & > div {
      align-items: normal !important;
      flex-direction: row-reverse;
    }
    .AddSection {
      background: var(--main-color);
      color: #fff;
      width: 187px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }
  }
  .AddImg {
    background: #eee;
    padding: 20px;
    border-radius: 5px;
    .top {
      width: 100%;
      display: flex;
      & > div {
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 10px;
        align-items: start;
        &:last-child {
          min-height: 272px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          border-radius: 5px;
        }
        input {
          display: none;
        }
        label {
          background: var(--main-color);
          color: #fff;
          padding: 10px 0;
          border-radius: 5px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 150px;
        }
        select {
          width: 150px;
        }
        #Img_View {
          width: 100%;
          border-radius: 5px;
        }
      }
    }
  }
  .Add_Section {
    z-index: 14;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    width: 500px;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    header {
      display: flex;
      justify-content: space-between;
      h3 {
        margin: 0;
      }
      svg {
        font-size: 25px;
        color: var(--main-color);
        cursor: pointer;
      }
    }
    .Add_Input {
      display: flex;
      gap: 20px;
      input {
        border-bottom: 1px solid #ddd !important;
        width: 100%;
      }
    }
    .Sections {
      display: flex;
      flex-direction: column;
      gap: 10px;

      & > div {
        background: #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        button {
          background: red;
          border-radius: 5px;
          padding: 5px;
          border: none;
          color: #fff;
        }
      }
    }
  }
  .counter {
    background: #eee;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    margin-top: 50px;
    font-weight: bold;
    color: var(--main-color);
    // span {
    // }
  }
}
.progress {
  min-height: 29px;
  background: #fafafa;
  padding: 5px 10px;
  border-radius: 14px;
  font-weight: bold;
  min-width: 152px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  min-height: 29px;
  span.Progress {
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: var(--main-color);
  }
}
</style>
