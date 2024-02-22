<template>
  <div class="w-100">
    <div class="card wrap">
      <div class="card-body">
        <!-- <ProgressUpload></ProgressUpload> -->
        <div>
          <div class="row mb-3 justify-content-between">
            <div class="col-xl-5 col-sm-3">
              <div
                class="mt-6 h-100 d-flex align-items-center btn"
                @click="changeDirectoryFolder"
              >
                <h5 class="m-0">
                  <svg-icon
                    class="fs-1"
                    type="mdi"
                    :path="mdiHomeAccount"
                  ></svg-icon>

                  My Files
                </h5>
              </div>
            </div>
            <div class="col-xl-7 d-flex justify-content-around">
              <div
                v-if="!isShowTrash && !isShareView"
                class="col-xl-3 col-sm-3 w-25"
              >
                <button
                  @click="handleDeleteFile"
                  class="btn btn-light border border-dark px-3 py-2"
                >
                  <svg-icon type="mdi" :path="mdiTrashCan"></svg-icon>
                  Delete
                </button>
              </div>
              <div
                v-if="!isShowTrash && !isShareView"
                class="col-xl-3 col-sm-3"
              >
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#shareModal"
                  @click="handleShare"
                  class="btn btn-light border border-dark px-3 py-2"
                >
                  <svg-icon
                    type="mdi"
                    :path="mdiShareVariantOutline"
                  ></svg-icon>

                  Share
                </button>
              </div>

              <div v-if="!isShowTrash" class="col-xl-3 col-sm-3">
                <button
                  @click="download"
                  class="btn btn-light border border-dark px-2 py-2"
                >
                  <svg-icon type="mdi" :path="mdiDownload"></svg-icon>

                  Download
                </button>
              </div>

              <div v-if="isShowTrash" class="col-xl-2 col-sm-3 w-25">
                <button
                  @click="handleRestore"
                  class="btn btn-light border border-dark px-3 py-2"
                >
                  <svg-icon type="mdi" :path="mdiRestore"></svg-icon>

                  Restore
                </button>
              </div>

              <div v-if="isShowTrash" class="col-xl-2 col-sm-3 w-25">
                <button
                  @click="deleteFilePermanently"
                  class="btn btn-light border border-dark px-3 py-2"
                >
                  <svg-icon type="mdi" :path="mdiTrashCan"></svg-icon>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <div class="table-responsive overflow-hidden table-fix">
            <table class="table align-middle table-nowrap table-hover mb-0">
              <thead>
                <tr>
                  <th ref="th"></th>
                  <th scope="col">Name</th>
                  <th scope="col">Date modified</th>
                  <th scope="col" colspan="2">Size</th>
                </tr>
              </thead>
              <tbody>
                <list-file
                  @handleSelectedFolder="handleSelectFolder"
                  @handleSelectedFile="handleSelectFile"
                  @resetSelection="resetSelection"
                  :checkAll="isChecked"
                ></list-file>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <ModalShare
      :link_share="linkShare"
      :isShowModalShare="isShowModalShare"
    ></ModalShare>
    <!-- end card -->
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiDotsVertical,
  mdiShareVariantOutline,
  mdiDownload,
  mdiHomeAccount,
  mdiTrashCan,
  mdiRestore,
} from "@mdi/js";
import { ref } from "vue";
import ListFile from "./ListFile.vue";
import Swal from "sweetalert2/dist/sweetalert2";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import ModalShare from "./ModalShare.vue";

export default {
  components: {
    ListFile,
    SvgIcon,
    ModalShare,
  },
  props: {
    isShowTrash: {
      type: Boolean,
    },
    isShareView: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const verticalIcon = ref(mdiDotsVertical);
    let fileListSelected = [];
    let folderListSelected = [];
    const store = useStore();
    const router = useRouter();
    let linkShare = ref("");

    function handleSelectFile(file) {
      if (file.isSelected) {
        fileListSelected.push(file);
      } else {
        const index = fileListSelected.indexOf(file);
        if (index > -1) {
          fileListSelected.splice(index, 1);
        }
      }
    }

    function handleSelectFolder(folder) {
      if (folder.isSelected) {
        folderListSelected.push(folder);
      } else {
        const index = folderListSelected.indexOf(folder);
        if (index > -1) {
          folderListSelected.splice(index, 1);
        }
      }
    }

    function handleDeleteFile() {
      Swal.fire({
        title: "Are you sure to move to trash selected file?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          if (fileListSelected.length <= 0 && folderListSelected.length <= 0) {
            Swal.fire({
              icon: "error",
              text: "No file selected",
              showConfirmButton: true,
            });
          } else {
            if (fileListSelected.length > 0) {
              store.dispatch("file/deleteFileAction", {
                files: fileListSelected,
              });
            }

            if (folderListSelected.length > 0) {
              store.dispatch("file/deleteFolderAction", {
                folders: folderListSelected,
              });
            }
          }
          resetSelection();
        }
      });
    }

    function changeDirectoryFolder() {
      store.dispatch("file/getRootFileAction");
      router.push("/");
    }

    function deleteFilePermanently() {
      Swal.fire({
        title: "Are you sure to delete permanently selected file?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          if (fileListSelected.length <= 0 && folderListSelected.length <= 0) {
            Swal.fire({
              icon: "error",
              text: "No file selected",
              showConfirmButton: true,
            });
          } else {
            store.dispatch("file/deleteFilePermanentlyAction", {
              files: fileListSelected,
              folders: folderListSelected,
              Swal,
            });
          }

          resetSelection();
        }
      });
    }

    function download() {
      if (fileListSelected.length <= 0 && folderListSelected.length <= 0) {
        Swal.fire({
          icon: "error",
          text: "No file selected",
          showConfirmButton: true,
        });
      } else {
        store.dispatch("file/downloadAction", {
          files: fileListSelected,
          folders: folderListSelected,
        });
      }
      resetSelection();
    }

    function resetSelection() {
      fileListSelected = [];
      folderListSelected = [];
    }

    function handleRestore() {
      Swal.fire({
        title: "Are you sure to restore selected file?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "confirm",
      }).then((result) => {
        if (result.isConfirmed) {
          store.dispatch("file/restoreFileAction", {
            files: fileListSelected,
            folders: folderListSelected,
          });
          resetSelection();
        }
      });
    }

    function handleShare() {
      if (fileListSelected.length <= 0 && folderListSelected.length <= 0) {
        linkShare.value = "";
      } else {
        let url = "http://localhost:8080/share/";
        linkShare.value = url;
        fileListSelected.map((file) => {
          linkShare.value += file.token_share + ",";
        });
        folderListSelected.map((file) => {
          linkShare.value += file.token_share + ",";
        });
        linkShare.value = linkShare.value.substring(
          0,
          linkShare.value.length - 1
        );
      }
    }

    return {
      verticalIcon,
      mdiShareVariantOutline,
      mdiDownload,
      mdiRestore,
      mdiTrashCan,
      mdiHomeAccount,
      handleSelectFile,
      handleDeleteFile,
      handleSelectFolder,
      changeDirectoryFolder,
      deleteFilePermanently,
      download,
      resetSelection,
      handleRestore,
      handleShare,
      linkShare,
    };
  },
};
</script>

<style scoped>
.wrap {
  height: 570px;
  overflow-y: scroll;
}

.table-fix {
  min-height: 350px;
}
</style>
