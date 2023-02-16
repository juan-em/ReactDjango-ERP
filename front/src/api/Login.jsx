import { useRef, useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"

import { Link, useNavigate, useLocation } from "react-router-dom"

import axios from "./axios"
const LOGIN_URL = 'api/token/'

const Login = () => {
    const { setAuth } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || "/"

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        userRef.current;
    }, [])

    useEffect(() => {
        setErrorMessage('');
    }, [user, password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try{
            const response = await axios.post(LOGIN_URL, JSON.stringify({username: user, password: password}), {
                headers: { 'Content-Type':'application/json' },
                withCredentials: true
            })

            console.log(JSON.stringify(response?.data))

            const refresh = response?.data?.refresh
            const access = response?.data?.access
            setAuth({user, password, access, refresh})

            setUser('')
            setPassword('')
            navigate(from, {replace:true})
        } catch(err) {
            if(!err?.response){
                setErrorMessage('No server response')
            } else if (err.response?.status === 400) {
                setErrorMessage('Missing username or password')
            } else if (err.response?.status === 401){
                setErrorMessage('Unauthorized')
            } else {
                setErrorMessage('Login failed')
            }

            errRef.current
        }
    }

    return (
        <div>
            <p ref={errRef} className={errorMessage ? "Error message" : "offscreen"} aria-live="assertive">{errorMessage}</p>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input 
                    type="text" 
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required 
                />
                <label htmlFor="password">Password: </label>
                <input 
                    type="password" 
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required 
                />
                <button>Sign in</button>
            </form>
            <p>
                Need an Account? <br />
                <span className="line">
                    {/* Future router */}
                    <a href="#">Sing up</a>
                </span>
            </p>
        </div>
    )
}

export default Login