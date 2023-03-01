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
  Autocomplete, Modal, FormControl, InputLabel, Select, MenuItem
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

const AddFormDetalles = ({ openModal, setOpenModal}) => {
    const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
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
        onClick={handleOpen}><span>Añadir</span></Button>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description">
                
            <Box maxWidth={'md'} sx={{ position: 'absolute', top: '50%', left: '50%', backgroundColor:'white' , transform: 'translate(-50%, -50%)', p:5}}>
            <h2 id="parent-modal-title">Nuevo producto de producción</h2>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12} md={6}>
                    <Autocomplete
                      disablePortal
                      options={top100Films}
                      size="small"
                      id="textfields"
                      renderInput={(params) => <TextField {...params} label="Producto" margin="dense" color="secondary" fullWidth />}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6}>
                  <FormControl
                      fullWidth
                      margin="dense"
                      size="small"
                      color="secondary"
                    >
                      <InputLabel>Estado de producción</InputLabel>
                      <Select
                        label="Estado de producción"
                        size="small"
                        color="secondary"
                        id="textfields"
                        onChange={handlerSearcher}
                        defaultValue=""
                        name="codprovincia"
                      >
                        <MenuItem key={1} value={1}>
                          No Iniciado
                        </MenuItem>
                        <MenuItem key={2} value={2}>
                          En proceso
                        </MenuItem>
                        <MenuItem key={3} value={3}>
                          Terminado
                        </MenuItem>
                        <MenuItem key={4} value={4}>
                          Saliendo
                        </MenuItem>
                      </Select>
                    </FormControl>
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

export default AddFormDetalles;