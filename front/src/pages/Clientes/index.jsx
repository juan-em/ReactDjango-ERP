import Menu from "../../components/Menu";
import "./index.css";
import "../../fonts/poppins.ttf"

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NumbersIcon from '@mui/icons-material/Numbers';

import {
  Paper,
  Grid,
  TextField,
  Checkbox,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Select,
  Modal,
  Button,
  IconButton,
  Typography,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import Radio from '@mui/material/Radio';

//iconos
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";

//Componentes
import { useState, useEffect, useContext } from "react";
import ClientesContext from "../../services/clientes";
import { Tabla } from "./complements";
import { getProvincias } from "../../services/mantenimiento";
import AddForm from "./addform";
import { borderRight } from "@mui/system";


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
    const[per_emp, setPer_Emp] = useState('')
    let cliente_encontrados = searcher({id,ruc,nombre,telefono,provincia,localidad,per_emp},clientes)

    return(
        <section>
            <div className="container">
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6}>
                        <Paper elevation={10} className="paper" sx={{ mt: 4 , p:5 }} >
                        Buscar Cliente <br/>
                        <TextField fullWidth
                            label="Código"
                            type="number"
                            size="small"
                            color="secondary"
                            margin="dense"
                            value={id}
                            id="textfields"
                            onChange={(e)=>setId(e.target.value)}
                        />
                        <TextField fullWidth
                            label="RUC/DNI"
                            type="number"
                            size="small"
                            color="secondary"
                            margin="dense"
                            value={ruc}
                            id="textfields"
                            onChange={(e)=>setRuc(e.target.value)}
                        />
                        <TextField fullWidth
                            label="Nombre"
                            type="text"
                            size="small"
                            color="secondary"
                            margin="dense"
                            value={nombre}
                            id="textfields"
                            onChange={(e)=>setNombre(e.target.value)}
                        />
                        <TextField fullWidth
                            label="Teléfono"
                            type="number"
                            size="small"
                            color="secondary"
                            margin="dense"
                            value={telefono}
                            id="textfields"
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
                            id="textfields"
                            onChange={(e)=>setProvincia(e.target.value)}
                            >
                            <MenuItem value="">
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
                            id="textfields"
                            onChange={(e)=>setLocalidad(e.target.value)}
                        />
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label" color="secondary">Tipo</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                onChange={(e)=>setPer_Emp(e.target.value)}
                                
                            >
                                <FormControlLabel disableTypography labelPlacement="start" value="" control={<Radio color="secondary"/>} label="all" />
                                <FormControlLabel disableTypography labelPlacement="start" value="persona" control={<Radio color="secondary"/>} label="persona" />
                                <FormControlLabel disableTypography labelPlacement="start" value="empresa" control={<Radio color="secondary"/>} label="empresa" />
                            </RadioGroup>
                        </FormControl>

                        <br/>
                        <Button fullWidth id="textfields" color="secondary" variant="contained">Buscar</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                    <Paper elevation={10} className="paper" sx={{ mt: 4 , p:5 }}>
              Cliente seleccionado
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <NumbersIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Código" secondary="codigocliente" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AttachMoneyIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Forma de pago" secondary="formapago" />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <HomeWorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Empresa" secondary="empresa checkbox" />
              </ListItem>

            </List>
            </Paper>


              {/*<AddForm/>*/}
            
          </Grid>
        </Grid>
       
        <Tabla data={cliente_encontrados} />
                
            </div>
        </section>
  )
}

export default Clientes;
