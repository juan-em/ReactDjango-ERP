import "./index.css";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";

import {
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Card,
  Typography,
  Container,
} from "@mui/material";

import Registro from "./registro";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { Tabla } from "./complements";

import UserRequest from "../../../components/User/Requests/UserRequest";
import { getLastCaja, patchCaja, postCaja } from "../../../services/caja";

const CajaDiaria = () => {
  //para el input de fecha
  const user = UserRequest();
  console.log(user)

  const [value, setValue] = useState(dayjs(new Date()));
  const [itemCaja, setItemCaja] = useState({ estado_caja: false });

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getLastCaja(setItemCaja);
  }, []);

  const handleOpenCloseCaja = async () => {
    if (itemCaja.estado_caja) {
      await patchCaja(itemCaja.id, { estado_caja: false, responsable_cierre: user.trabajador.id});
    } else {
      var res = await postCaja({ estado_caja: true , responsable_apertura: user.trabajador.id});
      setItemCaja(res.content);
    }
  };

  var fechaHoraActual = new Date();
  var fechaHoy = fechaHoraActual.toLocaleDateString();
  var horaHoy = fechaHoraActual.toLocaleTimeString();

  const formatFecha = (fechaOriginal) => {
    var partesFecha = fechaOriginal.split("-");
    var dia = partesFecha[2];
    var mes = partesFecha[1];
    var anio = partesFecha[0];
    return dia + "/" + mes + "/" + anio;
  };

  return (
    <Container>
      <div className="container">
        <Typography
          fontFamily={"inherit"}
          align={"center"}
          sx={{
            mt: 3,
            p: 3,
            backgroundColor: alpha("#633256", 0.2),
            "&:hover": {
              backgroundColor: alpha("#633256", 0.25),
            },
          }}
        >
          Caja Diaria
        </Typography>
        <Grid container spacing={4} sx={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <Card elevation={10} sx={{ p: 5 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} xl={12}>
                  <Typography fontFamily={"inherit"} align={"center"}>
                    Caja actual
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Card variant="outlined" sx={{ p: 1 }}>
                    <Typography fontFamily={"inherit"} align={"center"}>
                      <strong>Fecha:</strong>{" "}
                      {itemCaja.fecha_apertura
                        ? formatFecha(itemCaja.fecha_apertura)
                        : fechaHoy}
                      ,{" "}
                      {itemCaja.hora_apertura
                        ? itemCaja.hora_apertura.slice(0, 5)
                        : horaHoy}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Card variant="outlined" sx={{ p: 1 }}>
                    <Typography fontFamily={"inherit"} align={"center"}>
                      <strong>Saldo Inicial:</strong> S/.{" "}
                      {itemCaja.monto_inicial ? itemCaja.monto_inicial : "0"}
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <Card elevation={10} sx={{ p: 5 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} xl={12}>
                  <Typography fontFamily={"inherit"} align={"center"}>
                    Acciones
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Registro itemCaja={itemCaja}/>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Button
                    fullWidth
                    id="textfields"
                    color="secondary"
                    variant="contained"
                    sx={{ m: 1 }}
                    onClick={handleOpenCloseCaja}
                  >
                    {itemCaja.estado_caja == true
                      ? "Cerrar Caja"
                      : "Abrir Caja"}
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Paper
              elevation={10}
              className="paper"
              sx={{
                py: 2,
                px: 5,
              }}
            >
              <Typography
                fontFamily={"inherit"}
                align={"center"}
                sx={{ mb: 2 }}
              >
                Buscar registro
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="Fecha de apertura"
                      inputFormat="DD/MM/YYYY"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          fullWidth
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                        />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <TextField
                    fullWidth
                    label="Hora"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="nombre"
                    id="textfields"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <TextField
                    fullWidth
                    label="Monto"
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="nombre"
                    id="textfields"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <TextField
                    fullWidth
                    label="Tipo"
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="nombre"
                    id="textfields"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Box sx={{ overflow: "auto" }}>
              <Box
                sx={{ width: "100%", display: "table", tableLayout: "fixed" }}
              >
                <Tabla />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
export default CajaDiaria;
