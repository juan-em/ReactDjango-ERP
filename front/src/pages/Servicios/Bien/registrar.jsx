import './index.css';

import { useState } from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab, Tabs, Box,
  Autocomplete, Card
} from "@mui/material";

import { TabContext } from "@mui/lab";

// Imports relacionado con Formik
import { Formik, Form, Field } from 'formik';

// Imports relacionado a los iconos
import CloseIcon from "@mui/icons-material/Close";

import PropTypes from 'prop-types';

// Imports relacionado a las peticiones
import { postBienes } from '../../../services/Servicios/bienes';

const Registar = () => {
  // POST request para la orden de bien
  const perSubmitBien = async (data) => {
    var testingBienes = {
      "bien_nombre":"bien1",
      "bien_estado":"Denegado",
      "orden_bien_tecnico":[
          {
              "propuesta_tecnica_nombre":"p1",
              "propuesta_tecnica_tipo":"Bien"
          }
      ],
      "orden_bien_economico":[
          {
              "propuesta_economica_nombre":"pe1",
              "propuesta_economica_tipo":"Bien"
          }
      ],
      "bien_cotizacion":12.30
    }

    await postBienes(testingBienes)

  }

  // Funcionamiento relacion a la interfaz de registro con Tabs
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

    
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //para autocomplete
  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
  const top100Films = [
    { label: 'Logistica'},
    { label: 'Marketing'},
    { label: 'Aministración'},
    { label: 'Mantenimiento'},
  ];

  const top101Films = [
    { label: 'No Iniciado'},
    { label: 'Solicitando cotización'},
    { label: 'Aprobado'},
    { label: 'En proceso'},
    { label: 'Denegado'},

  ];

  return (
    <div>
        <Button size="small" variant="outlined"  color='warning'sx={{fontFamily: "inherit", height:'100%' }} onClick={handleOpen}>
          Registrar
        </Button>
        <Dialog open={open}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            
            Registrar Requerimiento de Bien
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs textColor="secondary" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label={<span>Cotización &lt; 500</span>} {...a11yProps(0)} />
                    <Tab label={<span>Cotización &gt; 500</span>} {...a11yProps(1)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  
                  {/* Registro de bien en el que la cotizacion es menor a 500 */}
                  
                  <Grid container spacing={1}>
                    <Formik>
                      <Form>
                        <Field as={TextField}
                          label="Tipo de bien (Viene al seleccionarlo)"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="persona.nombre"
                        />
                        <Field as={Autocomplete}
                          type="text"
                          size="small"
                          color="secondary"
                          margin="dense"
                          name="nombre"
                          id="textfields"
                          required
                          options={top101Films}
                          renderInput={(params) => <TextField {...params} label="Estado (Viene al seleccionarlo)" margin="dense" color="secondary" fullWidth />}
                        />

                        
                        <Grid item xs={12} sm={12} md={12}>
                          <Card variant="outlined" sx={{px:2, py:1}}>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={12} >
                                <span>Cotización</span>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                <Button variant="outlined" component="label" fullWidth size="small">
                                  <span>Subir</span>
                                  <input hidden accept="image/*" multiple type="file" />
                                </Button>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <Card variant="outlined" sx={{px:2, py:1}}>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={12} >
                                <span>Propuesta técnica</span>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                <Button variant="outlined" component="label" fullWidth size="small">
                                  <span>Subir</span>
                                  <input hidden accept="image/*" multiple type="file" />
                                </Button>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12}>
                          <Card variant="outlined" sx={{px:2, py:1}}>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={12} >
                                <span>Propuesta económica</span>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                <Button variant="outlined" component="label" fullWidth size="small">
                                  <span>Subir</span>
                                  <input hidden accept="image/*" multiple type="file" />
                                </Button>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
                          <Button
                            fullWidth
                            id="btnClick"
                            size="medium"
                            color="secondary"
                            className="navbar-btn-single"
                            variant="contained"
                            type="submit"
                            
                          >
                            <span>Registrar</span>
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
                          <Button
                            fullWidth
                            id="btnClick"
                            size="medium"
                            color="error"
                            className="navbar-btn-single"
                            variant="contained"
                            onClick={handleClose}
                          >
                            <span>Cancelar</span>
                          </Button>
                        </Grid>
                      </Form>
                    </Formik>
                  </Grid>
                </TabPanel>

                <TabPanel value={value} index={1}>

                  {/* Registro de bien en el que la cotizacion es mayor a 500 */}

                  <Grid container spacing={1}>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField
                      fullWidth
                      label="Tipo de servicio (Viene al seleccionarlo)"
                      required
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      name="persona.nombre"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6}>
                      <Autocomplete
                        fullWidth
                        type="text"
                        size="small"
                        color="secondary"
                        margin="dense"
                        name="nombre"
                        id="textfields"
                        disablePortal
                        required
                        options={top101Films}
                        renderInput={(params) => <TextField {...params} label="Estado (Viene al seleccionarlo)" margin="dense" color="secondary" fullWidth />}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <Card variant="outlined" sx={{px:2, py:1}}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={6} >
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={12} >
                                <span>Cotización 1</span>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                <Button variant="outlined" component="label" fullWidth size="small">
                                  <span>Subir</span>
                                  <input hidden accept="image/*" multiple type="file" />
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={12} md={6} >
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={12} >
                                <span>Propuesta económica 1</span>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                <Button variant="outlined" component="label" fullWidth size="small">
                                  <span>Subir</span>
                                  <input hidden accept="image/*" multiple type="file" />
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <Card variant="outlined" sx={{px:2, py:1}}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={6} >
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={12} >
                                <span>Cotización 2</span>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                <Button variant="outlined" component="label" fullWidth size="small">
                                  <span>Subir</span>
                                  <input hidden accept="image/*" multiple type="file" />
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={12} md={6} >
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={12} >
                                <span>Propuesta económica 2</span>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                <Button variant="outlined" component="label" fullWidth size="small">
                                  <span>Subir</span>
                                  <input hidden accept="image/*" multiple type="file" />
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                      <Card variant="outlined" sx={{px:2, py:1}}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={12} md={6} >
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={12} >
                                <span>Cotización 3</span>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                <Button variant="outlined" component="label" fullWidth size="small">
                                  <span>Subir</span>
                                  <input hidden accept="image/*" multiple type="file" />
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={12} md={6} >
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={12} >
                                <span>Propuesta económica 3</span>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                <Button variant="outlined" component="label" fullWidth size="small">
                                  <span>Subir</span>
                                  <input hidden accept="image/*" multiple type="file" />
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
                      <Button
                        fullWidth
                        id="btnClick"
                        size="medium"
                        color="secondary"
                        className="navbar-btn-single"
                        variant="contained"
                        type="submit"
                        
                      >
                        <span>Registrar</span>
                      </Button>
                      </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{ mt: 4 }}>
                      <Button
                        fullWidth
                        id="btnClick"
                        size="medium"
                        color="error"
                        className="navbar-btn-single"
                        variant="contained"
                        onClick={handleClose}
                      >
                        <span>Cancelar</span>
                      </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Box>
          </TabContext>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Registar;