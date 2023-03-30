import { alpha } from "@mui/material/styles";
import { useState } from "react";

import {
  Paper,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box, Autocomplete, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Card,
  Typography
} from "@mui/material";
import Registro from "./registro";
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Tabla } from "./complements";

const CajaDiaria = () => {
  //para el input de fecha
  const [value, setValue] = useState(dayjs(new Date()));

  const handleChange = (newValue) => {
      setValue(newValue);
  };

  return (
    <section>
      <div className="container" >
        <Typography
              fontFamily={"inherit"}
              align={"center"}
              sx={{
                mt: 3,
                p: 3,
                backgroundColor: alpha("#633256", 0.2),
                "&:hover": {
                  backgroundColor: alpha("#633256", 0.25),
                },
              }}
            >
              Caja Diaria
            </Typography>
        <Grid container spacing={4} sx={{ marginTop: '10px'}}>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <Card elevation={10} sx={{ p:5}}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} xl={12}>
                  <Typography
                    fontFamily={"inherit"}
                    align={"center"}>
                      Caja actual
                    </Typography>
                  </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Card variant="outlined" sx={{p:1}}>
                    <Typography
                    fontFamily={"inherit"}
                    align={"center"}>
                      <strong>Fecha:</strong> 21/03/2023
                    </Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Card variant="outlined" sx={{p:1}}>
                    <Typography
                      fontFamily={"inherit"}
                      align={"center"}>
                      <strong>Saldo Inicial:</strong> S/. 10000
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sm={12} md={6} xl={6}>
            <Card elevation={10} sx={{ p:5}}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} xl={12}>
                  <Typography
                    fontFamily={"inherit"}
                    align={"center"}>
                      Acciones
                    </Typography>
                  </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Registro/>
                </Grid>
                <Grid item xs={12} sm={12} md={6} xl={6}>
                  <Button
                    fullWidth
                    id="textfields"
                    color="secondary"
                    variant="contained"
                    sx={{ m:1}}
                  >
                    Abrir/Cerrar Caja
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={6} xl={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                  label="Fecha de apertura"
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
                    variant="filled"
                    />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={12} md={6} xl={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                  label="Fecha de cierre"
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
                    variant="filled"
                    />}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={12} xl={12}>
            <Tabla/>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};
export default CajaDiaria;
