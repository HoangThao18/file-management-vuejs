<template>
  <tr :class="{ selected: item.isSelected }" @click="handleSelectedFile(item)">
    <td class="text-end wrapper-star" @click.stop>
      <svg-icon
        v-if="isShowStar"
        @click="handleStarred(item)"
        :class="starred"
        type="mdi"
        :path="mdiStar"
      ></svg-icon>
    </td>

    <td>
      <a
        href="javascript: void(0);"
        class="text-dark fw-medium text-decoration-none"
      >
        <svg-icon
          class="font-size-16 align-middle me-2"
          type="mdi"
          :path="item.isSelected ? mdiCheck : getIconMimeType(item.mime)"
          :class="getColor(item.mime)"
        ></svg-icon>
        {{ item.name }}</a
      >
    </td>
    <td>{{ getFormattedDate(item.created_at) }}</td>
    <td>{{ item.size }}</td>
    <!--  
    <td>
      <div class="dropdown">
        <a
          class="font-size-16 text-muted"
          role="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          @click.stop
        >
          <svg-icon type="mdi" :path="mdiDotsHorizontal"></svg-icon>
        </a>

        <div class="dropdown-menu dropdown-menu-end">
          <a class="dropdown-item" href="#">Open</a>
          <a class="dropdown-item" href="#">Edit</a>
          <a class="dropdown-item" href="#">Rename</a>
          <div class="dropdown-divider"></div>
          <a @click="handleDeleteFile(file.id)" class="dropdown-item" href="#"
            >Remove</a
          >
        </div>
      </div>
    </td>
    -->
  </tr>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import {
  mdiImageArea,
  mdiFileDocumentOutline,
  mdiTextBoxOutline,
  mdiFileWord,
  mdiFileExcel,
  mdiFilePowerpointBoxOutline,
  mdiFilePdfBox,
  mdiDotsHorizontal,
  mdiCheck,
  mdiStar,
} from "@mdi/js";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2";
import { computed, inject, reactive, watch } from "vue";

export default {
  emits: ["handleSelectedFile"],
  components: {
    SvgIcon,
  },
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const item = reactive(props.file);
    const store = useStore();
    const isShowStar = inject("isShowStar") ?? true;
    const starred = computed(() => {
      return item.is_starred ? "text-starred" : "text-secondary";
    });
    watch(props.file, (file) => {
      console.log("aaa");
      item.value = file;
    });
    function getFormattedDate(data) {
      const date = new Date(data);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return (this.formattedDate = `${day}/${month}/${year}`);
    }

    function getIconMimeType(icon) {
      switch (icon) {
        case "html":
          return mdiFileDocumentOutline;
        case "doc":
        case "docx":
          return mdiFileWord;
        case "xlsx":
          return mdiFileExcel;
        case "ppt":
          return mdiFilePowerpointBoxOutline;
        case "PNG":
        case "JPG":
          return mdiImageArea;
        case "pdf":
          return mdiFilePdfBox;
        case "txt":
          return mdiTextBoxOutline;
        default:
          return mdiFileDocumentOutline;
      }
    }

    function getColor(icon) {
      switch (icon) {
        case "html":
          return "text-primary";
        case "doc":
        case "docx":
          return "text-primary";
        case "xlsx":
          return "text-success";
        case "ppt":
          return "text-danger";
        case "PNG":
        case "JPG":
          return "text-success";
        case "pdf":
          return "text-danger";
        case "txt":
          return "text-dark";
        default:
          return "text-dark";
      }
    }

    function handleSelectedFile(file) {
      file.isSelected = !file.isSelected;
      emit("handleSelectedFile", file);
    }

    function handleDeleteFile(id) {
      store.dispatch("file/deleteFileAction", { fileIds: [id], Swal });
    }

    function handleStarred(file) {
      store.dispatch("file/toggleStarFileAction", file);
    }

    return {
      item,
      getFormattedDate,
      getIconMimeType,
      mdiDotsHorizontal,
      getColor,
      mdiStar,
      handleSelectedFile,
      mdiCheck,
      handleDeleteFile,
      starred,
      isShowStar,
      handleStarred,
    };
  },
};
</script>

<style scoped>
.selected {
  background-color: #8ecee1;
}

.wrapper-star {
  cursor: pointer;
}

.text-starred {
  color: #ffff00;
}
</style>
