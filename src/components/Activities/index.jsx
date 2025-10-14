import { useEffect, useState } from "react";
import { API_URL } from "../../service/constant";
import './activities.css'
import Timesheet from "../Timesheet";
import Header from "../Header";
import Footer from "../Footer";

const Activities = ({ user }) => {
    const [activities, setActivities] = useState([]);
    const [entries, setEntries] = useState([]);
    const [userId, setUserId] = useState(null);

    /*henter brukerdata fra localstorage */
    useEffect(() => {
        if (user) {
            try {
                setUserId(user.id);
            } catch (err) {
                console.error("Failed to parse user object:", err);
            }
        } else {
            console.warn("No userObj found for this user");
        }
    }, [user]);

    /*henter alle aktiviteter og lagrer i activites (dropdown meny) */
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(`${API_URL}/activities`);
                const jsonData = await response.json();
                setActivities(jsonData);
            } catch (err) {
                console.error("Failed to fetch activities:", err);
            }
        };
        fetchActivities();
    }, []);

    /*henter alle aktiviteter gitt en dag */
    useEffect(() => {
        const fetchTimeEntries = async () => {
            if (userId) {
                try {
                    const response = await fetch(`${API_URL}/days/${userId}`);
                    const data = await response.json();
                    setEntries(data);
                } catch (err) {
                    console.error("Failed to fetch time entries:", err);
                }
            } else {
                return;
            }
        };
        fetchTimeEntries();
    }, [userId])

    console.log(entries)

    return (
        <>
        <Header />
        <main className="billing-page">
            <section className="billing-card">
                <div className='billing-page-header'>
                    <h1>Your registered activities for the day</h1>
                </div>

                <div className='history-card card-section'>
                    <div className='billing-history'>
                        <h3>History</h3>
                        <div className='history-card-content'>
                            <div className='history-card-content-header'> 
                                <Timesheet entries={entries} activities={activities} />
                            </div>       
                        </div>
                    </div>                            
                </div>
            </section>
        </main>
        <Footer />
        </>
    )
}

export default Activities;