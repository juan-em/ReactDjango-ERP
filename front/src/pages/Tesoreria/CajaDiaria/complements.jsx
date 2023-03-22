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

import { alpha } from "@mui/material/styles";




const Tabla = () => {
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
                Código
                </TableCell>
                <TableCell
                sx={{ color: "#633256", fontFamily: "inherit" }}
                align="right"
                >
                Fecha de Apertura
                </TableCell>
                <TableCell
                sx={{ color: "#633256", fontFamily: "inherit" }}
                align="right"
                >
                Fecha de Cierre
                </TableCell>
                <TableCell
                sx={{ color: "#633256", fontFamily: "inherit" }}
                align="right"
                >
                Saldo Apertura
                </TableCell>
                <TableCell
                sx={{ color: "#633256", fontFamily: "inherit" }}
                align="right"
                >
                Saldo de Cierre
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
        
                <TableRow key={1}>
                <TableCell component="th" scope="row">
                    1
                </TableCell>
                <TableCell align="right">1</TableCell>
                <TableCell align="right">2</TableCell>
                <TableCell align="right">3</TableCell>
                <TableCell align="right">4</TableCell>
                <TableCell align="right">5</TableCell>
                <TableCell align="right" component="th" scope="row">
                    <IconButton 
                    //onClick={() => handleView(row)}
                    aria-label="delete" 
                    size="small" 
                    color="primary"
                    >
                    <VisibilityIcon
                        fontSize="inherit"
                    />
                    </IconButton>
                    <IconButton
                    //onClick={() => handlePut(row)}
                    aria-label="delete"
                    size="small"
                    color="success"
                    >
                    <EditIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton
                    //onClick={() => handleDelete(row.id)}
                    aria-label="delete"
                    size="small"
                    color="error"
                    >
                    <DeleteIcon fontSize="inherit" />
                    </IconButton>
                </TableCell>
                </TableRow>

            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default Tabla