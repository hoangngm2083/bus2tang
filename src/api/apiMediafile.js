import { BASE_URL } from "../utils/config";

const apiMediafile = async (id) => {
  const { data, error } = await fetch(`${BASE_URL}/mediafiles/${id}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.blob();
    })
    .then((blob) => {
      return { data: URL.createObjectURL(blob) };
    })
    .catch((error) => {
      console.error("Error fetching media:", error);
      return { error };
    });
  return { data, error };
};
export default apiMediafile;
