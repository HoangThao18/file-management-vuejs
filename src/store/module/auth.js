import {
  login,
  logout,
  register,
  redirectLoginGoogle,
} from "../../api/auth.js";
import Swal from "sweetalert2";

const state = () => ({
  userLogin: null,
  messageErrRegister: "",
});
const mutations = {
  loginUserMutations(state, { userLogin, router }) {
    if (userLogin.success) {
      state.userLogin = userLogin.data.user;
      window.localStorage.setItem(
        "token",
        JSON.stringify(userLogin.data.access_token)
      );
      window.localStorage.setItem(
        "userLogin",
        JSON.stringify(userLogin.data.user)
      );
      router.push({ name: "home" });
    }
  },

  setUserMutations(state, payload) {
    state.userLogin = payload;
  },

  logoutMutation(state, router) {
    state.userLogin = null;
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("userLogin");
    router.push("/");
  },

  setErrorMutaions(state, data) {
    state.messageErrRegister = data;
  },
};
const actions = {
  async loginUserAction(context, { dataLogin, router }) {
    try {
      const userLogin = await login(dataLogin);
      context.commit("loginUserMutations", { userLogin, router });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.errors,
        showConfirmButton: true,
      });
    }
  },

  loadUserAction(context) {
    const user = JSON.parse(localStorage.getItem("userLogin"));
    context.commit("setUserMutations", user);
  },

  async logoutAction(context, router) {
    await logout();
    context.commit("logoutMutation", router);
    location.reload();
  },

  async redirectGoogleLoginAction() {
    const res = await redirectLoginGoogle();
    window.location.href = res.data.data.url;
  },
  async GoogleCallbackAction(context, { params, router }) {
    fetch(`https://hoangthao.site/public/api/login/google/callback?${params}`, {
      headers: new Headers({ accept: "application/json" }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong!");
      })
      .then((data) => {
        context.commit("loginUserMutations", { userLogin: data, router });
      })
      .catch((error) => {
        console.error(error);
      });
  },

  async registerAction(context, { data, router }) {
    try {
      const result = await register(data);
      if (result.success) {
        Swal.fire({
          title: "success",
          icon: "success",
          background: "#fff ",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/login");
          }
        });
      }
    } catch (error) {
      context.commit("setErrorMutaions", error.response.data.errors);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
