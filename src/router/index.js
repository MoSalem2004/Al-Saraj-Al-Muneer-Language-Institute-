import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TheRegister from "../views/TheRegister.vue";
import TheBlogs from "../views/TheBlogs.vue";
import TheLogin from "../views/TheLogin.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import TheProfile from "../views/TheProfile.vue";
import TheAdmin from "../views/TheAdmin.vue";
import SchoolGrade from "../views/SchoolGrade.vue";
import SSG from "../views/SSG.vue";
import FSG from "../views/FSG.vue";
import TPreG from "../views/TPreG.vue";
import SPreG from "../views/SPreG.vue";
import FPreG from "../views/FPreG.vue";
import SiPriG from "../views/SiPriG.vue";
import FiPriG from "../views/FiPriG.vue";
import FoPriG from "../views/FoPriG.vue";
import TPriG from "../views/TPriG.vue";
import SePriG from "../views/SePriG.vue";
import FirstPriG from "../views/FirstPriG.vue";
import KG1G from "../views/KG1G.vue";
import KG2G from "../views/KG2G.vue";
import TheForm from "../components/TheForm.vue";
import EditSubjects from "../components/EditSubjects.vue";
import WhySchool from "../components/WhySchool.vue";
import TheModifications from "../views/TheModifications.vue";
import TheNews from "../views/TheNews.vue";
import InstituteNumbers from "../views/InstituteNumbers.vue";
import TheStatistics from "../views/TheStatistics.vue";
import CommonQuestions from "../views/CommonQuestions.vue";
import PhotoGalleryComponent from "../components/PhotoGalleryComponent.vue";
import PhotoGallery from "../views/PhotoGallery.vue";
import PhotoGalleryView from "../views/PhotoGalleryView.vue";
import VacantJobs from "../views/VacantJobs.vue";
import VacantJobsView from "../views/VacantJobsView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
    meta: {
      title: "HomeView",
    },
  },
  {
    path: "/TheBlogs",
    name: "TheBlogs",
    component: TheBlogs,
    meta: {
      title: "TheBlogs",
    },
  },
  {
    path: "/TheRegister",
    name: "TheRegister",
    component: TheRegister,
    meta: {
      title: "TheRegister",
    },
  },
  {
    path: "/ForgotPassword",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      title: "ForgotPassword",
    },
  },
  {
    path: "/TheProfile",
    name: "TheProfile",
    component: TheProfile,
    meta: {
      title: "TheProfile",
    },
  },

  {
    path: "/TheAdmin",
    name: "TheAdmin",
    component: TheAdmin,
    meta: {
      title: "TeachersRatings",
    },
  },
  {
    path: "/SchoolGrade",
    name: "SchoolGrade",
    component: SchoolGrade,
    meta: {
      title: "SchoolGrade",
    },
  },
  {
    path: "/SSG",
    name: "SSG",
    component: SSG,
    meta: {
      title: "SSG",
    },
  },
  {
    path: "/FSG",
    name: "FSG",
    component: FSG,
    meta: {
      title: "FSG",
    },
  },
  {
    path: "/TPreG",
    name: "TPreG",
    component: TPreG,
    meta: {
      title: "TPreG",
    },
  },
  {
    path: "/SPreG",
    name: "SPreG",
    component: SPreG,
    meta: {
      title: "SPreG",
    },
  },
  {
    path: "/FPreG",
    name: "FPreG",
    component: FPreG,
    meta: {
      title: "FPreG",
    },
  },
  {
    path: "/SiPriG",
    name: "SiPriG",
    component: SiPriG,
    meta: {
      title: "SiPriG",
    },
  },
  {
    path: "/FiPriG",
    name: "FiPriG",
    component: FiPriG,
    meta: {
      title: "FiPriG",
    },
  },
  {
    path: "/FoPriG",
    name: "FoPriG",
    component: FoPriG,
    meta: {
      title: "FoPriG",
    },
  },
  {
    path: "/TPriG",
    name: "TPriG",
    component: TPriG,
    meta: {
      title: "TPriG",
    },
  },
  {
    path: "/SePriG",
    name: "SePriG",
    component: SePriG,
    meta: {
      title: "SePriG",
    },
  },
  {
    path: "/FirstPriG",
    name: "FirstPriG",
    component: FirstPriG,
    meta: {
      title: "FirstPriG",
    },
  },
  {
    path: "/KG1G",
    name: "KG1G",
    component: KG1G,
    meta: {
      title: "KG1G",
    },
  },
  {
    path: "/KG2G",
    name: "KG2G",
    component: KG2G,
    meta: {
      title: "KG2G",
    },
  },
  {
    path: "/TheForm",
    name: "TheForm",
    component: TheForm,
    meta: {
      title: "TheForm",
    },
  },
  {
    path: "/EditSubjects",
    name: "EditSubjects",
    component: EditSubjects,
    meta: {
      title: "EditSubjects",
    },
  },
  {
    path: "/WhySchool",
    name: "WhySchool",
    component: WhySchool,
    meta: {
      title: "WhySchool",
    },
  },
  {
    path: "/TheModifications",
    name: "TheModifications",
    component: TheModifications,
    meta: {
      title: "TheModifications",
    },
  },
  {
    path: "/TheNews",
    name: "TheNews",
    component: TheNews,
    meta: {
      title: "TheNews",
    },
  },
  {
    path: "/InstituteNumbers",
    name: "InstituteNumbers",
    component: InstituteNumbers,
    meta: {
      title: "InstituteNumbers",
    },
  },
  {
    path: "/TheStatistics",
    name: "TheStatistics",
    component: TheStatistics,
    meta: {
      title: "TheStatistics",
    },
  },
  {
    path: "/CommonQuestions",
    name: "CommonQuestions",
    component: CommonQuestions,
    meta: {
      title: "CommonQuestions",
    },
  },
  {
    path: "/PhotoGalleryComponent",
    name: "PhotoGalleryComponent",
    component: PhotoGalleryComponent,
    meta: {
      title: "PhotoGalleryComponent",
    },
  },
  {
    path: "/PhotoGallery",
    name: "PhotoGallery",
    component: PhotoGallery,
    meta: {
      title: "PhotoGallery",
    },
  },
  {
    path: "/PhotoGalleryView",
    name: "PhotoGalleryView",
    component: PhotoGalleryView,
    meta: {
      title: "PhotoGalleryView",
    },
  },
  {
    path: "/VacantJobs",
    name: "VacantJobs",
    component: VacantJobs,
    meta: {
      title: "VacantJobs",
    },
  },
  {
    path: "/VacantJobsView",
    name: "VacantJobsView",
    component: VacantJobsView,
    meta: {
      title: "VacantJobsView",
    },
  },

  {
    path: "/TheLogin",
    name: "TheLogin",
    component: TheLogin,
    meta: {
      title: "TheLogin",
    },
    // beforeEnter: (to, from, next) => {
    //   next();
    //   alert("Hello");
    // },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Al Saraj Al Muneer`;
  next();
});

export default router;
