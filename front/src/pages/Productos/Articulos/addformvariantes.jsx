import { useState } from "react";
import { alpha } from "@mui/material/styles";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab, Box,
  Autocomplete, Modal
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import './index.css';
//componentes
import { get, searcher, post_put, del } from "../../../services/mantenimiento";


//para la tabla
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Swal from "sweetalert2";

const AddFormVariantes = ({ openModal, setOpenModal}) => {
    const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        <Button 
        color="secondary"
        variant="contained"
        onClick={handleOpen}>Añadir</Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
                
            <Box maxWidth={'md'} sx={{ position: 'absolute', top: '50%', left: '50%', backgroundColor:'white' , transform: 'translate(-50%, -50%)', p:5}}>
            <h2 id="parent-modal-title">Nueva variante</h2>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <TextField
                      fullWidth
                      label="Nombre"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombre"
                    />
                    <TextField
                      fullWidth
                      label="Precio unitario"
                      required
                      type="number"
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombre"
                      inputProps={{
                        step: "0.1"
                      }}
                    />
                    <Autocomplete
                      disablePortal
                      options={top100Films}
                      size="small"
                      id="textfields"
                      renderInput={(params) => <TextField {...params} label="Embalaje" margin="dense" color="secondary" fullWidth />}
                    />
                    <TextField
                      fullWidth
                      label="Cantidad"
                      required
                      type="number"
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="nombre"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  
                    <TextField
                      fullWidth
                      label="Ubicación"
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
                      renderInput={(params) => <TextField {...params} label="Almacén" margin="dense" color="secondary" fullWidth />}
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
            </Box>
        </Modal>
    </>
  );
};

export default AddFormVariantes;