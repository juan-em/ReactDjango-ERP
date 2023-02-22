import { useRef, useEffect, useState} from "react"
import { TextField, Card
    ,Button, Box, useMediaQuery, Grid, InputLabel, Typography, InputAdornment
 } from '@mui/material';
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
    }, [user, email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(REGISTER_URL,
                JSON.stringify({ username: user, email: email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            // TODO: remove console.logs before deployment
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response))
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
                                    <TextField
                                        fullWidth
                                        required 
                                        label={<span>Usuario</span>}
                                        type="text"
                                        size="small"
                                        color="secondary"
                                        margin="dense"
                                        id="textfields"
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
                                    <TextField
                                        fullWidth
                                        label={<span>E-mail</span>}
                                        type="text"
                                        size="small"
                                        color="secondary"
                                        margin="dense"
                                        id="textfields"
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
                                    <TextField
                                        fullWidth
                                        label={<span>Contraseña</span>}
                                        type="password"
                                        size="small"
                                        color="secondary"
                                        margin="dense"
                                        id="textfields"
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
                                        id="textfields"
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