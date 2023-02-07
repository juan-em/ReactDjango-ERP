import {
  FormControl,
  InputLabel,
  Input,
  TextField,
  Button,
  Card,
  Grid,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
} from "@mui/material";
import { Box, Container } from "@mui/system";

import {
  postClienteper,
  postClienteemp,
  putClienteemp,
  putClienteper,
} from "../../services/clientes";

import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  p: 4,
};

const AddForm = () => {
  const empresa = false;
  const nuevo = true;
  const [inputsPer, setInputsPer] = useState({
    nombre:'',
    dni:'',
    codprovincia:'',
    localidad:'',
    direccion:'',
    codpostal:'',
    cuentabancaria:'',
    telefono:'',
    movil:'',
    web:'',
    codformapago:''
  });

  const [inputsEmp, setInputsEmp] = useState({
    nombre:'',
    ruc:'',
    estructurajuridica:'',
    tipo:'',
    codprovincia:'',
    localidad:'',
    direccion:'',
    codpostal:'',
    cuentabancaria:'',
    telefono:'',
    movil:'',
    web:'',
    codformapago:''
  })

  const handleInputPerValue = (event) => {
    const {value, name} = event.target;

    setInputsPer({
        ...inputsPer,
        [name]:value,
    })
  }

  return (
    <Box sx={style}>
      <Card elevation={10} sx={{ p:4 }}>
        <CardContent>
          <FormControl>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} sx={{ mb:4 , color:'#633256'}}>
                  {!nuevo ? "EDITAR CLIENTE" : "NUEVO CLIENTE"}
              </Grid>
              {!empresa ? (
                <>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField fullWidth label="Nombre" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Provincia" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Direccion" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Cuenta Bancaria" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Movil" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Forma de Pago" required size="small" color="secondary" id="textfields" margin="dense"/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField fullWidth label="DNI" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Localidad" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Codigo Postal" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Telefono" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Web" required size="small" color="secondary" id="textfields" margin="dense"/>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField fullWidth label="Nombre" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Estructura" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Provincia" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Direccion" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Cuenta Bancaria" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Movil" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Forma de Pago" required size="small" color="secondary" id="textfields" margin="dense"/>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField fullWidth label="RUC" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Tipo de Empresa" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Localidad" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Codigo Postal" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Telefono" required size="small" color="secondary" id="textfields" margin="dense"/>
                    <TextField fullWidth label="Web" required size="small" color="secondary" id="textfields" margin="dense"/>
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={6} md={6}>
                <Button fullWidth sx={{ mt:4 }}
                  id="btnClick"
                  size="medium"
                  color="secondary"
                  className="navbar-btn-single"
                  variant="contained"
                >
                  <span>{!nuevo ? "Editar" : "Registrar"}</span>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Button fullWidth sx={{ mt:4 }}
                  id="btnClick"
                  size="medium"
                  color="error"
                  className="navbar-btn-single"
                  variant="contained"
                >
                  <span>Cancelar</span>
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddForm;
