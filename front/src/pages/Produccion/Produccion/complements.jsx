//para la tabla
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { styled, useTheme, alpha } from "@mui/material/styles";

import {
  getProduccion,
  searcher,
  del,
  patchProduccion,
} from "../../../services/produccion";
import { useState, useEffect } from "react";

import ClickAwayListener from "@mui/base/ClickAwayListener";

export const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
  setItemView,
}) => {
  const URL = "http://localhost:8000/api/mantenimientos/categoriaarticulos/";
  const [produccion, setProduccion] = useState([]);
  const [numProductos, setNumProductos] = useState(0);
  const [estadoProd, setEstadoProd] = useState("");
  const [rowIndex, setRowIndex] = useState(-1);
  const [columnIndex, setColumnIndex] = useState(-1);
  useEffect(() => {
    if (render.current) {
      render.current = false;
      getProduccion(setProduccion, URL);
    }
  }, [renderizar]);

  let data = searcher(fields, produccion);
  console.log(data);

  const handlePut = (row) => {
    setItem(row);
    setOpenModal(true);
  };

  const handleView = (row) => {
    setItemView(row);
    console.log(row);
  };

  const handleDelete = async (id) => {
    try {
      console.log(id);
      let res = await del(id);
      render.current = true;
      setRenderizar(!renderizar);
      return res;
    } catch (error) {
      return error;
    }
  };
  const handleExit = () => {
    setRowIndex(-1);
    setColumnIndex(-1);
  };
  const estadosProduccion = [
    { id: 1, nombre: "No Iniciado" },
    { id: 2, nombre: "En proceso" },
    { id: 3, nombre: "Terminado" },
    { id: 4, nombre: "Saliendo" },
  ];
  const cambioEstado = async (i,row,value) => {
    console.log(row);
    row.estado = value
    console.log(row)
    await patchProduccion(row.estado, row.id);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
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
              N° de producción
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              N° de factura
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              N° de productos
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Fecha Inicio
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Fecha Fin
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Estado
            </TableCell>
            <TableCell
              sx={{ color: "#633256", fontFamily: "inherit" }}
              align="right"
            >
              Acciones
            </TableCell>
          </TableRow>
        </TableHead>
        <ClickAwayListener
          onClickAway={() => {
            handleExit();
          }}
        >
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {i + 1}
                </TableCell>
                <TableCell
                  onClick={() => {
                    setRowIndex(i);
                    setColumnIndex(1);
                  }}
                  align="right"
                >
                  {row.proceso.id}
                </TableCell>
                <TableCell
                  onClick={() => {
                    setRowIndex(i);
                    setColumnIndex(2);
                  }}
                  align="right"
                >
                  {row.proceso.factura_clie_id.numero_factura}
                </TableCell>
                <TableCell
                  onClick={() => {
                    setRowIndex(i);
                    setColumnIndex(3);
                  }}
                  align="right"
                >
                  {row.proceso.detalles.length}
                </TableCell>
                <TableCell
                  onClick={() => {
                    setRowIndex(i);
                    setColumnIndex(4);
                  }}
                  align="right"
                >
                  {row.proceso.fecha_inicio}
                </TableCell>
                <TableCell
                  onClick={() => {
                    setRowIndex(i);
                    setColumnIndex(5);
                  }}
                  align="right"
                >
                  {row.proceso.fecha_fin}
                </TableCell>
                <TableCell
                  onClick={() => {
                    setRowIndex(i);
                    setColumnIndex(6);
                  }}
                  align="right"
                >
                  {/* <Button onClick={() => cambioEstado(row.proceso)}>
                    {row.proceso.estado}
                  </Button> */}
                  <FormControl
                    fullWidth
                    margin="dense"
                    size="small"
                    color="secondary"
                  >
                    <Select
                      size="small"
                      color="secondary"
                      id="textfields"
                      name={"estado"}
                      onChange={(e) => cambioEstado(i, row.proceso, e.target.value)}
                      value={row.proceso.estado}
                    >
                      {estadosProduccion.map((item, i) => (
                        <MenuItem key={i} value={item.nombre}>
                          {item.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell
                  onClick={() => {
                    setRowIndex(i);
                    setColumnIndex(7);
                  }}
                  align="right"
                  component="th"
                  scope="row"
                >
                  <IconButton aria-label="delete" size="small" color="primary">
                    <VisibilityIcon
                      fontSize="inherit"
                      onClick={() => handleView(row.proceso)}
                    />
                  </IconButton>
                  <IconButton
                    onClick={() => handlePut(row.proceso)}
                    aria-label="delete"
                    size="small"
                    color="success"
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(row.proceso.id)}
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
        </ClickAwayListener>
      </Table>
    </TableContainer>
  );
};
