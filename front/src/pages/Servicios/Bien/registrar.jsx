import './index.css';

import { useState, useEffect } from "react";

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
  Autocomplete, Card,
  Select, MenuItem,
  FormControl, InputLabel,
  Divider
} from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutline from '@mui/icons-material/RemoveCircleOutline';

import { TabContext } from "@mui/lab";

// Imports relacionado con Formik
import { Formik, Form, Field, FieldArray } from 'formik';

// Imports relacionado a los iconos
import CloseIcon from "@mui/icons-material/Close";

import PropTypes from 'prop-types';

// Imports relacionado a las peticiones
import { cotizacionInitialState, postBienes, transformToFormData } from '../../../services/Servicios/bienes';
import { getProveedores } from '../../../services/Proveedores';

const Registar = () => {
  // POST request para la orden de bien
  const ordenBienMenorSubmit = async (data) => {
    //var payload = transformToFormData(data)
    console.log(data,"<===============")
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

    // var res = await postBienes(payload)
    // console.log("====================> ", res)
  }

  // Funcionamiento relacion a la interfaz de registro con Tabs
  const [open, setOpen] = useState(false);
  const [proveedores, setProveedores] = useState()
  const [item, setItem] = useState(cotizacionInitialState)

  
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



  const top101Films = [
    'Ninguno',
    'Solicitando cotización',
    'Aprobado',
    'En proceso',
    'Denegado',

  ];

  useEffect(() => {
    getProveedores(setProveedores)
  }, [])
  
  

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
                    <Formik initialValues={item} onSubmit={ordenBienMenorSubmit}>
                      {({ values, handleSubmit, handleChange, setFieldValue }) => (
                      <Form onSubmit={handleSubmit}>
                        <Field as={TextField}
                          label="Tipo de bien (Viene al seleccionarlo)"
                          required
                          size="small"
                          color="secondary"
                          id="textfields"
                          margin="dense"
                          name="bien_nombre"
                          value={values.bien_nombre}
                          onChange={handleChange}
                        />
                        <FormControl
                          fullWidth
                          margin="dense"
                          size="small"
                          color="secondary"
                        >
                          <InputLabel>Estado (viene al seleccionarlo)</InputLabel>
                          <Select
                          label="Estado (viene al seleccionarlo)"
                          size="small"
                          color="secondary"
                          id="textfields"
                          onChange={handleChange}
                          name="bien_estado"
                          
                          >
                            {top101Films.map((item, i) => (
                              <MenuItem key={i} value={item}>
                                {item}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        
                        <Grid item xs={12} sm={12} md={12}>
                          <Card variant="outlined" sx={{px:2, py:1}}>
                            <Grid container spacing={1}>
                              <Grid item xs={12} sm={12} md={12} >
                                <span>Cotización</span>
                              </Grid>
                              <Grid item xs={12} sm={12} md={12}>
                                {/* <Button variant="outlined" component="label" fullWidth size="small">
                                  <span>Subir</span>
                                  <input hidden accept="image/*" multiple type="file" 
                                  />
                                </Button> */}
                                <Field name="file" variant="outlined" size="small" component="label">
                                  {({ field, form }) => (
                                    <TextField
                                      type="file"
                                      {...field}
                                      inputProps={{
                                        accept: '.pdf, .doc, .docx, .xls, .xlsx, application/pdf, application/msword, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                      }}
                                      onBlur={() => form.setTouched({ file: true })}
                                      onChange={(event) => setFieldValue('bien_cotizacion_archivo', event.currentTarget.files[0])}
                                      error={form.touched.file && form.errors.file}
                                      helperText={form.touched.file && form.errors.file}
                                    />
                                  )}
                                </Field>
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
                                <Field name="file" variant="outlined" size="small" component="label">
                                  {({ field, form }) => (
                                    <TextField
                                      type="file"
                                      {...field}
                                      inputProps={{
                                        accept: '.pdf, .doc, .docx, .xls, .xlsx, application/pdf, application/msword, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                      }}
                                      onBlur={() => form.setTouched({ file: true })}
                                      onChange={(event) => setFieldValue('orden_bien_tecnico[0].propuesta_tecnica_archivo', event.currentTarget.files[0])}
                                      error={form.touched.file && form.errors.file}
                                      helperText={form.touched.file && form.errors.file}
                                    />
                                  )}
                                </Field>
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
                              <Field name="file" variant="outlined" size="small" component="label">
                                  {({ field, form }) => (
                                    <TextField
                                      type="file"
                                      {...field}
                                      inputProps={{
                                        accept: '.pdf, .doc, .docx, .xls, .xlsx, application/pdf, application/msword, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                      }}
                                      onBlur={() => form.setTouched({ file: true })}
                                      onChange={(event) => setFieldValue('orden_bien_economico[0].propuesta_bien_archivo', event.currentTarget.files[0])}
                                      error={form.touched.file && form.errors.file}
                                      helperText={form.touched.file && form.errors.file}
                                    />
                                  )}
                                </Field>
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
                      )}
                    </Formik>
                  </Grid>
                </TabPanel>

                <TabPanel value={value} index={1}>

                  {/* Registro de bien en el que la cotizacion es mayor a 500 */}
                  <Formik initialValues={item} onSubmit={ordenBienMenorSubmit}>
                      {({ values, handleSubmit, handleChange, setFieldValue, setValues }) => (
                      <Form onSubmit={handleSubmit}>
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
                              name="bien_nombre"
                              //value={values.bien_nombre}
                              //onChange={handleChange}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} md={6}>
                          <FormControl
                            fullWidth
                            margin="dense"
                            size="small"
                            color="secondary"
                          >
                            <InputLabel>Estado (viene al seleccionarlo)</InputLabel>
                            <Select
                            label="Estado (viene al seleccionarlo)"
                            size="small"
                            color="secondary"
                            id="textfields"
                            onChange={handleChange}
                            name="bien_estado"
                            
                            >
                              {top101Films.map((item, i) => (
                                <MenuItem key={i} value={item}>
                                  {item}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          </Grid>

                          
                          
                          <Grid item xs={12} sm={12} md={12}>
                            <FieldArray
                              name="empresas"
                              render={(arrayHelpers) => (
                                <>
                                  <Card variant="outlined" sx={{px:2, py:1, border: "1px solid purple"}}>
                                  {values.empresas.map((variante, index) => (
                                      <div  key={index}>
                                      <Grid container spacing={1}>
                                        <Grid item xs={12} sm={12} md={12} >
                                          <Autocomplete
                                            fullWidth
                                            type="text"
                                            size="small"
                                            color="secondary"
                                            margin="dense"
                                            id="textfields"
                                            disablePortal
                                            required
                                            options={proveedores}
                                            getOptionLabel = {(option) => {
                                              if (option.persona) return option.persona.nombre 
                                              if (option.empresa) return option.empresa.nombre
                                              return ''
                                            }}
                                            renderInput={(params) => 
                                              <TextField 
                                                {...params} 
                                                label="Proveedor" 
                                                margin="dense" 
                                                color="secondary"
                                                fullWidth />}
                                            value={values.proveedor}
                                            onChange={(e, value) => {setFieldValue(`empresas.${index}.proveedor`, value.id)}}
                                          />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={6} >
                                          <Grid container spacing={1}>
                                            <Grid item xs={12} sm={12} md={12} >
                                              <span>Cotización {index + 1}</span>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12}>
                                              {/* <Button variant="outlined" component="label" fullWidth size="small">
                                                <span>Subir</span>
                                                <input hidden accept="image/*" multiple type="file" />
                                              </Button> */}
                                              <Field name="file" variant="outlined" size="small" component="label">
                                                {({ field, form }) => (
                                                  <TextField
                                                    type="file"
                                                    {...field}
                                                    inputProps={{
                                                      accept: '.pdf, .doc, .docx, .xls, .xlsx, application/pdf, application/msword, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                    }}
                                                    onBlur={() => form.setTouched({ file: true })}
                                                    onChange={(event) => setFieldValue(`empresas.${index}.cotizacion.bien_archivo_cotizacion`, event.currentTarget.files[0])}
                                                    error={form.touched.file && form.errors.file}
                                                    helperText={form.touched.file && form.errors.file}
                                                  />
                                                )}
                                              </Field>
                                            </Grid>
                                          </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={12} md={6} >
                                          <Grid container spacing={1}>
                                            <Grid item xs={12} sm={12} md={12} >
                                              <span>Propuesta económica {index + 1}</span>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12}>
                                            <Field name="file" variant="outlined" size="small" component="label">
                                              {({ field, form }) => (
                                                <TextField
                                                  type="file"
                                                  {...field}
                                                  inputProps={{
                                                    accept: '.pdf, .doc, .docx, .xls, .xlsx, application/pdf, application/msword, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                                                  }}
                                                  onBlur={() => form.setTouched({ file: true })}
                                                  onChange={(event) => setFieldValue(`empresas.${index}.propuesta_economica.propuesta_tecnica_archivo`, event.currentTarget.files[0])}
                                                  error={form.touched.file && form.errors.file}
                                                  helperText={form.touched.file && form.errors.file}
                                                />
                                              )}
                                            </Field>
                                            </Grid>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                      {index != 0 &&
                                      <Button
                                        fullWidth
                                        component="label"
                                        variant="outlined"
                                        startIcon={<RemoveCircleOutline/>}
                                        sx={{ marginTop: "0.5rem" }}
                                        onClick={() => arrayHelpers.remove(index)}
                                      >
                                        Eliminar
                                      </Button>}
                                      <Divider style={{  marginTop: "0.5rem", border: "1px dashed purple"}} />
                                      </div>
                                  ))}
                                    <Button
                                        fullWidth
                                        component="label"
                                        variant="outlined"
                                        color="secondary"
                                        startIcon={<AddCircleIcon />}
                                        sx={{ marginTop: "0.5rem" }}
                                        onClick={() => arrayHelpers.push({})}
                                      >
                                        Cotización
                                    </Button>
                                  </Card>
                                </>
                              )}
                            />
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
                      </Form>
                    )}
                  </Formik>
                </TabPanel>
              </Box>
          </TabContext>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Registar;