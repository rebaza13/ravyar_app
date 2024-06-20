import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const Home : Array<RouteRecordRaw> =[
  {
      path: "",
      name: "homeI",
      component: ()=>import("@/views/home/HomeUX.vue")
  },
  {
      path: "request",
      name: "request",
      component: ()=>import("@/views/home/Request.vue")
  },
  {
      path: "response",
      name: "response",
      component: ()=>import("@/views/home/Response.vue")
  },
  {
      path: "courses",
      name: "courses",
      component: ()=>import("@/views/home/Courses.vue")
  },
  {
      path: "user-management",
      name: "user-management",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      component: ()=>import("@/views/admin/UserManagement.vue")
  },
  {
      path: "deleter",
      name: "deleter",
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      component: ()=>import("@/views/home/DeleteResponse.vue")
  },
  {
      path: "add-coach",
      name: "add-coach",
      component: ()=>import("@/views/admin/AddCoach.vue")
  },
  {
      path: "profile",
      name: "profile",
         // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      component: ()=>import("@/views/home/Profile.vue")
  },
  {
    path: "/user-info1",
    name: "user-info2",
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component: ()=>import("@/views/auth/UserInfo.vue")
}
]
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/home",
    name: "home",
    component: ()=>import("@/views/home/Home.vue"),
    children:Home
},
  {
    path: "/login",
    name: "login",
    component: ()=>import("@/views/auth/Login.vue")
},
{
    path: "/register",
    name: "register",
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component: ()=>import("@/views/auth/Register.vue")
},
{
    path: "/user-info",
    name: "user-info",
       // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    component: ()=>import("@/views/auth/UserInfo.vue")
}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
