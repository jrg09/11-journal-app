import { NoEncryption, SaveOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components";

export const NoteView = () => {
  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          9 de enero, 2023
        </Typography>
      </Grid>
      <Grid item>
        <Button color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Título de la entrada"
          label="Título"
          sx={{ border: "none", mb: 1 }}
        />
      </Grid>
      <Grid container>
        <TextField
          multiline
          minRows={5}
          variant="filled"
          fullWidth
          placeholder="¿Qué sucedió el día de hoy?"
          sx={{ border: "none", mb: 1 }}
        />
      </Grid>
      <Grid container>
        <ImageGallery />
      </Grid>
    </Grid>
  );
};
