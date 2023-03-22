import "../../../fonts/poppins.ttf";

import {
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Select,
  InputLabel,
  MenuItem,
  Divider
} from "@mui/material";
import {FormControl} from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Tabla from "./complements";

const CajaDiaria =()=> {
  return (

    <section>
        <div className="container">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12} >
            <Paper
                elevation={10}
                className="paper"
                sx={{
                py: 4,
                px: 5,
                mt: 4
                }}
            >   <Grid container my={1}>
                  <Grid item xs={12} sm={4} md={4}  style={{ fontSize: '20px', color: '#633256' }}>
                    CAJA ACTUAL
                  </Grid>
                </Grid>
                <Divider  style={{backgroundColor: '#D593F4'}} />
                <Grid container spacing={3} pt={2}>
                    <Grid item xs={12} sm={6} md={6}>
                      <Grid
                        alignItems="center" sx={{ height: '100%' }}
                        container
                        rowSpacing={2}
                        columnSpacing={1}
 
                      >
                        <Grid item xs={12} sm={6} md={6}>
                          Fecha:
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          ---No definida---
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          Saldo Inicial
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          ---No definido---
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                    <Grid
                        container
                        spacing={2} alignItems="center" sx={{ height: '100%' }}
                      >
                        <Grid item xs={12} sm={4} md={4}>
                          <Button 
                            fullWidth
                            id="textfields"
                            color="secondary"
                            variant="contained"
                            disabled
                          >
                            REGISTRAR
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                        <Button
                          fullWidth
                          id="textfields"
                          color="secondary"
                          variant="contained"
                        >
                            Abrir Caja
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={4} md={4}>
                        <Button
                          fullWidth
                          id="textfields"
                          style={{ backgroundColor: '#80C1B4' }}
                          variant="contained"
                        >
                            Ver Movimientos
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2} xs={12} sm={12} md={12} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
              label="Fecha Apertura"
              name="fecha"
              inputFormat="DD/MM/YYYY"
              // value={state.compra.fecha}
              // onChange={( value)=>{handleChange(value, null, ACTION_TYPES.SET_FECHA)}}
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
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
              label="Fecha de Cierre"
              name="fecha"
              inputFormat="DD/MM/YYYY"
              // value={state.compra.fecha}
              // onChange={( value)=>{handleChange(value, null, ACTION_TYPES.SET_FECHA)}}4
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
          </Grid>
          

          

        </Grid>
        
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
              <Tabla/>
          </Box>
        </Box>
      </div>
        
    
    
    </section>

  )
}

export default CajaDiaria