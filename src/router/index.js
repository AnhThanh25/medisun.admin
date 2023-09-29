import { createRouter, createWebHistory } from "vue-router";

export const constantRoutes = [
  {
    path: "/dang-nhap",
    component: () => import("@/views/auth/login.vue"),
    hidden: true,
  },
  {
    path: "/dang-ky",
    component: () => import("@/views/auth/register.vue"),
    hidden: true,
  },
  {
    path: "/quen-mat-khau",
    component: () => import("@/views/auth/forget-pass.vue"),
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
      // {
      //   name: "Dashboard",
      //   path: "/dashboard",
      //   component: () => import("@/views/dashboard/Dashboard.vue"),
      //   meta: { title: "Thống kê", icon: "mdi-view-dashboard-outline" },
      //   role: 1,
      // },
      // {
      //   name: "Alerts",
      //   path: "/dashboard/alert",
      //   component: () => import("@/views/ui-components/Alerts.vue"),
      //   meta: { title: "Thông báo", icon: "mdi-alert-circle-outline" },
      //   role: 1,
      // },
      // {
      //   name: "Buttons",
      //   path: "/dashboard/buttons",
      //   component: () => import("@/views/ui-components/Buttons.vue"),
      //   meta: { title: "Nút bấm", icon: "mdi-radiobox-blank" },
      //   role: 1,
      // },
    ],
  },
  {
    path: "/kham-benh",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Khám bệnh", icon: "mdi-hospital-box-outline" },
    children: [
      {
        name: "Khám tổng quát",
        path: "/kham-benh/tong-quat",
        component: () => import("@/views/general/index.vue"),
        meta: { title: "Khám tổng quát", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Tạo phiếu tổng quát",
        path: "/kham-benh/tao-phieu-tong-quat",
        component: () => import("@/views/general/create.vue"),
        meta: { title: "Tạo phiếu tổng quát", icon: "mdi-card-outline" },
        role: 1,
        hidden: true,
      },
      {
        name: "Cập nhật phiếu tổng quát",
        path: "/kham-benh/cap-nhat-phieu-tong-quat/:id",
        component: () => import("@/views/general/update.vue"),
        meta: { title: "Cập nhật phiếu tổng quát", icon: "mdi-card-outline" },
        role: 1,
        hidden: true,
      },
      {
        name: "Phiếu khám",
        path: "/kham-benh/phieu-kham",
        component: () => import("@/views/medical/index.vue"),
        meta: { title: "Phiếu khám", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Tạo phiếu khám",
        path: "/kham-benh/tao-phieu-kham",
        component: () => import("@/views/medical/components/create.vue"),
        meta: { title: "Tạo phiếu khám", icon: "mdi-card-outline" },
        role: 1,
        hidden: true,
      },
      {
        name: "Cập nhật phiếu khám",
        path: "/kham-benh/cap-nhat-phieu-kham/:id",
        component: () => import("@/views/medical/components/update.vue"),
        meta: { title: "Tạo phiếu khám", icon: "mdi-card-outline" },
        role: 1,
        hidden: true,
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
    path: "/lich-hen",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Lịch hẹn", icon: "mdi-clock" },
    children: [
      {
        name: "Lịch hẹn",
        path: "/lich-hen",
        component: () => import("@/views/appointment/index.vue"),
        meta: { title: "Lịch hẹn", icon: "mdi-card-outline" },
        role: 1,
      },
    ],
  },
  {
    path: "/vat-lieu-labo",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Vật liệu labo", icon: "mdi-tooth" },
    children: [
      {
        name: "Vật liệu labo",
        path: "/vat-lieu-labo",
        component: () => import("@/views/material/index.vue"),
        meta: { title: "Vật liệu labo", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Mua vật liệu",
        path: "/vat-lieu-labo/mua-vat-lieu",
        component: () => import("@/views/material/components/create.vue"),
        meta: { title: "Mua vật liệu", icon: "mdi-card-outline" },
        role: 1,
        hidden: true,
      },
    ],
  },
  {
    path: "/cai-dat",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 10,
    meta: { title: "Cài đặt", icon: "mdi-cog" },
    children: [
      {
        name: "Nhân sự",
        path: "/cai-dat/nhan-su",
        component: () => import("@/views/setting/employ/index.vue"),
        meta: { title: "Nhân sự", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Thuốc",
        path: "/cai-dat/thuoc",
        component: () => import("@/views/setting/product/index.vue"),
        meta: { title: "Thuốc", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Dịch vụ",
        path: "/cai-dat/dich-vu",
        component: () => import("@/views/setting/service/index.vue"),
        meta: { title: "Dịch vụ", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Vật liệu",
        path: "/cai-dat/vat-lieu",
        component: () => import("@/views/setting/labo/index.vue"),
        meta: { title: "Vật liệu", icon: "mdi-card-outline" },
        role: 1,
      },
      {
        name: "Mặc định",
        path: "/cai-dat/mac-dinh",
        component: () => import("@/views/setting/default/index.vue"),
        meta: { title: "Mặc định", icon: "mdi-card-outline" },
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
