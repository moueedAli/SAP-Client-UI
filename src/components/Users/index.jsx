import { useEffect, useState } from "react";

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/users')
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            const result = await response.json();
            setUsers(result)
            } catch (err) {
                throw new Error(`New error registered ${err}`)
            } 
        }
        fetchData();
    }, [])
    
    
    return (
        <>
            <pre>{JSON.stringify(users, null, 2)}</pre>
        </>
    )
}

export default Users;