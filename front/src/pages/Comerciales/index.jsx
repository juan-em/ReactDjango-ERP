
import { Link } from "react-router-dom";

import "./index.css";
import {Container, Grid, Card} from '@mui/material';

import CustomCard from "../../components/Card";
//iconos
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ApiIcon from '@mui/icons-material/Api';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { purple } from '@mui/material/colors';

const Comerciales = () => {
    return (
        <Container>
        <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={6}>
                <Card>
                    <CustomCard nombre='CLIENTE' url='#cliente' icon='SupportAgentIcon'/>
                </Card>
            </Grid>
        </Grid>
</Container>
    )
}

export default Comerciales;