import { useRef, useEffect, useState} from "react"

import { TextField, Card
        ,Button, Box, useMediaQuery, Grid, InputLabel, Typography, InputAdornment
} from '@mui/material';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

//iconos
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import { Link } from "react-router-dom";

import axios from "../../api/axios"

const REGISTER_URL = 'api/register/'

const Register = () => {
    const userRef = useRef();
    const errRef = useRef();

    //Related with user
    const [user, setUser] = useState('');
    const [rol, setRol] = useState('');
    const [area, setArea] = useState('');
    const [email, setEmail] = useState('')
    const [pwd, setPwd] = useState('');

    // Error messages
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, rol, area, email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username: user, 
                    profile_user: {
                        rol: rol,
                        area: area
                    }, email: email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            setSuccess(true);
            //clear state and controlled inputs
            setUser('');
            setPwd('');
            setMatchPwd('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={3}>

                        </Grid>
                        <Grid item xs={12} sm={12} md={5}>
                            <Card elevation={10} sx={{p:5 , mt:3}}> 
                                <Typography fontFamily={'inherit'} sx={{ color:'#633256' , fontSize:20, pb:3}} align={'center'}>
                                    ¡Listo! Ya puedes iniciar sesión
                                </Typography>
                                
                                <Link to='/'>
                                    <Button
                                        fullWidth
                                        id="textfields"
                                        variant="contained"
                                        type="submit"
                                        sx={{ backgroundColor:'#633256' , "&:hover": {backgroundColor: "#633256" }, mt:2, mb:2  }}
                                    >
                                        Iniciar sesión
                                    </Button>
                                </Link>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            
                        </Grid>
                    </Grid>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={3}>

                        </Grid>
                        <Grid item xs={12} sm={12} md={5}>
                            <Card elevation={10} sx={{p:5 , mt:3}}> 
                                <Typography fontFamily={'inherit'} sx={{ color:'#633256' , fontSize:20, pb:3}} align={'center'}>
                                    Registro
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    {/* Username input */}
                                    <TextField
                                        fullWidth
                                        required 
                                        label={<span>Usuario</span>}
                                        type="text"
                                        size="small"
                                        color="secondary"
                                        margin="dense"
                                        id="usernameInput"
                                        variant="filled"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                        aria-describedby="uidnote"
                                        InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <AlternateEmailIcon/>
                                            </InputAdornment>
                                            ),
                                        }}
                                    />

                                    {/* Email input */}
                                    <TextField
                                        fullWidth
                                        label={<span>E-mail</span>}
                                        type="text"
                                        size="small"
                                        color="secondary"
                                        margin="dense"
                                        id="emailInput"
                                        variant="filled"
                                        ref={userRef}
                                        autoComplete="off"
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                        aria-describedby="uidnote"
                                        InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <PersonIcon/>
                                            </InputAdornment>
                                            ),
                                        }}
                                    />

                                    <Box sx={{
                                        width:'100%',
                                        flexGrow: 1
                                    }}>
                                        {/* Rol select input */}
                                        <Grid container spacing={2} columns={16}>
                                            <Grid item xs={8}>
                                                <FormControl margin="dense" variant="filled" sx={{ width: '100%'}} size="small">
                                                    <InputLabel id="rol-label" color="secondary"><span>Rol</span></InputLabel>
                                                    <Select
                                                        labelId="rol-label"
                                                        id="rol-label-id"
                                                        color="secondary"
                                                        value={rol}
                                                        onChange={(e) => setRol(e.target.value)}
                                                    >
                                                        <MenuItem value="">
                                                            <em>Ninguno</em>
                                                        </MenuItem>
                                                        <MenuItem value="Trabajador">Trabajador</MenuItem>
                                                        <MenuItem value="Gerente">Gerente</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            {/* Area select input */}
                                            <Grid item xs={8}>
                                                <FormControl margin="dense" variant="filled" sx={{ width: '100%' }} size="small">
                                                    <InputLabel id="area-label" color="secondary"><span>Area</span></InputLabel>
                                                    <Select
                                                        labelId="area-label"
                                                        id="area-label-id"
                                                        color="secondary"
                                                        value={area}
                                                        onChange={(e) => setArea(e.target.value)}
                                                    >
                                                        <MenuItem value="">
                                                            <em>Ninguno</em>
                                                        </MenuItem>
                                                        <MenuItem value="Logística">Logística</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                           

                                    {/* Password input */}
                                    <TextField
                                        fullWidth
                                        label={<span>Contraseña</span>}
                                        type="password"
                                        size="small"
                                        color="secondary"
                                        margin="dense"
                                        id="passwordInput"
                                        variant="filled"
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                        aria-describedby="pwdnote"
                                        InputProps={{
                                            endAdornment: (
                                            <InputAdornment position="end">
                                                <KeyIcon/>
                                            </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Button
                                        fullWidth
                                        id="submitButton"
                                        variant="contained"
                                        type="submit"
                                        sx={{ backgroundColor:'#633256' , "&:hover": {backgroundColor: "#633256" }, mt:4, mb:2  }}
                                    >
                                        Registro
                                    </Button>
                                    
                                </form>
                                <p>
                                    ¿Ya tienes una cuenta? <br />
                                    <span className="line">
                                        <Link to="/login">¡Inicia sesión!</Link>
                                    </span>
                                </p>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4}>
                            
                        </Grid>
                    </Grid>
                </section>
            )}
        </>
    )
}   

export default Register