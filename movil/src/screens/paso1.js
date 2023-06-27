import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

// Libreria estilos
//  https://react-native-material.com/docs/layout/box
import { Button } from "@react-native-material/core";
import { TextInput } from 'react-native-paper';

//Componentes
// Libreria Datepicker
// https://github.com/henninghall/react-native-date-picker
import DatePicker from "react-native-date-picker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";

import { ACTION_TYPES } from "./reducer";
// import { getClientes } from "../../../services/clientes";

const Paso1 = ({ state, dispatch }) => {
  const render = useRef(true);
  const [dataClientes, setDataClientes] = useState([]);
  const [pickerDate, setPickerDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const handleChange = (e, value, ac) => {
    console.log(value)
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
        action.payload = value;
        dispatch(action);
        break;
      default:
        console.log("Acción no definida");
    }
  };

  useEffect(() => {
    if (render.current) {
      render.current = false;
      setDataClientes;
    }
  }, []);

  return (
    <View>
      <div>
        <div container spacing={1}>
          <div item xs={12} sm={12} md={12}>
            <div container spacing={1}>
              <div item xs={12} sm={8} md={9}>
                <TextInput
                  label="Nombre Cliente"
                  variant="filled"
                  onChangeText={(value, e) => {
                    console.log(value)
                    handleChange(e, value, ACTION_TYPES.SET_CLIENTE);
                  }}
                />
              </div>
              <div item xs={12} sm={4} md={3}>
                <Button
                  variant="outlined"
                  fullWidth
                  color="primary"
                  sx={{ height: "100%" }}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <div item xs={12} sm={12} md={6}>
            <DatePicker
              modal
              open={open}
              date={pickerDate}
              onConfirm={(date) => {
                setOpen(false);
                setPickerDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
              onChangeText={(value) => {
                handleChange(value, null, ACTION_TYPES.SET_FECHA);
              }}
            />
          </div>
          <div item xs={12} sm={12} md={3}>
            <TextInput
              fullWidth
              label="Código Cliente"
              // focused
              // type="text"
              // size="small"
              // color="action"
              // margin="dense"
              id="textfields"
              // disable="true"
              variant="filled"
              // value={state.venta.cliente.codigo}
            />
          </div>
          <div item xs={12} sm={12} md={3}>
            <TextInput
              fullWidth
              label="DNI"
              type="number"
              // size="small"
              // focused
              // color="action"
              // margin="dense"
              id="textfields"
              // disable="true"
              variant="filled"
              // value={
              //   state.venta.cliente.persona
              //     ? state.venta.cliente.persona.dni
              //     : state.venta.cliente.empresa.ruc
              // }
            />
          </div>
        </div>
      </div>
    </View>
  );
};
export default Paso1;
