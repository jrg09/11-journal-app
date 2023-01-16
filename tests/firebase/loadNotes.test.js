import { v2 as cloudinary } from "cloudinary";
import { uploadFile } from "../../src/firebase/cloudinary";

cloudinary.config({
  cloud_name: "dgi60aqtb",
  api_key: "143594124424329",
  api_secret: "ITHyjmL76oXuLLyoENn7ecnIdPs",
  secure: true,
});

describe("Pruebas sobre fileUpload", () => {
  test("01 debe subir el archivo correctamente a cloudinary", async () => {
    const imgUrl =
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png";

    const resp = await fetch(imgUrl);
    const blob = await resp.blob();
    const file = new File([blob], "image.jpg");

    const url = await uploadFile(file);
    // console.log("url", url);

    expect(typeof url).toBe("string");
    expect(
      url.includes("https://res.cloudinary.com/dgi60aqtb/image/upload/")
    ).toBeTruthy();

    //eliminar la imagen
    //obtener el publicId de la imagen
    const segmentos = url.split("/");
    const publicId = `${segmentos[segmentos.length - 2]}/${
      segmentos[segmentos.length - 1].split(".")[0]
    }`;

    const respDelete = await cloudinary.api.delete_resources([publicId]);
    // console.log(respDelete);
  });
});
