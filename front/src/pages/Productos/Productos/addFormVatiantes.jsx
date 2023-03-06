import { useState, useEffect } from "react";

import {
  Button,
  Modal,
  Box,
  Grid,
  TextField,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

import { Field, FieldArray, Formik } from "formik";

import { post, put, artget } from "../../../services/producto";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const AddVariante = ({
  variante,
  setVariante,
  id,
  openModalVariante,
  setOpenModalVariante,
}) => {
  const [art, setArt] = useState([]);
  const [vArt, setVArt] = useState([]);
  const [filterVarianteArt, setFilterVarianteArt] = useState([]);

  const handleOpen = () => {
    setOpenModalVariante(true);
  };
  const handleClose = () => {
    setOpenModalVariante(false);
    setVariante({});
  };

  const InSub = async (val) => {
    console.log(id);
    console.log(val);
    try {
    //   URL = "http://localhost:8000/api/productos/prodvar/";
      !variante.id ? await post(val, 'http://localhost:8000/api/productos/prodvar/') : await put(val, `http://localhost:8000/api/productos/prodvar/${id}/`);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el impuesto",
      });
      if (variante.id) setVariante({});
      setRenderizar(!renderizar);
      render.current = true;
    } catch (error) {
      console.log(val);
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
    setOpenModal(false);
  };

  const varianteHandleChange = (event, newValue) => {
    setFilterVarianteArt(
      vArt.filter((variante) => variante.articulo === newValue.nombre)
    );
  };

  useEffect(() => {
    const URLA = "http://localhost:8000/api/articulos/";
    const URLAV = "http://localhost:8000/api/articulos/variantes/";
    artget(setArt, URLA);
    artget(setVArt, URLAV);
  }, []);

  return (
    <>
      <Button color="secondary" variant="contained" onClick={handleOpen}>
        Añadir
      </Button>
      <Dialog
        open={openModalVariante}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <DialogTitle>
          <h2 id="parent-modal-title">Nueva variante</h2>
        </DialogTitle>
        <DialogContent>
          <Formik initialValues={variante} onSubmit={InSub}>
            {({ values, handleSubmit, handleChange, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
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
                      onChange={handleChange}
                      value={values.nombre}
                    />
                    <TextField
                      fullWidth
                      label="Descripcion"
                      required
                      type="text"
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="descripcion"
                      onChange={handleChange}
                      value={values.descripcion}
                    />
                    <TextField
                      fullWidth
                      label="Color"
                      required
                      type="text"
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="color"
                      onChange={handleChange}
                      value={values.color}
                    />
                    <TextField
                      fullWidth
                      label="Talla"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="talla"
                      id="textfields"
                      onChange={handleChange}
                      value={values.talla}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      fullWidth
                      label="Horas de Manufactura"
                      type="number"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="horas_manufactura"
                      id="textfields"
                      onChange={handleChange}
                      value={values.horas_manufactura}
                    />
                    <TextField
                      fullWidth
                      label="Costo de Manufactura"
                      type="number"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="costo_manufactura"
                      id="textfields"
                      onChange={handleChange}
                      value={values.costo_manufactura}
                    />
                    <TextField
                      fullWidth
                      label="Gastos Generales"
                      type="number"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="gastos_generales"
                      id="textfields"
                      onChange={handleChange}
                      value={values.gastos_generales}
                    />
                    <TextField
                      fullWidth
                      label="Precio Final"
                      type="number"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="precio_final"
                      id="textfields"
                      onChange={handleChange}
                      value={
                        parseInt(values.gastos_generales) +
                        parseInt(values.costo_manufactura) *
                          parseInt(values.horas_manufactura)
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <FieldArray
                      name={"producto_detalle"}
                      render={(array) => (
                        <>
                          <Button
                            fullWidth
                            component="label"
                            variant="outlined"
                            color="secondary"
                            startIcon={<AddCircleIcon />}
                            sx={{ marginTop: "0.5rem" }}
                            onClick={() => array.push("")}
                          >
                            Detalle
                          </Button>
                          {values.producto_detalle !== undefined ? (
                            values.producto_detalle.map((detalle, i) => (
                              <Box
                                key={i}
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
                                  sx={{
                                    marginTop: "0.5rem",
                                  }}
                                  onClick={() => array.remove(i)}
                                ></Button>

                                <Grid container>
                                  <Grid item xs={12} sm={6} md={6}>
                                    <Autocomplete
                                      sx={{ mt: 1 }}
                                      size="small"
                                      color="secondary"
                                      options={art}
                                      getOptionLabel={(option) => option.nombre}
                                      value={art.nombre}
                                      onChange={varianteHandleChange}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label="Articulos"
                                          inputProps={{
                                            ...params.inputProps,
                                          }}
                                          value={detalle.nombre}
                                        />
                                      )}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6} md={6}>
                                    <FormControl
                                      fullWidth
                                      margin="dense"
                                      size="small"
                                      color="secondary"
                                    >
                                      <InputLabel>Variante</InputLabel>
                                      <Select
                                        label="Categorias"
                                        size="small"
                                        color="secondary"
                                        id="textfields"
                                        name={`producto_detalle.${i}.articulo`}
                                        value={[detalle.articulo]}
                                        onChange={handleChange}
                                      >
                                        {filterVarianteArt.map((item, i) => (
                                          <MenuItem key={i} value={item.id}>
                                            {item.nombre}
                                          </MenuItem>
                                        ))}
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                </Grid>
                                <TextField
                                  fullWidth
                                  label="Cantidad"
                                  required
                                  size="small"
                                  color="secondary"
                                  id="textfields"
                                  margin="dense"
                                  name={`producto_detalle.${i}.cantidad`}
                                  onChange={handleChange}
                                  value={detalle.cantidad}
                                />
                              </Box>
                            ))
                          ) : (
                            <></>
                          )}
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
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddVariante;
