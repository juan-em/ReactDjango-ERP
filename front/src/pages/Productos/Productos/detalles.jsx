import { useState } from "react";

import {
  Card,
  CardMedia,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Grid,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";

import NumbersIcon from "@mui/icons-material/Numbers";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DetailsIcon from '@mui/icons-material/Details';
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Detalles = ({ item, openModal, setOpenModal }) => {
  const URL = "url delete articulos";
  const [putItem, setPutItem] = useState({});
  const [detalles, setDetalles] = useState([]);
  const handleClose = () => {
    setOpenModal(false);
    setDetalles({});
  };
  const handleOpenPost = () => {
    setOpenModal(true);
  };
  console.log(item);

  //   Modal de articulo
  const handlePut = (row) => {
    setPutItem(row);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      let res = await delProd(`${URL}${id}/`);
      render.current = true;
      setRenderizar(!renderizar);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <IconButton aria-label="delete" size="small" color="success" onClick={handleOpenPost}>
        <DetailsIcon fontSize="inherit" />
      </IconButton>
      <Dialog open={openModal} sx={{ minWidth: 500 }}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="large" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            Detalles del Producto
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Card sx={{ minWidth: 345 }}>
            {/* <CardMedia sx={{ height: 160 }} image={item.articulo.imagen} /> */}
            <CardContent>
              <Grid container>
                <Grid item>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <NumbersIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Articulo"
                      // secondary={item.articulo.articulo.nombre}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <NumbersIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Cantidad"
                      // secondary={item.cantidad}
                    />
                  </ListItem>
                </Grid>

                <Grid item>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <NumbersIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Variante"
                      // secondary={item.articulo.nombre}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <NumbersIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Almacen"
                      // secondary={item.articulo.almacen.nombre}
                    />
                  </ListItem>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <IconButton
                onClick={() => handlePut(item.articulo[0])}
                aria-label="delete"
                size="small"
                color="success"
              >
                <EditIcon fontSize="inherit" />
              </IconButton>
              <IconButton
                onClick={() => handleDelete(item.articulo[0].id)}
                aria-label="delete"
                size="small"
                color="error"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </CardActions>
          </Card>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Detalles;
