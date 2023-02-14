import { useState, useContext, useEffect } from "react";
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
import { getProveedores, delProveedoresEmp, delProveedoresPer } from "../../services/Proveedores";

import Swal from "sweetalert2";

export const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
  setItemView,
  setValue,
}) => {
  const [proveedor, setProveedor] = useState([]);

  useEffect(() => {
    if (render.current) {
      render.current = false;
      getProveedores(setProveedor);      
    }
  }, [renderizar]);

  let data = proveedor

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
      if (row.persona) {
        let res = await delProveedoresPer(id);
        render.current = true;
        setRenderizar(!renderizar);
        Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se elimino el Proveedor",
        });
        return res;
      } else {
        let res = await delProveedoresPer(id);
        render.current = true;
        setRenderizar(!renderizar);
        Swal.fire({
          icon: "success",
          title: "Ok",
          text: "Se elimino el Proveedor",
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
        <TableHead style={{ color: "#8D4C32" }}>
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
                {row.persona ? row.persona.dni : row.ruc}
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
