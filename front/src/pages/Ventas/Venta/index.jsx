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
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

  //para el input de fecha
  const [value, setValue] = useState(dayjs(new Date()));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  //para la cuenta
  const [count, setCount] = useState(1);

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
                      <Typography variant="caption" fontFamily={"inherit"}>Optional</Typography>
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
                  <Typography sx={{ mt: 2, mb: 1, pr: 5, pl: 5 }} fontFamily={"inherit"}>
                    Se registró tu venta
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Volver a registrar una venta</Button>
                  </Box>
                </Fragment>
              ) : activeStep +1 === 1 ? (
                <Fragment>
                  <Paper sx={{p:5}}>
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
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
                      <Button onClick={handleSkip} sx={{ mr: 1 }}>
                        Saltar
                      </Button>
                    )}
                    <Button onClick={handleNext}
                      id="textfields"
                      variant="contained">
                      {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                    </Button>
                  </Box>
                </Fragment>
              ):(
                <Fragment>
                  <Paper sx={{p:5}}>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={12} md={7}>
                        <Grid container spacing={2}>
                          <Grid item xs={12} sm={6} md={6} lg={3}>
                            <Card elevation={10} >
                              <CardHeader
                                title={
                                  <Typography fontFamily={"inherit"} color="text.secondary">
                                    producto1
                                  </Typography>
                                }
                                subheader={
                                  <Typography variant="body2" color="text.secondary">
                                    $ 19
                                  </Typography>
                                }
                                action={
                                  <Badge color="secondary" badgeContent={count} sx={{right:20 , top:10}}>
                                  </Badge>
                                } 
                              />
                              <CardMedia
                                sx={{ height: 140 }}
                                image="https://stakeholders.com.pe/wp-content/uploads/2019/04/content_fibradealpaca.jpg"
                              />
                              <CardContent>
                                {/* 
                                producto1
                                <Typography variant="body2" color="text.secondary">
                                  $ 19
                                </Typography>*/}
                                <CardActions>
                                  <ButtonGroup fullWidth>
                                    <Button fullWidth
                                      color="secondary"
                                      aria-label="reduce"
                                      onClick={() => {
                                        setCount(Math.max(count - 1, 0));
                                      }}
                                    >
                                      <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button fullWidth
                                      color="secondary"
                                      aria-label="increase"
                                      onClick={() => {
                                        setCount(count + 1);
                                      }}
                                    >
                                      <AddIcon fontSize="small" />
                                    </Button>
                                  </ButtonGroup>
                                </CardActions>
                              </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} sm={6} md={6} lg={3}>
                            <Card elevation={10}>
                              producto2
                            </Card>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12} sm={12} md={5}>
                        <List>
                          <ListItem sx={{ backgroundColor:"#2962ff" }}>
                            <Grid container spacing={1}>
                              <Grid item xs>
                                Producto
                              </Grid>
                              <Grid item xs>
                                <Typography align="right" sx={{fontFamily:"inherit"}}>
                                  Cantidad
                                </Typography>
                              </Grid>
                              <Grid item xs>
                                <Typography align="right" sx={{fontFamily:"inherit"}}>
                                  Precio
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <Divider/>
                          <ListItem>
                            <Grid container spacing={1}>
                              <Grid item xs>
                                producto1
                              </Grid>
                              <Grid item xs>
                                <Typography align="right">
                                  2
                                </Typography>
                              </Grid>
                              <Grid item xs>
                                <Typography align="right">
                                  S/. 19.00
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <Divider/>
                          <ListItem>
                            <Grid container spacing={1}>
                              <Grid item xs>
                              </Grid>
                              <Grid item xs>
                                <Typography align="center" sx={{fontFamily:"inherit"}}>
                                  Subtotal
                                </Typography>
                              </Grid>
                              <Grid item xs>
                                <Typography align="right" sx={{fontFamily:"inherit"}}>
                                  S/. 19.00
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <Divider/>
                          <ListItem>
                            <Grid container spacing={1}>
                              <Grid item xs>
                              </Grid>
                              <Grid item xs>
                                <Typography align="center" sx={{fontFamily:"inherit"}}>
                                  Impuestos
                                </Typography>
                              </Grid>
                              <Grid item xs>
                                <Typography align="right" sx={{fontFamily:"inherit"}}>
                                  18%
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItem>
                          <Divider/>
                          <ListItem>
                            <Grid container spacing={1}>
                              <Grid item xs>
                              </Grid>
                              <Grid item xs>
                                <Typography align="center" sx={{fontFamily:"inherit"}}>
                                  Total
                                </Typography>
                              </Grid>
                              <Grid item xs>
                                <Typography align="right" sx={{fontFamily:"inherit"}}>
                                  S/. 21.00
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItem>
                        </List>











                      </Grid>
                    </Grid>
                  </Paper>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                      id="textfields"
                      variant="contained"
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }} id="textfields"
                      variant="contained">
                        Saltar
                      </Button>
                    )}

                    <Button onClick={handleNext} id="textfields"
                      variant="contained">
                      {activeStep === steps.length - 1 ? 'Terminar' : 'Siguiente'}
                    </Button>
                  </Box>
                </Fragment>
              )
            }



            </Paper>
          </Grid>
        </Grid>
            aca tabla
      </div>
    </section>
  );
};
export default Venta;
