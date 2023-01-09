import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import { Button, Grid, Link, TextField, Typography } from "@mui/material";

export const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", backgroundColor: "primary.main", pt: 4 }}>
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{
          m: { xs: 2 },
          backgroundColor: "white",
          padding: 3,
          borderRadius: 2,
          width: { md: 450 },
        }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>

        {children}
      </Grid>
    </Grid>
  );
};
