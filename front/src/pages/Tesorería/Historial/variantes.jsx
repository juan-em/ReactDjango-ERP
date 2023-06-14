import { forwardRef, useState } from "react";
import {
  List,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Skeleton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Button,
  AppBar,
  Toolbar,
  Paper,
  TableBody,
  Slide,
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";

import CloseIcon from "@mui/icons-material/Close";
import NumbersIcon from "@mui/icons-material/Numbers";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { alpha } from "@mui/material/styles";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Variante = ({ item, open, setOpen }) => {
  const [variante, setVariante] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setVariante({});
  };

  return (
    <>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        size="small"
        id="textfields"
        onClick={handleClickOpen}
        sx={{ mt:4}}
      >
        Ver registros
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar
          sx={{ position: "relative", backgroundColor: alpha("#633256", 0.2) }}
        >
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
              Registros
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <TabContext centered>
            <TableContainer component={Paper} sx={{ mt: 0 }} elevation={0}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
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
                      Fecha Registro
                    </TableCell>
                    <TableCell
                      sx={{ color: "#633256", fontFamily: "inherit" }}
                      align="right"
                    >
                      Hora Registro
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
                      Tipo Registro
                    </TableCell>
                    <TableCell
                      sx={{ color: "#633256", fontFamily: "inherit" }}
                      align="right"
                    >
                      Responsable
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
                  {item ? (
                    item.map((vari) => (
                      <TableRow key={1}>
                        <TableCell component="th" scope="row">
                          1
                        </TableCell>
                        <TableCell align="right">id</TableCell>
                        <TableCell align="right">00/00/2023</TableCell>
                        <TableCell align="right">12:53</TableCell>
                        <TableCell align="right">estado</TableCell>
                        <TableCell align="right">estado</TableCell>
                        <TableCell align="right">estado</TableCell>
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
                    ))
                  ) : (
                    <>Sin registros</>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Variante;