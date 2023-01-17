import { sha1 } from "crypto-hash";
import { getEnvironments } from "./getEnvironments";

export const uploadFile = async (file) => {
  if (!file) throw new Error("El archivo no existe");

  const cloudUrl = "https://api.cloudinary.com/v1_1/dgi60aqtb/upload";
  const formData = new FormData();

  formData.append("upload_preset", "react-journal");
  formData.append("file", file);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    // console.log("resp", resp);

    if (!resp.ok) throw new Error("No se pudo subir la imagen");

    const cloudResponse = await resp.json();
    // console.log("cloudResponse", cloudResponse);

    return cloudResponse.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
  return null;
};

export const deleteImage = async (imageUrl) => {
  const cloudUrl = "https://api.cloudinary.com/v1_1/dgi60aqtb/image/destroy";

  //obtener el publicId de la imagen
  const segmentos = imageUrl.split("/");
  const publicId = `${segmentos[segmentos.length - 2]}/${segmentos[segmentos.length - 1].split(".")[0]}`;

  const timestamp = new Date().getTime();

  const { VITE_CLD_APIKEY, VITE_CLD_SECRET } = getEnvironments();
  console.log(VITE_CLD_APIKEY, VITE_CLD_SECRET);

  const apiKey = VITE_CLD_APIKEY;
  const apiSecret = VITE_CLD_SECRET;

  const stringBase = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const signature = await sha1(stringBase);

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("upload_preset", "react-journal");
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });

    if (!resp.ok) throw new Error("No se pudo eliminar la imagen");

    const cloudResponse = await resp.json();
    return cloudResponse;
  } catch (error) {
    console.log(error);
  }
  return null;
};
