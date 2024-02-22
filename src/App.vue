<template>
  <router-view />
</template>

<script>
import { onMounted } from "vue";
export default {
  setup() {
    onMounted(() => {
      console.log("app");
    });
  },
};
</script>
<style>
.small-popup {
  width: 300px;
  height: 200px;
}
</style>
