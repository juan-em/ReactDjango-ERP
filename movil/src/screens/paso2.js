import React, { useState, useEffect, useRef } from "react";
import { View, Text } from "react-native";

import { Button, TextInput, Surface } from "@react-native-material/core";

import SearcherProductos from "./searcher";
import { ACTION_TYPES, ACTION_PUNTO_VENTA_TYPES } from "./reducer";
// import Table from "./table";
import { searcher, get } from "../services/ventas";

const Paso2 = ({ state, dispatch }) => {
  const [click, setClick] = useState(0);
  const handleAdd = (item) => {
    console.log(item);
    setClick((a) => a + 1);
    //building the payload
    let payload = {
      nombre: `${item.producto}/${item.nombre}`,
      producto: item.id,
      unidad: 1,
      cantidad: 1,
      precio_unitario: item.precio_venta,
    };
    var action = {
      type: ACTION_TYPES.ADD_DETALLE,
      payload,
    };
    dispatch(action);
  };

  const handleRemove = (item) => {
    setClick((a) => a - 1);
    let payload = {
      producto: item.id,
    };
    var action = {
      type: ACTION_TYPES.LOW_DETALLE,
      payload,
    };
    dispatch(action);
  };

  //para el buscador de productos
  const render = React.useRef(true);
  const [fields, setFields] = useState({});
  const URL = "http://localhost:8000/api/productos/variantes/";
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    if (render.current) {
      render.current = false;
      get(setProductos, URL);
    }
  }, []);
  let data = searcher(fields, productos);

  return (
    <View>
      <Text>Paso 2s</Text>
      <SearcherProductos fields={fields} setFields={setFields} />
      <section>
        <div className="container">
          <div sx={{ p: 5 }} elevation={20}>
            <div container spacing={1}>
              <div item xs={12} sm={12} md={12} lg={7}>
                <div container spacing={2}>
                  {data.map((item, i) => (
                    <div key={i} item xs={12} sm={6} md={6} lg={4}>
                      <Card
                        sx={{
                          backgroundColor: alpha("#985024", 0.2),
                          "&:hover": {
                            backgroundColor: alpha("#985024", 0.25),
                          },
                        }}
                      >
                        <CardHeader
                          title={
                            <Typography fontFamily={"inherit"}>
                              +{item.producto + "/" + item.nombre}
                            </Typography>
                          }
                          subheader={
                            <Typography variant="body2" color="text.secondary">
                              $ {item.precio_final}
                            </Typography>
                          }
                          action={
                            <Badge
                              color="secondary"
                              badgeContent={1}
                              sx={{ right: 20, top: 10 }}
                            ></Badge>
                          }
                        />
                        <CardMedia sx={{ height: 140 }} image={item.imagen} />
                        <CardContent>
                          <CardActions>
                            <ButtonGroup fullWidth>
                              <Button
                                fullWidth
                                color="secondary"
                                aria-label="reduce"
                                onClick={() => handleRemove(item)}
                              >
                                <RemoveIcon fontSize="small" />
                              </Button>
                              <Button
                                fullWidth
                                color="secondary"
                                aria-label="increase"
                                onClick={() => handleAdd(item)}
                              >
                                <AddIcon fontSize="small" />
                              </Button>
                            </ButtonGroup>
                          </CardActions>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              <div item xs={12} sm={12} md={12} lg={5} minWidth="400px">
                {/* From tabla.jsx */}
                {/* <Table
                  state={state}
                  dispatch={dispatch}
                  sesionIniciada={sesionIniciada}
                  setSesionIniciada={setSesionIniciada}
                  statePuntoVenta={statePuntoVenta}
                  dispatchPuntoVenta={dispatchPuntoVenta}
                  click={click}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </View>
  );
};

export default Paso2;
