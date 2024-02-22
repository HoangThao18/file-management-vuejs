<template>
  <section class="vh-98 gradient-custom">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card bg-dark text-white" style="border-radius: 1rem">
            <div class="card-body p-5 text-center">
              <div class="mb-md-5 mt-md-4 pb-5">
                <h2 class="fw-bold mb-2 text-uppercase">Register</h2>
                <p class="text-white-50 mb-5">Please enter your information!</p>

                <form @submit.prevent="handleRegister" method="post">
                  <div class="form-outline form-white mb-4">
                    <small v-if="errors.name" class="text-danger">{{
                      errors.name[0]
                    }}</small>

                    <input
                      type="text"
                      id="typeEmailX"
                      v-model="userRegister.name"
                      class="form-control form-control-lg"
                    />
                    <label class="form-label" for="typeEmailX">Name</label>
                  </div>
                  <div class="form-outline form-white mb-4">
                    <small v-if="errors.email" class="text-danger">{{
                      errors.email[0]
                    }}</small>
                    <input
                      type="email"
                      id="typeEmailX"
                      class="form-control form-control-lg"
                      v-model="userRegister.email"
                    />
                    <label class="form-label" for="typeEmailX">Email</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <small v-if="errors.password" class="text-danger">{{
                      errors.password[0]
                    }}</small>
                    <input
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                      v-model="userRegister.password"
                    />
                    <label class="form-label" for="typePasswordX"
                      >Password</label
                    >
                  </div>

                  <div class="form-outline form-white mb-4">
                    <small v-if="errors.password_confirm" class="text-danger">{{
                      errors.password_confirm[0]
                    }}</small>
                    <input
                      type="password"
                      id="typePasswordX"
                      class="form-control form-control-lg"
                      v-model="userRegister.password_confirm"
                    />
                    <label class="form-label" for="typePasswordX"
                      >Confirm password</label
                    >
                  </div>

                  <button
                    class="btn btn-outline-light btn-lg px-5"
                    type="submit"
                  >
                    Register
                  </button>
                </form>
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
  setup() {
    const store = useStore();
    const router = useRouter();
    const userRegister = reactive({
      name: "",
      email: "",
      password: "",
      password_confirm: "",
    });

    function handleRegister() {
      store.dispatch("auth/registerAction", {
        data: userRegister,
        router,
      });
    }

    const errors = computed(() => store.state.auth.messageErrRegister);

    return { userRegister, handleRegister, errors };
  },
};
</script>

<style>
.gradient-custom {
  background: url("https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-position: cover;
}
</style>
