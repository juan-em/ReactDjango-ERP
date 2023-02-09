

//para la tabla
import {Paper,Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';


import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled, useTheme, alpha } from '@mui/material/styles';

import AddForm from './addform';

export const Tabla = (props) => {

    const handleClick = () => {
        console.log('click')
    }

    const handleOpenPut = () => {
        setOpenModal(true);
        setNuevo(false);
      };

    return(
        <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead sx={{backgroundColor:alpha('#633256', 0.20), '&:hover': {
                backgroundColor: alpha('#633256', 0.25),
            },}}>
                <TableRow >
                    <TableCell >Item</TableCell>
                    <TableCell align="right">Código</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">RUC</TableCell>
                    <TableCell align="right">Teléfono</TableCell>
                    <TableCell align="right">Empresa</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {props.data.map((row,i) => (
                    <TableRow key={i} onClick={handleClick} value={row.codigo}>
                    <TableCell component="th" scope="row">
                        {i+1}
                    </TableCell>
                    <TableCell align="right">{row.codigo}</TableCell>
                    <TableCell align="right">{row.persona ? row.persona.nombre : row.empresa.nombre}</TableCell>
                    <TableCell align="right">{row.persona ? row.persona.dni : row.empresa.ruc}</TableCell>
                    <TableCell align="right">{row.persona ? row.persona.telefono : row.empresa.telefono}</TableCell>
                    <TableCell align="right">{row.protein}</TableCell>
                    <TableCell align="right">
                        <IconButton aria-label="delete" size="small" color="success" onClick={handleOpenPut}>
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="delete" size="small" color="error">
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
