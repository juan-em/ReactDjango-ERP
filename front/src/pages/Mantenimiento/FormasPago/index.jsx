import "./index.css";
import "../../../fonts/poppins.ttf";
import { alpha } from "@mui/material/styles";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NumbersIcon from "@mui/icons-material/Numbers";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import {
  Paper,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";

//Componentes
import { useState, useEffect, useContext } from "react";
import { Tabla } from "./complements";
import { getProvincias, searcherProvincias } from "../../../services/mantenimiento";
import AddForm from "./addform";
import { useRef } from "react";
import VerFormaPago from "./verformapago";

const FormasPago = () => {

  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const render = useRef(true)
  const [renderizar,setRenderizar] = useState(true)
  const[fields, setFields] = useState({})
  const handlerSearcher = (e) =>{
    const {name, value} = e.target
    setFields({...fields,[name]:value})
  }
  
  return (
    <section>
      <div className="container">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={5}>
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
                    Buscar Forma de Pago
                </AccordionSummary>
                <AccordionDetails>
              <TextField
                fullWidth
                label="Nombre"
                type="text"
                size="small"
                color="secondary"
                margin="dense"
                name="nombreprovincia"
                id="textfields"
                onChange={handlerSearcher}
              />
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
          <Grid item xs={12} sm={12} md={6}>
            <VerFormaPago/>
          </Grid>
          <Grid item xs={12} sm={12} md={1} sx={{mt:4}}>
            <AddForm render={render} renderizar={renderizar} setRenderizar={setRenderizar}
                     openModal={openModal} setOpenModal={setOpenModal} item={item} setItem={setItem}/>
          </Grid>
        </Grid>

        <Tabla fields={fields} render={render} renderizar={renderizar} setRenderizar={setRenderizar} setOpenModal={setOpenModal}
          setItem={setItem}/>
      </div>
    </section>
  );
};
export default FormasPago;
