import Menu from "../../components/Menu";
import "./index.css";
import "../../fonts/poppins.ttf";

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
  Dialog, Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import Radio from "@mui/material/Radio";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled, useTheme, alpha } from '@mui/material/styles';

//Componentes
import { useState, useEffect, useContext } from "react";
import ClientesContext from "../../services/clientes";
import { Tabla } from "./complements";
import { getProvincias } from "../../services/mantenimiento";
import AddForm from "./addform";
import { borderRight } from "@mui/system";
import VerProveedor from "./verproveedor";

const Proveedores = () =>{
    //Listado de clientes y provincias
    /*
    const {clientes, getClientes, searcher} = useContext(ClientesContext)
    const [provincias,setProvincias] = useState([])
    useEffect(()=>{
        getProvincias(setProvincias);
        getClientes()
    },[])
    */

    //Buscador
    //const { clientes, getClientes, searcher } = useContext(ClientesContext);
    const [provincias, setProvincias] = useState([]);
    //Buscador
    const [id, setId] = useState("");
    const [ruc, setRuc] = useState("");
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [provincia, setProvincia] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [per_emp, setPer_Emp] = useState("");
    //let cliente_encontrados = searcher({id,ruc,nombre,telefono,provincia,localidad,per_emp},clientes)

    return(
        <section>
            <div className="container">
            <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={10} className="paper" sx={{ mt: 4, p: 0 , 
            backgroundColor: alpha('#8D4C32', 0.20),
            '&:hover': {
                backgroundColor: alpha('#8D4C32', 0.25),
            },
            }}>
              <Accordion sx={{ p:5 }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    Buscar Proveedor
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    label="Código"
                    type="number"
                    size="small"
                    color="secondary"
                    margin="dense"
                    value={id}
                    id="textfields"
                    onChange={(e) => setId(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="RUC/DNI"
                    type="number"
                    size="small"
                    color="secondary"
                    margin="dense"
                    value={ruc}
                    id="textfields"
                    onChange={(e) => setRuc(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Nombre"
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    value={nombre}
                    id="textfields"
                    onChange={(e) => setNombre(e.target.value)}
                  />
                  <TextField
                    fullWidth
                    label="Teléfono"
                    type="number"
                    size="small"
                    color="secondary"
                    margin="dense"
                    value={telefono}
                    id="textfields"
                    onChange={(e) => setTelefono(e.target.value)}
                  />
                  <FormControl
                    fullWidth
                    margin="dense"
                    size="small"
                    color="secondary"
                  >
                    <InputLabel>Provincia</InputLabel>
                    <Select
                      label="Provincia"
                      size="small"
                      color="secondary"
                      value={provincia}
                      id="textfields"
                      onChange={(e) => setProvincia(e.target.value)}
                    >
                      <MenuItem value="">
                        <em>all</em>
                      </MenuItem>
                      {provincias.map((item, i) => (
                        <MenuItem key={i} value={item.id}>
                          {item.nombreprovincia}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Localidad"
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    value={localidad}
                    id="textfields"
                    onChange={(e) => setLocalidad(e.target.value)}
                  />
                  <FormControl>
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      color="secondary"
                    >
                      Tipo
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={(e) => setPer_Emp(e.target.value)}
                    >
                      <FormControlLabel
                        disableTypography
                        labelPlacement="start"
                        value=""
                        control={<Radio color="secondary" />}
                        label="all"
                      />
                      <FormControlLabel
                        disableTypography
                        labelPlacement="start"
                        value="persona"
                        control={<Radio color="secondary" />}
                        label="persona"
                      />
                      <FormControlLabel
                        disableTypography
                        labelPlacement="start"
                        value="empresa"
                        control={<Radio color="secondary" />}
                        label="empresa"
                      />
                    </RadioGroup>
                  </FormControl>
                  <br />
                  <Grid container spacing={1} sx={{mt:2}}>
                    <Grid item xs={12} sm={12} md={6}>
                      <Button fullWidth id="textfields" color="secondary" variant="contained">
                        Buscar
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <Button fullWidth id="textfields" color="primary" variant="contained">
                        Limpiar
                      </Button>
                    </Grid>
                  </Grid>

                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={5}>
            <VerProveedor/>
          </Grid>
          <Grid item xs={12} sm={12} md={1} sx={{mt:4}}>
              <AddForm />            
          </Grid>
        </Grid>
                  
                    {/*<Tabla data={cliente_encontrados} />*/}
                            
            </div>
        </section>
  )
}

export default Proveedores;
