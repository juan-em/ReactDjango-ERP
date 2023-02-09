import { useState, useEffect } from "react";
import PropTypes from "prop-types";
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

const AddForm = (props) => {
  const { onClose, openModal, item } = props;

  const handleClose = () => {
    onClose();
  };

  const [value, setValue] = useState("1");
  const [cliente, setCliente] = useState();

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
      props.id
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
      props.id
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

  const fillValues = () => {
    console.log(item);
    setCliente(item)
  };
  useEffect(() => {
    getProvincias(setProvincias);
    getFormaPago(setFormPago);
    fillValues();
    console.log(typeof item)
  }, [props.open]);

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      style={{ backgroundColor: "transparent" }}
    >
      <DialogTitle>
        <IconButton aria-label="delete" size="small" onClick={handleClose}>
          <CloseIcon fontSize="large" />
        </IconButton>
        <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
          {!props.id ? "Editar Cliente" : "Nuevo Cliente"}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {item.lenght &&
          item.map((item) => (
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
                        // value={item}
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
                          defaultValue=""
                          required
                          fullWidth
                          size="small"
                          color="secondary"
                          id="textfields"
                          name="codprovincia"
                          onChange={handleInputPerValue}
                          value={cliente.persona.codprovincia}
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
                        // value={cliente.persona.direccion}
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
                        // value={cliente.persona.cuentabancaria}
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
                        // value={cliente.persona.movil}
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
                          defaultValue=""
                          required
                          fullWidth
                          size="small"
                          color="secondary"
                          id="textfields"
                          name="codformapago"
                          onChange={handleInputPerValue}
                          // value={cliente.codformapago}
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
                        label="DNI"
                        required
                        size="small"
                        color="secondary"
                        id="textfields"
                        margin="dense"
                        name="dni"
                        onChange={handleInputPerValue}
                        // value={cliente.persona.dni}
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
                        // value={cliente.persona.localidad}
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
                        // value={cliente.persona.codpostal}
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
                        // value={cliente.persona.telefono}
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
                        // value={cliente.persona.web}
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
                        <span>{!props.id ? "Editar" : "Registrar"}</span>
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
                        // value={cliente.empresa.nombre}
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
                        // value={cliente.empresa.estructurajuridica}
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
                          defaultValue=""
                          required
                          fullWidth
                          size="small"
                          color="secondary"
                          id="textfields"
                          name="codprovincia"
                          onChange={handleInputEmpValue}
                          // value={cliente.empresa.codprovincia}
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
                        // value={cliente.empresa.direccion}
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
                        // value={cliente.empresa.cuentabancaria}
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
                        // value={cliente.empresa.movil}
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
                          defaultValue=""
                          required
                          fullWidth
                          size="small"
                          color="secondary"
                          id="textfields"
                          name="codformapago"
                          onChange={handleInputEmpValue}
                          // value={cliente.codformapago}
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
                        // value={cliente.empresa.ruc}
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
                        // value={cliente.empresa.tipo}
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
                        // value={cliente.empresa.localidad}
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
                        // value={cliente.empresa.codpostal}
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
                        // value={cliente.empresa.telefono}
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
                        // value={cliente.empresa.web}
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
                        <span>{!props.id ? "Editar" : "Registrar"}</span>
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
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default AddForm;

AddForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  item: PropTypes.array.isRequired
};
