import { Link, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import RegisterForm from './components/Register'
import Login from './components/Login'
import './App.css'
import Profile from './components/Profile'
import { useEffect, useState } from 'react'
import Home from './components/Home'
import Activities from './components/Activities'

function App() {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("user")
    return raw ? JSON.parse(raw) : null;
  })
  
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user")
  }, [user]);

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Navigate to="/profile" replace />} />
          <Route path='/register' element={<RegisterForm setUser={setUser}/>}/>
          <Route path='/login' element={<Login setUser={setUser}/>} />
          <Route path='/profile' element={<Profile user={user}/>} />
          <Route path='/home' element={<Home user={user}/>}/>
          <Route path='/activities/day/:id' element={<Activities user={user} />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
