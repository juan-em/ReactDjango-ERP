import { useState } from "react";
import "./index.css";

import { Paper, Grid, TextField, Button, Autocomplete } from "@mui/material";

//Componentes
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

import { ACTION_TYPES } from "./reducerVenta";
import { useEffect, useRef } from "react";
import { getClientes } from "../../../services/clientes";

const Paso1 = ({ state, dispatch }) => {
  const render = useRef(true);
  const [dataClientes, setDataClientes] = useState([]);


  const handleChange = (e, value, ac) => {
    let action = {
      type: ac,
    };
    switch (ac) {
      case ACTION_TYPES.SET_FECHA:
        var event = new Date(e.$d);
        let date = JSON.stringify(event);
        date = date.slice(1, -1);
        action.payload = date;
        dispatch(action);
        break;

      case ACTION_TYPES.SET_CLIENTE:
        if (value.id) {
          action.payload = value;
          dispatch(action);
        }
        break;
      default:
        console.log("Acción no definida");
    }
  };

  useEffect(() => {
    if (render.current) {
      render.current = false;
      getClientes(setDataClientes);
    }
  }, []);

  return (
    <section>
      <div className="container">
        <Paper sx={{ p: 5 }} elevation={20}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={8}>
                  <Autocomplete
                    disableClearable
                    options={dataClientes}
                    getOptionLabel={(option) => {
                      if (option.persona) return option.persona.nombre;
                      return option.empresa.nombre;
                    }}
                    onChange={(e, value) => {
                      handleChange(e, value, ACTION_TYPES.SET_CLIENTE);
                    }}
                    value={state.venta.cliente}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        focused
                        fullWidth
                        type="text"
                        label="Nombre del cliente"
                        size="small"
                        color="secondary"
                        margin="none"
                        name="proveedor"
                        id="textfields"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    sx={{ height: "100%" }}
                  >
                    <SearchIcon />
                  </Button>
                </Grid>
                <Grid item xs={12} sm={3} md={2}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="secondary"
                    sx={{ height: "100%" }}
                  >
                    <AddIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  label="Fecha"
                  name="fecha"
                  inputFormat="DD/MM/YYYY"
                  value={state.venta.fecha}
                  onChange={(value) => {
                    handleChange(value, null, ACTION_TYPES.SET_FECHA);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      color="secondary"
                      id="textfields"
                      margin="dense"
                      variant="filled"
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <TextField
                fullWidth
                // label={"IDENTIFICACION CLIENTE"}
                type="text"
                size="small"
                color="secondary"
                margin="dense"
                id="textfields"
                disable="true"
                variant="filled"
                value={
                  state.venta.cliente
                    ? state.venta.cliente.codigo
                    : state.venta.cliente.codigo
                }
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3}>
              <TextField
                fullWidth
                // label={"IDENTIFICACION CLIENTE"}
                type="number"
                size="small"
                color="secondary"
                margin="dense"
                id="textfields"
                disable="true"
                variant="filled"
                value={
                  state.venta.cliente.persona
                    ? state.venta.cliente.persona.dni
                    : state.venta.cliente.empresa.ruc
                }
              />
            </Grid>
          </Grid>
        </Paper>
      </div>
    </section>
  );
};
export default Paso1;
