import { alpha } from "@mui/material/styles";
import { useState , Fragment } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import './index.css';

import {
  Paper,
  Grid,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
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

const Paso2 = () => {

      //para la cuenta
      const [count, setCount] = useState(1);

    return (
        <section>
            <div className="container">
            <Paper sx={{p:5}} elevation={20}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={7}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Card  sx={{ 
                            backgroundColor: alpha('#985024', 0.20),
                            '&:hover': {
                                backgroundColor: alpha('#985024', 0.25),
                            },
                            }}>
                            <CardHeader
                            title={
                                <Typography fontFamily={"inherit"}>
                                producto1
                                </Typography>
                            }
                            subheader={
                                <Typography variant="body2" color="text.secondary">
                                $ 19
                                </Typography>
                            }
                            action={
                                <Badge color="secondary" badgeContent={count} sx={{right:20 , top:10}}>
                                </Badge>
                            } 
                            />
                            <CardMedia
                            sx={{ height: 140 }}
                            image="https://stakeholders.com.pe/wp-content/uploads/2019/04/content_fibradealpaca.jpg"
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
                        <Grid item xs={12} sm={6} md={6} lg={4}>
                        <Card elevation={10}>
                            producto2
                        </Card>
                        </Grid>
                    </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5} minWidth="300px">
                    <List>
                        <ListItem
                        sx={{
                            backgroundColor: "#DF9035"}}>
                        <Grid container spacing={1}>
                            <Grid item xs>
                            <Typography sx={{fontFamily:"inherit", color:'white'}}>
                                Producto
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
                        </Grid>
                        </ListItem>
                        <Divider/>
                        <ListItem>
                        <Grid container spacing={1}>
                            <Grid item xs>
                            producto1
                            </Grid>
                            <Grid item xs>
                            <Typography align="right">
                                2
                            </Typography>
                            </Grid>
                            <Grid item xs>
                            <Typography align="right">
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
  );
};
export default Paso2;