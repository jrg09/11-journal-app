import { CircularProgress, Grid } from "@mui/material";

export const CheckingAuth = () => {
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
        sx={{
          m: { xs: 3 },
        }}>
        <CircularProgress color="warning" />
      </Grid>
    </Grid>
  );
};
