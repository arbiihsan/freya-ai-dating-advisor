import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignInView from '../views/SignInView.vue'
import SignUpView from '../views/SignUpView.vue'
import Layout from "../components/Layout.vue";
import GenerateMessage from "../views/GenerateMessage.vue";
import AboutView from "../views/AboutView.vue";
import CommunityView from "../views/CommunityView.vue";

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "/generate-message",
        name: "GenerateMessage",
        component: GenerateMessage,
      },
      {
        path: "/community",
        name: "Community",
        component: CommunityView,
      },
      {
        path: "/about",
        name: "About",
        component: AboutView,
      },
      // {
      //   path: "/customers/lodgings/:id",
      //   name: "detail-lodging",
      //   component: LodgingDetailView,
      // },
      // {
      //   path: "/customers/bookmarks",
      //   name: "Bookmarks",
      //   component: BookmarkView,
      // },
    ],
  },
  {
    path: "/signin",
    name: "SignIn",
    component: SignInView,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUpView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("access_token");
  if (isAuthenticated && to.name === "SignIn" || isAuthenticated && to.name === "SignUp") {
    next("/");
  } else if (!isAuthenticated && to.name === "home") {
    console.log("MASUKKKKK");
    next('/signin')
  } else {
    next();
  }
});

export default router
