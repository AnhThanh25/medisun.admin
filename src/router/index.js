import { createRouter, createWebHistory } from "vue-router";

export const constantRoutes = [
  {
    path: "/dang-nhap",
    component: () => import("@/views/auth/login.vue"),
    hidden: true,
  },

  {
    path: "/",
    redirect: "/danh-sach-bai-viet",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Danh sách bài viết", icon: "mdi-home-import-outline" },
    hidden: true,
  },
  {
    path: "/danh-sach-bai-viet",

    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Danh sách bài viết", icon: "mdi-clipboard-list" },
    children: [
      {
        name: "Danh sách bài viết",
        path: "/danh-sach-bai-viet",
        component: () => import("@/views/post/index.vue"),
        meta: { title: "Danh sách bài viết", icon: "mdi-home-import-outline" },
        role: 1,
      },
    ],
  },

  {
    path: "/tao-bai-viet",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Tạo bài viết", icon: "mdi-file-edit" },
    children: [
      {
        name: "Tạo bài viết",
        path: "/tao-bai-viet",
        component: () => import("@/views/post/CreatePost.vue"),
        meta: { title: "Tạo bài viết", icon: "mdi-document-edit" },
        role: 1,
      },
      {
        name: "Chi tiết bài viết",
        path: "/bai-viet/:tab",
        component: () => import("@/views/post/UpdatePost.vue"),
        meta: { title: "Tạo bài viết", icon: "mdi-document-edit" },
        role: 1,
        hidden:true
      },
    ],
  },
  {
    path: "/banner",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Banner", icon: "mdi-image-area" },
    children: [
      {
        name: "Banner",
        path: "/banner",
        component: () => import("@/views/post/bannerLst.vue"),
        meta: { title: "Banner", icon: "mdi-card-outline" },
        role: 1,
      },
    ],
  },
  {
    path: "/san-pham",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Sản phẩm", icon: "mdi-medical-bag" },
    children: [
      {
        name: "Sản phẩm",
        path: "/san-pham",
        component: () => import("@/views/products/ProductListShow.vue"),
        meta: { title: "Sản phẩm", icon: "mdi-card-outline" },
        role: 1,
      },
    ],
  },
  {
    path: "/yeu-cau-ho-tro",
    component: () => import("@/layouts/full/FullLayout.vue"),
    role: 1,
    meta: { title: "Yêu cầu hỗ trợ", icon: "mdi-headphones-settings" },
    children: [
      {
        name: "Yêu cầu hỗ trợ",
        path: "/yeu-cau-ho-tro",
        component: () => import("@/views/request/index.vue"),
        meta: { title: "Yêu cầu hỗ trợ", icon: "mdi-card-outline" },
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
