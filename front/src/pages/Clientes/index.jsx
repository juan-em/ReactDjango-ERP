import Menu from "../../components/Menu";
import "./index.css";
import "../../fonts/poppins.ttf";

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
  Dialog,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { styled, useTheme, alpha } from "@mui/material/styles";

//Componentes
import { useState, useEffect, useContext } from "react";
import ClientesContext from "../../services/clientes";
import { Tabla } from "./complements";
import { getProvincias } from "../../services/mantenimiento";
import AddForm from "./addform";
import { borderRight } from "@mui/system";
import { useRef } from "react";

import VerCliente from "./vercliente";

const Clientes = () => {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});
  const [value, setValue] = useState("");

  //Listado de clientes y provincias
  const { clientes, getClientes, searcher } = useContext(ClientesContext);
  const [provincias, setProvincias] = useState([]);

  //Buscador
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const render = useRef(true);
  const [renderizar, setRenderizar] = useState(true);
  const [fields, setFields] = useState({});

  return (
    <section>
      <div className="container">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper elevation={10} className="paper" sx={{ mt: 4, p: 5 }}>
              Buscar Cliente <br />
              <TextField
                fullWidth
                label="Código"
                type="number"
                size="small"
                color="secondary"
                margin="dense"
                id="textfields"
                onChange={handlerSearcher}
              />
              <TextField
                fullWidth
                label="RUC/DNI"
                type="number"
                size="small"
                color="secondary"
                margin="dense"
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
                id="textfields"
                onChange={handlerSearcher}
              />
              <TextField
                fullWidth
                label="Teléfono"
                type="number"
                size="small"
                color="secondary"
                margin="dense"
                id="textfields"
                onChange={handlerSearcher}
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
                  id="textfields"
                  onChange={handlerSearcher}
                  defaultValue=""
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
                id="textfields"
                onChange={handlerSearcher}
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
                  onChange={handlerSearcher}
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
            <VerCliente/>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <AddForm
              render={render}
              renderizar={renderizar}
              setRenderizar={setRenderizar}
              openModal={openModal}
              setOpenModal={setOpenModal}
              item={item}
              setItem={setItem}
              value={value}
              setValue={setValue}
            />
          </Grid>
        </Grid>

        <Tabla
          fields={fields}
          render={render}
          renderizar={renderizar}
          setRenderizar={setRenderizar}
          setOpenModal={setOpenModal}
          value={value}
          setValue={setValue}
          setItem={setItem}
        />
      </div>
    </section>
  );
};

export default Clientes;
