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
        component: () => import("@/views/appointment/index.vue"),
        meta: { title: "Sinh nhật", icon: "mdi-card-outline" },
        role: 1,
      },
    ],
  },
  {
    path: "/cham-soc",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Chăm sóc", icon: "mdi-account-heart" },
    children: [
      {
        name: "Chăm sóc",
        path: "/cham-soc",
        component: () => import("@/views/material/index.vue"),
        meta: { title: "Chăm sóc", icon: "mdi-card-outline" },
        role: 1,
      },
      // {
      //   name: "Mua vật liệu",
      //   path: "/vat-lieu-labo/mua-vat-lieu",
      //   component: () => import("@/views/material/components/create.vue"),
      //   meta: { title: "Mua vật liệu", icon: "mdi-card-outline" },
      //   role: 1,
      //   hidden: true,
      // },
    ],
  },
  {
    path: "/dia-ban",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 10,
    meta: { title: "Địa bàn", icon: "mdi-map-check" },
    children: [
      {
        name: "Nhân sự",
        path: "/dia-ban/nhan-su",
        component: () => import("@/views/setting/employ/index.vue"),
        meta: { title: "Nhân sự", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Thuốc",
        path: "/dia-ban/thuoc",
        component: () => import("@/views/setting/product/index.vue"),
        meta: { title: "Thuốc", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Dịch vụ",
        path: "/dia-ban/dich-vu",
        component: () => import("@/views/setting/service/index.vue"),
        meta: { title: "Dịch vụ", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Vật liệu",
        path: "/dia-ban/vat-lieu",
        component: () => import("@/views/setting/labo/index.vue"),
        meta: { title: "Vật liệu", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Mặc định",
        path: "/dia-ban/mac-dinh",
        component: () => import("@/views/setting/default/index.vue"),
        meta: { title: "Mặc định", icon: "mdi-card-outline" },
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
