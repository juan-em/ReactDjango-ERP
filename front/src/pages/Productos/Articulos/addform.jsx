import { useEffect, useState, useRef } from "react";
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
  Autocomplete
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import { Formik } from "formik";

//componentes
import { get } from "../../../services/mantenimiento";
import { getProveedores } from "../../../services/Proveedores";
import { postArticulo, putArticulo, transformObjectToFormData } from "../../../services/articulos";
import Swal from "sweetalert2";


const AddForm = ({
  render, 
  renderizar, 
  setRenderizar, 
  openModal, 
  setOpenModal, 
  item, 
  setItem,
  proveedores,
  setProveedores,
  categorias,
  setCategorias
}) => {

  
  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    if(item.id)setItem({})
    setOpenModal(false)
  };

  const artSubmit = async (val) => {
    let {proveedor, categoria} = val
    let dataToSubmit
    dataToSubmit = {
      "proveedor":proveedor ? proveedor.id : null, 
      "categoria":categoria ? categoria.id : null
    }
    if (!item.id){
      dataToSubmit = {...val,...dataToSubmit, "variantes":[{"nombre":val.nombre}]};
    } 
    else {
      let {nombre, descripcion, marca, imagen} = val
      dataToSubmit =  {nombre, descripcion, marca, imagen, ...dataToSubmit}
      typeof dataToSubmit.imagen === 'string' && delete dataToSubmit.imagen
    }
    try {
      var payload = transformObjectToFormData(dataToSubmit)
      // for (var key of payload.entries()) {
      //   console.log(key[0] + ', ' + key[1]);
      // }
      !item.id
        ? await postArticulo(payload)
        : await putArticulo(item.id, payload);
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el artículo",
      })
      if (item.id) setItem({});
      setRenderizar(!renderizar);
      render.current = true;
    }
    catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
    setOpenModal(false);
  };


  useEffect(()=>{
    const URL_C = "http://localhost:8000/api/mantenimientos/categoriaarticulos/";
    getProveedores(setProveedores)
    get(setCategorias, URL_C)
  },[])


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
            {item.id ? "Editar Artículo" : "Nuevo Artículo"}
          </Typography>
        </DialogTitle>
        <DialogContent centered="true">
            <Formik initialValues={item} onSubmit={artSubmit}>
            {({ values, handleSubmit, handleChange, setFieldValue }) => {
            const [imagenURL, setImagenURL] = useState(values.imagen || '');
            return (
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={5}>
                    <Button
                      sx={{height:'100%'}}
                      fullWidth
                      component="label"
                      id="textfields"
                      size="small"
                      color="primary"
                      variant="outlined">
                        { values.imagen ? <img src={imagenURL} alt="Imagen seleccionada"/> : "Subir Imagen" }
                        <input type="file" accept="image/*" hidden 
                        name="imagen" onChange={(e)=>{
                          setFieldValue([e.target.name],e.target.files[0]);
                          setImagenURL(URL.createObjectURL(e.target.files[0]));
                        }}/>
                        
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
                      label="Descripción"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="descripcion"
                      id="textfields"
                      onChange={handleChange}
                      value={values.descripcion}
                    />
                    <Autocomplete
                      disablePortal
                      options={proveedores}
                      getOptionLabel = {(option) => {
                        if (option.persona) return option.persona.nombre 
                        if (option.empresa) return option.empresa.nombre
                        return ''
                      }}
                      size="small"
                      id="textfields"
                      renderInput={(params) => 
                        <TextField 
                          {...params} 
                          label="Proveedor" 
                          margin="dense" 
                          color="secondary"
                          fullWidth />}
                      value={values.proveedor}
                      onChange={(e, value) => {setFieldValue("proveedor", value)}}
                    />
                    <TextField
                      fullWidth
                      label="Marca"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="marca"
                      id="textfields"
                      onChange={handleChange}
                      value={values.marca}
                    />
                    <Autocomplete
                      disablePortal
                      options={categorias}
                      getOptionLabel={(option)=>{if (option) return option.nombre 
                                                return ''}}
                      size="small"
                      id="textfields"
                      renderInput={(params) => 
                        <TextField 
                          {...params} 
                          label="Categoría" 
                          margin="dense" 
                          color="secondary" 
                          fullWidth 
                        />}
                      value={values.categoria}
                      onChange={(e, value) => {setFieldValue("categoria", value)}}
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
                      type="submit">
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
              </form> )}}
            </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
