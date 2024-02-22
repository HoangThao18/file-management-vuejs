<template>
  <div v-if="uploadProgress" class="wrapper p-0 w-25 text-center">
    <p style="display: inline-block" class="text-dark fw-bold m-0">Upoading</p>
    <div class="dot">.</div>
    <div class="dot">.</div>
    <div class="dot">.</div>

    <div class="progress m-3 w-75 mx-auto" style="height: 7px; width: 100px">
      <div
        class="progress-bar text-center"
        role="progressbar"
        :style="{ width: uploadProgress + '%' }"
        aria-valuenow="100"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    uploadProgress: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped>
div.caption {
  text-align: center;
  color: #ffffff90;
  font-family: "Noto Sans", sans-serif;
}

div.dot {
  display: inline-block;
  margin: 0px;
  padding: 0px;
  animation: dot 1s infinite linear;
}

div.dot:nth-child(2) {
  animation-delay: 0.2s;
}

div.dot:nth-child(3) {
  animation-delay: 0.4s;
}
@keyframes dot {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}

::selection {
  background-color: transparent;
}

.wrapper {
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 99;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
  padding: 0px 100px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>
