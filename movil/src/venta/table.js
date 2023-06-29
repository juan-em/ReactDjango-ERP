import React, { useState, Fragment, useEffect, useRef } from "react";

import { Button, TextInput, Surface } from "@react-native-material/core";
import { DataTable, List } from "react-native-paper";

import { ACTION_TYPES, getTotal } from "./reducer";
import { View, Text } from "react-native";

const Table = ({ state, dispatch, click }) => {
  const [rowIndex, setRowIndex] = useState(-1);
  const [columnIndex, setColumnIndex] = useState(-1);
  const [totalPuntoVenta, setTotalPuntoVenta] = useState(0);
  const [totalVenta, setTotalVenta] = useState(0);
  const rows = state.venta.detalle_venta;

  console.log(state);
  const handleChange = (i, prop, value) => {
    rows[i][prop] = parseInt(value, 10);
  };

  const handleExit = () => {
    setRowIndex(-1);
    setColumnIndex(-1);
  };
  const handleDelete = (id) => {
    console.log(id);
    let payload = {
      producto: id,
    };
    var action = {
      type: ACTION_TYPES.REMOVE_DETALLE,
      payload,
    };
    console.log(action);
    dispatch(action);
  };

  useEffect(() => {
    // setTotalVenta(getTotal(state.venta.detalle_venta));
    // setTotal();
  }, [click]);

  return (
    <View>
      <Text>TABLA</Text>
      <div>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>PKG</DataTable.Title>
            <DataTable.Title>Cantidad</DataTable.Title>
            <DataTable.Title>Precio</DataTable.Title>
            <DataTable.Title>Eliminar</DataTable.Title>
          </DataTable.Header>
          {rows.map((item, i) => (
          <DataTable.Row >
            <DataTable.Cell>{item.nombre}</DataTable.Cell>
            <DataTable.Cell>0</DataTable.Cell>
            <DataTable.Cell>S/. {item.precio_unitario}</DataTable.Cell>
            <DataTable.Cell><IconButton icon="trash" iconColor={MD3Colors.error50} onPress={() => console.log('eliminado')} /></DataTable.Cell>
          </DataTable.Row>
        ))}
        </DataTable>
        
      </div>
    </View>
  );
};

export default Table;
