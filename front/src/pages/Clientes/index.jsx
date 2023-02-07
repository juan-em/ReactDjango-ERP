import Menu from "../../components/Menu";
import "./index.css";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Link } from "react-router-dom";

//para la tabla
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//iconos
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

function createData(
    name,
    calories,
    fat,
    carbs,
    protein,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

const Clientes = () =>{
    const [age, setAge] = useState('');

    const handleChange = event => {
        setAge(event.target.value);
    };

    return(
        <section>
            <Menu/>
            <div className="container">
                
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Paper elevation={10} className="paper" >
                        Buscar Cliente <br/>
                        <TextField fullWidth
                            label="Código"
                            type="number"
                            size="small"
                            color="secondary"
                            margin="dense"
                            id="textfields"
                        />
                        <TextField fullWidth
                            label="RUC"
                            type="number"
                            size="small"
                            color="secondary"
                            margin="dense"
                            id="textfields"
                        />
                        <TextField fullWidth
                            label="Nombre"
                            type="text"
                            size="small"
                            color="secondary"
                            margin="dense"
                            id="textfields"
                        />
                        <TextField fullWidth
                            label="Teléfono"
                            type="number"
                            size="small"
                            color="secondary"
                            margin="dense"
                            id="textfields"
                        />
                        <FormControl fullWidth margin="dense" size="small"
                            color="secondary">
                            <InputLabel>Provincia</InputLabel>
                            <Select
                            value={age}
                            label="Provincia"
                            onChange={handleChange}
                            size="small"
                            color="secondary"
                            id="textfields"
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField fullWidth
                            label="Localidad"
                            type="text"
                            size="small"
                            color="secondary"
                            margin="dense"
                            id="textfields"
                        />
                        <FormControlLabel
                            value="start"
                            control={<Checkbox color="secondary"/>}
                            label="Empresa"
                            labelPlacement="start"
                            id="textfields"
                            />
                        <br/>
                        <Button fullWidth color="secondary" variant="contained" id="textfields">Buscar</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                    
                    </Grid>
                </Grid>


                <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead style={{color:'#8D4C32'}}>
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
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="right">{row.calories}</TableCell>
                        <TableCell align="right">{row.fat}</TableCell>
                        <TableCell align="right">{row.carbs}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
                        <TableCell align="right">{row.protein}</TableCell>
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
            </div>
        </section>
  )
}

export default Clientes;