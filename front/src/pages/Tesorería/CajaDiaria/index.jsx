import { alpha } from "@mui/material/styles";

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

const CajaDiaria = () => {
 

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
          <Grid item xs={12} sm={12} md={12} xl={4}>
            <Card elevation={10} sx={{ p:5}}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={12} xl={12}>
                  <Typography
                    fontFamily={"inherit"}
                    align={"center"}>
                      Iniciar Caja
                    </Typography>
                  <TextField
                      fullWidth
                      label="Monto Inicial"
                      type="number"
                      size="small"
                      color="secondary"
                      margin="dense"
                      name="nombre"
                      id="textfields"
                      variant="filled"
                      inputProps={{
                        step: "0.1"
                      }}
                      defaultValue="0.0"
                    />
                    <Button
                      fullWidth
                      id="textfields"
                      color="secondary"
                      variant="contained"
                    >
                      Abrir Caja
                    </Button>

                    <Registro/>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};
export default CajaDiaria;
