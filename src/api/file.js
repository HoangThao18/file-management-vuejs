import axiosAPI from ".";

export const uploadFile = (data, onUploadProgress) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.post("/file", data, {
    headers: { Authorization: `Bearer ${token}` },
    onUploadProgress,
  });
};

export const deleteFile = (fileIds) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.delete("/file", {
    headers: { Authorization: `Bearer ${token}` },
    data: { fileIds: fileIds },
  });
};

export const downloadFile = (fileIds, folderIds) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return axiosAPI.get("/download", {
    params: { fileIds: fileIds, folderIds: folderIds },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const restoreFile = (fileIds) => {
  const formData = new FormData();
  fileIds.forEach((fileId) => {
    formData.append("fileIds[]", fileId);
  });
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.post("/file/restore", formData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const toogleStarredFile = (fileId, status) => {
  const token = JSON.parse(localStorage.getItem("token"));

  return axiosAPI.put(
    `/file/${fileId}`,
    { is_starred: status },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getStarredFile = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.get("/file/starred", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getFileShare = (token) => {
  return axiosAPI.get("/share", {
    params: {
      token: token,
    },
  });
};
