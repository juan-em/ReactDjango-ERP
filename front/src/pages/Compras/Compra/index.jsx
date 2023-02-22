import { alpha} from "@mui/material/styles";
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
  ButtonGroup, Divider, Card, CardMedia, CardContent, CardActions, CardHeader, IconButton,
  SnackbarContent, Alert, AlertTitle
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
import Paso1 from "./paso1";
import Paso2 from "./paso2";

const steps = ['Registro', 'Agregar Artículo'];

const Compra = () => {
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
            <Typography fontFamily={"inherit"} align={'center'}
            sx={{ mt: 3, p: 3 , 
              backgroundColor: alpha('#985024', 0.20),
              '&:hover': {
                  backgroundColor: alpha('#985024', 0.25),
              },
              }}>
              Nueva Compra
            </Typography>
              <Stepper activeStep={activeStep} sx={{ p: 5 }}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption" fontFamily={"inherit"}>Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step key={label} {...stepProps} >
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <Fragment>
                  <Alert severity="success" action={
                    <Button 
                    variant="contained"
                    id="textfields"
                    onClick={handleReset}>Nueva Compra</Button>
                  }>
                    <AlertTitle>Se logró registrar la orden de compra</AlertTitle>
                  </Alert>
                </Fragment>
              ) : activeStep +1 === 1 ? (
                <Fragment>
                  <Paso1/>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button onClick={handleSkip} sx={{ mr: 1 }}>
                        Saltar
                      </Button>
                    )}
                    <Button onClick={handleNext}
                      id="textfields"
                      variant="contained" color="secondary">
                      {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                    </Button>
                  </Box>
                </Fragment>
                
              ):(
                <Fragment>
                  <Paso2/>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 5 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      id="textfields"
                      variant="contained"
                    >
                      Volver
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }} id="textfields"
                      variant="contained">
                        Saltar
                      </Button>
                    )}

                    <Button onClick={handleNext} id="textfields"
                      variant="contained" color="secondary">
                      {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                    </Button>
                  </Box>
                </Fragment>
              )
            }
          </Grid>
        </Grid>
      </div>
    </section>
  );
};
export default Compra;
