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
  InputAdornment,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
//componentes
import { postAlmacen, putAlmacen } from "../../../services/mantenimiento";

import { FieldArray, Formik } from "formik";

import Swal from "sweetalert2";
import { Box } from "@mui/system";

const AddForm = ({
  render,
  renderizar,
  setRenderizar,
  openModal,
  setOpenModal,
  item,
  setItem,
}) => {
  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    if (item.id) setItem({});
    setOpenModal(false);
  };

  const productoEsc = {
    nombre: "",
    cantidad: "",
    descripcion_producto: "",
    categoria: "",
    imagen: "",
    producto_variante: [
      {
        nombre: "",
        descripcion: "",
        color: "",
        talla: "",
        horas_manufactura: "",
        costo_manufactura: "",
        gastos_generales: "",
        precio_final: "",
        producto_detalle: [],
      },
    ],
  };

  const InSubmit = async (val) => {
    try {
      !item.id ? await postAlmacen(val) : await putAlmacen(val, item.id);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el impuesto",
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

  useEffect(() => {
    
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
            {item.id ? "Editar Producto" : "Nuevo Producto"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>
            <Formik initialValues={productoEsc} onSubmit={InSubmit}>
              {({ values, handleSubmit, handleChange }) => (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        required
                        size="small"
                        color="secondary"
                        id="textfields"
                        margin="dense"
                        name="nombre"
                        onChange={handleChange}
                        value={values.nombre}
                      />
                      <TextField
                        fullWidth
                        label="Cantidad"
                        required
                        size="small"
                        color="secondary"
                        id="textfields"
                        margin="dense"
                        name="cantidad"
                        onChange={handleChange}
                        value={values.cantidad}
                      />
                      <TextField
                        fullWidth
                        label="Descripcion"
                        required
                        size="small"
                        color="secondary"
                        id="textfields"
                        margin="dense"
                        name="descripcion_producto"
                        onChange={handleChange}
                        value={values.descripcion_producto}
                      />
                      <TextField
                        fullWidth
                        label="Categoria"
                        required
                        size="small"
                        color="secondary"
                        id="textfields"
                        margin="dense"
                        name="categoria"
                        onChange={handleChange}
                        value={values.categoria}
                      />
                      <Button
                        fullWidth
                        component="label"
                        variant="outlined"
                        color="secondary"
                        startIcon={<UploadFileIcon />}
                        sx={{ marginTop: "0.5rem" }}
                      >
                        Imagen
                        <input
                          type="file"
                          hidden
                          name="imagen"
                          onChange={handleChange}
                          value={values.imagen}
                        />
                      </Button>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <FieldArray
                        name="producto_variante"
                        render={(arrayHelpers) => (
                          <>
                            {values.producto_variante.map((variante, index) => (
                              <Box
                                key={index}
                                sx={{ p: 2, border: "1px dashed purple" }}
                              >
                                <Grid container>
                                  <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                      fullWidth
                                      label="Nombre"
                                      required
                                      size="small"
                                      color="secondary"
                                      id="textfields"
                                      margin="dense"
                                      name={`producto_variante.${index}.nombre`}
                                      onChange={handleChange}
                                      value={variante.nombre}
                                    />
                                    <TextField
                                      fullWidth
                                      label="Descripcion"
                                      required
                                      size="small"
                                      color="secondary"
                                      id="textfields"
                                      margin="dense"
                                      name={`producto_variante.${index}.descripcion`}
                                      onChange={handleChange}
                                      value={variante.descripcion}
                                    />
                                    <TextField
                                      fullWidth
                                      label="Color"
                                      required
                                      size="small"
                                      color="secondary"
                                      id="textfields"
                                      margin="dense"
                                      name={`producto_variante.${index}.color`}
                                      onChange={handleChange}
                                      value={variante.color}
                                    />
                                    <TextField
                                      fullWidth
                                      label="Talla"
                                      required
                                      size="small"
                                      color="secondary"
                                      id="textfields"
                                      margin="dense"
                                      name={`producto_variante.${index}.talla`}
                                      onChange={handleChange}
                                      value={variante.talla}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6} md={6}>
                                    <TextField
                                      fullWidth
                                      label="Horas de Manufactura"
                                      required
                                      size="small"
                                      color="secondary"
                                      id="textfields"
                                      margin="dense"
                                      name={`producto_variante.${index}.horas_manufactura`}
                                      onChange={handleChange}
                                      value={variante.horas_manufactura}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            h
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                    <TextField
                                      fullWidth
                                      label="Costos de Manufactura"
                                      required
                                      size="small"
                                      color="secondary"
                                      id="textfields"
                                      margin="dense"
                                      name={`producto_variante.${index}.costo_manufactura`}
                                      onChange={handleChange}
                                      value={variante.costo_manufactura}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            S/.
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                    <TextField
                                      fullWidth
                                      label="Gastos Generales"
                                      required
                                      size="small"
                                      color="secondary"
                                      id="textfields"
                                      margin="dense"
                                      name={`producto_variante.${index}.gastos_generales`}
                                      onChange={handleChange}
                                      value={variante.gastos_generales}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            S/.
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                    <TextField
                                      fullWidth
                                      label="Precio Final"
                                      disabled
                                      size="small"
                                      color="secondary"
                                      id="textfields"
                                      margin="dense"
                                      name={`producto_variante.${index}.precio_final`}
                                      onChange={handleChange}
                                      value={
                                        parseInt(variante.gastos_generales) +
                                        parseInt(variante.costo_manufactura) *
                                          parseInt(variante.horas_manufactura)
                                      }
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            S/.
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </Grid>
                                </Grid>

                                <Button
                                  fullWidth
                                  component="label"
                                  variant="outlined"
                                  color="secondary"
                                  startIcon={<AddCircleIcon />}
                                  sx={{ marginTop: "0.5rem" }}
                                  onClick={() => arrayHelpers.insert(index, "")}
                                >
                                  Variantes
                                </Button>
                              </Box>
                            ))}
                          </>
                        )}
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
              )}
            </Formik>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
