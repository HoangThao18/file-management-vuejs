<template>
  <folder-item
    v-for="folder in FolderList"
    :key="folder.id"
    :folder="folder"
    @handleSelectedFolder="handleSelectedFolder"
  ></folder-item>
  <file-item
    v-for="file in fileList"
    :file="file"
    :key="file.id"
    @handleSelectedFile="handleSelectedFile"
  ></file-item>
  <p>{{ checkAll }}</p>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import FileItem from "./FileItem.vue";
import FolderItem from "./FolderItem.vue";
import { useRoute } from "vue-router";
export default {
  components: {
    FileItem,
    FolderItem,
  },

  emits: ["handleSelectedFile", "handleSelectedFolder"],
  props: {
    checkAll: Boolean,
  },
  setup(props, { emit }) {
    const route = useRoute();
    const store = useStore();
    const selectedAll = ref(false);
    const params = route.params?.id;
    const share = route.path.split("/")[1];
    console.log(share);
    if (share == "share") {
      const token = route.params.token.split(",");
      store.dispatch("file/getFileShare", token);
    } else if (params) {
      store.dispatch("file/showFolderAction", params);
    } else {
      store.dispatch("file/getRootFileAction");
    }

    const fileList = computed(() => {
      return store.state.file.listRootFile.map((file) => {
        return { ...file, isSelected: false };
      });
    });
    const FolderList = computed(() => {
      return store.state.file.listRootFolder.map((folder) => {
        return { ...folder, isSelected: false };
      });
    });

    function handleSelectedFile(file) {
      emit("handleSelectedFile", file);
    }

    function handleSelectedFolder(folder) {
      emit("handleSelectedFolder", folder);
    }

    watch(
      () => route.params.id,
      (newId, oldId) => {
        if (newId !== oldId && newId != undefined) {
          store.dispatch("file/showFolderAction", newId);
        } else {
          store.dispatch("file/getRootFileAction");
        }
      }
    );

    return {
      fileList,
      FolderList,
      handleSelectedFile,
      handleSelectedFolder,
      selectedAll,
    };
  },
};
</script>

<style>
.selected {
  background-color: #8ecee1;
}
</style>
