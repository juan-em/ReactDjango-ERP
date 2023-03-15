//Style
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

//User profile style
import Avatar from '@mui/material/Avatar';

//Functionality
import { useState, useRef, useEffect } from 'react';
import UserRequest from '../Requests/UserRequest';

export default function UserProfile() {
    const [open, setOpen] = useState(false);

    //Getting user data through its request
    const user = UserRequest()

    //Handle dialog functions
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            {/* Boton para acceder a la pagina de perfil */}
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                Ver más
            </Button>

            {/* Pagina de perfil mediante el uso de Dialog  */}
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Avatar
                        alt="Remy Sharp"
                        src="https://images.unsplash.com/photo-1474904200416-6b2b7926f26f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
                        sx={{ width: 100, height: 100, mx: 'auto'}}
                    />

                    <h2 style={{textAlign:'center'}}>{user?.username}</h2>

                    <TextField
                        id="filled-read-only-input"
                        fullWidth
                        label="Email"
                        margin="normal"
                        value={user?.email}
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                    <TextField
                        id="filled-read-only-input"
                        label="Rol"
                        fullWidth
                        value={user?.profile_user?.rol}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                    />

                    <TextField
                        id="filled-read-only-input"
                        label="Area"
                        value={user?.profile_user?.area}
                        margin="normal"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Editar</Button>
                    <Button onClick={handleClose}>Cancelar</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
