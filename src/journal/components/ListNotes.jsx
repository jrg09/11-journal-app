import { TurnedInNot } from "@mui/icons-material";
import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setActiveNote } from "../../store";
import moment from "moment/moment";
import "moment/locale/es";

export const ListNotes = ({ notes }) => {
  const dispatch = useDispatch();

  const trimTitle = (title = "") => {
    if (title.length == 0) return "Sin título";
    return title.length > 20 ? `${title.substring(0, 20)}...` : title;
  };

  const handleSelectNote = (note) => {
    dispatch(setActiveNote({ ...note }));
  };

  return (
    <>
      {notes.length > 0 ? (
        <List>
          {notes.map((note) => (
            <ListItem key={note.id}>
              <ListItemButton
                onClick={() => {
                  handleSelectNote(note);
                }}>
                <ListItemIcon>
                  <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                  <ListItemText primary={trimTitle(note.title)} />
                  <ListItemText
                    secondary={moment(note.date).format("DD/MMMM/YYYY")}
                  />
                </Grid>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <span>Sin entradas aún</span>
      )}
    </>
  );
};
