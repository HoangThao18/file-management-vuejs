import {
  uploadFile,
  deleteFile,
  downloadFile,
  restoreFile,
  toogleStarredFile,
  getStarredFile,
  getFileShare,
} from "../../api/file.js";
import { getTrash, deleteTrash } from "../../api/trash.js";
import Swal from "sweetalert2";
import {
  uploadFolder,
  deleteFolder,
  showFolder,
  getRootFolder,
  createFolder,
  restoreFolder,
  toogleStarredFolder,
  getStarredFolder,
} from "../../api/folder.js";

const state = () => ({
  listRootFile: [],
  listRootFolder: [],
});

const mutations = {
  setfileListMutation(state, data) {
    console.log(data);
    state.listRootFile = data.files ? data.files : [];
    state.listRootFolder = data.folders ? data.folders : [];
  },

  deleteFileMutation(state, fileIds) {
    state.listRootFile = state.listRootFile.filter(
      (file) => !fileIds.includes(file.id)
    );
  },

  deleteFolderMutation(state, folderIds) {
    state.listRootFolder = state.listRootFolder.filter(
      (file) => !folderIds.includes(file.id)
    );
  },

  changeDirectoryFolderMutation(state, { files, subFolders }) {
    state.listRootFile = files;
    state.listRootFolder = subFolders;
  },
};

const actions = {
  async getRootFileAction(context) {
    try {
      const data = await getRootFolder();
      context.commit("setfileListMutation", data.data);
    } catch (error) {
      context.commit("setfileListMutation", [{ files: [], folders: [] }]);
    }
  },

  async uploadFileAction(context, { formData, uploadProgress, parentFolder }) {
    try {
      console.log(formData);
      if (parentFolder.id !== undefined) {
        formData.append("parent_folder", parentFolder.id);
      }

      const res = await uploadFile(formData, (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        uploadProgress.value = progress;
      });
      uploadProgress.value = 0;
      if (parentFolder.id == undefined) {
        await context.dispatch("getRootFileAction");
      } else {
        await context.dispatch("showFolderAction", parentFolder.id);
      }
      Swal.fire({
        position: "bottom-start",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "small-popup",
        },
      });
    } catch (error) {
      Swal.fire({
        position: "bottom-start",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "small-popup",
        },
      });
    }
  },

  async createFolderAction(context, { formData, Swal }) {
    try {
      const res = await createFolder(formData);
      if (formData.parent_id == undefined) {
        await context.dispatch("getRootFileAction");
      } else {
        await context.dispatch("showFolderAction", formData.parent_id);
      }
      Swal.fire({
        position: "bottom-start",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "small-popup",
        },
      });
    } catch (error) {
      Swal.fire({
        position: "bottom-start",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "small-popup",
        },
      });
    }
  },

  async showFolderAction(context, id) {
    try {
      const res = await showFolder(id);
      if (res.success) {
        context.commit("changeDirectoryFolderMutation", res.data);
      }
    } catch (error) {
      console.log(error);
    }
  },

  async deleteFileAction(context, { files }) {
    try {
      const fileIds = files.map((file) => file.id);

      const data = await deleteFile(fileIds);
      context.commit("deleteFileMutation", fileIds);

      Swal.fire({
        position: "bottom-start",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "small-popup",
        },
      });
      files.forEach((file) => (file.isSelected = false));
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error,
        showConfirmButton: true,
      });
    }
  },

  async uploadFolderAction(
    context,
    { formData, parentFolder, uploadProgress }
  ) {
    try {
      if (parentFolder.id !== undefined) {
        formData.append("parent_id", parentFolder.id);
      }

      const data = await uploadFolder(formData, (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        uploadProgress.value = progress;
      });

      if (parentFolder.id == undefined) {
        await context.dispatch("getRootFileAction");
      } else {
        await context.dispatch("showFolderAction", parentFolder.id);
      }
      uploadProgress.value = 0;
      Swal.fire({
        position: "bottom-start",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "small-popup",
        },
      });
    } catch (error) {
      Swal.fire({
        position: "bottom-start",
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "small-popup",
        },
      });
    }
  },

  async deleteFolderAction(context, { folders }) {
    try {
      console.log(folders);
      const folderIds = folders.map((folder) => folder.id);
      const data = await deleteFolder(folderIds);
      context.commit("deleteFolderMutation", folderIds);

      Swal.fire({
        position: "bottom-start",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "small-popup",
        },
      });
      folders.forEach((folder) => (folder.isSelected = false));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: true,
      });
    }
  },

  async getTrashAction(context) {
    try {
      const res = await getTrash();
      context.commit("setfileListMutation", res.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
        showConfirmButton: true,
      });
    }
  },

  async deleteFilePermanentlyAction(context, { files, folders, Swal }) {
    try {
      const fileIds = files.map((file) => file.id);
      const folderIds = folders.map((folder) => folder.id);
      const res = await deleteTrash(folderIds, fileIds);
      await context.dispatch("getTrashAction");

      files.forEach((file) => {
        file.isSelected = false;
      });
      folders.forEach((folder) => {
        folder.isSelected = false;
      });
      Swal.fire({
        position: "bottom-start",
        icon: "success",
        title: res.message,
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "small-popup",
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
        showConfirmButton: true,
      });
    }
  },

  async toggleStarFileAction(context, file) {
    await toogleStarredFile(file.id, !file.is_starred);
    file.is_starred = !file.is_starred;
  },

  async toggleStarFolderAction(context, folder) {
    await toogleStarredFolder(folder.id, !folder.is_starred);
    folder.is_starred = !folder.is_starred;
  },

  async downloadAction(context, { files, folders }) {
    try {
      const link = document.createElement("a");
      if (files.length == 1 && folders.length <= 0) {
        link.href = `https://hoangthao.site/api/download?fileIds[]=${files[0].id}`;
        link.click();
      } else {
        const fileIds = files.map((file) => file.id);
        const folderIds = folders.map((folder) => folder.id);
        const res = await downloadFile(fileIds, folderIds);
        link.href = res.data.url;
        link.click();
      }
      files.forEach((file) => (file.isSelected = false));
      folders.forEach((folder) => (folder.isSelected = false));
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.errors,
        showConfirmButton: true,
      });
    }
  },

  async restoreFileAction(context, { files, folders }) {
    try {
      const fileIds = files.map((file) => file.id);
      const folderIds = folders.map((folder) => folder.id);

      if (fileIds.length > 0) {
        await restoreFile(fileIds);
      }
      if (folderIds.length > 0) {
        await restoreFolder(folderIds);
      }

      await context.dispatch("getTrashAction");

      Swal.fire({
        position: "bottom-start",
        icon: "success",
        title: "success",
        showConfirmButton: false,
        timer: 1000,
        customClass: {
          popup: "small-popup",
        },
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.errors,
        showConfirmButton: true,
      });
    }
  },

  async getStarredAction(context) {
    try {
      const files = await getStarredFile();
      const folders = await getStarredFolder();
      context.commit("setfileListMutation", {
        files: files.data,
        folders: folders.data,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.errors,
        showConfirmButton: true,
      });
    }
  },

  async getFileShare(context, token) {
    const res = await getFileShare(token);
    context.commit("setfileListMutation", res.data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
