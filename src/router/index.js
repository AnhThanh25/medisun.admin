import { createRouter, createWebHistory } from "vue-router";

export const constantRoutes = [
  {
    path: "/login",
    component: () => import("@/views/auth/login.vue"),
    hidden: true,
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Trang chủ", icon: "mdi-home" },
    hidden: true,
  },

  {
    path: "/dash",
    redirect: "/dashboard",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Trang chủ", icon: "mdi-home" },
    children: [
      {
        name: "Dashboard",
        path: "/dashboard",
        component: () => import("@/views/dashboard/Dashboard.vue"),
        meta: { title: "Thống kê", icon: "mdi-view-dashboard-outline" },
        role: 1,
      },
      {
        name: "Alerts",
        path: "/dashboard/alert",
        component: () => import("@/views/ui-components/Alerts.vue"),
        meta: { title: "Thông báo", icon: "mdi-alert-circle-outline" },
        role: 1,
      },
      {
        name: "Buttons",
        path: "/dashboard/buttons",
        component: () => import("@/views/ui-components/Buttons.vue"),
        meta: { title: "Nút bấm", icon: "mdi-radiobox-blank" },
        role: 1,
      },
    ],
  },
  {
    path: "/kham-benh",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Khám bệnh", icon: "mdi-hospital" },
    children: [
      {
        name: "Cards",
        path: "/kham-benh/cards",
        component: () => import("@/views/ui-components/Cards.vue"),
        meta: { title: "Thẻ", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Menus",
        path: "/kham-benh/menus",
        component: () => import("@/views/ui-components/Menus.vue"),
        meta: { title: "Menu", icon: "mdi-form-dropdown" },
        role: 1,
      },
      {
        name: "Tables",
        path: "/kham-benh/tables",
        component: () => import("@/views/ui-components/Tables.vue"),
        meta: { title: "Bảng", icon: "mdi-table" },
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
  // { path: "*", redirect: "/404", hidden: true, role: 1 },
  {
    path: "/404",
    redirect: "/",
    component: () => import("@/views/404"),
    hidden: true,
  },
];

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory("/"),
  routes: constantRoutes,
});

export default router;
