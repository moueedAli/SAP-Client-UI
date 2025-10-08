import { Link, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import RegisterForm from './components/Register'
import Login from './components/Login'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
         <Route path='/register' element={<RegisterForm />}/>
         <Route path='/login' element={<Login />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
