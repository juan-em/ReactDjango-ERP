import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { DataTable, IconButton, Text, Divider } from "react-native-paper";
import { getVenta } from "../services/ventas";
import VerFactura from "./detalle";

const FacturaVentas = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([10]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [facturas, setFacturas] = useState([]);
  const [itemView, setItemView] = useState();
  const deleteRow = (item) => {
    console.log("eliminar");
    console.log(item);
  };
  const viewRow = (item) => {
    console.log("ver");
    console.log(item);
    setItemView(item);
  };

  console.log(facturas);
  console.log(itemView);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, facturas.length);

  useEffect(() => {
    getVenta(setFacturas, "http://localhost:8000/api/ventas/");
    setPage(0);
  }, [itemsPerPage]);

  return (
    <ScrollView>
      <View  style={styles.titleContainer}>
        <Text variant="titleLarge" style={styles.title}>FACTURAS</Text>
      </View>
       <Divider/>
      <VerFactura itemView={itemView} />
      <ScrollView horizontal={true}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Item</DataTable.Title>
            <DataTable.Title>Codigo</DataTable.Title>
            <DataTable.Title>N de Factura</DataTable.Title>
            <DataTable.Title>Fecha de Venta</DataTable.Title>
            <DataTable.Title>Cliente</DataTable.Title>
            <DataTable.Title>Eliminar</DataTable.Title>
          </DataTable.Header>
          {facturas.slice(from, to).map((item, i) => (
            <DataTable.Row key={i} onPress={() => viewRow(item)} >
              <DataTable.Cell>{i + 1}</DataTable.Cell>
              <DataTable.Cell>{item.codigo}</DataTable.Cell>
              <DataTable.Cell>
                {item.numero_factura ? item.numero_factura : "-"}
              </DataTable.Cell>
              <DataTable.Cell>{item.fecha}</DataTable.Cell>
              <DataTable.Cell>{item.nombre_cliente}</DataTable.Cell>
              
              <DataTable.Cell>
                <IconButton
                  icon="delete"
                  iconColor="red"
                  size={20}
                  onPressIn={() => deleteRow(item)}
                />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(facturas.length / itemsPerPage)}
            onPageChange={(page) => setPage(page)}
            label={`${from + 1}-${to} of ${facturas.length}`}
            numberOfItemsPerPageList={numberOfItemsPerPageList}
            numberOfItemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            showFastPaginationControls
            selectPageDropdownLabel={"Rows per page"}
          />
        </DataTable>
      </ScrollView>
    </ScrollView>
  );
};
export default FacturaVentas;


const styles = StyleSheet.create({
  titleContainer:{
    textAlign:"center",
    margin:"15px"
  },
  title: {
    maxHeight: "40vh",
    // textAlign:"center",

  }
});
