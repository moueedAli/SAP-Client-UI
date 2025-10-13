import { useEffect, useState } from "react";
import { API_URL } from "../../service/constant";

const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_URL}/users`)
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
