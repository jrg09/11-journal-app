import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material";
import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";

export const RegisterPage = () => {
  return (
    <AuthLayout title="Crear cuenta">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="Tu nombre"
              autoComplete="off"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="text"
              placeholder="nombre@correo.com"
              autoComplete="off"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              autoComplete="off"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            {/* <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Leí y acepto términos y condiciones"></FormControlLabel>
            </FormGroup> */}
            <FormControlLabel
              control={<Checkbox />}
              label={
                <Typography>
                  Leí y acepto los
                  <Link
                    component={RouterLink}
                    color="inherit"
                    to="/auth/register"
                    ml={1}>
                    términos y condiciones
                  </Link>
                  .
                </Typography>
              }
            />
          </Grid>
          <Grid container spacing={2} sx={{ my: 2 }} fullWidth>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
                Crear Cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography>¿Ya tienes cuenta?</Typography>
            <Link
              component={RouterLink}
              color="inherit"
              to="/auth/login"
              ml={1}>
              ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
