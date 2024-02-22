<template>
  <div
    class="d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <!-- <div class="spinner-border" role="status">
      <span class="sr-only">Loading...</span>
    </div> -->
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const loading = ref(false);
    console.log("create");
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const fullPath = route.fullPath;

    const params = fullPath.split("?")[1] || "";

    onBeforeMount(() => {
      store.dispatch("auth/GoogleCallbackAction", { params, router });
    });

    return { loading };
  },
};
</script>

<style></style>
