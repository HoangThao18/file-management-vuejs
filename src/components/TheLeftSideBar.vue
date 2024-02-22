<template>
  <div class="card filemanager-sidebar me-md-2">
    <div class="card-body">
      <div class="d-flex flex-column h-100">
        <div class="mb-4">
          <div class="mb-3">
            <div class="dropdown">
              <button
                class="btn btn-light w-100"
                type="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-bs-target="#createFolderModal"
              >
                <svg-icon type="mdi" :path="plusIcon"></svg-icon> Create New
              </button>
              <div class="dropdown-menu w-100" style="">
                <input
                  multiple
                  type="file"
                  id="folder"
                  name="folder"
                  style="visibility: hidden"
                  class="d-none"
                  webkitdirectory
                  directory
                  @change="handleUploadFolder"
                />
                <label for="folder" class="dropdown-item">
                  <i class="bx bx-folder me-1"></i>Upload folder
                </label>

                <input
                  @change="handleUploadFile"
                  multiple
                  type="file"
                  id="file"
                  name="files"
                  style="visibility: hidden"
                  class="d-none"
                  ref="files"
                />
                <label for="file" class="dropdown-item">
                  <i class="bx bx-file me-1"></i>Upload file
                </label>

                <input
                  style="visibility: hidden"
                  class="d-none"
                  name="newFolder"
                />
                <button
                  type="button"
                  class="btn btn-light bg-white border-0 w-100 text-left p-0 text-start"
                  data-bs-toggle="modal"
                  data-bs-target="#createFolderModal"
                >
                  <label for="newFolder" class="dropdown-item text-left">
                    <svg-icon
                      style="width: 18px; height: 18px"
                      class="bx m-0"
                      type="mdi"
                      :path="plusIcon"
                    ></svg-icon>
                    Create folder
                  </label>
                </button>
              </div>
            </div>
          </div>
          <ul class="list-unstyled categories-list">
            <li @click="getRootFile">
              <div class="custom-accordion">
                <a
                  class="text-body fw-medium py-1 d-flex align-items-center text-decoration-none collapsed"
                  data-bs-toggle="collapse"
                  href="#categories-collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="categories-collapse"
                >
                  <svg-icon
                    class="text-warning pl-2 font-size-16 me-2"
                    type="mdi"
                    :path="folderIcon"
                  ></svg-icon>
                  Files
                </a>
              </div>
            </li>

            <li @click="handleGetStarred">
              <a
                href="javascript: void(0);"
                class="text-body d-flex align-items-center text-decoration-none"
              >
                <svg-icon
                  class="font-size-16 me-2"
                  type="mdi"
                  :path="starIcon"
                ></svg-icon>
                <span class="me-auto">Starred</span>
              </a>
            </li>
            <li @click="getTrashAll">
              <a
                href="javascript: void(0);"
                class="text-body d-flex align-items-center text-decoration-none"
              >
                <svg-icon
                  class="font-size-16 me-2 text-danger"
                  type="mdi"
                  :path="trashIcon"
                ></svg-icon>
                <span class="me-auto">Trash</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <ProgressUpload :uploadProgress="uploadProgress"></ProgressUpload>
  </Teleport>
  <ModalCreateFolderVue></ModalCreateFolderVue>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import ModalCreateFolderVue from "./ModalCreateFolder.vue";
import ProgressUpload from "./ProgressUpload.vue";
import {
  mdiPlus,
  mdiFolder,
  mdiShareVariantOutline,
  mdiStarOutline,
  mdiTrashCanOutline,
} from "@mdi/js";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  components: {
    SvgIcon,
    ModalCreateFolderVue,
    ProgressUpload,
  },
  setup(props, { emit }) {
    const plusIcon = ref(mdiPlus);
    const folderIcon = ref(mdiFolder);
    const shareIcon = ref(mdiShareVariantOutline);
    const starIcon = ref(mdiStarOutline);
    const trashIcon = ref(mdiTrashCanOutline);
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    let isTrashContentVisible = false;
    const uploadProgress = ref(0);

    function handleUploadFile(e) {
      const files = e.target.files;
      let formData = new FormData();
      console.log("formData");
      const parentFolder = route.params;
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("files[" + i + "]", file);
      }

      store.dispatch("file/uploadFileAction", {
        formData,
        uploadProgress,
        parentFolder,
      });
    }

    function handleUploadFolder(e) {
      const files = e.target.files;
      let formData = new FormData();
      const parentFolder = route.params;

      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("files[" + i + "]", file);
        formData.append(
          "relative_paths[" + i + "]",
          files[i].webkitRelativePath
        );
      }
      store.dispatch("file/uploadFolderAction", {
        formData,
        parentFolder,
        uploadProgress,
      });
    }

    function getTrashAll() {
      isTrashContentVisible = true;
      emit("showTrash", isTrashContentVisible);
      store.dispatch("file/getTrashAction", router);
    }

    function getRootFile() {
      isTrashContentVisible = false;
      emit("showTrash", isTrashContentVisible);
      router.push("/");
      store.dispatch("file/getRootFileAction", router);
    }

    function handleGetStarred() {
      store.dispatch("file/getStarredAction");
    }
    return {
      plusIcon,
      folderIcon,
      shareIcon,
      starIcon,
      trashIcon,
      handleUploadFile,
      handleUploadFolder,
      getTrashAll,
      getRootFile,
      uploadProgress,
      handleGetStarred,
    };
  },
};
</script>

<style scoped>
.card {
  height: 570px;
}
</style>
