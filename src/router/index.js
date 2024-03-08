import { createRouter, createWebHistory } from "vue-router";

export const constantRoutes = [
  {
    path: "/dang-nhap",
    component: () => import("@/views/auth/login.vue"),
    hidden: true,
  },
 
  {
    path: "/",
    redirect: "/nhap-hang",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Nhập hàng", icon: "mdi-home-import-outline" },
    hidden: true,
  },
  {
    path: "/nhap-hang",
    redirect: "/nhap-hang",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Nhập hàng", icon: "mdi-home-import-outline" },
    children: [
      {
        name: "Nhập hàng",
        path: "/nhap-hang",
        component: () => import("@/views/import/index.vue"),
        meta: { title: "Nhập hàng", icon: "mdi-home-import-outline" },
        role: 1,
      },
    ],
  },
  
  {
    path: "/xuat-hang",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Xuất hàng", icon: "mdi-home-export-outline" },
    children: [
      {
        name: "Xuất hàng",
        path: "/xuat-hang",
        component: () => import("@/views/customer/index.vue"),
        meta: { title: "Xuất hàng", icon: "mdi-card-outline" },
        role: 1,
      },
    ],
  },
  {
    path: "/hoa-don",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Hóa Đơn", icon: "mdi-cellphone-text" },
    children: [
      {
        name: "Hóa Đơn",
        path: "/hoa-don",
        component: () => import("@/views/birthday/index.vue"),
        meta: { title: "Hóa Đơn", icon: "mdi-card-outline" },
        role: 1,
      },
    ],
  },
  {
    path: "/kiem-kho",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Tồn kho", icon: "mdi-warehouse" },
    children: [
      {
        name: "Tồn kho",
        path: "/kiem-kho",
        component: () => import("@/views/storage/index.vue"),
        meta: { title: "Tồn kho", icon: "mdi-card-outline" },
        role: 1,
      },
    ],
  },
  {
    path: "/truy-xuat",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Truy xuất", icon: "mdi-file-search" },
    children: [
      {
        name: "Truy xuất",
        path: "/truy-xuat",
        component: () => import("@/views/find-item/index.vue"),
        meta: { title: "Truy xuất", icon: "mdi-card-outline" },
        role: 1,
      },
    ],
  },
  
  //   ],
  // },
  // { path: "*", redirect: "/", hidden: true, role: 1 },
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
