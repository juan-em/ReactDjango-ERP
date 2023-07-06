import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { DataTable, IconButton } from "react-native-paper";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// import {
//   Paper,
//   Grid,
//   TextField,
//   Button,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Box,
//   Autocomplete,
//   Switch,
//   FormControlLabel,
// } from "@mui/material";
// import { TabContext } from "@mui/lab";
// //Componentes pra el input de fecha
// import dayjs from "dayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

// //Componentes
import { getVenta } from "../services/ventas";
import VerFactura from "./detalle";
// import { useState, useEffect, useContext } from "react";
// import { Tabla } from "./complements";

// import { useRef } from "react";
// import VerFactura from "./verfactura";

// import { getClientes } from "../../../services/clientes";

const FacturaVentas = () => {
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );

  const [facturas, setFacturas] = useState([]);
  const [itemView, setItemView] = useState()
  const deleteRow = (item) => {
    console.log("eliminar");
    console.log(item);
  };
  const viewRow = (item) => {
    console.log("ver");
    console.log(item);
    setItemView(item)
  };

  console.log(facturas);
  console.log(itemView)

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, facturas.length);

  useEffect(() => {
    getVenta(setFacturas, "http://localhost:8000/api/ventas/");
    setPage(0);
  }, [itemsPerPage]);

  return (
    <ScrollView horizontal={true}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Item</DataTable.Title>
          <DataTable.Title>Codigo</DataTable.Title>
          <DataTable.Title>N de Factura</DataTable.Title>
          <DataTable.Title>Fecha de Venta</DataTable.Title>
          <DataTable.Title>Cliente</DataTable.Title>
          <DataTable.Title>Acciones</DataTable.Title>
        </DataTable.Header>
        {facturas.slice(from, to).map((item, i) => (
          <DataTable.Row key={i}>
            <DataTable.Cell>{i + 1}</DataTable.Cell>
            <DataTable.Cell>{item.codigo}</DataTable.Cell>
            <DataTable.Cell>
              {item.numero_factura ? item.numero_factura : "-"}
            </DataTable.Cell>
            <DataTable.Cell>{item.fecha}</DataTable.Cell>
            <DataTable.Cell>{item.nombre_cliente}</DataTable.Cell>
            <DataTable.Cell>
             <VerFactura itemView={item}/>
              <IconButton
                icon="delete"
                iconColor="red"
                size={20}
                onPress={() => deleteRow(item)}
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
  );
};
export default FacturaVentas;
