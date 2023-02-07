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

//iconos
import Button from '@mui/material/Button';

//Componentes
import { useState, useEffect, useContext } from 'react';
import ClientesContext from "../../services/clientes";
import { Tabla } from "./complements";
import { getProvincias } from "../../services/mantenimiento";


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
    //Listado de clientes y provincias
    const {clientes, getClientes, searcher} = useContext(ClientesContext)
    const [provincias,setProvincias] = useState([])
    useEffect(()=>{
        getProvincias(setProvincias);
        getClientes()
    },[])
    
    //Buscador
    const[id, setId] = useState('')
    const[ruc, setRuc] = useState('')
    const[nombre, setNombre] = useState('')
    const[telefono, setTelefono] = useState('')
    const[provincia, setProvincia] = useState('')
    const[localidad, setLocalidad] = useState('')


    let cliente_encontrados = searcher([id],clientes)

    return(
        <section>
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
                            value={id}
                            onChange={(e)=>setId(e.target.value)}
                        />
                        <TextField fullWidth
                            label="RUC"
                            type="number"
                            size="small"
                            color="secondary"
                            margin="dense"
                            value={ruc}
                            onChange={(e)=>setRuc(e.target.value)}
                        />
                        <TextField fullWidth
                            label="Nombre"
                            type="text"
                            size="small"
                            color="secondary"
                            margin="dense"
                            value={nombre}
                            onChange={(e)=>setNombre(e.target.value)}
                        />
                        <TextField fullWidth
                            label="Teléfono"
                            type="number"
                            size="small"
                            color="secondary"
                            margin="dense"
                            value={telefono}
                            onChange={(e)=>setTelefono(e.target.value)}
                        />
                        <FormControl fullWidth margin="dense" size="small"
                            color="secondary">
                            <InputLabel>Provincia</InputLabel>
                            <Select
                            label="Provincia"
                            size="small"
                            color="secondary"
                            value={provincia}
                            onChange={(e)=>setProvincia(e.target.value)}
                            >
                            <MenuItem value="all">
                                <em>all</em>
                            </MenuItem>
                            { provincias.map((item,i)=><MenuItem key={i} value={item.id}>{item.nombreprovincia}</MenuItem>) }
                            </Select>
                        </FormControl>
                        <TextField fullWidth
                            label="Localidad"
                            type="text"
                            size="small"
                            color="secondary"
                            margin="dense"
                            value={localidad}
                            onChange={(e)=>setLocalidad(e.target.value)}
                        />
                        <FormControlLabel
                            value="start"
                            control={<Checkbox color="secondary"/>}
                            label="Empresa"
                            labelPlacement="start"
                            />
                        <br/>
                        <Button fullWidth color="secondary" variant="contained">Buscar</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                    
                    </Grid>
                </Grid>

                <Tabla data={cliente_encontrados}/>
                
            </div>
        </section>
  )
}

export default Clientes;