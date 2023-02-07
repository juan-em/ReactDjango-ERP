import Menu from "../../components/Menu";
import "./index.css";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

//iconos
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PeopleIcon from '@mui/icons-material/People';
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
                                    <Link to="/comerciales/clientes/" className="ver_clientes">
                                        <Button variant="outlined" endIcon={<ArrowRightIcon />} color='secondary'>
                                            Ver
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={10} className="paper">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={4} md={4}>
                            <PeopleIcon sx={{ fontSize: "80px" , color:'#8D4C32'}} className="icon_comerciales"></PeopleIcon>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                            <div className="noicon_comerciales">
                                    <div class="comerciales">Proveedores</div>
                                    <Link to="/comerciales/clientes/" className="ver_clientes">
                                        <Button variant="outlined" endIcon={<ArrowRightIcon />} color='secondary'>
                                            Ver
                                        </Button>
                                    </Link>
                                </div>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                    <Paper elevation={10} className="paper">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={4} md={4}>
                            <EngineeringIcon sx={{ fontSize: "80px" , color:'#8D4C32' }} className="icon_comerciales"></EngineeringIcon>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                                <div className="noicon_comerciales">
                                    <div class="comerciales">Trabajadores</div>
                                    <Link to="/comerciales/clientes/" className="ver_clientes">
                                        <Button variant="outlined" endIcon={<ArrowRightIcon />} color='secondary'>
                                            Ver
                                        </Button>
                                    </Link>
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