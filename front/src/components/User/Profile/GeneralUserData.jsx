import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

// Datos del perfil de usuario
import UserProfile from './UserProfile';
import UserRequest from '../Requests/UserRequest'

const GeneralUserData = () => {
    const user = UserRequest()

    return (
        <div>
            <Box sx={{
                flexGrow: 1,
                width: '100%'
            }}>
                <Paper elevation={3} sx={{
                    p:2
                }}>
                    <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={2} md={2}>
                            <span>Nombre:</span> <br />
                            {user?.username}
                        </Grid>
                        <Grid item xs={2} sm={3} md={3}>
                            <span>Email:</span> <br />
                            {user?.email}
                        </Grid>
                        <Grid item xs={2} sm={2} md={2}>
                            <span>Rol:</span> <br />
                            {user?.profile_user?.rol}
                        </Grid>
                        <Grid item xs={2} sm={3} md={3} sx={{ my:1 }}>
                            <UserProfile/>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </div>
    )
}

export default GeneralUserData
