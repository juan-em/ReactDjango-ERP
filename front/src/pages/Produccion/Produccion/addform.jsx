import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Autocomplete,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { TabContext } from "@mui/lab";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";

//componentes
import { get, searcher, post_put, del } from "../../../services/mantenimiento";
import { postProduccion, patchProduccion } from "../../../services/produccion";

import Swal from "sweetalert2";

import { Field, FieldArray, Formik } from "formik";

import { getProd } from "../../../services/producto";
import { getVenta } from "../../../services/ventas";

const AddForm = ({
  render,
  renderizar,
  setRenderizar,
  openModal,
  setOpenModal,
  item,
  setItem,
}) => {
  const URL = "http://localhost:8000/api/mantenimientos/categoriaarticulos/";
  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const [producto, setProducto] = useState([]);
  const [venta, setVenta] = useState([]);

  const handleClose = () => {
    if (item.id) setItem({});
    setOpenModal(false);
  };

  const handlePost = async (e) => {
    console.log(e);
    try {
      !item.id ? await postProduccion(e) : await patchProduccion(e, item.id);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registró la nueva produccion",
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

  const handleFilterProducts = (e) => {
    console.log(e.detalle_venta);
    setProducto(e.detalle_venta);
  };

  const estadosProduccion = [
    { id: 1, nombre: "No Iniciado" },
    { id: 2, nombre: "En proceso" },
    { id: 3, nombre: "Terminado" },
    { id: 4, nombre: "Saliendo" },
  ];
  useEffect(() => {
    // getProd(setProducto);
    getVenta(setVenta, "http://localhost:8000/api/ventas/");
  }, []);
  console.log(producto)
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
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            {item.id ? "Editar producion" : "Nueva Produccion"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>
            <Formik initialValues={item} onSubmit={handlePost}>
              {({ values, handleSubmit, handleChange, setFieldValue }) => {
                return (
                  <form onSubmit={handleSubmit}>
                    {item.id ? (
                      <input type="hidden" name="cod" value={item.id} />
                    ) : (
                      ""
                    )}
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6}>
                        <TextField
                          fullWidth
                          margin="dense"
                          size="small"
                          color="secondary"
                          id="textfields"
                          variant="filled"
                          name="fecha_inicio"
                          onChange={handleChange}
                          value={values.fecha_inicio}
                          type="date"
                        />
                        <TextField
                          fullWidth
                          margin="dense"
                          size="small"
                          color="secondary"
                          id="textfields"
                          variant="filled"
                          name="fecha_fin"
                          onChange={handleChange}
                          value={values.fecha_fin}
                          type="date"
                        />
                      </Grid>

                      <Grid item xs={12} sm={12} md={6}>
                        <Autocomplete
                          disablePortal
                          options={venta}
                          getOptionLabel={(option) => {
                            if (option) return option.codigo;
                            return "";
                          }}
                          size="small"
                          id="textfields"
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Venta"
                              margin="dense"
                              color="secondary"
                              fullWidth
                            />
                          )}
                          value={values.factura_clie_id}
                          onChange={(e, value) => {
                            setFieldValue("factura_clie_id", value.id);
                            handleFilterProducts(value);
                          }}
                        />
                        <FormControl
                          fullWidth
                          margin="dense"
                          size="small"
                          color="secondary"
                        >
                          <InputLabel>Estado</InputLabel>
                          <Select
                            label="Estado"
                            size="small"
                            color="secondary"
                            id="textfields"
                            name={"estado"}
                            onChange={handleChange}
                            value={values.estado}
                          >
                            {estadosProduccion.map((item, i) => (
                              <MenuItem key={i} value={item.nombre}>
                                {item.nombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      {
                        <Grid item xs={12} sm={12} md={12} sx={{ mt: 4 }}>
                          <FieldArray
                            name="detalles"
                            render={(arrayHelpers) => (
                              <>
                                {values.detalles &&
                                values.detalles.length > 0 ? (
                                  values.detalles.map((det, index) => (
                                    <Box
                                      key={index}
                                      sx={{
                                        p: 2,
                                        border: "1px dashed purple",
                                      }}
                                    >
                                      <Button
                                        fullWidth
                                        component="label"
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<RemoveCircleIcon />}
                                        sx={{ marginTop: "0.5rem" }}
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      ></Button>
                                      <Grid container>
                                        <Grid item xs={12} sm={12} md={12}>
                                          <FormControl
                                            fullWidth
                                            margin="dense"
                                            size="small"
                                            color="secondary"
                                          >
                                            <InputLabel>Estado</InputLabel>
                                            <Select
                                              label="Embalaje"
                                              size="small"
                                              color="secondary"
                                              id="textfields"
                                              name={`detalles.${index}.estdo_produccion_prod`}
                                              onChange={handleChange}
                                              // value={values.embalaje}
                                            >
                                              {estadosProduccion.map(
                                                (item, i) => (
                                                  <MenuItem
                                                    key={i}
                                                    value={item.nombre}
                                                  >
                                                    {item.nombre}
                                                  </MenuItem>
                                                )
                                              )}
                                            </Select>
                                          </FormControl>
                                          <FormControl
                                            fullWidth
                                            margin="dense"
                                            size="small"
                                            color="secondary"
                                          >
                                            <InputLabel>Producto</InputLabel>
                                            <Select
                                              label="Productos"
                                              size="small"
                                              color="secondary"
                                              id="textfields"
                                              name={`detalles.${index}.cod_producto_id`}
                                              onChange={handleChange}
                                              // value={`values.embalaje`}
                                            >
                                              {producto.map((item, i) => (
                                                <MenuItem
                                                  key={i}
                                                  value={item.id}
                                                >
                                                  {item.producto.nombre}
                                                </MenuItem>
                                              ))}
                                            </Select>
                                          </FormControl>
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  ))
                                ) : (
                                  <></>
                                )}
                                <Button
                                  fullWidth
                                  component="label"
                                  variant="outlined"
                                  color="secondary"
                                  startIcon={<AddCircleIcon />}
                                  sx={{ marginTop: "0.5rem" }}
                                  onClick={() => arrayHelpers.push("")}
                                >
                                  Detalle
                                </Button>
                              </>
                            )}
                          />
                        </Grid>
                      }
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
                );
              }}
            </Formik>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
