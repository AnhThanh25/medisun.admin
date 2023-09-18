import { createVuetify } from "vuetify";
import type { ThemeDefinition } from "vuetify";

import "@mdi/font/css/materialdesignicons.css";
// import * as component from "vuetify/components";
import * as directives from "vuetify/directives";
import { VDataTable } from "vuetify/labs/VDataTable";
import { VDatePicker } from 'vuetify/labs/VDatePicker'
// import "v-calendar/style.css";
const Lighttheme: ThemeDefinition = {
  variables: {},
  colors: {
    primary: "#ee8a6a",
    info: "#03c9d7",
    success: "#05b187",
    accent: "#fc4b6c",
    warning: "#fec90f",
    error: "#fc4b6c",
    secondary: "#03c9d7",
    more: "#999",
  },
};

export default createVuetify({
  // component,
  directives,
  theme: {
    themes: {
      light: Lighttheme,
    },
  },
  components: {
    VDataTable,
    VDatePicker
  },
  defaults: {
    VBtn: {
      color: "primary",
      rounded: "lg",
      flat: true,
      fontWeight: "400",
      letterSpacing: "0",
    },
    VCard: {
      flat: true,
      elevation: 0,
      padding: 20,
    },
    VTextField: {
      rounded: "lg",
      color: "secondary",
      density: "compact",
      variant: "outlined",
    },
    VSelect: {
      variant: "outlined",
      density: "compact",
    },
    VAutocomplete: {
      variant: "outlined",
      density: "compact",
    },
    VCheckbox: {
      color: "secondary",
    },
    VFileInput: {
      variant: "outlined",
      density: "compact",
      color: "secondary",
    },
    VDatePicker:{
      variant: "outlined",
      density: "compact",
      color: "secondary",
    }
  },
});
