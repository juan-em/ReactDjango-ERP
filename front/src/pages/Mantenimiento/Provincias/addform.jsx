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


const AddForm = () => {
  const [nuevo, setNuevo] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const handleOpenPost = () => {
    setOpenModal(true);
  };
  const handleOpenPut = () => {
    setOpenModal(true);
    setNuevo(false);
  };
  const handleClose = () => setOpenModal(false);

  const envio = async(e) => {
    try {
      await post_putProvincia(e)
      Swal.fire({
        icon: "success",
        title: "Ok",
        text: "Se registro el Cliente",
      });
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
            {!nuevo ? "Editar Provincia" : "Nueva Provincia"}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>
              <form onSubmit={envio}>
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
                      <span>&nbsp;&nbsp;{!nuevo ? "Editar" : "Registrar"}</span>
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
