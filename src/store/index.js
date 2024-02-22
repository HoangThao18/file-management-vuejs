import { createStore } from "vuex";
import auth from "./module/auth";
import file from "./module/file";
export default createStore({
  modules: { auth, file },
});
