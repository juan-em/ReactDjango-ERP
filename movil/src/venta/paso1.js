import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet } from "react-native";

import { Button } from "@react-native-material/core";
import { TextInput } from "react-native-paper";

// import DatePicker from "react-native-date-picker";

import { ACTION_TYPES } from "./reducer";
import SelectDropdown from "react-native-select-dropdown";
import { getClientes } from "../services/ventas";

const Paso1 = ({ state, dispatch }) => {
  const render = useRef(true);
  const [dataClientes, setDataClientes] = useState([]);
  // const [pickerDate, setPickerDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [cliente, setCliente] = useState([]);
  const handleChange = (e, value, ac) => {
    console.log(value);
    console.log(e);
    console.log(ac);
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
        console.log(action.payload);
        action.payload = value;
        dispatch(action);
        break;
      default:
        console.log("Acción no definida");
    }
  };

  console.log(dataClientes);

  useEffect(() => {
    if (render.current) {
      render.current = false;
      setDataClientes;
    }
    getClientes(setCliente);
  }, []);

  return (
    <View>
      <View container spacing={1}>
        <div item xs={12} sm={12} md={12}>
          <div container spacing={1}>
            <div item xs={12} sm={8} md={9}>
              <SelectDropdown
                data={cliente}
                defaultButtonText={'Selecciona Cliente'}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index);
                  handleChange(index, selectedItem, ACTION_TYPES.SET_CLIENTE);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.persona.nombre;
                }}
                rowTextForSelection={(item, index) => {
                  console.log(item);
                  return item.persona.nombre;
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
          {/* <DatePicker
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
          /> */}
        </div>
        <div item xs={12} sm={12} md={3}>
          <TextInput
            fullWidth
            label="Código Cliente"
            id="textfields"
            variant="filled"
            value={state.venta.cliente.codigo}
          />
        </div>
        <div item xs={12} sm={12} md={3}>
          <TextInput
            fullWidth
            label="DNI"
            type="number"
            id="textfields"
            variant="filled"
            value={state.venta.cliente.persona.dni}
          />
        </div>
      </View>
    </View>
  );
};
export default Paso1;
