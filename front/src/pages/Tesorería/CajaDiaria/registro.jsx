import { useState, useEffect } from "react";

import {
  TextField,
  Button,
  Grid,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Box,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
} from "@mui/material";

//para la tabla
import Swal from "sweetalert2";
import { Formik } from "formik";
import UserRequest from "../../../components/User/Requests/UserRequest";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

import {
  getCambio,
  postEgresoCaja,
  postIngresoCaja,
  transformToFormData,
} from "../../../services/caja";
import { initialRegister } from "../../../services/caja";

const Registro = ({ itemCaja }) => {
  const [open, setOpen] = useState(false);
  const [cambio, setCambio] = useState();
  const [item, setItem] = useState(initialRegister);
  const user = UserRequest();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setItem(initialRegister);
  };

  const renderButton = (value) => {
    if (value === "Otros ingresos") {
      return (
        <Button variant="contained" fullWidth color="secondary">
          Venta
        </Button>
      );
    } else {
      return (
        <Button variant="contained" fullWidth color="secondary">
          Compra
        </Button>
      );
    }
  };

  const handleSubmit = async (data) => {
    console.log(data)
    // if (data.monto != 0) {
    //   if (data.tipo_pago == "Dolares") data.monto *= cambio;
    //   var data = {
    //     ...data,
    //     responsable: user.trabajador.id,
    //     caja: itemCaja.id,
    //   };
    //   var payload = transformToFormData(data);
    //   try {
    //     data.tipo == "Otros ingresos"
    //       ? await postIngresoCaja(payload)
    //       : await postEgresoCaja(payload);
    //     Swal.fire({
    //       icon: "success",
    //       title: "Ok",
    //       text: "Registro Exitoso",
    //       customClass: {
    //         container: 'my-swal',
    //       },
    //     })
    //     setOpen(false);
    //     setItem(initialRegister);
    //   }
    //   catch (error) {
    //     Swal.fire({
    //       icon: "error",
    //       title: "Oops...",
    //       text: `${error}`,
    //       customClass: {
    //         container: 'my-swal',
    //       },
    //     });
    //   }
    // } else {
    //   Swal.fire({
    //     title: "Advertencia",
    //     text: "No especificó ningún monto",
    //     icon: "warning",
    //     showCancelButton: false,
    //     customClass: {
    //       container: 'my-swal',
    //     },
    //     confirmButtonText: "Aceptar",
    //   });
    // }
  };

  useEffect(() => {
    getCambio(setCambio);
  }, []);

  return (
    <>
      <Button
        color="secondary"
        variant="contained"
        disabled={!itemCaja.estado_caja}
        onClick={handleOpen}
        fullWidth
        sx={{ m: 1 }}
      >
        <span>Registro</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Formik initialValues={item} onSubmit={handleSubmit}>
          {({ values, handleSubmit, handleChange, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <Box
                maxWidth={"md"}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  backgroundColor: "white",
                  transform: "translate(-50%, -50%)",
                  p: 3,
                }}
              >
                <h2 id="parent-modal-title">Caja Diaria</h2>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Fecha"
                        inputFormat="DD/MM/YYYY"
                        value={itemCaja.fecha_apertura}
                        readOnly
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
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      label="Saldo Inicial"
                      type="number"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="nombre"
                      readOnly
                      id="textfields"
                      variant="filled"
                      inputProps={{
                        step: "0.1",
                      }}
                      value={itemCaja.monto_inicial}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <Card variant="outlined">
                      <Grid
                        container
                        spacing={2}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Grid item>
                          <FormControl margin="dense" fullWidth>
                            <FormLabel
                              fullWidth
                              id="demo-row-radio-buttons-group-label"
                              color="secondary"
                            ></FormLabel>
                            <RadioGroup
                              fullWidth
                              row
                              name="tipo"
                              value={values.tipo}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                fullWidth
                                labelPlacement="start"
                                value="Otros ingresos"
                                control={<Radio color="secondary" fullWidth />}
                                label={<span>Ingreso</span>}
                              />
                              <FormControlLabel
                                fullWidth
                                labelPlacement="start"
                                value="Otros egresos"
                                control={<Radio color="secondary" fullWidth />}
                                label={<span>Salida</span>}
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>
                      </Grid>
                      <Grid>{renderButton(values.tipo)}</Grid>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                    >
                      <InputLabel>Tipo</InputLabel>
                      <Select
                        label="Tipo"
                        size="small"
                        color="secondary"
                        id="textfields"
                        defaultValue=""
                        name="codprovincia"
                      >
                        <MenuItem key={1} value={1}>
                          Factura
                        </MenuItem>
                        <MenuItem key={1} value={1}>
                          Boleta
                        </MenuItem>
                        <MenuItem key={1} value={1}>
                          Sin documento
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      label="Código"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="nombre"
                      id="textfields"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Card variant="outlined" sx={{ px: 3 }}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} md={6}>
                          <FormControl margin="dense">
                            <FormLabel
                              id="demo-row-radio-buttons-group-label"
                              color="secondary"
                            ></FormLabel>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="tipo_pago"
                              value={values.tipo_pago}
                              onChange={handleChange}
                            >
                              <FormControlLabel
                                labelPlacement="start"
                                value="Soles"
                                control={<Radio color="secondary" />}
                                label={<span>Soles</span>}
                              />
                              <FormControlLabel
                                labelPlacement="start"
                                value="Dolares"
                                control={<Radio color="secondary" />}
                                label={<span>Dólares</span>}
                              />
                            </RadioGroup>
                          </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            fullWidth
                            label="Tipo de cambio"
                            type="number"
                            size="small"
                            color="secondary"
                            margin="dense"
                            name="nombre"
                            id="textfields"
                            inputProps={{
                              step: "0.1",
                            }}
                            value={cambio}
                          />
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      label="Observaciones"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="descripcion"
                      id="textfields"
                      value={values.descripcion}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      label="Monto"
                      type="number"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="monto"
                      id="textfields"
                      inputProps={{
                        step: "0.1",
                      }}
                      value={values.monto}
                      onChange={handleChange}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <TextField
                      fullWidth
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="documento"
                      id="textfields"
                      type="file"
                      inputProps={{
                        accept: ".pdf,.doc,.docx",
                      }}
                      onChange={(event) =>
                        setFieldValue("documento", event.currentTarget.files[0])
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
                    <Button
                      fullWidth
                      id="btnClick"
                      size="medium"
                      color="secondary"
                      className="navbar-btn-single"
                      variant="contained"
                      type="submit"
                    >
                      <span>Registrar</span>
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
                    <Button
                      fullWidth
                      id="btnClick"
                      size="medium"
                      color="error"
                      className="navbar-btn-single"
                      variant="contained"
                      onClick={handleClose}
                    >
                      <span>Cancelar</span>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default Registro;
