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
  Accordion,
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

const Paso1 = () => {

    //para el input de fecha
    const [value, setValue] = useState(dayjs(new Date()));

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <section>
            <div className="container">
                  <Paper sx={{p:5}} elevation={20}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DesktopDatePicker
                          label="Fecha"
                          inputFormat="DD/MM/YYYY"
                          value={value}
                          onChange={handleChange}
                          renderInput={(params) => <TextField 
                            {...params} 
                            fullWidth
                            size="small"
                            color="secondary"
                            id="textfields"
                            margin="dense"
                            />}
                          />
                        </LocalizationProvider>
                        <TextField
                          fullWidth
                          label="IGV"
                          value="18"
                          type="number"
                          size="small"
                          color="secondary"
                          margin="dense"
                          name="nombreprovincia"
                          id="textfields"
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={8}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={8} md={8}>
                            <TextField
                            fullWidth
                            label="RUC CLIENTE"
                            type="number"
                            size="small"
                            color="secondary"
                            margin="dense"
                            name="nombreprovincia"
                            id="textfields"
                            />
                          </Grid>
                          <Grid item xs={12} sm={2} md={2}>
                            <Button variant="contained" fullWidth color="primary">
                              <SearchIcon/>
                            </Button>
                          </Grid>
                          <Grid item xs={12} sm={2} md={2}>
                            <Button variant="contained" fullWidth color="secondary">
                              <AddIcon/>
                            </Button>
                          </Grid>
                        </Grid>
                        <TextField
                          fullWidth
                          label="Nombre del cliente"
                          value="Nombre"
                          size="small"
                          color="secondary"
                          margin="dense"
                          name="nombreprovincia"
                          id="textfields"
                        />
                      </Grid>
                    </Grid>
                  </Paper>
            </div>
        </section>
  );
};
export default Paso1;