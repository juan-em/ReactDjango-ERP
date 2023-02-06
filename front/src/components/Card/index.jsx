
import { Link } from "react-router-dom";

import { Paper, Grid, Button, Card, CardActionArea, Typography } from '@mui/material';
import { Fragment } from 'react';

//iconos
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { purple } from '@mui/material/colors';



const CustomCard = ({nombre, url, icon}) => {

    

    return (
        <Fragment>
            <CardActionArea>
                <Link to={url}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={4} md={4}>
                            <SupportAgentIcon sx={{ fontSize: "60px", color: purple[900] }} className="icon_comerciales"></SupportAgentIcon>
                        </Grid>
                        <Grid item xs={12} sm={8} md={8}>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                {nombre}
                            </Typography>
                        </Grid>
                    </Grid>
                </Link>
            </CardActionArea>
        </Fragment >
    )
}

export default CustomCard;


