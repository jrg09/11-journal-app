import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";

export const Navbar = ({ drawerWith = 240 }) => {
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
        <IconButton
          color="inherit"
          edge="start"
          sx={{ display: { sm: "none" } }}>
          <MenuOutlined />
        </IconButton>

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Typography variant="h6" noWrap component="div">
            JournalApp
          </Typography>
          <IconButton color="error">
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
