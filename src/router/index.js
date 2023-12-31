import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import Layout from "@/layout";
import visitorAnalysis from "./modules/visitor-analysis";
import behaviorAnalysis from "./modules/behavior-analysis";
// import logDataAnalysis from './modules/logoData-analysis'
export const constantRoutes = [
  {
    path: "/redirect",
    component: Layout,
    hidden: true,
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/login/index"),
    hidden: true,
  },
  {
    path: "/auth-redirect",
    component: () => import("@/views/login/auth-redirect"),
    hidden: true,
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404"),
    hidden: true,
  },
  {
    path: "/401",
    component: () => import("@/views/error-page/401"),
    hidden: true,
  },
  {
    path: "/",
    component: Layout,
    redirect: "/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/home/index"),
        name: "Documentation",
        meta: { title: "首页", icon: "homepage", affix: true },
      },
    ],
  },
  // {
  //   path: "/realtime",
  //   component: Layout,
  //   redirect: "/access",
  //   children: [
  //     {
  //       path: "access",
  //       component: () => import("@/views/realtimeAccess/index.vue"),
  //       name: "access",
  //       meta: { title: "实时访问", icon: "visitorAnaly", affix: true },
  //     },
  //   ],
  // },
];

export const asyncRoutes = [
  visitorAnalysis,
  behaviorAnalysis,
  { path: "*", redirect: "/index", hidden: true },
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

const router = createRouter();
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
