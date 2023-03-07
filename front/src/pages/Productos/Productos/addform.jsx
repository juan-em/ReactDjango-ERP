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
  InputAdornment,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
//componentes
import { get } from "../../../services/mantenimiento";
import { postProd, putProd, artget } from "../../../services/producto";

import { Field, FieldArray, Formik } from "formik";

import Swal from "sweetalert2";
import { Box } from "@mui/system";

import {parseFormData} from 'parse-nested-form-data'

const AddForm = ({
  render,
  renderizar,
  setRenderizar,
  openModal,
  setOpenModal,
  item,
  setItem,
}) => {
  const [catProd, setCatProd] = useState([]);
  const [art, setArt] = useState([]);
  const [artValue, setArtValue] = useState([]);
  const [vArt, setVArt] = useState([]);
  const [filterVarianteArt, setFilterVarianteArt] = useState([]);
  const [imagen, setImagen] = useState();

  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    if (item.id) setItem({});
    setOpenModal(false);
  };

  const handleChangeImagen = (event) => {
    setImagen(event.target.value);
  };

  const InSubmit = async (val) => {
    let variantes = []
    let detalle = []
    let formData = new FormData;
    formData.append('nombre', val.nombre)
    formData.append('cantidad', val.cantidad)
    formData.append('descripcion_producto', val.descripcion_producto)
    formData.append('categoria', val.categoria)
    formData.append('imagen', val.imagen)
    // formData.append('producto_variante[0].nombre', 'nada')
    // formData.append('producto_variante[0].descripcion', 'nada')
    // formData.append('producto_variante[0].color', 'nada')
    // formData.append('producto_variante[0].talla', 'nada')
    // formData.append('producto_variante[0].horas_manufactura', 'nada')
    // formData.append('producto_variante[0].costos_manufactura', 'nada')
    // formData.append('producto_variante[0].gastos_generales', 'nada')
    val.producto_variante.forEach((it, index)=>{
      formData.append(`producto_variante[${index}].nombre`, val.producto_variante[index].nombre)
      formData.append(`producto_variante[${index}].descripcion`, val.producto_variante[index].descripcion)
      formData.append(`producto_variante[${index}].color`, val.producto_variante[index].color)
      formData.append(`producto_variante[${index}].talla`, val.producto_variante[index].talla)
      formData.append(`producto_variante[${index}].horas_manufactura`, val.producto_variante[index].horas_manufactura)
      formData.append(`producto_variante[${index}].costos_manufactura`, val.producto_variante[index].costos_manufactura)
      formData.append(`producto_variante[${index}].gastos_generales`, val.producto_variante[index].gastos_generales)
      formData.append(`producto_variante[${index}].precio_final`, val.producto_variante[index].precio_final)
      // variantes.push({
      //   nombre:val.producto_variante[index].nombre,
      //   descripcion:val.producto_variante[index].descripcion,
      //   color:val.producto_variante[index].color,
      //   talla:val.producto_variante[index].talla,
      //   horas_manufactura:val.producto_variante[index].horas_manufactura,
      //   costo_manufactura:val.producto_variante[index].costo_manufactura,
      //   gastos_generales:val.producto_variante[index].gastos_generales,
      // })
      
      it.producto_detalle.forEach((i, ind)=>{
        // detalle.push({
        //   nombre:val.producto_variante[index].producto_detalle[ind].articulo,
        //   cantidad:val.producto_variante[index].producto_detalle[ind].cantidad
        // })
        formData.append(`producto_variante[${index}].producto_detalle[${ind}].articulo`, val.producto_variante[index].producto_detalle[ind].articulo)
        formData.append(`producto_variante[${index}].producto_detalle[${ind}].cantidad`, val.producto_variante[index].producto_detalle[ind].cantidad)
      })
    })
    // const parseData = parseFormData(formData)
    // console.log(parseData)

    
    // formData.append('producto_variante', JSON.stringify(variantes))
    // formData.append('producto_variante.producto_detalle', JSON.stringify(detalle))
    
    try {
      console.log(val);
      !item.id ? await postProd(formData) : await putProd(formData, item.id);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el impuesto",
      });
      if (item.id) setItem({});
      setRenderizar(!renderizar);
      render.current = true;
    } catch (error) {
      console.log(val);
      console.log(formData);
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
      vArt.filter((item) => item.articulo === newValue.nombre)
    );
  };

  useEffect(() => {
    const URL = "http://localhost:8000/api/mantenimientos/categoria_productos/";
    const URLA = "http://localhost:8000/api/articulos/";
    const URLAV = "http://localhost:8000/api/articulos/variantes/";
    get(setCatProd, URL);
    artget(setArt, URLA);
    artget(setVArt, URLAV);
  }, []);

  console.log(item)

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
            <Formik initialValues={item} onSubmit={InSubmit}>
              {({ values, handleSubmit, handleChange, setFieldValue }) => {
                const [imagenURL, setImagenURL] = useState(values.imagen || '');
                return (
                  <form onSubmit={handleSubmit}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={5}>
                      <Button
                        sx={{ height: "100%" }}
                        fullWidth
                        component="label"
                        id="textfields"
                        size="small"
                        color="primary"
                        variant="outlined"
                      >
                        {values.imagen ? (
                          <img src={imagenURL} alt="Imagen seleccionada" />
                        ) : (
                          "Subir Imagen"
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          name="imagen"
                          onChange={(e) => {
                            setFieldValue([e.target.name], e.target.files[0]);
                            setImagenURL(
                              URL.createObjectURL(e.target.files[0])
                            );
                          }}
                        />
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7}>
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
                      <FormControl
                        fullWidth
                        margin="dense"
                        size="small"
                        color="secondary"
                      >
                        <InputLabel>Categorias</InputLabel>
                        <Select
                          label="Categorias"
                          size="small"
                          color="secondary"
                          id="textfields"
                          name="categoria"
                          onChange={handleChange}
                          value={values.categoria}
                        >
                          {catProd.map((item, i) => (
                            <MenuItem key={i} value={item.id}>
                              {item.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <FieldArray
                        name="producto_variante"
                        render={(arrayHelpers) => (
                          <>
                            <Button
                              fullWidth
                              component="label"
                              variant="outlined"
                              color="secondary"
                              startIcon={<AddCircleIcon />}
                              sx={{ marginTop: "0.5rem" }}
                              onClick={() => arrayHelpers.push("")}
                            >
                              Variantes
                            </Button>
                            {values.producto_variante &&
                            values.producto_variante.length > 0 ? (
                              values.producto_variante.map(
                                (variante, index) => (
                                  <Box
                                    key={index}
                                    sx={{ p: 2, border: "1px dashed purple" }}
                                  >
                                    <Button
                                      fullWidth
                                      component="label"
                                      variant="outlined"
                                      color="secondary"
                                      startIcon={<RemoveCircleIcon />}
                                      sx={{ marginTop: "0.5rem" }}
                                      onClick={() => arrayHelpers.remove(index)}
                                    ></Button>
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
                                      <Grid item xs={12}>
                                        <FieldArray
                                          name={`producto_variante.${index}.producto_detalle`}
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
                                              {variante.producto_detalle !==
                                              undefined ? (
                                                variante.producto_detalle.map(
                                                  (detalle, i) => (
                                                    <Box
                                                      key={i}
                                                      sx={{
                                                        p: 2,
                                                        border:
                                                          "1px dashed purple",
                                                      }}
                                                    >
                                                      <Button
                                                        fullWidth
                                                        component="label"
                                                        variant="outlined"
                                                        color="secondary"
                                                        startIcon={
                                                          <RemoveCircleIcon />
                                                        }
                                                        sx={{
                                                          marginTop: "0.5rem",
                                                        }}
                                                        onClick={() =>
                                                          array.remove(i)
                                                        }
                                                      ></Button>

                                                      <Grid container>
                                                        <Grid item xs={6}>
                                                          <Autocomplete
                                                            sx={{ mt: 1 }}
                                                            size="small"
                                                            color="secondary"
                                                            options={art}
                                                            getOptionLabel={(
                                                              option
                                                            ) => option.nombre}
                                                            onChange={
                                                              varianteHandleChange
                                                            }
                                                            renderInput={(
                                                              params
                                                            ) => (
                                                              <TextField
                                                                {...params}
                                                                label="Articulos"
                                                                inputProps={{
                                                                  ...params.inputProps,
                                                                }}
                                                              />
                                                            )}
                                                            // value={detalle.articulo.id}
                                                          />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                          <FormControl
                                                            fullWidth
                                                            margin="dense"
                                                            size="small"
                                                            color="secondary"
                                                          >
                                                            <InputLabel>
                                                              Variante
                                                            </InputLabel>
                                                            <Select
                                                              label="Categorias"
                                                              size="small"
                                                              color="secondary"
                                                              id="textfields"
                                                              name={`producto_variante.${index}.producto_detalle.${i}.articulo`}
                                                              // value={detalle.articulo.variante}
                                                              onChange={
                                                                handleChange
                                                              }
                                                            >
                                                              {filterVarianteArt.map(
                                                                (item, i) => (
                                                                  <MenuItem
                                                                    key={i}
                                                                    value={
                                                                      item.id
                                                                    }
                                                                  >
                                                                    {
                                                                      item.nombre
                                                                    }
                                                                  </MenuItem>
                                                                )
                                                              )}
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
                                                        name={`producto_variante.${index}.producto_detalle.${i}.cantidad`}
                                                        value={detalle.cantidad}
                                                        onChange={handleChange}
                                                      />
                                                    </Box>
                                                  )
                                                )
                                              ) : (
                                                <></>
                                              )}
                                            </>
                                          )}
                                        />
                                      </Grid>
                                    </Grid>
                                  </Box>
                                )
                              )
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
                )
              }}
            </Formik>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
