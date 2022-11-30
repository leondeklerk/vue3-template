import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import App from "./App.vue";
import router from "./router";

import "bootstrap/dist/css/bootstrap.css";
import "./assets/main.css";

const app = createApp(App);

/* Font Awesome*/
library.add(faLink);
app.component("FontAwesomeIcon", FontAwesomeIcon);

app.use(createPinia());
app.use(router);

app.mount("#app");
