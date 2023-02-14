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







//AUN TRABAJA CON PROVINCIAS, PERO EL FRONTEND ESTÁ ACOMODADO CON PRODUCTOS






import { Paper, Grid, TextField, Button,   Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControl,
  Select,
  InputLabel,
  MenuItem } from "@mui/material";

//Componentes
import { useState, useEffect, useContext } from "react";
import { Tabla } from "./complements";
import {
  getProvincias,
  searcherProvincias,
} from "../../../services/mantenimiento";
import AddForm from "./addform";
import { useRef } from "react";
import VerArticulo from "./verarticulo";

const Articulos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});

  const render = useRef(true);
  const [renderizar, setRenderizar] = useState(true);
  const [fields, setFields] = useState({});
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

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
                    Buscar Artículo
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    label="Código"
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="codigoarticulo"
                    id="textfields"
                    onChange={handlerSearcher}
                  />
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
                  <FormControl
                    fullWidth
                    margin="dense"
                    size="small"
                    color="secondary"
                    >
                    <InputLabel>Categoría</InputLabel>
                    <Select
                      label="Categoría"
                      size="small"
                      color="secondary"
                      id="textfields"
                      onChange={handlerSearcher}
                      defaultValue=""
                    >
                      <MenuItem value="">
                        <em>all</em>
                      </MenuItem>
                      {/*provincias.map((item, i) => (
                        <MenuItem key={i} value={item.id}>
                          {item.nombreprovincia}
                        </MenuItem>
                      ))*/}
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    label="Descripción"
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="nombreprovincia"
                    id="textfields"
                    onChange={handlerSearcher}
                  />
                  <TextField
                    fullWidth
                    label="Tipo"
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="nombreprovincia"
                    id="textfields"
                    onChange={handlerSearcher}
                  />
                  <FormControl
                    fullWidth
                    margin="dense"
                    size="small"
                    color="secondary"
                    >
                    <InputLabel>Proveedor</InputLabel>
                    <Select
                      label="Proveedor"
                      size="small"
                      color="secondary"
                      id="textfields"
                      onChange={handlerSearcher}
                      defaultValue=""
                    >
                      <MenuItem value="">
                        <em>all</em>
                      </MenuItem>
                      {/*provincias.map((item, i) => (
                        <MenuItem key={i} value={item.id}>
                          {item.nombreprovincia}
                        </MenuItem>
                      ))*/}
                    </Select>
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="dense"
                    size="small"
                    color="secondary"
                    >
                    <InputLabel>Ubicación</InputLabel>
                    <Select
                      label="Ubicación"
                      size="small"
                      color="secondary"
                      id="textfields"
                      onChange={handlerSearcher}
                      defaultValue=""
                    >
                      <MenuItem value="">
                        <em>all</em>
                      </MenuItem>
                      {/*provincias.map((item, i) => (
                        <MenuItem key={i} value={item.id}>
                          {item.nombreprovincia}
                        </MenuItem>
                      ))*/}
                    </Select>
                  </FormControl>
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
            <VerArticulo/>
          </Grid>
          <Grid item xs={12} sm={12} md={1} sx={{mt:4}}>
            <AddForm
              render={render}
              renderizar={renderizar}
              setRenderizar={setRenderizar}
              openModal={openModal}
              setOpenModal={setOpenModal}
              item={item}
              setItem={setItem}
            />
          </Grid>
        </Grid>

        <Tabla
          fields={fields}
          render={render}
          renderizar={renderizar}
          setRenderizar={setRenderizar}
          setOpenModal={setOpenModal}
          setItem={setItem}
        />
      </div>
    </section>
  );
};
export default Articulos;
