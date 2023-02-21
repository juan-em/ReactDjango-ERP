import { Paper } from "@mui/material"
import {Grid} from "@mui/material"
import {Button, TextField} from "@mui/material"
import {FormControl, InputLabel, Select, MenuItem} from "@mui/material"

const SearcherArticulos = () => {
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
                Buscar Articulo
            <Grid container spacing={2}>
                
                <Grid item xs={4}>
                <TextField
                    fullWidth
                    label="Nombre"
                    type="text"
                    size="small"
                    color="secondary"
                    margin="dense"
                    name="nombre"
                    id="textfields"

                />
                </Grid>
                <Grid item xs={4}>
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
                    >
                    <MenuItem key={1} value={1}>
                    item 1
                    </MenuItem>
                    </Select>
                </FormControl> 
                </Grid>

                <Grid item xs={4}>
                <FormControl
                    fullWidth
                    margin="dense"
                    size="small"
                    color="secondary"
                >
                    <InputLabel>Almacen</InputLabel>
                    <Select
                    label="Almacen"
                    size="small"
                    color="secondary"
                    id="textfields"
                    defaultValue=""
                    name="almacen"
                    >
                    <MenuItem key={1} value={1}>
                    item 2
                    </MenuItem>
                    </Select>
                </FormControl> 
                </Grid>
            </Grid>
        </Paper>
    </section>
  )
}

export default SearcherArticulos