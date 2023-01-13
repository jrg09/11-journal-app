import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from "@mui/icons-material";
import moment from "moment/moment";
import "moment/locale/es";
import { useForm } from "../../hooks";
import { ImageGallery } from "../components";
import {
  setActiveNote,
  startDeleteNote,
  startSaveNote,
  startUploadingFiles,
} from "../../store";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2";

export const NoteView = () => {
  moment.locale("es");

  const dispatch = useDispatch();
  const fileInputRef = useRef();

  const { activeNote, savedMessage, isSaving } = useSelector(
    (state) => state.journal
  );
  const { id, title, body, date, onInputChange, formState } =
    useForm(activeNote);

  //se usa useMemo para que no se calcule de nuevo la fecha cada vez q se escribe algo
  const dateString = useMemo(
    () => moment(date).format("MMMM DD, YYYY"),
    [date]
  );

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if (savedMessage.length > 0) {
      Swal.fire("Nota actualizada", savedMessage, "success");
    }
  }, [savedMessage]);

  const onSaveNote = () => {
    dispatch(startSaveNote());
  };

  const onFileInputChange = (event) => {
    if (event.target.files == 0) return;

    dispatch(startUploadingFiles(event.target.files));
  };

  const onDeleteNote = () => {
    dispatch(startDeleteNote());
    Swal.fire("Nota eliminada", savedMessage, "info");
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      sx={{ mb: 1 }}>
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={onFileInputChange}
          style={{ display: "none" }}
        />
        <IconButton
          color="primary"
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}>
          <UploadOutlined />
        </IconButton>

        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}>
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
          name="title"
          value={title}
          onChange={onInputChange}
          sx={{ border: "none", mb: 1 }}
        />
      </Grid>
      <Grid container>
        <TextField
          multiline
          minRows={5}
          variant="filled"
          fullWidth
          name="body"
          value={body}
          onChange={onInputChange}
          placeholder="¿Qué sucedió el día de hoy?"
          sx={{ border: "none", mb: 1 }}
        />
      </Grid>

      <Grid container justifyContent="space-between">
        <Grid item>
          <small>{id}</small>
        </Grid>

        <Button onClick={onDeleteNote}>
          <DeleteOutline />
        </Button>
      </Grid>

      <ImageGallery images={activeNote.imageUrls} />
    </Grid>
  );
};
