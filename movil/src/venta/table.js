import React, { useState, Fragment, useEffect, useRef } from "react";

import { Button, TextInput, Surface } from "@react-native-material/core";
import { DataTable, List, IconButton } from "react-native-paper";

import { ACTION_TYPES, getTotal } from "./reducer";
import { View, Text, ScrollView, StyleSheet } from "react-native";

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
  const setTotal = () => {
    let payload = getTotal(state.venta.detalle_venta);
    var action = {
      type: ACTION_TYPES.SET_TOTAL,
      payload,
    };
    dispatch(action);
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
    setTotal();
  }, [click]);

  return (
    <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>PKG</DataTable.Title>
            <DataTable.Title>Cantidad</DataTable.Title>
            <DataTable.Title>Precio</DataTable.Title>
            <DataTable.Title>Eliminar</DataTable.Title>
          </DataTable.Header>
          <ScrollView style={styles.scrollView} >
            {rows.map((item, i) => (
            <DataTable.Row>
              <DataTable.Cell>{item.nombre}</DataTable.Cell>
              <DataTable.Cell>{item.cantidad}</DataTable.Cell>
              <DataTable.Cell>S/. {(item.precio_unitario * 0.18)+item.precio_unitario}</DataTable.Cell>
              <DataTable.Cell></DataTable.Cell>
              <DataTable.Cell>
                <IconButton
                  icon="delete"
                onPress={() => handleDelete(item)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
          </ScrollView>
        </DataTable>
        <Text>TOTAL</Text>
        <Text>S/. {getTotal(state.venta.detalle_venta)}</Text>
    </View>
  );
};

export default Table;


const styles = StyleSheet.create({
  
  scrollView: {
    maxHeight: "40vh",
  }
});