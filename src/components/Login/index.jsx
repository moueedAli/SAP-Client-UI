import { useState } from 'react';
import './login.css'
import { API_URL } from '../../service/constant';
import Profile from '../Profile';
import { useNavigate } from 'react-router-dom';

const Login = ({setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    /*logger inn en bruker */
    const handleLogin = async (e) => {
        e.preventDefault()

        const payload = {
            email,
            password 
        }

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            })

            if (!res.ok) {
                const body = await res.json().catch(() => ({}))
                throw new Error(body.error || `Request failed: ${res.status}`)
            }
            
            const data = await res.json().catch(() => ({}));
            setUser(data)
            localStorage.setItem("user", JSON.stringify(data))
            navigate('/profile')
        } catch (err) {
            console.log(err)
        }           
    }

    return (
        <div className='login-page'>
            <div className='login-card'>
                <h2>Login to your profile</h2>
                <form className='login-form' onSubmit={handleLogin} >
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        required
                    />

                    <input 
                        type="password" 
                        placeholder="Enter password" 
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        required 
                    />
                    
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login;