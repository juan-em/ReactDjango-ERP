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
  Tab,
  FormLabel,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

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
  const [nuevo, setNuevo] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

    setInputsEmp({
      ...inputsEmp,
      [name]: value,
    });

    setInputCliente({
      empresa: inputsEmp,
      codformapago: event.target.value,
    });
  };

  const handleClickClienteEmp = async () => {
    try {
      nuevo
        ? await postClienteemp(inputCliente)
        : await putClienteemp(inputCliente);

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
      nuevo
        ? await postClienteper(inputCliente)
        : await putClienteper(inputCliente);

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
        onClick={handleOpenPost}
      >
        <AddCircleIcon fontSize="large" />
      </IconButton>
      <Dialog open={openModal}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            {!nuevo ? "Editar Cliente" : "Nuevo Cliente"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext value={value} centered>
            <TabList
              onChange={handleChange}
              textColor="secondary"
              indicatorColor="secondary"
            >
              <Tab label="Persona" value="1" />
              <Tab label="Empresa" value="2" />
            </TabList>
            <TabPanel value="1" color="secondary">
              <form>
                <Grid container spacing={1}>
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
                      onChange={handleInputPerValue}
                    />
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                    >
                      <InputLabel id="prov">Provincia</InputLabel>
                      <Select
                        label="Provincia"
                        required
                        fullWidth
                        size="small"
                        color="secondary"
                        id="textfields"
                        name="codprovincia"
                        onChange={handleInputPerValue}
                      >
                        {provincias.map((item, i) => (
                          <MenuItem key={i} value={item.id}>
                            {item.nombreprovincia}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Direccion"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="direccion"
                      onChange={handleInputPerValue}
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
                      onChange={handleInputPerValue}
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
                      onChange={handleInputPerValue}
                    />
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                    >
                      <InputLabel id="prov">Forma de pago</InputLabel>
                      <Select
                        label="Forma de Pago"
                        required
                        fullWidth
                        size="small"
                        color="secondary"
                        id="textfields"
                        name="codformapago"
                        onChange={handleInputPerValue}
                      >
                        <MenuItem value={""}>-----</MenuItem>
                        {formPagos.map((item, i) => (
                          <MenuItem key={i} value={item.id}>
                            {item.nombrefp}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                      onChange={handleInputPerValue}
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
                      onChange={handleInputPerValue}
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
                      onChange={handleInputPerValue}
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
                      onChange={handleInputPerValue}
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
                      onChange={handleInputPerValue}
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
                      onClick={handleClickClientePer}
                    >
                      <span>{!nuevo ? "Editar" : "Registrar"}</span>
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
              </form>
            </TabPanel>
            <TabPanel value="2">
              <form>
                <Grid container spacing={1}>
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
                      onChange={handleInputEmpValue}
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
                      onChange={handleInputEmpValue}
                    />
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                    >
                      <InputLabel id="prov">Provincia</InputLabel>
                      <Select
                        label="Provincia"
                        required
                        fullWidth
                        size="small"
                        color="secondary"
                        id="textfields"
                        name="codprovincia"
                        onChange={handleInputEmpValue}
                      >
                        {provincias.map((item, i) => (
                          <MenuItem key={i} value={item.id}>
                            {item.nombreprovincia}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Direccion"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="direccion"
                      onChange={handleInputEmpValue}
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
                      onChange={handleInputEmpValue}
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
                      onChange={handleInputEmpValue}
                    />
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                    >
                      <InputLabel id="prov">Forma de pago</InputLabel>
                      <Select
                        label="Forma de Pago"
                        required
                        fullWidth
                        size="small"
                        color="secondary"
                        id="textfields"
                        name="codformapago"
                        onChange={handleInputEmpValue}
                      >
                        {formPagos.map((item, i) => (
                          <MenuItem key={i} value={item.id}>
                            {item.nombrefp}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
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
                      onChange={handleInputEmpValue}
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
                      onChange={handleInputEmpValue}
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
                      onChange={handleInputEmpValue}
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
                      onChange={handleInputEmpValue}
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
                      onChange={handleInputEmpValue}
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
                      onChange={handleInputEmpValue}
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
                      onClick={handleClickClienteEmp}
                    >
                      <span>{!nuevo ? "Editar" : "Registrar"}</span>
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
              </form>
            </TabPanel>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
