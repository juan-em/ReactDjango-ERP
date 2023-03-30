import { useState, useEffect, useReducer } from "react";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  Typography,
  IconButton,
  Button,
  Box,
  Container,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { INITIAL_SESION_STATE, sesionVentaReducer, ACTION_SESION_TYPES } from "../Venta/reducerVenta";

const SeleccionVenta = ({ tipo, setTipo, sesionIniciada, setSesionIniciada }) => {

  const [state, dispatch] = useReducer(sesionVentaReducer, INITIAL_SESION_STATE);

  const handleClick = () => {
    setTipo(true);
  };

  const handleRegister = () => {
    if (
      Reflect.has(state.sesion_venta.cliente, "id") &&
      state.sesion_venta.punto_venta.length
    ) {
      var payload = BuildVentaPayload(state.venta);
      // RegistroVenta(payload);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Proveedor o articulos NO válidos",
      });
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}></Grid>
        <Grid item xs={12} align={"center"}>
          <Box textAlign="center">
            <Button
              color="secondary"
              loadingPosition="start"
              variant="outlined"
              onClick={handleClick}
              startIcon={<StorefrontIcon />}
            >
              Punto de Venta
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SeleccionVenta;
