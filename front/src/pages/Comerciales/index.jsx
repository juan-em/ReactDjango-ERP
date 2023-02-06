import Menu from "../../components/Menu";
import "./index.css";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

//iconos
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ApiIcon from '@mui/icons-material/Api';
import Button from '@mui/material/Button';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { purple } from '@mui/material/colors';

const Comerciales = () =>{
    return(
        <section>
            <Menu/>
            <div className="container">
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={10} className="paper">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={4} md={4}>
                            <SupportAgentIcon sx={{ fontSize: "80px" , color:'#8D4C32'}} className="icon_comerciales"></SupportAgentIcon>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                                <div className="noicon_comerciales">
                                    <div class="comerciales">Clientes</div>
                                    <Button variant="outlined" endIcon={<ArrowRightIcon />} color='inherit'>
                                        <Link to="/comerciales/clientes/" className="ver_clientes">Ver</Link>
                                    </Button>
                                </div>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={10} className="paper">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={4} md={4}>
                            <ApiIcon sx={{ fontSize: "80px" , color:'#8D4C32'}} className="icon_comerciales"></ApiIcon>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                            <div className="noicon_comerciales">
                                    <div class="comerciales">Proveedores</div>
                                    <Button variant="outlined" endIcon={<ArrowRightIcon />} color='inherit'>
                                        <Link to="#clientes" className="ver_proveedores">Ver</Link>
                                    </Button>
                                </div>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={10} className="paper">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={4} md={4}>
                            <SupportAgentIcon sx={{ fontSize: "80px" , color:'#8D4C32' }} className="icon_comerciales"></SupportAgentIcon>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                                <div className="noicon_comerciales">
                                    <div class="comerciales">Trabajadores</div>
                                    <Button variant="outlined" endIcon={<ArrowRightIcon />} color='inherit'>
                                        <Link to="#clientes" className="ver_proveedores">Ver</Link>
                                    </Button>
                                </div>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            </div>
        </section>
  )
}

export default Comerciales;