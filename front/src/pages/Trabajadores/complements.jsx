import { useState, useContext, useEffect } from "react";

//para la tabla
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { TabContext } from '@mui/lab';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled, useTheme, alpha } from "@mui/material/styles";

import { getTrabajadores, searcher, delTrabajadores } from "../../services/trabajadores";

import Swal from "sweetalert2";

export const Tabla = ({
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
  setItemView,
  setValue,
  fields
}) => {

  const [trabajadores, setTrabajadores] = useState([]);

  useEffect(() => {
    if (render.current) {
      render.current = false;
      getTrabajadores(setTrabajadores);
    }
  }, [renderizar]);

  let data = searcher(fields, trabajadores);

  const handlePut = (row) => {
    setItem(row);
    setOpenModal(true);
    !row.persona ? setValue("2") : setValue("1");
  };

  const handleView = (row) => {
    setItemView(row);
  };

  const handleDelete = async (id, row) => {
    try {
        let res = await delTrabajadores(id);
        render.current = true;
        setRenderizar(!renderizar);
        Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se eliminó el trabajador",
        });
        return res;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
      return error;
    }
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
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' , fontStyle: "italic"}}>Item</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Código</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Nombre</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Apellidos</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">DNI</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Telefono</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Tipo</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Área</TableCell>
            <TableCell sx={{ color: "#633256" , fontFamily:'inherit' }} align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.length > 0 &&
          data.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{row.codigo}</TableCell>
              <TableCell align="right">
                {row.persona.nombre}
              </TableCell>
              <TableCell align="right">
                {row.persona.apellido}
              </TableCell>
              <TableCell align="right">
                {row.persona.dni}
              </TableCell>
              <TableCell align="right">
                {row.persona.telefono}
              </TableCell>
              <TableCell align="right">
                {row.tipo_trabajador}
              </TableCell>
              <TableCell align="right">
                {row.area}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="primary"
                  onClick={() => handleView(row)}
                >
                  <VisibilityIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="success"
                  onClick={() => handlePut(row)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  size="small"
                  color="error"
                  onClick={() => handleDelete(row.id, row)}
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