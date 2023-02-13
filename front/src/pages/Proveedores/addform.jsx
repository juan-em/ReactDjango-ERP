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
  collapseClasses,
  FormControl,
  InputLabel,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Box, Container } from "@mui/system";

//iconos
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { getProvincias } from "../../services/mantenimiento";

import {
  postProveedoresEmp,
  postProveedoresPer,
  putProveedoresEmp,
  putProveedoresPer
} from "../../services/Proveedores";

import Swal from "sweetalert2";

const AddForm = ({
  render,
  renderizar,
  setRenderizar,
  openModal,
  setOpenModal,
  item,
  setItem,
  value,
  setValue,
}) => {
  const [provincias, setProvincias] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenPost = () => {
    setOpenModal(true);
    setValue("1");
  };
  const handleClose = () => {
    if (item.id) setItem({});
    setOpenModal(false);
  };

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

  const [inputProveedor, setInputProveedor] = useState({
    persona: {},
    empresa: {},
    ruc: "",
  });

  const handleInputPerValue = (event) => {
    const { value, name } = event.target;

    setInputsPer({
      ...inputsPer,
      [name]: value,
    });
  };

  const handleInputEmpValue = (event) => {
    const { value, name } = event.target;

    setInputsPer({
      ...inputsPer,
      [name]: value,
    });
  };

  const handleInputProvPer = (event) => {
    setInputProveedor({
      persona: {
        ...inputsPer,
      },
      ruc: event.target.value,
    });
  };

  const handleInputProvEmp = (event) => {
    setInputProveedor({
      empresa: {
        ...inputsEmp,
      },
      ruc: event.target.value,
    });
  };

  const handleClickProvEmp = async () => {
    try {
      !item.id
        ? await postProveedoresEmp(inputProveedor)
        : await putProveedoresEmp(item.id, inputProveedor);

      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el Cliente",
      });
      if (item.id) setItem({});
      setRenderizar(!renderizar);
      render.current = true;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
    setOpenModal(false);
  };
  const handleClickProvPer = async () => {
    try {
      !item.id
        ? await postProveedoresPer(inputProveedor)
        : await putProveedoresPer(item.id, inputProveedor);

      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el Cliente",
      });
      if (item.id) setItem({});
      setRenderizar(!renderizar);
      render.current = true;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
    setOpenModal(false);
  };
  console.log(inputProveedor);
  // console.log(inputsPer);

  useEffect(() => {
    getProvincias(setProvincias);
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
            {item.id ? "Editar Cliente" : "Nuevo Cliente"}
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
                      defaultValue={item.id && item.persona ? item.persona.nombre : ""}
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
                        defaultValue={
                          item.id && item.persona
                            ? item.persona.codprovincia
                            : ""
                        }
                      >
                        {provincias.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
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
                      defaultValue={
                        item.id && item.persona ? item.persona.direccion : ""
                      }
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
                      defaultValue={
                        item.id && item.persona
                          ? item.persona.cuentabancaria
                          : ""
                      }
                    />
                    <TextField
                      label="Movil"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="movil"
                      onChange={handleInputPerValue}
                      defaultValue={item.id && item.persona ? item.persona.movil : ""}
                    />
                    <TextField
                      fullWidth
                      label="DNI"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="ruc"
                      onChange={handleInputProvPer}
                      defaultValue={item.id && item.persona ? item.persona.dni : ""}
                    />
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
                      onChange={handleInputPerValue}
                      defaultValue={item.id && item.persona ? item.ruc : ""}
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
                      defaultValue={
                        item.id && item.persona ? item.persona.localidad : ""
                      }
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
                      defaultValue={
                        item.id && item.persona ? item.persona.codpostal : ""
                      }
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
                      defaultValue={
                        item.id && item.persona ? item.persona.telefono : ""
                      }
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
                      defaultValue={item.id && item.persona ? item.persona.web : ""}
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
                      onClick={handleClickProvPer}
                    >
                      <span>{item.id ? "Editar" : "Registrar"}</span>
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
                      defaultValue={
                        item.id && item.empresa ? item.empresa.nombre : ""
                      }
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
                      defaultValue={
                        item.id && item.empresa
                          ? item.empresa.estructurajuridica
                          : ""
                      }
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
                        defaultValue={
                          item.id && item.empresa
                            ? item.empresa.codprovincia
                            : ""
                        }
                      >
                        {provincias.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
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
                      defaultValue={
                        item.id && item.empresa ? item.empresa.direccion : ""
                      }
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
                      defaultValue={
                        item.id && item.empresa
                          ? item.empresa.cuentabancaria
                          : ""
                      }
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
                      defaultValue={item.empresa ? item.empresa.movil : ""}
                    />
                    <TextField
                      fullWidth
                      label="RUC"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="ruc"
                      onChange={handleInputProvEmp}
                      value={item.id && item.empresa ? item.ruc : ""}
                    />
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
                      defaultValue={item.empresa ? item.empresa.ruc : ""}
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
                      defaultValue={item.empresa ? item.empresa.tipo : ""}
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
                      defaultValue={item.empresa ? item.empresa.localidad : ""}
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
                      defaultValue={item.empresa ? item.empresa.codpostal : ""}
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
                      defaultValue={item.empresa ? item.empresa.telefono : ""}
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
                      defaultValue={item.empresa ? item.empresa.web : ""}
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
                      onClick={handleClickProvEmp}
                    >
                      <span>{item.id ? "Editar" : "Registrar"}</span>
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
