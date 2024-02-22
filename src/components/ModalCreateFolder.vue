<template>
  <div
    class="modal fade"
    id="createFolderModal"
    tabindex="-1"
    aria-labelledby="createFolderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createFolderModalLabel">
            Create New Folder
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form @submit.prevent="handleCreateFolder" ref="formFolder">
          <div class="modal-body">
            <div class="mb-3">
              <label for="folder-name" class="col-form-label">Name:</label>
              <input
                type="text"
                class="form-control"
                id="folder-name"
                name="name"
                v-model="formData.name"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="submit"
              data-bs-dismiss="modal"
              class="btn btn-primary"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import Swal from "sweetalert2";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const formData = reactive({ name: "", parent_id: null });

    function handleCreateFolder() {
      formData.parent_id = route.params.id;
      store.dispatch("file/createFolderAction", { formData, Swal });
      formData.name = "";
    }

    return { formData, handleCreateFolder };
  },
};
</script>

<style></style>
