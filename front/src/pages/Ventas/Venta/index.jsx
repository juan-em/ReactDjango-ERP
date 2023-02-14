import { alpha } from "@mui/material/styles";
import { useState , Fragment } from "react";
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


import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

const steps = ['Registro', 'Agregar producto'];

const Venta = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <section>
      <div className="container">

        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Paper elevation={10} className="paper" sx={{ mt: 4, p: 5 , 
            backgroundColor: alpha('#8D4C32', 0.20),
            '&:hover': {
                backgroundColor: alpha('#8D4C32', 0.25),
            },
            }}>
              NUEVA VENTA


              <Stepper activeStep={activeStep} sx={{ p: 5}}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <Fragment>
                  <Typography sx={{ mt: 2, mb: 1, pr: 5, pl: 5 }}>
                    Se registró tu venta
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Volver a registrar una venta</Button>
                  </Box>
                </Fragment>
              ) : (
                <Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>PASO {activeStep + 1}</Typography>
                  <Paper sx={{pr: 5, pl: 5}}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} sm={12} md={4}>
                        <TextField
                          fullWidth
                          label="Fecha"
                          type="date"
                          size="small"
                          color="secondary"
                          margin="dense"
                          name="nombreprovincia"
                          id="textfields"
                        />
                        <TextField
                          fullWidth
                          disabled
                          label="IGV"
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
                          <Grid item xs={12} sm={12} md={8}>
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
                            <Grid item xs={12} sm={12} md={2}>
                              boton 1
                            </Grid>
                            <Grid item xs={12} sm={12} md={2}>
                              boton 2
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Paper>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                        Skip
                      </Button>
                    )}

                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                    </Button>
                  </Box>
                </Fragment>
              )}



            </Paper>
          </Grid>
        </Grid>
            aca tabla
      </div>
    </section>
  );
};
export default Venta;
