import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "@/scss/style.scss";
import VueApexCharts from "vue3-apexcharts";
import "vuetify/dist/vuetify.min.css";
import Notifications from '@kyvg/vue3-notification'
// // @ts-ignore:next-line
// import "vuetify/styles";
import "@/permission"; // permission control

import VCalendar from "v-calendar";
import "v-calendar/style.css";

// Use plugin with optional defaults
const app = createApp(App);
app.use(VCalendar, {});

app.use(VueApexCharts);
app.use(router);
app.use(vuetify).mount("#app");
app.use(Notifications)
import { notify } from "@kyvg/vue3-notification";
window.notify = notify;
