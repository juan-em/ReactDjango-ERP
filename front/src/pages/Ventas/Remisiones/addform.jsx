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
import { DataGrid } from '@mui/x-data-grid';
//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from '@mui/icons-material/Description';
//componentes
import { get, searcher, post_put, del } from "../../../services/mantenimiento";



import Swal from "sweetalert2";


const AddForm = () => {
  const [openModal, setOpenModal] = useState(false);
  const URL = "http://localhost:8000/api/mantenimientos/provincias/";
  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false)
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'nombre', headerName: 'Nombre', width: 150 },
    { field: 'descripcion', headerName: 'Descripción', width: 200 },
    { field: 'categoria', headerName: 'Categoría', width: 150 },
  ];

  const rows = [
    { id: 1, descripcion: 'Snow', nombre: 'Jon', categoria: '35' },
    { id: 2, descripcion: 'Lannister', nombre: 'Cersei', categoria: '42' },
    { id: 3, descripcion: 'Lannister', nombre: 'Jaime', categoria: '45' },
    { id: 4, descripcion: 'Stark', nombre: 'Arya', categoria: '16' },
    { id: 5, descripcion: 'Targaryen', nombre: 'Daenerys', categoria: null },
    { id: 6, descripcion: 'Melisandre', nombre: null, categoria: '150' },
    { id: 7, descripcion: 'Clifford', nombre: 'Ferrara', categoria:' 44' },
    { id: 8, descripcion: 'Frances', nombre: 'Rossini', categoria: '36' },
    { id: 9, descripcion: 'Roxie', nombre: 'Harvey', categoria:' 65' },
  ];

  return (
    <>
      <IconButton
        aria-label="delete"
        color="secondary"
        size="small"
        onClick={handleOpenPost}
      >
        <DescriptionIcon fontSize="inherit" />
      </IconButton>
      <Dialog open={openModal} maxWidth={'xl'}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            Nueva Remisión (Ventas)
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>

                {/*item.id && <input type="hidden" name="cod" value={item.id}/>*/}
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12}>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                      />
                    </div>
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

          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddForm;
