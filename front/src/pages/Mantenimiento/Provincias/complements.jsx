//para la tabla
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MenuItem from "@mui/material/MenuItem";


import {
  searcherProvincias,
  getProvincias,
  deleteProvincia,
} from "../../../services/mantenimiento";
import { useState, useEffect } from "react";

export const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
}) => {
  const [provincias, setProvincias] = useState([]);
  useEffect(() => {
    if (render.current) {
      render.current = false;
      getProvincias(setProvincias);
    }
  }, [renderizar]);

  let data = searcherProvincias(fields, provincias);

  const handlePut = (row) => {
    setItem(row);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      let res = await deleteProvincia(id);
      render.current = true;
      setRenderizar(!renderizar);
      return res;
    } catch (error) {
      return error;
    }
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead style={{ color: "#8D4C32" }}>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell align="right">Código</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.nombreprovincia}</TableCell>
              <TableCell align="right" component="th" scope="row">
                <IconButton aria-label="delete" size="small" color="primary">
                  <VisibilityIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={() => handlePut(row)}
                  aria-label="delete"
                  size="small"
                  color="success"
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(row.id)}
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
  );
};
