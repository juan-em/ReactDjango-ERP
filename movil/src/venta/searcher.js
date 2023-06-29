import React, { useState, useEffect } from "react"

import {
  Button,
  TextInput,
} from "@react-native-material/core";

import { getMan } from "../services/ventas"
// Libreria SelectDropdonw
// https://github.com/AdelRedaa97/react-native-select-dropdown/tree/d0c6d8acd346ff0b47a9bb32a902b52022644f6d
import SelectDropdown from 'react-native-select-dropdown'

const SearcherProductos = ({fields, setFields}) => {

  const[categorias, setCategorias] = useState([])
  const[almacenes, setAlmacenes] = useState([])

  const handlerSearcher = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  useEffect(() => {
    const URL_C = "http://localhost:8000/api/mantenimientos/categoria_productos/";
    const URL_M = "http://localhost:8000/api/mantenimientos/almacenes/";
    getMan(setCategorias, URL_C)
    getMan(setAlmacenes, URL_M);
  }, []);

  return (
    <section>
        <div
            // elevation={10}
            // className="paper"
            // sx={{
            // py: 2,
            // px: 5
            // }}
        >
                Buscar Producto
                <div container spacing={1}>
                
                <div item xs={12} sm={4} md={4}>
                <TextInput
                    // fullWidth
                    label="Nombre"
                    type="text"
                    // size="small"
                    // color="secondary"
                    // margin="dense"
                    name="nombre"
                    id="textfields"
                    onChange={handlerSearcher}

                />
                </div>
                <div item xs={12} sm={4} md={4}>
                <SelectDropdown
                    data={categorias}
                    onSelect={(selectedItem, index) => {

                    }}
                    onChange={handlerSearcher}
                />
                {/* <FormControl
                    fullWidth
                    margin="dense"
                    size="small"
                    color="secondary"
                >
                    <InputLabel>Categoría</InputLabel>
                    <Select
                    label="Categoria"
                    size="small"
                    color="secondary"
                    id="textfields"
                    defaultValue=""
                    name="categoria"
                    onChange={handlerSearcher}
                    >
                    <MenuItem value="">
                    all
                    </MenuItem>
                    {categorias.map((item, i) => (
                        <MenuItem key={1} value={item.id}>
                        {item.nombre}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>  */}
                </div>

                <div item xs={12} sm={4} md={4}>
                <SelectDropdown
                    data={almacenes}
                    onSelect={(selectedItem, index) => {

                    }}
                    onChange={handlerSearcher}
                />
                {/* <FormControl
                    fullWidth
                    margin="dense"
                    size="small"
                    color="secondary"
                >
                    <InputLabel>Almacén</InputLabel>
                    <Select
                    label="Almacen"
                    size="small"
                    color="secondary"
                    id="textfields"
                    defaultValue=""
                    name="almacen"
                    onChange={handlerSearcher}
                    >
                    <MenuItem value="">
                    all
                    </MenuItem>
                    {almacenes.map((item, i) => (
                        <MenuItem key={1} value={item.id}>
                        {item.nombre}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>  */}
                </div>
            </div>
        </div>
    </section>
  )
}

export default SearcherProductos