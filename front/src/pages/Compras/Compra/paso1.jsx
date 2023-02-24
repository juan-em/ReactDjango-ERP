import { alpha } from "@mui/material/styles";
import { useState , Fragment } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import './index.css';

import {
  Paper,
  Grid,
  TextField,
  Button,
  Autocomplete,
  AccordionSummary,
  AccordionDetails,
  Badge,
  ButtonGroup, Divider, Card, CardMedia, CardContent, CardActions, CardHeader, IconButton
} from "@mui/material";

//Componentes
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import { blue } from "@mui/material/colors";

const steps = ['Registro', 'Agregar producto'];

import { ACTION_TYPES } from "./reducerCompra";
import { useEffect } from "react";
import { getProveedores } from "../../../services/Proveedores";

const Paso1 = ({state, dispatch}) => {


    //Registering date and proveedor id in the state
    const [dataProveedores, setDataProveedores] = useState([])
    const [prov, setProv] = useState(null)
    
    const setDate = (value) => {
      var event = new Date(value.$d);
      let date = JSON.stringify(event)
      date = date.slice(1,-1)
      let action = {
        type: ACTION_TYPES.SET_FECHA,
        payload: date
      }
      dispatch(action);
    }

    const setProveedor = (value) => {
      let action = {
        type: ACTION_TYPES.SET_PROVEEDOR,
        payload: value
      }
      dispatch(action);
    }


    const handleProv = (e,val) =>{
      setProv(val)
      if (val.id) setProveedor(val.id)
      return val
    }
    
    const handleChange = (newValue) => {
        setDate(newValue)
    };

    
    useEffect(()=>{
      getProveedores(setDataProveedores)
    },[])

    

    return (
        <section>
            <div className="container">
                  <Paper sx={{p:5}} elevation={20}>
                    <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={6} md={8}>
                            <TextField
                            fullWidth
                            label={<span>RUC Proveedor</span>}
                            type="number"
                            size="small"
                            color="secondary"
                            margin="none"
                            name="nombreprovincia"
                            id="textfields"
                            focused
                            disable="true"
                            value={prov ? prov.ruc : ""}
                            />
                          </Grid>
                          <Grid item xs={12} sm={3} md={2}>
                            <Button variant="outlined" fullWidth color="primary" sx={{ height:'100%'}}>
                              <SearchIcon/>
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={3} md={2}>
                            <Button variant="outlined" fullWidth color="secondary" sx={{ height:'100%'}}>
                              <AddIcon/>
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                          label="Fecha"
                          inputFormat="DD/MM/YYYY"
                          value={state.compra.fecha}
                          onChange={handleChange}
                          renderInput={(params) => <TextField 
                            {...params} 
                            fullWidth
                            size="small"
                            color="secondary"
                            id="textfields"
                            margin="dense"
                            variant="filled"
                            />}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6}>
                        <Autocomplete
                          freeSolo
                          id="free-solo-2-demo"
                          disableClearable
                          options={dataProveedores}
                          getOptionLabel={(option) => {
                            if (option.persona) return option.persona.nombre
                            return option.empresa.nombre
                          }}
                          onChange={handleProv}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              fullWidth
                              type="text"
                              label="Nombre del proveedor"
                              size="small"
                              color="secondary"
                              margin="dense"
                              name="proveedor"
                              id="textfields"
                              variant="filled"
                              
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
            </div>
        </section>
  );
};
export default Paso1;