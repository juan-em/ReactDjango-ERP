import { useState } from "react";
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

//componentes
import { get, searcher, post_put, del } from "../../../services/mantenimiento";



import Swal from "sweetalert2";


const AddForm = ({render, renderizar, setRenderizar, openModal, setOpenModal, item, setItem}) => {
  
  const URL = "http://localhost:8000/api/mantenimientos/categoriaarticulos/";
  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    if(item.id)setItem({})
    setOpenModal(false)
  };

  const handlePostPut = async(e) => {
    try {
      const {nombre,} = e.target
      await post_put(e, nombre, URL)
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registró la categoría",
      });
      if(item.id)setItem({})
      setRenderizar(!renderizar)
      render.current = true
      
    }
    catch(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
    setOpenModal(false)
  }

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
  ];

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
        <DialogContent>
          <TabContext centered>
              <form onSubmit={handlePostPut}>
                {item.id?<input type="hidden" name="cod" value={item.id}/>:''
                }
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
                        <input hidden accept="image/*" multiple type="file" />
                      Subir Imagen
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
                      defaultValue={item.id ? item.nombre:''}
                    />
                    <TextField
                      fullWidth
                      label="Descripción"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="nombre"
                      id="textfields"
                    />
                    <Autocomplete
                      disablePortal
                      options={top100Films}
                      size="small"
                      id="textfields"
                      renderInput={(params) => <TextField {...params} label="Proveedor" margin="dense" color="secondary" fullWidth />}
                    />
                    <TextField
                      fullWidth
                      label="Marca"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="nombre"
                      id="textfields"
                    />
                    <Autocomplete
                      disablePortal
                      options={top100Films}
                      size="small"
                      id="textfields"
                      renderInput={(params) => <TextField {...params} label="Categoría" margin="dense" color="secondary" fullWidth />}
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
              </form>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
