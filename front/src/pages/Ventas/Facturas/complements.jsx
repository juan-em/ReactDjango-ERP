//para la tabla;
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DescriptionIcon from "@mui/icons-material/Description";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Autocomplete,
  Button,
} from "@mui/material";

import { styled, useTheme, alpha } from "@mui/material/styles";

import { formateoFecha } from "../../../services/compras";

import { useState, useEffect, useMemo, useCallback, Fragment } from "react";
import { useExpanded, useTable } from "react-table";
// import {
//   get,
//   searcherprov,
//   post_put,
//   del,
// } from "../../../services/mantenimiento";
import {
  getVenta,
  getSesionVenta,
  searcherFacturas,
  delVenta,
} from "../../../services/ventas";
import AddForm from "../Remisiones/addform";

const SubRowAsync = ({ row, rowProps, visibleColumns }) => {
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData(makeData(3));
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    return (
      <tr>
        <td />
        <td colSpan={visibleColumns.length - 1}>Loading...</td>
      </tr>
    );
  }

  // error handling here :)

  return (
    <>
      {data.map((x, i) => {
        return (
          <tr {...rowProps} key={`${rowProps.key}-expanded-${i}`}>
            {row.cells.map((cell) => {
              return (
                <td {...cell.getCellProps()}>
                  {cell.render(cell.column.SubCell ? "SubCell" : "Cell", {
                    value: cell.column.accessor && cell.column.accessor(x, i),
                    row: { ...row, original: x },
                  })}
                </td>
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

const ChildTable = ({ columns: userColumns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns: userColumns,
      data,
    },
    useExpanded // We can useExpanded to track the expanded state
    // for sub components too!
  );

  return (
    <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
      <Table
        {...getTableProps()}
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead
          sx={{
            backgroundColor: alpha("#633256", 0.2),
            "&:hover": {
              backgroundColor: alpha("#633256", 0.25),
            },
          }}
        >
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  sx={{
                    color: "#633256",
                    fontFamily: "inherit",
                    fontStyle: "italic",
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            const rowProps = row.getRowProps();
            return (
              // Use a React.Fragment here so the table markup is still valid
              <Fragment key={rowProps.key}>
                <TableCell {...rowProps}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </TableCell>
                {/* We could pass anything into this */}
                {row.isExpanded &&
                  renderRowSubComponent({ row, rowProps, visibleColumns })}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Tabla = ({
  fields,
  render,
  renderizar,
  setRenderizar,
  setOpenModal,
  setItem,
  itemView,
  setItemView,
  sesion,
}) => {
  const URL_VENTA = "http://localhost:8000/api/ventas/";
  const URL_SESION = "http://localhost:8000/api/ventas/sesion/";
  const [provincias, setProvincias] = useState([]);
  const [facturasVentas, setFacturasVentas] = useState([]);
  const [facturasSesionVentas, setFacturasSesionVentas] = useState([]);

  useEffect(() => {
    if (render.current) {
      render.current = false;
      getVenta(setFacturasVentas, URL_VENTA);
      getSesionVenta(setFacturasSesionVentas, URL_SESION);
    }
  }, [renderizar]);

  let data = searcherFacturas(
    fields,
    !sesion ? facturasVentas : facturasSesionVentas
  );

  const handlePut = (row) => {
    setItem(row);
    setOpenModal(true);
  };

  const handleView = (row) => {
    setItemView(row);
  };

  const handleActiveDeactive = async (row) => {
    try {
      Swal.fire({
        title: row?.borrado
          ? "¿Desea activar la orden de compra?"
          : "¿Desea anular la orden de compra?",
        showDenyButton: true,
        confirmButtonText: "SI",
        denyButtonText: `NO`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          await await delVenta(`URL_VENTA${row.id}`);
          Swal.fire(
            row?.borrado
              ? "Orden de Compra Activada"
              : "Orden de Compra Anulada",
            "",
            "info"
          );
          render.current = true;
          setRenderizar(!renderizar);
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}`,
      });
    }
  };

  const columns = useMemo(
    () => [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: "expander", // It needs an ID
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "👇" : "👉"}
          </span>
        ),
        // We can override the cell renderer with a SubCell to be used with an expanded row
        SubCell: () => null, // No expander on an expanded row
      },
      {
        Header: "Factura Venta",
        columns: [
          {
            Header: "Item",
            accessor: (d) => d.age,
          },
          {
            Header: "Codigo",
            accessor: (d) => d.codigo,
          },
          {
            Header: "N° de factura",
            accessor: (d) => d.age,
          },
          {
            Header: "Fecha de Venta",
            accessor: (d) => d.fecha,
          },
          {
            Header: "Cliente",
            accessor: (d) => d.nombre_cliente,
          },
          {
            Header: "Remision",
            accessor: (d) => d.remision,
          },
          {
            Header: "Estado",
            accessor: (d) => d.estado_remision,
          },
          {
            Header: "Acciones",
            accessor: (d) => d.status,
          },
        ],
      },
    ],
    []
  );

  const renderRowSubComponent = useCallback(
    ({ row, rowProps, visibleColumns }) => (
      <SubRowAsync
        row={row}
        rowProps={rowProps}
        visibleColumns={visibleColumns}
      />
    ),
    []
  );

  return (
    <>
      <ChildTable
        columns={columns}
        data={data}
        renderRowSubComponent={renderRowSubComponent}
      />
    </>
    // <TableContainer component={Paper} sx={{ mt: 5 }} elevation={10}>
    //   <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
    //     <TableHead
    //       sx={{
    //         backgroundColor: alpha("#633256", 0.2),
    //         "&:hover": {
    //           backgroundColor: alpha("#633256", 0.25),
    //         },
    //       }}
    //     >
    //       <TableRow>
    //         <TableCell
    //           sx={{
    //             color: "#633256",
    //             fontFamily: "inherit",
    //             fontStyle: "italic",
    //           }}
    //         >
    //           Item
    //         </TableCell>
    //         <TableCell
    //           sx={{ color: "#633256", fontFamily: "inherit" }}
    //           align="right"
    //         >
    //           Código
    //         </TableCell>
    //         <TableCell
    //           sx={{ color: "#633256", fontFamily: "inherit" }}
    //           align="right"
    //         >
    //           N° de factura
    //         </TableCell>
    //         <TableCell
    //           sx={{ color: "#633256", fontFamily: "inherit" }}
    //           align="right"
    //         >
    //           Fecha de Venta
    //         </TableCell>
    //         <TableCell
    //           sx={{ color: "#633256", fontFamily: "inherit" }}
    //           align="right"
    //         >
    //           Cliente
    //         </TableCell>
    //         <TableCell
    //           sx={{ color: "#633256", fontFamily: "inherit" }}
    //           align="right"
    //         >
    //           Remisión
    //         </TableCell>
    //         <TableCell
    //           sx={{ color: "#633256", fontFamily: "inherit" }}
    //           align="right"
    //         >
    //           Estado
    //         </TableCell>
    //         <TableCell
    //           sx={{ color: "#633256", fontFamily: "inherit" }}
    //           align="right"
    //         >
    //           Acciones
    //         </TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {data.map((row, i) => (
    //         <TableRow key={i}>
    //           <TableCell component="th" scope="row">
    //             {i + 1}
    //           </TableCell>
    //           <TableCell align="right">{row.codigo}</TableCell>
    //           <TableCell align="right">
    //             {row.numero_factura ? row.numero_factura : "-"}
    //           </TableCell>
    //           <TableCell align="right">{formateoFecha(row.fecha)}</TableCell>
    //           <TableCell align="right">{row.nombre_cliente}</TableCell>
    //           <TableCell align="right">{row.estado_remision}</TableCell>
    //           <TableCell align="right">
    //             {row.borrado ? "Anulado" : "Vigente"}
    //           </TableCell>
    //           <TableCell align="right" component="th" scope="row">
    //             <IconButton
    //               aria-label="delete"
    //               size="small"
    //               color="primary"
    //               onClick={() => handleView(row)}
    //             >
    //               <VisibilityIcon fontSize="inherit" />
    //             </IconButton>
    //             <IconButton
    //               disabled={row?.borrado ? true : false}
    //               onClick={() => handlePut(row)}
    //               aria-label="delete"
    //               size="small"
    //               color="success"
    //             >
    //               <EditIcon fontSize="inherit" />
    //             </IconButton>

    //             <IconButton
    //               disabled={
    //                 row?.estado_remision == "-" ||
    //                 row?.estado_remision == "Por Hacer"
    //                   ? false
    //                   : true
    //               }
    //               onClick={() => handleActiveDeactive(row)}
    //               aria-label="delete"
    //               size="small"
    //               color={row?.borrado ? "success" : "error"}
    //             >
    //               {row.borrado ? (
    //                 <CheckCircleIcon fontSize="inherit" />
    //               ) : (
    //                 <DeleteIcon fontSize="inherit" />
    //               )}
    //             </IconButton>

    //             <AddForm
    //               itemView={itemView}
    //               setItemView={setItemView}
    //               row={row}
    //               idCompra={row.id}
    //               detalle_compra={row.detalle_compra}
    //               renderizar={renderizar}
    //               setRenderizar={setRenderizar}
    //               render={render}
    //             />
    //           </TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};
