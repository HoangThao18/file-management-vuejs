<template>
  <tr
    :class="{ selected: item.isSelected }"
    @dblclick="changeDirectory(item.id)"
    @click="handleSelected(item)"
  >
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
          class="font-size-16 align-middle me-2 text-warning"
          type="mdi"
          :path="isSelected ? mdiCheck : iconFolder"
        ></svg-icon>
        {{ item.name }}
      </a>
    </td>
    <td>{{ getFormattedDate(folder.created_at) }}</td>
    <td></td>
    <!-- 
    <td @click.stop>
      <div class="dropdown">
        <a
          class="font-size-16 text-muted"
          role="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
        >
          <svg-icon class="" type="mdi" :path="mdiDotsHorizontal"></svg-icon>
        </a>

        <div class="dropdown-menu dropdown-menu-end">
          <a class="dropdown-item" href="#">Open</a>
          <a class="dropdown-item" href="#">Edit</a>
          <a class="dropdown-item" href="#">Rename</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Remove</a>
        </div>
      </div>
    </td>
    -->
  </tr>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFolder, mdiDotsHorizontal, mdiCheck, mdiStar } from "@mdi/js";
import { computed, inject, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  components: {
    SvgIcon,
  },
  emits: ["handleSelectedFolder"],

  props: {
    folder: {
      type: [Object],
    },
  },
  setup(props, { emit }) {
    const isSelected = ref(false);
    const iconFolder = ref(mdiFolder);
    const router = useRouter();
    const item = reactive(props.folder);
    const store = useStore();
    const isShowStar = inject("isShowStar") ?? true;

    const starred = computed(() => {
      return item.is_starred ? "text-starred" : "text-secondary";
    });
    function getFormattedDate(data) {
      const date = new Date(data);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return (this.formattedDate = `${day}/${month}/${year}`);
    }

    function handleSelected(folder) {
      folder.isSelected = !folder.isSelected;
      emit("handleSelectedFolder", folder);
    }

    function changeDirectory(id) {
      router.push({ name: "folderDetail", params: { id: id } });
    }

    function handleStarred(folder) {
      store.dispatch("file/toggleStarFolderAction", folder);
    }

    function handleDeleteFolder() {}
    return {
      iconFolder,
      getFormattedDate,
      mdiDotsHorizontal,
      handleSelected,
      isSelected,
      mdiCheck,
      handleDeleteFolder,
      changeDirectory,
      mdiStar,
      item,
      starred,
      handleStarred,
      isShowStar,
    };
  },
};
</script>

<style scoped>
.wrapper-star {
  cursor: pointer;
}

.text-starred {
  color: #ffff00;
}
</style>
