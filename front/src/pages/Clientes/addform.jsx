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
      <Card>
        <CardContent>
          <FormControl>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Typography
                  sx={{ fontSize: 40 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {!nuevo ? "Editar Cliente" : "Nuevo Cliente"}
                </Typography>
              </Grid>
              {!empresa ? (
                <>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Nombre" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="DNI" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Provincia" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Localidad" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Direccion" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Codigo Postal" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Cuenta Bancaria" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Telefono" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Movil" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Web" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Forma de Pago" required />
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Nombre" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="RUC" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Estructura" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Tipo de Empresa" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Provincia" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Localidad" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Direccion" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Codigo Postal" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Cuenta Bancaria" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Telefono" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Movil" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Web" required />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <TextField label="Forma de Pago" required />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={6} md={6}>
                <Button
                  id="btnClick"
                  size="medium"
                  color="secondary"
                  className="navbar-btn-single"
                  variant="outlined"
                >
                  <span>&nbsp;&nbsp;{!nuevo ? "Editar" : "Registrar"}</span>
                </Button>
                <Button
                  id="btnClick"
                  size="medium"
                  color="error"
                  className="navbar-btn-single"
                  variant="outlined"
                >
                  <span>&nbsp;&nbsp;Cancelar</span>
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
