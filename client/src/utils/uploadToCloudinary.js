export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "unsigned_upload");
  data.append("cloud_name", import.meta.env.VITE_APP_CLOUD_NAME);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_APP_CLOUD_NAME
    }/image/upload`,
    {
      method: "POST",
      body: data,
    }
  );

  const json = await res.json();
  return json.secure_url; // final file URL
};
