
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
import { useContext,useEffect } from "react";
import ProveedoresContext from "../../services/Proveedores";





const Comerciales = () =>{
    const {proveedores,getProveedores} = useContext(ProveedoresContext)
    useEffect(()=>{getProveedores()},[])
    
    return(
        <section>
            <div className="container">
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6}>
                    <Paper elevation={10} className="paper">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={4} md={4}>
                            <SupportAgentIcon sx={{ fontSize: "60px" , color:purple[900]}} className="icon_comerciales"></SupportAgentIcon>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                                <div className="noicon_comerciales">
                                    <div className="comerciales">CLIENTES</div>
                                    <Button variant="outlined" endIcon={<ArrowRightIcon />} color='inherit'>
                                        <Link to="#clientes" className="ver_proveedores">VER</Link>
                                    </Button>
                                </div>
                            </Grid>
                            
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Paper elevation={10} className="paper">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={4} md={4}>
                            <ApiIcon sx={{ fontSize: "60px" , color:purple[900]}} className="icon_comerciales"></ApiIcon>
                            </Grid>
                            <Grid item xs={12} sm={8} md={8}>
                            <div className="noicon_comerciales">
                                    <div className="comerciales">PROVEEDORES</div>
                                    <Button variant="outlined" endIcon={<ArrowRightIcon />} color='inherit'>
                                        <Link to="#clientes" className="ver_proveedores">VER</Link>
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