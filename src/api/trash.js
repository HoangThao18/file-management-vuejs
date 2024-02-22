import axiosAPI from ".";

export const getTrash = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.get("/trash", {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTrash = (folderIds, fileIds) => {
  const token = JSON.parse(localStorage.getItem("token"));
  return axiosAPI.delete("/trash", {
    headers: { Authorization: `Bearer ${token}` },
    data: { folderIds: folderIds, fileIds: fileIds },
  });
};
