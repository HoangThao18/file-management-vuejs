<template>
  <div
    class="modal fade w-100"
    id="shareModal"
    tabindex="-1"
    aria-labelledby="shareModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="shareModalLabel">Link share</h5>
            <button
              type="button"
              class="btn-close btnClose"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Select your file"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                v-model="link"
              />

              <button
                @click="handleCopy"
                class="btn btn-primary"
                type="button"
                id="coppy"
              >
                <p class="copied copied-text d-none">copied</p>
                copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
// import Swal from "sweetalert2";
export default {
  props: {
    link_share: {
      type: String,
    },
  },

  setup(props) {
    const link = ref(props.link_share);

    watch(
      () => props.link_share,
      (value) => {
        link.value = value;
      }
    );

    function handleCopy() {
      navigator.clipboard.writeText(link.value);
      const copied = document.querySelector(".copied");
      copied.classList.add("copied-text");
      copied.classList.remove("d-none");
    }

    return { link, handleCopy };
  },
};
</script>

<style>
.copied-text {
  font-size: 14px;
  position: absolute;
  margin-top: 30px;
  z-index: 99;
  color: black;
}
</style>
