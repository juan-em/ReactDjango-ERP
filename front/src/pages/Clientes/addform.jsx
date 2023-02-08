import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
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
      persona: inputsPer,
      codformapago: event.target.value,
    });
  };

  const handleInputEmpValue = (event) => {
    const { value, name } = event.target;

    if (name === "codformapago") {
      pass;
    }
    setInputsEmp({
      ...inputsEmp,
      [name]: value,
    });

    setInputCliente({
      empresa: inputsEmp,
      codformapago: event.target.value,
    });
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
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
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
                    fullWidth
                    label="Nombre"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="nombre"
                  />
                  <Select
                    label="Provincia"
                    required
                    fullWidth
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="codprovincia"
                    onChange={handleInputPerValue}
                  >
                    {provincias.map((item, i) => (
                      <MenuItem key={i} value={item.id}>
                        {item.nombreprovincia}
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    fullWidth
                    label="Direccion"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="direccion"
                  />
                  <TextField
                    fullWidth
                    label="Cuenta Bancaria"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="cuentabancaria"
                  />
                  <TextField
                    fullWidth
                    label="Movil"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="movil"
                  />
                  <Select
                    label="Forma de Pago"
                    required
                    fullWidth
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
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
                  <TextField
                    fullWidth
                    label="DNI"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="dni"
                  />
                  <TextField
                    fullWidth
                    label="Localidad"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="localidad"
                  />
                  <TextField
                    fullWidth
                    label="Codigo Postal"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="codpostal"
                  />
                  <TextField
                    fullWidth
                    label="Telefono"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="telefono"
                  />
                  <TextField
                    fullWidth
                    label="Web"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="web"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button
                    id="btnClick"
                    size="medium"
                    color="secondary"
                    className="navbar-btn-single"
                    variant="contained"
                    onClick={handleClickClientePer}
                  >
                    <span>&nbsp;&nbsp;{!nuevo ? "Editar" : "Registrar"}</span>
                  </Button>
                  <Button
                    id="btnClick"
                    size="medium"
                    color="error"
                    className="navbar-btn-single"
                    variant="contained"
                    onClick={handleClose}
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
                    fullWidth
                    label="Nombre"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="nombre"
                  />
                  <TextField
                    fullWidth
                    label="Estructura"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="estructurajuridica"
                  />
                  <Select
                    label="Provincia"
                    required
                    fullWidth
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="codprovincia"
                    onChange={handleInputPerValue}
                  >
                    {provincias.map((item, i) => (
                      <MenuItem key={i} value={item.id}>
                        {item.nombreprovincia}
                      </MenuItem>
                    ))}
                  </Select>
                  <TextField
                    fullWidth
                    label="Direccion"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="direccion"
                  />
                  <TextField
                    fullWidth
                    label="Cuenta Bancaria"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="cuentabancaria"
                  />
                  <TextField
                    fullWidth
                    label="Movil"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="movil"
                  />
                  <Select
                    label="Forma de Pago"
                    required
                    fullWidth
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
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
                  <TextField
                    fullWidth
                    label="RUC"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="ruc"
                  />
                  <TextField
                    fullWidth
                    label="Tipo de Empresa"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="tipo"
                  />
                  <TextField
                    fullWidth
                    label="Localidad"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="localidad"
                  />
                  <TextField
                    fullWidth
                    label="Codigo Postal"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="codpostal"
                  />
                  <TextField
                    fullWidth
                    label="Telefono"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="telefono"
                  />
                  <TextField
                    fullWidth
                    label="Web"
                    required
                    size="small"
                    color="secondary"
                    id="textfields"
                    margin="dense"
                    name="web"
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <Button
                    id="btnClick"
                    size="medium"
                    color="secondary"
                    className="navbar-btn-single"
                    variant="contained"
                    onClick={handleClickClienteEmp}
                  >
                    <span>&nbsp;&nbsp;{!nuevo ? "Editar" : "Registrar"}</span>
                  </Button>
                  <Button
                    id="btnClick"
                    size="medium"
                    color="error"
                    className="navbar-btn-single"
                    variant="contained"
                    onClick={handleClose}
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
