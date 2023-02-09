
import "./index.css";
import "../../../fonts/poppins.ttf";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import NumbersIcon from "@mui/icons-material/Numbers";

import {
  Paper,
  Grid,
  TextField,
  Button
} from "@mui/material";

//Componentes
import { useState, useEffect, useContext } from "react";
import { Tabla } from "./complements";
import { getProvincias, searcherProvincias } from "../../../services/mantenimiento";
import AddForm from "./addform";
import { useRef } from "react";

const Provincias = () => {
  //Listado de provincias
  const render = useRef(true) //una sola vez el useEffect
  const [provincias, setProvincias] = useState([]);
  useEffect(()=>{
    if (render.current){
      render.current = false
      getProvincias(setProvincias);
    }
  },[])
  
  //Buscador
  const[fields, setFields] = useState({})
  const handlerSearcher = (e) =>{
    const {name, value} = e.target
    setFields({...fields,[name]:value})
  }
  
  let provinciasEncontradas = searcherProvincias(fields, provincias)


  return (
    <section>
      <div className="container">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={10} className="paper" sx={{ mt: 4, p: 5 }}>
              Buscar Provincia <br />
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
              <Button
                fullWidth
                id="textfields"
                color="secondary"
                variant="contained"
              >
                Buscar
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={10} className="paper" sx={{ mt: 4, p: 5 }}>
              Cliente seleccionado
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
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
                  <ListItemText
                    primary="Empresa"
                    secondary="empresa checkbox"
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <AddForm />
          </Grid>
        </Grid>

        <Tabla data={provinciasEncontradas} />
      </div>
    </section>
  );
};
export default Provincias;
