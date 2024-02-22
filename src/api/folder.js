import axiosAPI from ".";

export const uploadFolder = (data, onUploadProgress) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.post("/folder/upload", data, {
    headers: { Authorization: `Bearer ${token}` },
    onUploadProgress,
  });
};

export const deleteFolder = (folderIds) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.delete("/folder", {
    headers: { Authorization: `Bearer ${token}` },
    data: { FolderIds: folderIds },
  });
};

export const getRootFolder = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.get("/folder", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const showFolder = (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.get(`/folder/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createFolder = (data) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.post(`/folder`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const restoreFolder = (folderIds) => {
  const formData = new FormData();
  folderIds.forEach((folderId) => {
    formData.append("folderIds[]", folderId);
  });
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.post("/folder/restore", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const toogleStarredFolder = (folderId, status) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return axiosAPI.put(
    `/folder/${folderId}`,
    { is_starred: status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getStarredFolder = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.get("/folder/starred", {
    headers: { Authorization: `Bearer ${token}` },
  });
};
