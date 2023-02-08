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
  FormGroup,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import { Box, Container } from "@mui/system";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

import {
  postClienteper,
  postClienteemp,
  putClienteemp,
  putClienteper,
} from "../../services/clientes";

import { getProvincias, getFormaPago } from "../../services/mantenimiento";

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

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [provincias, setProvincias] = useState([]);
  const [formPagos, setFormPago] = useState([]);
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
  });
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
  });
  const [inputCliente, setInputCliente] = useState({
    persona: {},
    empresa: {},
    codformapago: "",
  });

  const handleInputPerValue = (event) => {
    const { value, name } = event.target;

    setInputsPer({
      ...inputsPer,
      [name]: value,
    });

    setInputCliente({
        persona:inputsPer,
        codformapago: event.target.value
    })
  };

  const handleInputEmpValue = (event) => {
    const { value, name } = event.target;

    if (name === 'codformapago'){
        pass
      } 
    setInputsEmp({
      ...inputsEmp,
      [name]: value,
    });

    setInputCliente({
        empresa:inputsEmp,
        codformapago: event.target.value
    })
  };

      console.log(inputCliente);
  const handleClickClienteEmp = async () => {
    try {
      if (!nuevo) {
        await postClienteemp(inputCliente);
      }
      await putClienteemp(inputCliente);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el Cliente",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };
  const handleClickClientePer = async () => {
    try {
        if (!nuevo) {
          await postClienteper(inputCliente);
        }
        await putClienteper(inputCliente);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el Cliente",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  useEffect(() => {
    getProvincias(setProvincias);
    getFormaPago(setFormPago);
  }, []);

  return (
    <>
      <IconButton
        aria-label="delete"
        color="secondary"
        size="large"
        onClick={handleOpen}
      >
        <AddCircleIcon fontSize="large" />
      </IconButton>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle>
          <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
            {!nuevo ? "Editar Cliente" : "Nuevo Cliente"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {!empresa ? (
            <form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Nombre"
                    required
                    fullWidth
                    name="nombre"
                    onChange={handleInputPerValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="DNI"
                    required
                    fullWidth
                    name="dni"
                    onChange={handleInputPerValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Select
                    label="Provincia"
                    required
                    fullWidth
                    name="codprovincia"
                    onChange={handleInputPerValue}
                  >
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
                    fullWidth
                    name="localidad"
                    onChange={handleInputPerValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Direccion"
                    required
                    fullWidth
                    name="direccion"
                    onChange={handleInputPerValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Codigo Postal"
                    required
                    fullWidth
                    name="codpostal"
                    onChange={handleInputPerValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Cuenta Bancaria"
                    required
                    fullWidth
                    name="cuentabancaria"
                    onChange={handleInputPerValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Telefono"
                    required
                    fullWidth
                    name="telefono"
                    onChange={handleInputPerValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Movil"
                    required
                    fullWidth
                    name="movil"
                    onChange={handleInputPerValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Web"
                    required
                    fullWidth
                    name="web"
                    onChange={handleInputPerValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Select
                    label="Forma de Pago"
                    required
                    fullWidth
                    name="codformapago"
                    onChange={handleInputPerValue}
                  >
                    {formPagos.map((item, i) => (
                      <MenuItem key={i} value={item.id}>
                        {item.nombrefp}
                      </MenuItem>
                    ))}
                  </Select>
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
              </Grid>
            </form>
          ) : (
            <form>
              <Grid content spacing={2}>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Nombre"
                    required
                    fullWidth
                    name="empresa.nombre"
                    onChange={handleInputEmpValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="RUC"
                    required
                    fullWidth
                    name="empresa.ruc"
                    onChange={handleInputEmpValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Estructura"
                    required
                    fullWidth
                    name="empresa.estructurajuridica"
                    onChange={handleInputEmpValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Tipo de Empresa"
                    required
                    fullWidth
                    name="empresa.tipo"
                    onChange={handleInputEmpValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Select
                    label="Provincia"
                    required
                    fullWidth
                    name="empresa.codprovincia"
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
                    fullWidth
                    name="empresa.localidad"
                    onChange={handleInputEmpValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Direccion"
                    required
                    fullWidth
                    name="empresa.direccion"
                    onChange={handleInputEmpValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Codigo Postal"
                    required
                    fullWidth
                    name="empresa.codpostal"
                    onChange={handleInputEmpValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Cuenta Bancaria"
                    required
                    fullWidth
                    name="empresa.cuentabancaria"
                    onChange={handleInputEmpValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Telefono"
                    required
                    fullWidth
                    name="empresa.telefono"
                    onChange={handleInputEmpValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Movil"
                    required
                    fullWidth
                    name="empresa.movil"
                    onChange={handleInputEmpValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <TextField
                    label="Web"
                    required
                    fullWidth
                    name="empresa.web"
                    onChange={handleInputEmpValue}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                  <Select
                    label="Forma de Pago"
                    required
                    fullWidth
                    name="empresa.codformapago"
                    onChange={handleInputEmpValue}
                  >
                    <MenuItem value="all">
                      <em>-----</em>
                    </MenuItem>
                    {formPagos.map((item, i) => (
                      <MenuItem key={i} value={item.id}>
                        {item.nombrefp}
                      </MenuItem>
                    ))}
                  </Select>
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
              </Grid>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
