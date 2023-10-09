<template>
  <div class="home">
    <div class="imges">
      <img id="landing" src="../assets/landing-removebg.png" alt="" />
      <img id="clouds_1" src="../assets/cloud.jpg" alt="" />
      <div class="overlay"></div>
      <div class="text">
        <h2>
          <strong>Welcome to Al-Sarraj Al-Munir Al-Azhari Institute,</strong>
          where we strive to provide an interactive and enjoyable educational
          experience for all our students.
        </h2>
      </div>
    </div>
    <div class="container fit">
      <WhySchool />
      <h2 class="Main_Title">latest news</h2>
      <TheBlogs />
      <router-link class="show_More" to="/TheBlogs">Show More</router-link>
      <h2 class="Main_Title">School message & School history</h2>
      <div class="HistoryAndMsg">
        <div>
          <font-awesome-icon :icon="['fas', 'history']" />
          <div>School history</div>
        </div>
        <div>
          <font-awesome-icon :icon="['fas', 'envelope']" />
          <div>School message</div>
        </div>
      </div>
      <div class="main_popup" v-show="showMsg" @click="ShowMsgFunction"></div>
      <div class="Msg">
        <div>
          <font-awesome-icon
            :icon="['fas', 'times']"
            @click="ShowMsgFunction"
          />
          The institute was established in 1428 AH (2007 AD), and its studies
          began on Shaaban 7, 1428 AH and September 20, 2007 AD. The institute
          is located in a distinguished geographical location in the Central
          Plateau, the second district, and is characterized by clean air,
          distance from crowds and factories, and its proximity to important
          roads in Cairo such as the ring road and the highway.
        </div>
        <div>
          <font-awesome-icon
            :icon="['fas', 'times']"
            @click="ShowMsgFunction"
          />
          In the name of God, the most gracious, the most merciful. Praise be to
          God, we praise Him, seek His help, and seek His forgiveness. We seek
          refuge in God from the evils of ourselves and the bad deeds of our
          deeds. Whoever God guides, there is no one who can lead him astray,
          and whoever He leads astray, there is no guide for him. I bear witness
          that there is no god but Allah alone, with no partner, and I bear
          witness that Muhammad is His servant and Messenger. O God, bless
          Muhammad the Prophet, his wives, the mothers of the believers, his
          descendants, and his family, just as you blessed the family of
          Abraham. You are Praiseworthy and Glorious. “O you who have believed,
          fear God as He should be feared, and do not die except as Muslims”
          (Surat Al Imran, 3: 102). “O people, fear your Lord, who created you
          from a single soul, and created from it its mate, and dispersed from
          them many men and women, and fear God, by whom you ask, and those who
          are closest to you.” Indeed, God is a Watcher over you” (Surat An-Nisa
          4:1). “O you who have believed, fear God and speak words of
          righteousness. He will pardon for you your deeds and forgive you your
          sins.” And whoever obeys God and His Messenger has achieved a great
          victory (Surat Al Imran). Al-Ahzab (33: 70-71). And then... we take
          steps together. A small approach towards a curriculum that embodies
          the teachings of our religion, guided by the Sunnah of our Prophet,
          may God bless him and grant him peace, in implementing the commands of
          our Lord (and say, “My Lord, increase me in knowledge” and the saying
          of our Messenger, may God bless him and grant him peace, “Whoever sets
          out in pursuit of knowledge is on the path until God returns the
          honorable Al-Azhar.”) “A beacon of knowledge and learners throughout
          history and time, and we hope that it will be the first building block
          in creating a generation that will lead the nation from its slumber to
          the pinnacle of excellence and leadership in the entire world... We
          hope so, and our work and efforts will be valid on the day when
          neither wealth nor sons will be of use, all for the sake of these and
          other meanings.” Of the noble meanings, it is the mission of Siraj
          Al-Munir Al-Muhammad, and the Al-Azhari Institute revolves around two
          axes: basic axes: an educational message and an educational mission.
          First: the educational message, which is the foundation upon which the
          institute is based, and the cornerstone of its establishment. And the
          focus of attention of those in charge of it. This will come, and it
          will come. The mission entrusted to the institute is consistent with
          the teachings of Islam, far from deviant and misleading ideas and
          destructive tendencies. We are committed to the morals and ethics of
          Islam through distinguished educators and an administration that bears
          the highest level of responsibility. This is to raise a righteous
          generation that is proud of itself, its religion, and its nation.
          Second: The educational message, which stems from the firm belief that
          the progress and advancement of our nation depends on the progress of
          science, and that the Muslim student must be at the highest level of
          moral and scientific progress. The Institute takes great care to
          select the best teachers who understand the importance of their role
          and fulfill what the Prophet, may God bless him and grant him peace,
          said: “Indeed, God and His angels and the people of the heavens and
          the earth.” The Earth” and even the people of the Earth “The ant in
          its hole and the whale, pray for the teacher of the people” is a
          guiding light for their lives, and they are responsible. in front of
          God. About difficulties and challenges. that they face in their
          pursuit of this goal. The Institute also gives priority to using
          appropriate modern teaching methods and educational tools necessary to
          achieve the desired goal of the educational process. We ask God
          Almighty to bless us with a generation with the morals of the Qur’an
          and the Prophet’s guidance, the impact of which will of course return
          to the scientific and cultural level of the Muslim student. Let Egypt
          assume the arena of sovereignty and leadership for the entire Islamic
          nation, and God Almighty is behind the intention. Allah is sufficient
          for me, and Allah is the best trustee. There is no power except in God
          Almighty.
        </div>
      </div>
      <InstituteNumbersComponents />
      <TheStatisticsComponent />
      <CommonQuestionsComponent />
      <PhotoGalleryComponent />
      <h2 class="Main_Title">Vacant Jobs</h2>
      <VacantJobsComponent />
    </div>
  </div>
