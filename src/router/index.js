import { createRouter, createWebHistory } from "vue-router";

export const constantRoutes = [
  {
    path: "/dang-nhap",
    component: () => import("@/views/auth/login.vue"),
    hidden: true,
  },
 
  {
    path: "/",
    redirect: "/trang-chu",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Trang chủ", icon: "mdi-home-cirle-outline" },
    hidden: true,
  },
  {
    path: "/trang-chu",
    redirect: "/trang-chu",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Trang chủ", icon: "mdi-home" },
    children: [
      {
        name: "Trang chủ",
        path: "/trang-chu",
        component: () => import("@/views/home/index.vue"),
        meta: { title: "Trang chủ", icon: "mdi-view-dashboard-outline" },
        role: 1,
      },
    ],
  },
  
  {
    path: "/khach-hang",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Khách hàng", icon: "mdi-library" },
    children: [
      {
        name: "Danh sách",
        path: "/khach-hang/danh-sach",
        component: () => import("@/views/customer/index.vue"),
        meta: { title: "Danh sách", icon: "mdi-card-outline" },
        role: 1,
      },
    ],
  },
  {
    path: "/sinh-nhat",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Sinh nhật", icon: "mdi-cake" },
    children: [
      {
        name: "Sinh nhật",
        path: "/sinh-nhat",
        component: () => import("@/views/birthday/index.vue"),
        meta: { title: "Sinh nhật", icon: "mdi-card-outline" },
        role: 1,
      },
    ],
  },
  // {
  //   path: "/cham-soc",
  //   component: () => import("@/layouts/full/FullLayout.vue"),
  //   role: 1,
  //   meta: { title: "Chăm sóc", icon: "mdi-account-heart" },
  //   children: [
  //     {
  //       name: "Chăm sóc",
  //       path: "/cham-soc",
  //       component: () => import("@/views/material/index.vue"),
  //       meta: { title: "Chăm sóc", icon: "mdi-card-outline" },
  //       role: 1,
  //     },
  //   ],
  // },
  {
    path: "/dia-ban",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 10,
    meta: { title: "Địa bàn", icon: "mdi-map-check" },
    children: [
      {
        name: "Địa bàn",
        path: "/dia-ban",
        component: () => import("@/views/local/index.vue"),
        meta: { title: "Địa bàn", icon: "mdi-card-outline" },
        role: 1,
      },
    
    ],
  },
  // { path: "*", redirect: "/404", hidden: true, role: 1 },
  // {
  //   path: "/404",
  //   redirect: "/",
  //   component: () => import("@/views/404"),
  //   hidden: true,
  // },
];

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory("/"),
  routes: constantRoutes,
});

export default router;
