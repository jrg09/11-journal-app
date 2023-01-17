import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { clearNotesLogout } from "../../store";
import { startLogout } from "../../store/auth/thunks";

export const Navbar = ({ drawerWith = 240 }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    // console.log("onLogout");
    dispatch(clearNotesLogout());
    dispatch(startLogout());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWith}px)` },
        ml: { sm: `${drawerWith}px` },
        background: {
          xs: "#626a6f", //gris
          sm: "#ff6600", //naranja
          md: "#006600", //verde
          lg: "#000066", //azul
          xl: "burlywood", //beige
        },
      }}>
      <Toolbar>
        <IconButton color="inherit" edge="start" sx={{ display: { sm: "none" } }}>
          <MenuOutlined />
        </IconButton>

        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" noWrap component="div">
            Journal App
          </Typography>
          <IconButton color="error" onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
