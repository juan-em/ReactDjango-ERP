import React, { useState, useEffect } from "react"


import { TextInput, Surface, TextInputMask, Button } from 'react-native-paper';

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

  console.log("categorias",categorias);

  return (
    <section>
        <Surface style={{padding:20, margin:20, backgroundColor:'white'}} elevation={4}>

                Buscar Producto
                <TextInput
                    label="Nombre"
                    type="text"
                    mode="outlined"
                    name="nombre"
                    id="textfields"
                    onChange={handlerSearcher}

                />
                <SelectDropdown
                    data={categorias}
                    onSelect={(selectedItem, index) => {
                        console.log(selectedItem, index);
                    }}
                    rowTextForSelection={(item, index) =>{
                        return item.nombre
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.nombre
                    }}
                />

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
        </Surface>
    </section>
  )
}

export default SearcherProductos