import { Link as RouterLink } from "react-router-dom";
import {
  Alert,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForms";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startRegisterUserWithEmailAndPassword } from "../../store";

const formData = {
  email: "",
  password: "",
  name: "",
  terms: false,
};

//prettier-ignore
// es un objeto de 2 valores: funcion para evaluar y 2do es el mensaje de error SI NO se cumple la condición
const myFormValidations = {
  email: [(value) => value.includes("@"), "Email no válido"],
  password: [(value) => value.length >= 6, "Password debe tener más de 6 caracteres"],
  name: [(value) => value.length >= 2, "Nombre debe tener más de 2 caracteres"],
  terms: [(value) => value, "Debes aceptar los términos y condiciones"],  
};

export const RegisterPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  //prettier-ignore
  const {formState, name, nameValid, email, emailValid, password, passwordValid, terms, termsValid, isFormValid, onInputChange} 
    = useForm(formData, myFormValidations);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid) return;

    console.log(formState);

    dispatch(startRegisterUserWithEmailAndPassword({ name, email, password }));
  };

  return (
    <AuthLayout title="Crear cuenta">
      <form
        onSubmit={onSubmit}
        className="animate__animated animate__fadeIn animate__faster">
        <h5>FormValid: {isFormValid ? "Válido" : "Incorrecto"}</h5>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Nombre"
              type="text"
              placeholder="Tu nombre"
              autoComplete="off"
              fullWidth
              name="name"
              value={name}
              onChange={onInputChange}
              error={!!nameValid && formSubmitted}
              helperText={nameValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="text"
              placeholder="nombre@correo.com"
              autoComplete="off"
              fullWidth
              name="email"
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              autoComplete="off"
              fullWidth
              name="password"
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2 }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="terms"
                    checked={terms}
                    onChange={onInputChange}
                  />
                }
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
              <FormHelperText
                error={!!termsValid && formSubmitted}
                sx={{ display: termsValid && formSubmitted ? "" : "none" }}>
                Debes aceptar los términos y condiciones.
              </FormHelperText>
            </FormGroup>
          </Grid>
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={12} display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isCheckingAuthentication}>
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
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
