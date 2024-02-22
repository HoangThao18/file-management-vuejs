<template>
  <section class="vh-98 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                <p class="text-white-50 mb-5">
                  Please enter your login and password!
                </p>
                <form @submit.prevent="handleLogin" method="post">
                  <div class="form-outline form-white mb-4">
                    <input
                      type="email"
                      name="email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                      v-model="dataLogin.email"
                    />
                    <label class="form-label" for="typeEmailX">Email</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input
                      type="password"
                      id="typePasswordX"
                      name="password"
                      class="form-control form-control-lg"
                      v-model="dataLogin.password"
                    />
                    <label class="form-label" for="typePasswordX"
                      >Password</label
                    >
                  </div>

                  <p class="small mb-5 pb-lg-2">
                    <a class="text-white-50" href="#!">Forgot password?</a>
                  </p>

                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Login
                  </button>
                </form>

                <div
                  class="d-flex justify-content-center text-center mt-4 pt-1"
                >
                  <a
                    class="text-white text-decoration-none cursor-pointer"
                    @click="redirectGoogleLoginAction"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-google"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"
                      />
                    </svg>
                    login with google</a
                  >
                </div>
              </div>

              <div>
                <p class="mb-0">
                  Don't have an account?
                  <router-link class="text-white-50 fw-bold" to="/register"
                    >Sign Up</router-link
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: {},
  setup() {
    const router = useRouter();
    const store = useStore();
    const message = computed(() => store.state.auth.messageErrLogin);
    const dataLogin = reactive({ email: "", password: "" });

    function handleLogin() {
      store.dispatch("auth/loginUserAction", { dataLogin: dataLogin, router });
    }

    function redirectGoogleLoginAction() {
      store.dispatch("auth/redirectGoogleLoginAction");
    }

    return {
      dataLogin,
      handleLogin,
      message,
      redirectGoogleLoginAction,
    };
  },
};
</script>

<style>
.gradient-custom {
  background: url("https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-position: cover;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
