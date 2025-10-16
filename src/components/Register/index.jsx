import { useState } from "react";
import React from "react";
import { API_URL } from "../../service/constant";
import './register.css'
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ setUser }) => {    
    const [email, setEmail] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    /*registrerer en ny bruker */
    const handleSignup = async (e) => {
        e.preventDefault();

        const payload = {
            email, 
            first_name, 
            last_name, 
            mobile, 
            password
        }

        try {
            const res = await fetch(`${API_URL}/register`, {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => ({}))
                throw new Error(body.error || `Request failed: ${res.status}`)
            }

            const data = await res.json().catch(() => ({}));   
            setUser(data)
            console.log(data)
            navigate('/profile')
        } catch (err) {
            console.log(err)
        }   
    }

    const validateEmail = (email) => {
        const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailFormat)) {
            return true; 
        } else {
            alert("You have entered an invalid email address");
            return false;
        }
    }  

    return (
        <div className="register-hero">
            <div className="register-card">
                <h2>Register your profile</h2>
                <form className="register-form" onSubmit={handleSignup}>
                    <input 
                        type="email" 
                        placeholder="Enter email" 
                        value={email} 
                        onChange={(e)=>setEmail(e.target.value)} 
                        required
                    />

                    <input 
                        type="text" 
                        placeholder="First name" 
                        value={first_name} 
                        onChange={(e)=>setFirst_name(e.target.value)} 
                        required   
                    />

                    <input 
                        type="text" 
                        placeholder="Last name" 
                        value={last_name} 
                        onChange={(e)=>setLast_name(e.target.value)} 
                        required 
                    />

                    <input 
                        type="number" 
                        placeholder="Mobile number" 
                        value={mobile} 
                        onChange={(e)=>setMobile(e.target.value)} 
                        onInput={(e) => {
                            if (e.target.value.length > 11) {
                                e.target.value = e.target.value.slice(0, 11);
                              }}}
                        required 
                    />

                    <div className="input-with-icon">
                        <input 
                            type="password" 
                            placeholder="Enter password" 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                
                    <button 
                        type="submit" 
                        onClick={async () => {
                            if (validateEmail(email)) {
                                try {
                                    await handleSignup();
                                } 
                                catch (err) {
                                    if (err.status === 400) {
                                    alert("Email is already in use");
                                    }
                                }
                            }
                        }}
                    >
                        Register
                    </button>

                    <p className="small-text-paragraph">Already have an account? Click here to login </p>
                    
                    <button
                        type="submit"
                        onClick={() => {navigate('/login')}}    
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default RegisterForm;
