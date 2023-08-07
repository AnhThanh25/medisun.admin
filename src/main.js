import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@/scss/style.scss";
import VueApexCharts from "vue3-apexcharts";
import 'vuetify/dist/vuetify.min.css'

// // @ts-ignore:next-line
// import "vuetify/styles";

import '@/permission' // permission control

const app = createApp(App);

app.use(VueApexCharts);
app.use(router);
app.use(vuetify).mount("#app");
