<template>
  <header id="page-topbar">
    <div class="navbar-header">
      <div class="col-3"></div>

      <div class="d-flex col-6">
        <!-- App Search-->
        <form class="app-search d-none d-lg-block w-75">
          <div class="position-relative search w-100">
            <input type="text" class="form-control" placeholder="Search..." />
            <span class="bx bx-search-alt"></span>
          </div>
        </form>
      </div>

      <div class="d-flex col-3 ml-auto">
        <div class="dropdown d-inline-block d-lg-none ms-2">
          <button
            type="button"
            class="btn header-item noti-icon waves-effect"
            id="page-header-search-dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="mdi mdi-magnify"></i>
          </button>
          <div
            class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
            aria-labelledby="page-header-search-dropdown"
          >
            <form class="p-3">
              <div class="form-group m-0">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search ..."
                    aria-label="Recipient's username"
                  />
                  <div class="input-group-append">
                    <button class="btn btn-primary" type="submit">
                      <i class="mdi mdi-magnify"></i>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div
          v-if="!user"
          style="line-height: 70px"
          class="text-center align-item-center"
        >
          <router-link
            class="text-dark text-decoration-none btn btn-outline-info"
            to="/login"
            >Sign In</router-link
          >
        </div>

        <div v-if="user" class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item waves-effect"
            id="page-header-user-dropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <img
              class="rounded-circle header-profile-user"
              src="https://i.pinimg.com/originals/2b/0f/7a/2b0f7a9533237b7e9b49f62ba73b95dc.jpg"
              alt="Header Avatar"
            />
            <span class="d-none d-xl-inline-block ms-1" key="t-henry">{{
              user.name
            }}</span>
            <svg-icon
              class="d-none d-xl-inline-block"
              type="mdi"
              :path="downIcon"
            ></svg-icon>
          </button>
          <div class="dropdown-menu dropdown-menu-end">
            <!-- item-->
            <a class="dropdown-item" href="#"
              ><i class="bx bx-user font-size-16 align-middle me-1"></i>
              <span key="t-profile">Profile</span></a
            >

            <div class="dropdown-divider"></div>
            <a class="dropdown-item text-danger" href="#"
              ><i
                class="bx bx-power-off font-size-16 align-middle me-1 text-danger"
              ></i>
              <span key="t-logout" @click="handleLogout">Logout</span></a
            >
          </div>
        </div>

        <div class="dropdown d-inline-block">
          <button
            type="button"
            class="btn header-item noti-icon right-bar-toggle waves-effect"
          >
            <i class="bx bx-cog bx-spin"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronDown } from "@mdi/js";
export default {
  components: {
    SvgIcon,
  },
  setup() {
    const downIcon = ref(mdiChevronDown);
    const store = useStore();
    const router = useRouter();
    const user = computed(() => store.state.auth.userLogin);
    store.dispatch("auth/loadUserAction");

    function handleLogout() {
      store.dispatch("auth/logoutAction", router);
    }

    return { user, handleLogout, downIcon };
  },
};
</script>

<style>
.search {
  border: 1px solid #d1d1d1;
  border-radius: 10px;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.1);
}
</style>
