import { forwardRef, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

//para la tabla
import { alpha } from "@mui/material/styles";
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
import { DialogContent } from '@mui/material';
import { TabContext, TabPanel, TabList } from "@mui/lab";
import AddFormVariantes from './addformvariantes';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Variantes = ({variantes}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        
        <Button
        fullWidth
        color="secondary"
        variant="contained"
        size="small"
        id="textfields"
        onClick={handleClickOpen}>
            Ver variantes
        </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' , backgroundColor: alpha("#633256", 0.2)}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Variantes
            </Typography>
            <AddFormVariantes/>
            
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TabContext centered>
            <TableContainer component={Paper} sx={{ mt: 0 }} elevation={0}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead
                    sx={{
                        backgroundColor: alpha("#633256", 0.2),
                        "&:hover": {
                        backgroundColor: alpha("#633256", 0.25),
                        },
                    }}
                    >
                    <TableRow>
                        <TableCell
                        sx={{
                            color: "#633256",
                            fontFamily: "inherit",
                            fontStyle: "italic",
                        }}
                        >
                        Item
                        </TableCell>
                        <TableCell
                        sx={{ color: "#633256", fontFamily: "inherit" }}
                        align="right"
                        >
                        Código
                        </TableCell>
                        <TableCell
                        sx={{ color: "#633256", fontFamily: "inherit" }}
                        align="right"
                        >
                        Nombre
                        </TableCell>
                        <TableCell
                        sx={{ color: "#633256", fontFamily: "inherit" }}
                        align="right"
                        >
                        Precio Unitario
                        </TableCell>
                        <TableCell
                        sx={{ color: "#633256", fontFamily: "inherit" }}
                        align="right"
                        >
                        Embalaje
                        </TableCell>
                        <TableCell
                        sx={{ color: "#633256", fontFamily: "inherit" }}
                        align="right"
                        >
                        Cantidad
                        </TableCell>
                        <TableCell
                        sx={{ color: "#633256", fontFamily: "inherit" }}
                        align="right"
                        >
                        Ubicación
                        </TableCell>
                        <TableCell
                        sx={{ color: "#633256", fontFamily: "inherit" }}
                        align="right"
                        >
                        Almacén
                        </TableCell>
                        <TableCell
                        sx={{ color: "#633256", fontFamily: "inherit" }}
                        align="right"
                        >
                        Descripción
                        </TableCell>
                        <TableCell
                        sx={{ color: "#633256", fontFamily: "inherit" }}
                        align="right"
                        >
                        Acciones
                        </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {variantes.map((item, i) => (
                            <TableRow key={1}>
                            <TableCell component="th" scope="row">
                                1
                            </TableCell>
                            <TableCell align="right">{item.codigo}</TableCell>
                            <TableCell align="right">{item.nombre}</TableCell>
                            <TableCell align="right">{item.precio_unitario}</TableCell>
                            <TableCell align="right">{item.embalaje||"-"}</TableCell>
                            <TableCell align="right">{item.cantidad}</TableCell>
                            <TableCell align="right">{item.ubicacion}</TableCell>
                            <TableCell align="right">{item.almacen.nombre ? item.almacen : "-"}</TableCell>
                            <TableCell align="right">{item.descripcion}</TableCell>
                            <TableCell align="right" component="th" scope="row">
                                <IconButton
                                aria-label="delete"
                                size="small"
                                color="success"
                                >
                                <EditIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton
                                aria-label="delete"
                                size="small"
                                color="error"
                                >
                                <DeleteIcon fontSize="inherit" />
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
                </TabContext>
            </DialogContent>
      </Dialog>
    </div>
  );
}

export default Variantes;