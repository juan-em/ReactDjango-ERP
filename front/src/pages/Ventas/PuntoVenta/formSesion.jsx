import {
  TextField,
  FormControl,
  Button,
  Grid,
  Box,
  Typography,
  Container,
  InputAdornment,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import { ACTION_SESION_TYPES } from "../Venta/reducerVenta";

import Swal from "sweetalert2";

const FormSesion = ({
  tipo,
  setTipo,
  stateSesion,
  dispatchSesion,
  sesionIniciada,
  setSesionIniciada,
}) => {
  const handleChange = (e, value, ac) => {
    let action = {
      type: ac,
    };
    switch (ac) {
      case ACTION_SESION_TYPES.SET_FECHA:
        var event = new Date(e.$d);
        let date = JSON.stringify(event);
        date = date.slice(1, -1);
        action.payload = date;
        dispatchSesion(action);
        break;

      case ACTION_SESION_TYPES.SET_RESPONSABLE:
        action.payload = e.target.value;
        dispatchSesion(action);
        break;

      case ACTION_SESION_TYPES.SET_MONTO_INICIAL:
        action.payload = parseFloat(e.target.value);
        dispatchSesion(action);
        break;

      default:
        console.log("Acción no definida");
    }
  };

  const handleClick = () => {
    Swal.fire({
      title: "Quieres habrir una sesion de venta?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Sesion Iniciada",
          "La sesion de compra fue iniciada correctamente",
          "success"
        );
        setSesionIniciada(true);
      }
    });
  };

  const handleClickReturn = () => {
    setTipo(true);
  };

  return (
    <>
      <Box
        component="form"
        textAlign="center"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          m: 2,
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              label="Nombre Encargado"
              variant="standard"
              onChange={(e, value) => {
                handleChange(e, value, ACTION_SESION_TYPES.SET_RESPONSABLE);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <TextField
              type="number"
              label="Monto Inicial"
              variant="standard"
              onChange={(e, value) => {
                handleChange(e, value, ACTION_SESION_TYPES.SET_MONTO_INICIAL);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">S/.</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Fecha"
                name="fecha"
                inputFormat="DD/MM/YYYY"
                value={stateSesion.sesion_venta.fecha}
                onChange={(value) => {
                  handleChange(value, null, ACTION_SESION_TYPES.SET_FECHA);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    variant="filled"
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleClick}
              sx={{ mt: 1 }}
            >
              Iniciar Sesion
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FormSesion;
