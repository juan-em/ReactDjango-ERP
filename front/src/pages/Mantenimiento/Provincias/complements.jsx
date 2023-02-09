//para la tabla
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MenuItem from '@mui/material/MenuItem';


export const Tabla = ({data}) => {
    return(
        <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead style={{color:'#8D4C32'}}>
                <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Código</TableCell>
                    <TableCell align="right">Nombre</TableCell>
                    <TableCell align="right">Acciones</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.map((row,i) => (
                    <TableRow key={i}>
                    <TableCell component="th" scope="row">
                        {i+1}
                    </TableCell>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell align="right">{row.nombreprovincia}</TableCell>
                    <TableCell align="right">
                        <IconButton aria-label="delete" size="small" color="primary">
                            <VisibilityIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton aria-label="delete" size="small" color="success">
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
