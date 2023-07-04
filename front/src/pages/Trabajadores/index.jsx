import "./index.css";

import {
  Paper,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  FormControlLabel,
  Select,
  Button,
  FormLabel,
  RadioGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { alpha } from "@mui/material/styles";
//Componentes pra el input de fecha
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

//Componentes
import { useState, useRef, useEffect } from "react";
import { Tabla } from "./complements";
import { get } from "../../services/mantenimiento";
import AddForm from "./addform";

import { Box } from "@mui/system";
import VerTrabajador from "./vertrabajador";

const Trabajadores = () => {
  const [openModal, setOpenModal] = useState(false);
  const [item, setItem] = useState({});
  const [itemView, setItemView] = useState({});
  const [putItem, setPutItem] = useState({});
  const [value, setValue] = useState("");
  const [trabajadorId, setTrabajadorId] = useState("");
  const render = useRef(true);
  const [renderizar, setRenderizar] = useState(true);
  const [fields, setFields] = useState({});

  //Listado de Trabajadors y provincias
  const [provincias, setProvincias] = useState([]);

  //Buscador
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleClean = () => {
    searchform.reset();
  };

  useEffect(() => {
    const URL = "http://localhost:8000/api/mantenimientos/provincias/";
    get(setProvincias, URL);
  }, []);

  return (
    <Container>
      <div className="container">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={5}>
            <Paper
              elevation={10}
              className="paper-container"
              sx={{
                mt: 4,
                p: 0,
                backgroundColor: alpha("#8D4C32", 0.2),
                "&:hover": {
                  backgroundColor: alpha("#8D4C32", 0.25),
                },
              }}
            >
              <Accordion sx={{ p: 5 }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  Buscar trabajador
                </AccordionSummary>
                <AccordionDetails>
                  <form id="searchform">
                    <TextField
                      fullWidth
                      label="Código"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      id="textfields"
                      name="codigo"
                      variant="filled"
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
                      name="nombre"
                      variant="filled"
                      onChange={handlerSearcher}
                    />
                    <TextField
                      fullWidth
                      label="DNI"
                      type="text"
                      size="small"
                      color="secondary"
                      margin="dense"
                      id="textfields"
                      name="dni"
                      variant="filled"
                      onChange={handlerSearcher}
                    />
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                          label="Fecha de nacimiento"
                          name="fecha"
                          inputFormat="DD/MM/YYYY"
                         
                          onChange={( value)=>{handleChange(value, null, ACTION_TYPES.SET_FECHA)}}
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
                  
              
                    <Grid container spacing={1} sx={{ mt: 2 }}>
                      <Grid item xs={12} sm={12} md={12}>
                        <Button
                          fullWidth
                          id="textfields"
                          color="secondary"
                          variant="contained"
                          onClick={handleClean}
                        >
                          Limpiar
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </AccordionDetails>
              </Accordion>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <VerTrabajador itemView={itemView} />
          </Grid>
          <Grid item xs={12} sm={12} md={1} sx={{ mt: 4 }}>
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
          <Grid item xs={12} sm={12} md={12}>
            <Box sx={{ overflow: "auto" }}>
              <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                <Tabla
                  fields={fields}
                  render={render}
                  renderizar={renderizar}
                  setRenderizar={setRenderizar}
                  setOpenModal={setOpenModal}
                  value={value}
                  setValue={setValue}
                  setItem={setItem}
                  setItemView={setItemView}
                  setPutItem={setPutItem}
                  trabajadorId={trabajadorId}
                  setTrabajadorId={setTrabajadorId}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Trabajadores;