</template>
<script>
import WhySchool from "../components/WhySchool.vue";
import InstituteNumbersComponents from "../components/InstituteNumbersComponents.vue";
import TheStatisticsComponent from "../components/TheStatisticsComponent.vue";
import CommonQuestionsComponent from "../components/CommonQuestionsComponent.vue";
import PhotoGalleryComponent from "../components/PhotoGalleryComponent.vue";
import VacantJobsComponent from "../components/VacantJobsComponent.vue";
import TheBlogs from "../views/TheBlogs.vue";
export default {
  name: "HomeView",
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.ShowMSG();
    setTimeout(() => {
      this.News_Control();
      this.Imges_Control();
      this.Jobs_Control();
    }, 1000);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  methods: {
    ShowMsgFunction() {
      let Msg = document.querySelectorAll(".Msg > div");
      this.showMsg = !this.showMsg;
      Msg.forEach((e) => {
        e.classList.remove("active");
      });
    },
    ShowMSG() {
      let Msg = document.querySelectorAll(".Msg > div");
      let Btn = document.querySelectorAll(".HistoryAndMsg > div");
      Msg.forEach((e1, index1) => {
        Btn.forEach((e2, index2) => {
          if (index1 === index2) {
            e2.onclick = () => {
              this.showMsg = !this.showMsg;
              Msg.forEach((e) => {
                e.classList.remove("active");
              });
              e1.classList.add("active");
            };
          }
        });
      });
    },
    Jobs_Control() {
      for (
        let i = 2;
        i <
        document.querySelectorAll(".container.fit.VacantJobs .content .Box")
          .length;
        i++
      ) {
        document.querySelector(".show_More.Jpbs").style.display = "block";
        document.querySelectorAll(".container.fit.VacantJobs .content .Box")[
          i
        ].style.display = "none";
      }
    },
    News_Control() {
      for (let i = 3; i < document.querySelectorAll(".New").length; i++) {
        document.querySelectorAll(".New")[i].style.display = "none";
      }
    },
    Imges_Control() {
      for (
        let i = 8;
        i <
        document.querySelectorAll(".PhotoGalleryComponent .content .feat")
          .length;
        i++
      ) {
        document.querySelectorAll(".PhotoGalleryComponent .content .feat")[
          i
        ].style.display = "none";
      }
      // }
    },
    handleScroll() {
      document.querySelector(".imges #clouds_1").style.left = `${
        window.scrollY - 180
      }px`;
    },
    Name() {
      setTimeout(() => {
        return this.$store.state.userData?.Email;
      }, 1000);
    },
  },
  components: {
    WhySchool,
    InstituteNumbersComponents,
    TheStatisticsComponent,
    CommonQuestionsComponent,
    PhotoGalleryComponent,
    VacantJobsComponent,
    TheBlogs,
  },
  computed: {
    SampleBlogCards() {
      return this.$store.state.SampleBlogCards;
    },
  },
  data() {
    return {
      showMsg: null,
    };
  },
};
</script>

<style lang="scss">
.imges {
  position: relative;
  height: 100vh;
  overflow: hidden;
  width: 100%;
  img {
    position: absolute;
    width: 100%;
    top: -211px;
  }
  #clouds_1 {
    z-index: -1;
    transform: scale(1.5);
    left: -180px;
  }
}
.blog_cards {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 50px auto;
}
.overlay {
  position: absolute;
  top: -141px;
  left: -50%;
  width: 100%;
  height: 127%;
  background-color: var(--main-color);
  -webkit-clip-path: polygon(
    50% 14%,
    82% 15%,
    100% 50%,
    85% 85%,
    50% 86%,
    15% 85%,
    0% 50%,
    15% 15%
  );
  clip-path: polygon(
    50% 15%,
    82% 15%,
    100% 50%,
    85% 85%,
    50% 85%,
    15% 85%,
    0% 50%,
    15% 15%
  );
  opacity: 0.5;
}
.text {
  position: absolute;
  top: 50%;
  left: 13px;
  width: 488px;
  transform: translate(0, -50%);
  color: #fff;
  font-family: unset;
  h2 {
    line-height: 1.3;
  }
}

.show_More {
  width: 100% !important;
  background: var(--main-color);
  color: #fff;
  padding: 10px;
  display: inline-block;
  margin: 12px;
  text-align: center;
  border-radius: 5px;
}
.HistoryAndMsg {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
  margin: 70px auto 50px;
  > div {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    border: 1px solid var(--main-color);
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    color: var(--main-color);
    transition: 0.6s;
    font-size: 20px;
    & > svg {
      font-size: 25px;
    }
    &:hover {
      transform: scale(1.03);
      background: var(--main-color);
      color: #fff;
    }
  }
}
.Msg {
  > div {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    padding: 15px;
    border-radius: 5px;
    z-index: 14;
    overflow: scroll;
    max-height: 90vh;
    display: none;
    font-weight: bold;
    &.active {
      display: block;
    }
    svg {
      margin-left: auto;
      color: var(--main-color);
      cursor: pointer;
      font-size: 25px;
      display: block;
      margin-bottom: 10px;
    }
  }
}
</style>
