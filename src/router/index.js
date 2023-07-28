import { createRouter, createWebHistory } from "vue-router";

export const constantRoutes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Trang chủ", icon: "file_copy" },
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
        path: "/ui-components/alert",
        component: () => import("@/views/ui-components/Alerts.vue"),
        meta: { title: "Thông báo", icon: "mdi-alert-circle-outline" },
        role: 1,
      },
      {
        name: "Buttons",
        path: "/ui-components/buttons",
        component: () => import("@/views/ui-components/Buttons.vue"),
        meta: { title: "Nút bấm", icon: "mdi-radiobox-blank" },
        role: 1,
      },
    ],
  },
  {
    path: "/",
    redirect: "/dashboard",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Trang chủ", icon: "file_copy" },
    children: [
      {
        name: "Cards",
        path: "/ui-components/cards",
        component: () => import("@/views/ui-components/Cards.vue"),
        meta: { title: "Thẻ", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Menus",
        path: "/ui-components/menus",
        component: () => import("@/views/ui-components/Menus.vue"),
        meta: { title: "Menu", icon: "mdi-form-dropdown" },
        role: 1,
      },
      {
        name: "Tables",
        path: "/ui-components/tables",
        component: () => import("@/views/ui-components/Tables.vue"),
        meta: { title: "Bảng", icon: "mdi-table" },
        role: 1,
      },
    ],
  },
];

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHistory("/"),
  routes: constantRoutes,
});

export default router;
