<template>
  <div class="container fit News">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="TheAdmin">The Administrator</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link to="TheModifications">Modifications</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">News</li>
      </ol>
    </nav>
    <h1>
      <span>News</span>
    </h1>
    <div class="Create_News">
      <h3>Create News</h3>
      <div class="cover">
        <div class="box">
          <input
            type="text"
            name="Tite_News"
            id="Tite_News"
            placeholder="Enter News Title"
          />
          <button class="Upload">
            <label for="upload_file">Upload Cover Photo</label>
            <input
              type="file"
              id="upload_file"
              style="display: none"
              @change="handleFileUpload"
            />
          </button>

          <div class="src">
            File Chosen : <span class="img_src">Nothing is chosen</span>
          </div>
        </div>
        <div class="Show_Img">
          <img
            src="../assets/cover.png"
            alt=""
            id="uploaded_image"
            style="width: 200px; margin-top: 20px; border: 1px solid"
          />
        </div>
      </div>
      <div class="Write_News">
        <h3 class="TheContent">Short Description</h3>
        <ckeditor
          v-model="content1"
          :editor="editor"
          @change="ShortDescriptionLength"
        ></ckeditor>
        <p class="length">
          The short description must not exceed 150 characters
          <span>( 0 / 150 )</span>
        </p>
        <h3 class="TheContent">The Content</h3>
        <ckeditor v-model="content2" :editor="editor"></ckeditor>
        <p>Write the content of the news</p>
        <p class="ErrorMsg" v-if="ShowError">{{ this.ErrorMsg }}</p>
        <button class="Publish" @click="Publish">News publishing</button>
      </div>
    </div>
  </div>
</template>
<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ckeditor from "../sass/ckeditor.scss";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
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
  name: "TheNews",
  components: {
    ckeditor: CKEditor.component,
  },
  mounted() {
    setTimeout(() => {
      this.ShortDescriptionLength();
    }, 1000);
    this.editor.defaultConfig = {
      toolbar: {
        items: [
          "image",
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "blockQuote",
          "undo",
          "redo",
          "Special Characters",
        ],
      },
    };
    this.$style();
  },
  data() {
    return {
      content1: "",
      content2: "",
      editor: ClassicEditor,
      ErrorMsg: "Complete the data",
      ShowError: null,
    };
  },
  methods: {
    ShortDescriptionLength() {
      let length = document.querySelector("p.length span");
      let box = document.querySelector(
        ".container.News .Create_News .Write_News div:nth-child(3) .ck.ck-editor__editable_inline"
      );

      const observer = new MutationObserver(() => {
        length.innerHTML = `( ${box.textContent.length} / 150 )`;
      });

      const config = { childList: true, subtree: true, characterData: true };

      observer.observe(box, config);
    },

    async handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      console.log(file);
      reader.onload = async function (e) {
        const uploadedImage = document.getElementById("uploaded_image");
        uploadedImage.src = e.target.result;
        document.querySelector("span.img_src").innerHTML =
          document.querySelector("#upload_file").value;
      };

      reader.readAsDataURL(file);
    },
    async Publish() {
      let file = document.querySelector("#upload_file").files[0];
      const element3 = document.querySelector(
        ".container.News .Create_News .Write_News div:nth-child(3) .ck.ck-editor__editable_inline"
      );
      // const element7 = document.querySelector(
      //   ".container.News .Create_News .Write_News div:nth-child(7) .ck.ck-editor__editable_inline"
      // );
      const title = document.querySelector(
        ".container.News .Create_News .box input"
      );
      if (
        file instanceof Blob &&
        element3.textContent.length < 150 &&
        element3.textContent !== "" &&
        // element7.textContent !== "" &&
        title.value !== ""
      ) {
        let src = document.querySelector(
          ".container.News .Create_News .box .img_src"
        ).innerHTML;
        const filePath = src;
        const fileName = filePath.split("\\").pop();
        const reader = new FileReader();

        reader.onload = async function (e) {
          const uploadedImage = document.getElementById("uploaded_image");
          uploadedImage.src = e.target.result;
          document.querySelector("span.img_src").innerHTML =
            document.querySelector("#upload_file").value;

          const storage = getStorage(app);
          const storageRef = ref(storage, fileName);

          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);

          await addDoc(collection(db, "News"), {
            Title: document.querySelector(
              ".container.News .Create_News .box input"
            ).value,
            ImgCoverUrl: downloadURL,
            ShortDescription: document.querySelector(
              ".container.News .Create_News .Write_News div:nth-child(3) .ck.ck-editor__editable_inline  "
            ).innerHTML,
            TheContent: document.querySelector(
              ".container.News .Create_News .Write_News div:nth-child(7) .ck.ck-editor__editable_inline  "
            ).innerHTML,
            Time: serverTimestamp(),
          });
        };
        // window.location.reload();
        // setTimeout(() => {
        //   document.querySelector(
        //     ".container.News .Create_News .box input"
        //   ).value = "";
        //   file = "";
        //   document.querySelector(
        //     ".container.News .Create_News .box .img_src"
        //   ).innerHTML = "Nothing is chosen";

        //   this.content1 = "";
        //   this.content2 = "";
        //   this.ShowError = false;
        // }, 5000);

        reader.readAsDataURL(file);
        console.log(this.content2);
        if (this.content2 === "") {
          document.querySelector(
            ".container.News .Create_News .Write_News div:nth-child(7) .ck.ck-editor__editable_inline > :last-child"
          ).innerHTML = "";
        }
      } else {
        this.ShowError = true;
        console.log("wronge");
      }
    },
    $style() {
      return ckeditor;
    },
    reload() {},
  },
};
</script>
<style lang="scss" scoped>
.container.News {
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
  .Create_News {
    margin-top: 50px;
    .box {
      display: flex;
      gap: 15px;
      align-items: center;
      input {
        border-bottom: 1px solid !important;
      }
      button {
        border: none;
        background: var(--main-color);
        padding: 5px 10px;
        border-radius: 5px;
        color: #fff;
      }
      label {
        cursor: pointer;
        margin: 0;
      }
      .img_src {
        font-size: 12px;
      }
    }
    .Write_News {
      margin-top: 30px;
      textarea {
        resize: none;
        padding: 10px;
        height: 100px;
        width: 100%;
      }
      .Publish {
        border: none;
        background: var(--main-color);
        color: #fff;
        padding: 5px 10px;
        border-radius: 5px;
        margin-top: 15px;
      }
      h3.TheContent {
        margin-top: 30px;
      }
    }
  }
}
.ErrorMsg {
  color: red;
}
</style>
