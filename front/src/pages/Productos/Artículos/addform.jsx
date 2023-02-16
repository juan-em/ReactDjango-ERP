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
  InputLabel,
  FormControl,
  Select,
  Autocomplete,
  MenuItem, Stack, Card
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";

import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCamera from '@mui/icons-material/PhotoCamera';

//componentes
import { post_putProvincia } from "../../../services/mantenimiento";



import Swal from "sweetalert2";


const AddForm = ({render, renderizar, setRenderizar, openModal, setOpenModal, item, setItem}) => {
  

  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    if(item.id)setItem({})
    setOpenModal(false)
  };

  const handlePostPutProvincia = async(e) => {
    try {
      await post_putProvincia(e)
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
    { label: 'Pulp Fiction', year: 1994 }
  ];

  //para el input de fecha
  const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

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
            {item.id ? "Editar Artículo" : "Nuevo Artículo"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>
              <form onSubmit={handlePostPutProvincia}>
                {/* item.id?<input type="hidden" name="cod" value={item.id}/>:'' */}
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombreprovincia"
                    />
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary">
                      <InputLabel id="prov">Categoría</InputLabel>
                      <Select
                        label="Categoría"
                        required
                        fullWidth
                        size="small"
                        color="secondary"
                        id="textfields"
                        name="codprovincia">
                        {/* provincias.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nombreprovincia}
                          </MenuItem>
                        )) */}
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Descripción"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombreprovincia"
                    />
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary">
                      <InputLabel id="prov">Impuesto</InputLabel>
                      <Select
                        label="Impuesto"
                        required
                        fullWidth
                        size="small"
                        color="secondary"
                        id="textfields"
                        name="codprovincia">
                        {/* provincias.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nombreprovincia}
                          </MenuItem>
                        )) */}
                      </Select>
                    </FormControl>
                    <Autocomplete
                      disablePortal
                      options={top100Films}
                      required
                      size="small"
                      id="textfields"
                      name="codprovincia"
                      renderInput={(params) => 
                        <TextField {...params} color="secondary" margin="dense" label="Proveedor" />
                      }
                    />
                    <TextField
                      fullWidth
                      label="Descripción corta"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombreprovincia"
                    />
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary">
                      <InputLabel id="prov">Ubicación</InputLabel>
                      <Select
                        label="Ubicación"
                        required
                        fullWidth
                        size="small"
                        color="secondary"
                        id="textfields"
                        name="codprovincia">
                        {/* provincias.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nombreprovincia}
                          </MenuItem>
                        )) */}
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      type="number"
                      label="Stock"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombreprovincia"
                    />
                    <TextField
                      fullWidth
                      type="number"
                      label="Stock Mínimo"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombreprovincia"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary">
                      <InputLabel id="prov">Aviso Mínimo</InputLabel>
                      <Select
                        label="Aviso Mínimo"
                        required
                        fullWidth
                        size="small"
                        color="secondary"
                        id="textfields"
                        name="codprovincia">
                          <MenuItem key="" value="yes">
                            Sí
                          </MenuItem>
                          <MenuItem key="" value="no">
                            No
                          </MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Datos Producto"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombreprovincia"
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                      label="Fecha Alta"
                      inputFormat="DD/MM/YYYY"
                      value={value}
                      onChange={handleChange}
                      renderInput={(params) => <TextField 
                        {...params} 
                        fullWidth
                        size="small"
                        color="secondary"
                        id="textfields"
                        margin="dense"
                        />}
                      />
                    </LocalizationProvider>
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary">
                      <InputLabel id="prov">Embalaje</InputLabel>
                      <Select
                        label="Embalaje"
                        required
                        fullWidth
                        size="small"
                        color="secondary"
                        id="textfields"
                        name="codprovincia">
                        {/* provincias.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.nombreprovincia}
                          </MenuItem>
                        )) */}
                      </Select>
                    </FormControl>
                    <TextField
                      fullWidth
                      type="number"
                      label="Unidades por caja"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombreprovincia"
                    />
                    <TextField
                      fullWidth
                      label="Observaciones"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombreprovincia"
                    />
                    <TextField
                      fullWidth
                      label="Precio compra"
                      type="number"
                      inputProps={{
                        step: 0.1,
                      }}
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombreprovincia"
                    />
                    <TextField
                      fullWidth
                      label="Precio tienda"
                      type="number"
                      inputProps={{
                        step: 0.1,
                      }}
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombreprovincia"
                    />
                    <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary">
                      <InputLabel id="prov">Tipo</InputLabel>
                      <Select
                        label="Tipo"
                        required
                        fullWidth
                        size="small"
                        color="secondary"
                        id="textfields"
                        name="codprovincia">
                          <MenuItem key="" value="yes">
                            Insumo
                          </MenuItem>
                          <MenuItem key="" value="no">
                            Materia Prima
                          </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12}>
                    <Card sx={{ p:1 }} elevation={1}>
                    <Button variant="contained" component="label" fullWidth
                        size="small" id="textfields" endIcon={<PhotoCamera />}>
                      Subir imagen del artículo
                      <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    </Card>
                    
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
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
