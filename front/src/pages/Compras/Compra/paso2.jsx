import { alpha } from "@mui/material/styles";
import { useState , Fragment, useEffect, useRef } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import './index.css';

import {
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Select,
  MenuItem,
  InputLabel,
  ButtonGroup, Divider, Card, CardMedia, CardContent, CardActions, CardHeader, IconButton
} from "@mui/material";

//Componentes
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import { blue } from "@mui/material/colors";

import SearcherArticulos from "./searcher";
import axios from "axios";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import  ClickAwayListener from "@mui/material/ClickAwayListener";

const searcher = (fields, list) => {
    let resultData = list;
    resultData = fields.nombre
      ? resultData.filter((item) =>
          (item.articulo.toString()+item.nombre.toString()).includes(fields.nombre.toString())
        )
      : resultData;
    resultData = fields.categoria
        ? resultData.filter((item) => 
            item.categoria == fields.categoria
        )
        : resultData;
    resultData = fields.almacen
        ? resultData.filter((item) => 
            item.almacen == fields.almacen
        )
        : resultData;
    return resultData;
};

const getArticulos = (set, url) => {
    axios
    .get(url)
    .then((res) => {
      if (res.status == 200) set(res.data.content);
    })
    .catch((error) => console.log(error));
}

const Paso2 = () => {

    //para la cuenta
    const [count, setCount] = useState(1);

    //para el buscador de articulos
    const render = useRef(true);
    const [fields, setFields] = useState({}); 
    const URL = "http://localhost:8000/api/articulos/variantes/";
    const [articulos, setArticulos] = useState([]);
    useEffect(() => {
        if (render.current) {
        render.current = false;
        getArticulos(setArticulos, URL);
        }
    }, []);
    let data = searcher(fields, articulos);

    //para la tabla editable
    const[rowIndex, setRowIndex] = useState(-1)
    const[columnIndex, setColumnIndex] = useState(-1)
    const [rows, setRows] = useState([
        {articulo:'articulo 1', unidad:'docena', cantidad:12, precio:100},
        {articulo:'articulo 2', unidad:'docena', cantidad:10, precio:40},
    ])
    const handleChange = (i, prop, value) => {
        rows[i][prop] = value
    }
    const handleExit = () => {
        setRowIndex(-1);
        setColumnIndex(-1)
    }

    return (
        <>
        <SearcherArticulos fields={fields} setFields={setFields}/>
        <br></br>
        <section>
            <div className="container">
            <Paper sx={{p:5}} elevation={20}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12} lg={7}>
                    <Grid container spacing={2}>
                        {data.map((item, i) => (
                            <Grid key={i} item xs={12} sm={6} md={6} lg={4}>
                            <Card  sx={{ 
                                backgroundColor: alpha('#985024', 0.20),
                                '&:hover': {
                                    backgroundColor: alpha('#985024', 0.25),
                                },
                                }}>
                                <CardHeader
                                title={
                                    <Typography fontFamily={"inherit"}>
                                    {item.articulo+'/'+item.nombre}
                                    </Typography>
                                }
                                subheader={
                                    <Typography variant="body2" color="text.secondary">
                                    $ {item.precio_unitario}
                                    </Typography>
                                }
                                action={
                                    <Badge color="secondary" badgeContent={count} sx={{right:20 , top:10}}>
                                    </Badge>
                                } 
                                />
                                <CardMedia
                                sx={{ height: 140 }}
                                image={item.imagen}
                                />
                                <CardContent>
    
                                <CardActions>
                                    <ButtonGroup fullWidth >
                                    <Button fullWidth
                                        color="secondary"
                                        aria-label="reduce"
                                        onClick={() => {
                                        setCount(Math.max(count - 1, 0));
                                        }}
                                    >
                                        <RemoveIcon fontSize="small" />
                                    </Button>
                                    <Button fullWidth
                                        color="secondary"
                                        aria-label="increase"
                                        onClick={() => {
                                        setCount(count + 1);
                                        }}
                                    >
                                        <AddIcon fontSize="small" />
                                    </Button>
                                    </ButtonGroup>
                                </CardActions>
                                </CardContent>
                            </Card>
                            </Grid>
                        ))}
                    </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={5} minWidth="400px" >
                    <List sx={{ overflow:'scroll'}}>
                        <ListItem
                        sx={{
                            backgroundColor: "#DF9035"}}>
                        <Grid container spacing={1}>
                            <Grid item xs>
                            <Typography sx={{fontFamily:"inherit", color:'white'}}>
                                Artículo
                            </Typography>
                            </Grid>
                            <Grid item xs>
                            <Typography align="right" sx={{fontFamily:"inherit" , color:'white'}}>
                                Unidad
                            </Typography>
                            </Grid>
                            <Grid item xs>
                            <Typography align="right" sx={{fontFamily:"inherit" , color:'white'}}>
                                Cantidad
                            </Typography>
                            </Grid>
                            <Grid item xs>
                            <Typography align="right" sx={{fontFamily:"inherit" , color:'white'}}>
                                Precio
                            </Typography>
                            </Grid>
                            <Grid item xs>
                            <Typography align="right" sx={{fontFamily:"inherit" , color:'white'}}>
                                Eliminar
                            </Typography>
                            </Grid>
                        </Grid>
                        </ListItem>
                        <Divider/>
                        
                            {rows.map((item, i) => (
                                <>
                                <ListItem>
                                <Grid container spacing={1} >
                                    <Grid item xs >
                                    {item.articulo}
                                    </Grid>
                                    <Grid item xs 
                                    onClick={()=>{setRowIndex(i); setColumnIndex(1)}}>
                                    <Typography align="right">
                                    {rowIndex==i && columnIndex==1 ?
                                    <TextField
                                    size="small"
                                    color="secondary"
                                    defaultValue={rows[i]["unidad"]}
                                    onChange={(e) => handleChange(i, "unidad", e.target.value)}
                                    // onKeyUp={(e)=>{
                                    //     if (e.onKeyUp==="Enter");
                                    //     handleExit()
                                    // }}
                                    />
                                    :item.unidad
                                    }
                                    </Typography>
                                    </Grid>
                                    <Grid item xs 
                                    onClick={()=>{setRowIndex(i); setColumnIndex(2)}}>
                                    <Typography align="right" >
                                    {rowIndex==i && columnIndex==2 ?
                                    <TextField
                                    size="small"
                                    color="secondary"
                                    defaultValue={rows[i]["cantidad"]}
                                    onChange={(e) => handleChange(i, "cantidad", e.target.value)}
                                    
                                    />
                                    :item.cantidad
                                    }
                                    </Typography>
                                    </Grid>
                                    <Grid item xs
                                    onClick={()=>{setRowIndex(i); setColumnIndex(3)}}>
                                    <Typography align="right">
                                    {rowIndex==i && columnIndex==3 ?
                                    <TextField
                                    size="small"
                                    color="secondary"
                                    defaultValue={rows[i]["precio"]}
                                    onChange={(e) => handleChange(i, "precio", e.target.value)}
                                    
                                    />
                                    :'S/. ' +item.precio
                                    }
                                    </Typography>
                                    </Grid>
                                    <Grid item xs  align="right">
                                        <IconButton
                                         onClick={()=>{rows.splice(i, 1); setRows([...rows])}}>
                                        <DeleteOutlineIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                </ListItem>
                                <Divider/>
                                </>
                            ))}

                        <ListItem>
                        <Grid container spacing={1}>
                            <Grid item xs>
                            </Grid>
                            <Grid item xs>
                            <Typography align="center" sx={{fontFamily:"inherit"}}>
                                Subtotal
                            </Typography>
                            </Grid>
                            <Grid item xs>
                            <Typography align="right" sx={{fontFamily:"inherit"}}>
                                S/. 19.00
                            </Typography>
                            </Grid>
                        </Grid>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                        <Grid container spacing={1}>
                            <Grid item xs>
                            </Grid>
                            <Grid item xs>
                            <Typography align="center" sx={{fontFamily:"inherit"}}>
                                Impuestos
                            </Typography>
                            </Grid>
                            <Grid item xs>
                            <Typography align="right" sx={{fontFamily:"inherit"}}>
                                18%
                            </Typography>
                            </Grid>
                        </Grid>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                        <Grid container spacing={1}>
                            <Grid item xs>
                            </Grid>
                            <Grid item xs>
                            <Typography align="center" sx={{fontFamily:"inherit"}}>
                                Total
                            </Typography>
                            </Grid>
                            <Grid item xs>
                            <Typography align="right" sx={{fontFamily:"inherit"}}>
                                S/. 21.00
                            </Typography>
                            </Grid>
                        </Grid>
                        </ListItem>
                    </List>
                    </Grid>
                </Grid>
            </Paper>
            </div>
        </section>
        </>
        
  );
};
export default Paso2;