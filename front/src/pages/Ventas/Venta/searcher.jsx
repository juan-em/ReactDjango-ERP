import { Paper } from "@mui/material"
import {Grid} from "@mui/material"
import {Button, TextField} from "@mui/material"
import {FormControl, InputLabel, Select, MenuItem} from "@mui/material"
import { useState, useEffect } from "react"

import { get } from "../../../services/mantenimiento"


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
    get(setCategorias, URL_C)
    get(setAlmacenes, URL_M);
  }, []);

  return (
    <section>
        <Paper
            elevation={10}
            className="paper"
            sx={{
            py: 2,
            px: 5
            }}
        >
                Buscar Producto
            <Grid container spacing={2}>
                
                <Grid item xs={6}>
                <TextField
                    fullWidth
                    label="Nombre"
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="nombre"
                    id="textfields"
                    onChange={handlerSearcher}

                />
                </Grid>
                <Grid item xs={6}>
                <FormControl
                    fullWidth
                    margin="dense"
                    size="small"
                    color="secondary"
                >
                    <InputLabel>Categoria</InputLabel>
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
                </FormControl> 
                </Grid>
            </Grid>
        </Paper>
    </section>
  )
}

export default SearcherProductos