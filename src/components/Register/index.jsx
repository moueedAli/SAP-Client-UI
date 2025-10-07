import { useState } from "react";
import React from "react";
import { API_URL } from "../../service/constant";


const RegisterForm = () => {    
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState("");

    const url = `${API_URL}/register`;

    const handleSignup = async (e) => {
        e.preventDefault();

        const payload = {
            email, 
            firstName, 
            lastName, 
            mobile: Number(mobile), 
            password
        }

        console.log(url)
        try {
            const res = await fetch(url, {
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
            console.log("Singup email: ", email, "password: ", password, data.message);

        } catch (err) {
            console.log(err)
        }   
    }

    return (
        <>
            <h2>Register your profile</h2>
            <form onSubmit={handleSignup}>
                <input 
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input 
                    type="firstName"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <input 
                    type="lastName"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />

                <input 
                    type="mobile"
                    placeholder="Mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    required
                />

                <input 
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default RegisterForm;