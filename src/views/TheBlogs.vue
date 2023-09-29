<template>
  <div class="container fit">
    <div class="main_popup" v-if="ShowContentState"></div>
    <div class="News_Content" v-for="news in News" :key="news">
      <header>
        <h4>
          {{ news.Title }}
        </h4>
        <font-awesome-icon :icon="['fas', 'times']" @click="RemoveContent" />
      </header>
      <p v-html="news.TheContent"></p>
    </div>
    <div class="Thecontent">
      <div class="card New" v-for="news in News" :key="news">
        <font-awesome-icon
          :icon="['fas', 'trash-alt']"
          class="Svg_Delete"
          v-if="Admin"
        />
        <img
          :src="news.ImgCoverUrl"
          class="card-img-top img-fluid"
          alt="Fissure in Sandstone"
          style="width: 100%"
        />
        <div class="card-body">
          <div class="Time">
            <font-awesome-icon :icon="['fas', 'clock']" />

            <span>{{
              new Date(news.Time.toMillis()).toLocaleString(["en-US"], {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }}</span>
          </div>
          <h5 class="card-title">{{ news.Title }}</h5>
          <p class="card-text" v-html="news.ShortDescription"></p>
          <button
            class="btn btn-primary Show_More"
            v-if="news.TheContent !== '<p></p>'"
            @click="ShowContent"
          >
            Show More
          </button>
        </div>
      </div>
      <!-- <div class="New" v-for="news in News" :key="news">
        <font-awesome-icon
          :icon="['fas', 'trash-alt']"
          class="Svg_Delete"
          v-if="Admin"
        />
        <img :src="news.ImgCoverUrl" alt="" />
        <div class="Text">
          <div class="Time">
            <font-awesome-icon :icon="['fas', 'clock']" />

            <span>{{
              new Date(news.Time.toMillis()).toLocaleString(["en-US"], {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            }}</span>
          </div>
          <h5 style="font-weight: bold; margin-top: 0.5rem">
            {{ news.Title }}
          </h5>
          <div class="justify-between">
            <div class="description" v-html="news.ShortDescription"></div>
            <button
              class="Show_More"
              v-if="news.TheContent !== '<p></p>'"
              @click="ShowContent"
            >
              Show More
            </button>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
import {
  collection,
  getDocs,
  getFirestore,
  doc,
  deleteDoc,
} from "firebase/firestore";
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
  name: "TheBlogs",
  beforeMount() {
    this.GetNews();
    setTimeout(() => {
      this.Show_Btn();
      if (this.Admin) {
        this.Delete_News();
      }
    }, 1000);
  },
  computed: {
    SampleBlogCards() {
      return this.$store.state.SampleBlogCards;
    },
    editpost: {
      get() {
        return this.$store.state.editpost;
      },
      set(payload) {
        this.$store.commit("toggelEditPost", payload);
      },
    },
    Admin() {
      return this.$store.state.userAdmin;
    },
  },
  components: {
    // TheBlogCard,
  },
  data() {
    return {
      News: [],
      Ids: [],
      ShowContentState: null,
    };
  },
  methods: {
    Show_Btn() {
      let Btn = document.querySelectorAll("button.Show_More");
      let popup = document.querySelectorAll(".News_Content");
      for (let i = 0; i < Btn.length; i++) {
        Btn[i].onclick = () => {
          popup[i].classList.add("active");
        };
      }
    },
    ShowContent() {
      this.ShowContentState = true;
    },
    RemoveContent() {
      this.ShowContentState = false;
      document
        .querySelectorAll(".News_Content")
        .forEach((e) => e.classList.remove("active"));
    },
    async GetNews() {
      const querySnapshot = await getDocs(collection(db, "News"));
      querySnapshot.forEach((doc) => {
        this.News.push(doc.data());
        this.Ids.push(doc.id);
        // console.log(doc.data().TheContent);
        console.log(this.News);
      });
      this.News.sort((a, b) => b.Time.toMillis() - a.Time.toMillis());
    },
    Delete_News() {
      this.News.sort();
      let svg = document.querySelectorAll(".Svg_Delete");
      let News_Data = this.News;
      for (let i = 0; i < News_Data.length; i++) {
        svg[i].onclick = async () => {
          console.log(svg[i]);
          await deleteDoc(doc(db, "News", this.Ids[i]));
          const index = i;
          News_Data.splice(index, 1);
          // window.location.reload();
        };
      }
    },
  },
  beforeUnmount() {
    this.$store.commit("toggelEditPost", false);
  },
};
</script>

<style lang="scss" scoped>
.container.fit {
  position: relative;
}
.blog_card_Wrap {
  background: #eee;
  .toggle_edit {
    margin: 20px auto;
    text-align: left;
    justify-content: flex-end;
    display: flex;
    gap: 11px;
    padding: 20px;
  }
}
.icons {
  background-color: #fafafa;
  width: 63px;
  height: 25px;
  border-radius: 33px;
  position: relative;
  transition: 0.3s;
  cursor: pointer;
  cursor: pointer;
  box-shadow: 0 0 10px #ddd;
  &.checked {
    // background: var(--main-color);
    span {
      background: var(--main-color) !important;
    }
  }
  span {
    top: -2px !important;
    left: -1px;
    background: #fff;
  }
}
.Thecontent {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 50px;
}
// img {
//   max-width: 75%;
//   width: auto;
//   height: auto;
//   max-height: 195px;
//   border-radius: 5px;
//   border-bottom-left-radius: 0;
//   border-bottom-right-radius: 0;
// }
.New {
  width: 32%;
  background: var(--White-color);
  filter: brightness(0.95);
  border-radius: 5px;
  border: 1px solid #ddd;
  // height: 450px;
  // display: flex;
  // flex-direction: column;
  // position: relative;
  // overflow: auto;

  .Text {
    padding: 10px;
    .Time {
      // padding: 10px;
      color: #6e6e6e;
      font-weight: bold;
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
    }
    .description {
      margin-bottom: 10px;
    }
    button {
      // position: absolute;
      // bottom: 10px;
      border: none;
      background: var(--main-color);
      color: #fff;
      padding: 10px 15px;
      border-radius: 5px;
      width: fit-content;
      margin-bottom: 5px;
    }
  }
}
.News_Content {
  display: none;
  position: fixed;
  background: #fff;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 5px;
  z-index: 14;
  width: 90%;
  max-height: 80vh;
  overflow: auto;

  &.active {
    display: block;
  }
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  svg {
    font-size: 23px;
    color: var(--main-color);
    cursor: pointer;
  }
}
.justify-between {
  word-wrap: break-word;
}
.Svg_Delete {
  position: absolute;
  top: 10px;
  right: 10px;
  color: var(--main-color);
  background: #fff;
  width: 30px;
  height: 30px;
  padding: 7px;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #fff;
    background: var(--main-color);
  }
}
</style>
