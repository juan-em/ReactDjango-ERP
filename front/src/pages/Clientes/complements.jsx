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

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled, useTheme, alpha } from "@mui/material/styles";

import ClientesContext from "../../services/clientes";
import { deleteClienteper, deleteClienteemp } from "../../services/clientes";

import Swal from "sweetalert2";

export const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
  value,
  setValue,
  clienteId,
  setClienteId,
}) => {
  const { clientes, setClientes, getClientes, searcher } =
    useContext(ClientesContext);

  const [viewItem, setViewItem] = useState("");

  useEffect(() => {
    if (render.current) {
      render.current = false;
      getClientes(setClientes);
    }
  }, [renderizar]);

  let data = clientes;

  const handlePut = (row) => {
    setItem(row);
    setOpenModal(true);
    !row.persona ? setValue("2") : setValue("1");
    console.log(value);
  };

  const handleView = (row) => {
    setItem(row);
    // console.log(row)
    // setClienteId(id)
  };

  const handleDelete = async (id, row) => {
    try {
      if (row.persona) {
        let res = await deleteClienteper(id);
        render.current = true;
        setRenderizar(!renderizar);
        Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se elimino el Cliente",
        });
        return res;
      } else {
        let res = await deleteClienteemp(id);
        render.current = true;
        setRenderizar(!renderizar);
        Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se elimino el Cliente",
        });
        return res;
      }
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
            <TableCell>Item</TableCell>
            <TableCell align="right">Código</TableCell>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">RUC</TableCell>
            <TableCell align="right">Teléfono</TableCell>
            <TableCell align="right">Empresa</TableCell>
            <TableCell align="right">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => (
            <TableRow key={i}>
              <TableCell component="th" scope="row">
                {i + 1}
              </TableCell>
              <TableCell align="right">{row.codigo}</TableCell>
              <TableCell align="right">
                {row.persona ? row.persona.nombre : row.empresa.nombre}
              </TableCell>
              <TableCell align="right">
                {row.persona ? row.persona.dni : row.empresa.ruc}
              </TableCell>
              <TableCell align="right">
                {row.persona ? row.persona.telefono : row.empresa.telefono}
              </TableCell>
              <TableCell align="right">{row.protein}</TableCell>
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
