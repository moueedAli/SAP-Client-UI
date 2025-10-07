import './App.css'
import Users from './components/Users'

function App() {

  console.log(import.meta.env.API_URL)

  return (
    <>
    <h1>Welcome to SAP 2.0</h1>
    <Users />
    </>
  )
 
}

export default App
