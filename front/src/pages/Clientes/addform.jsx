import { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  Input,
  TextField,
  Button,
  Card,
  Grid,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import { Box, Container } from "@mui/system";

import {
  postClienteper,
  postClienteemp,
  putClienteemp,
  putClienteper,
} from "../../services/clientes";

import { getProvincias } from "../../services/mantenimiento";

import Swal from "sweetalert2";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  p: 4,
};

const AddForm = () => {
  const empresa = false;
  const nuevo = true;
  const [provincias, setProvincias] = useState([]);
  const [inputsPer, setInputsPer] = useState({
    nombre: "",
    dni: "",
    codprovincia: "",
    localidad: "",
    direccion: "",
    codpostal: "",
    cuentabancaria: "",
    telefono: "",
    movil: "",
    web: "",
    codformapago: "",
  });

  const handleInputPerValue = (event) => {
    const { value, name } = event.target;

    setInputsPer({
      ...inputsPer,
      [name]: value,
    });
  };

  const [inputsEmp, setInputsEmp] = useState({
    nombre: "",
    ruc: "",
    estructurajuridica: "",
    tipo: "",
    codprovincia: "",
    localidad: "",
    direccion: "",
    codpostal: "",
    cuentabancaria: "",
    telefono: "",
    movil: "",
    web: "",
    codformapago: "",
  });

  const handleInputEmpValue = (event) => {
    const { value, name } = event.target;

    setInputsPer({
      ...inputsEmp,
      [name]: value,
    });
  };

  const handleClickClienteEmp = async () => {
    try {
      await postClienteemp(inputsEmp);
      Swal.fire({
        icon: "succes",
        title: "Oops...",
        text: error,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };
  const handleClickClientePer = async () => {
    try {
      await postClienteper(inputsPer);
      Swal.fire({
        icon: "succes",
        title: "Oops...",
        text: error,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error,
      });
    }
  };

  useEffect(() => {
    getProvincias(setProvincias);
  }, []);

  return (
    <Box sx={style}>
      <Card>
        <CardContent>
          <FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  sx={{ fontSize: 40 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {!nuevo ? "Editar Cliente" : "Nuevo Cliente"}
                </Typography>
              </Grid>
              {!empresa ? (
                <>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Nombre"
                      required
                      onChange={handleInputPerValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="DNI"
                      required
                      onChange={handleInputPerValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Select
                      label="Provincia"
                      required
                      fullWidth
                      onChange={handleInputPerValue}
                    >
                      <MenuItem value="all">
                        <em>-----</em>
                      </MenuItem>
                      {provincias.map((item, i) => (
                        <MenuItem key={i} value={item.id}>
                          {item.nombreprovincia}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Localidad"
                      required
                      onChange={handleInputPerValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Direccion"
                      required
                      onChange={handleInputPerValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Codigo Postal"
                      required
                      onChange={handleInputPerValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Cuenta Bancaria"
                      required
                      onChange={handleInputPerValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Telefono"
                      required
                      onChange={handleInputPerValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Movil"
                      required
                      onChange={handleInputPerValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Web"
                      required
                      onChange={handleInputPerValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Forma de Pago"
                      required
                      onChange={handleInputPerValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Button
                      id="btnClick"
                      size="medium"
                      color="secondary"
                      className="navbar-btn-single"
                      variant="outlined"
                      onClick={handleClickClientePer}
                    >
                      <span>&nbsp;&nbsp;{!nuevo ? "Editar" : "Registrar"}</span>
                    </Button>
                    <Button
                      id="btnClick"
                      size="medium"
                      color="error"
                      className="navbar-btn-single"
                      variant="outlined"
                    >
                      <span>&nbsp;&nbsp;Cancelar</span>
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Nombre"
                      required
                      onChange={handleInputEmpValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="RUC"
                      required
                      onChange={handleInputEmpValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Estructura"
                      required
                      onChange={handleInputEmpValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Tipo de Empresa"
                      required
                      onChange={handleInputEmpValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Select
                      label="Provincia"
                      required
                      fullWidth
                      onChange={handleInputEmpValue}
                    >
                      <MenuItem value="all">
                        <em>-----</em>
                      </MenuItem>
                      {provincias.map((item, i) => (
                        <MenuItem key={i} value={item.id}>
                          {item.nombreprovincia}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Localidad"
                      required
                      onChange={handleInputEmpValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Direccion"
                      required
                      onChange={handleInputEmpValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Codigo Postal"
                      required
                      onChange={handleInputEmpValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Cuenta Bancaria"
                      required
                      onChange={handleInputEmpValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Telefono"
                      required
                      onChange={handleInputEmpValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Movil"
                      required
                      onChange={handleInputEmpValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Web"
                      required
                      onChange={handleInputEmpValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      label="Forma de Pago"
                      required
                      onChange={handleInputEmpValue}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Button
                      id="btnClick"
                      size="medium"
                      color="secondary"
                      className="navbar-btn-single"
                      variant="outlined"
                      onClick={handleClickClienteEmp}
                    >
                      <span>&nbsp;&nbsp;{!nuevo ? "Editar" : "Registrar"}</span>
                    </Button>
                    <Button
                      id="btnClick"
                      size="medium"
                      color="error"
                      className="navbar-btn-single"
                      variant="outlined"
                    >
                      <span>&nbsp;&nbsp;Cancelar</span>
                    </Button>
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={6} md={6}></Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddForm;
