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
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

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
        text: "Se registro el Cliente",
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
          <Typography sx={{ fontSize: 40 }} color="text.secondary" gutterBottom>
            {item.id ? "Editar Provincia" : "Nueva Provincia"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>
              <form onSubmit={handlePostPutProvincia}>
                {item.id?<input type="hidden" name="cod" value={item.id}/>:''
                }
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
                      name="nombreprovincia"
                      defaultValue={item.id ? item.nombreprovincia:''}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <Button
                      id="btnClick"
                      size="medium"
                      color="secondary"
                      className="navbar-btn-single"
                      variant="contained"
                      type="submit"
                      
                    >
                      <span>&nbsp;&nbsp;{item.id ? "Editar" : "Registrar"}</span>
                    </Button>
                    <Button
                      id="btnClick"
                      size="medium"
                      color="error"
                      className="navbar-btn-single"
                      variant="contained"
                      onClick={handleClose}
                    >
                      <span>&nbsp;&nbsp;Cancelar</span>
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
