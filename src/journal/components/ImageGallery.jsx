import { ImageList, ImageListItem } from "@mui/material";

export const ImageGallery = ({ images }) => {
  return (
    <ImageList sx={{ width: "100%", height: 450 }} cols={4} rowHeight={166}>
      {images.map((imageUrl) => (
        <ImageListItem key={imageUrl} sx={{ p: 1 }}>
          <img
            src={`${imageUrl}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${imageUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="Imagen de la entrada"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
