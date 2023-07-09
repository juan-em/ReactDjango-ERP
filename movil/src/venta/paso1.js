import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";

import { TextInput, Surface, TextInputMask, Button } from 'react-native-paper';

import DatePicker from "react-native-date-picker";

import { ACTION_TYPES } from "./reducer";

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

  console.log(dataClientes)

  useEffect(() => {
    if (render.current) {
      render.current = false;
      setDataClientes;
    }
  }, []);

  return (
    <View>
      <Surface style={{padding:20, margin:20, backgroundColor:'white'}} elevation={4}>
        <div>
          <div item xs={12} sm={12} md={12}>
            <div container spacing={1}>
              <div item xs={12} sm={8} md={9}>
                <TextInput
                  label="Nombre Cliente"
                  mode="outlined"
                  onChangeText={(value, e) => {
                    console.log(value)
                    handleChange(e, value, ACTION_TYPES.SET_CLIENTE);
                  }}
                />
              </div>
              <div item xs={12} sm={4} md={3}>
                <Button
                  mode="outlined"
                  fullWidth
                  style={{ height: "100%" }}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
          <div item xs={12} sm={12} md={6}>
            <TextInput
              label="Fecha"
              mode="outlined"
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
              id="textfields"
              mode="outlined"
            />
          </div>
          <div item xs={12} sm={12} md={3}>
            <TextInput
              fullWidth
              label="DNI"
              type="number"
              id="textfields"
              mode="outlined"
            />
          </div>
        </div>
      </Surface>
    </View>
  );
};
export default Paso1;
