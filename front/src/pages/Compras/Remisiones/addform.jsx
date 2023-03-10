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
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'nombre', headerName: 'Nombre', width: 130 },
    { field: 'articulo', headerName: 'Artículo', width: 130 },
    {
      field: 'precio',
      headerName: 'Precio',
      type: 'number',
      width: 90,
    },
    {
      field: 'ubicacion',
      headerName: 'Ubicación',
      description: 'Por ejemplo, alguna estantería',
      width: 150,
    },
    {
      field: 'almacen',
      headerName: 'Almacén',
      width: 150,
    },
  ];

  const rows = [
    { id: 1, articulo: 'Snow', nombre: 'Jon', precio: 35 },
    { id: 2, articulo: 'Lannister', nombre: 'Cersei', precio: 42 },
    { id: 3, articulo: 'Lannister', nombre: 'Jaime', precio: 45 },
    { id: 4, articulo: 'Stark', nombre: 'Arya', precio: 16 },
    { id: 5, articulo: 'Targaryen', nombre: 'Daenerys', precio: null },
    { id: 6, articulo: 'Melisandre', nombre: null, precio: 150 },
    { id: 7, articulo: 'Clifford', nombre: 'Ferrara', precio: 44 },
    { id: 8, articulo: 'Frances', nombre: 'Rossini', precio: 36 },
    { id: 9, articulo: 'Roxie', nombre: 'Harvey', precio: 65 },
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
            Nueva Remisión
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
