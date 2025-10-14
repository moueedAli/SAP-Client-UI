import './home.css'
import { useEffect, useState } from 'react';
import { API_URL } from '../../service/constant';
import BillingInfoCard from '../BillingInfo';
import AddHours from '../AddHours';
import Header from '../Header';
import Footer from '../Footer';
import TimesheetDays from '../TimesheetDays';

const Home = ({ user }) => {
    const [selectedActivity, setSelectedActivity] = useState("");
    const [activities, setActivities] = useState([]);
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [billingCode, setBillingCode] = useState(null);
    const [salary, setSalary] = useState(0);
    const [days, setDays] = useState([]);

    const [userId, setUserId] = useState(null);

    const [dummyNumber, setDummyNumber] = useState(0)
    
    /*henter brukerdata fra localstorage */
    useEffect(() => {
        if (user) {
            try {
                setUserId(user.id);
                setBillingCode(user.billing_code_id);
            } catch (err) {
                console.error("Failed to parse user object:", err);
            }
        } else {
            console.warn("No userObj found for this user");
        }
    }, [user]);

    /*henter informasjon om lønn gitt billing_code_id */
    useEffect(() => {
        const fetchBillingObject = async () => {
            if (!billingCode) return;

            try {
                const response = await fetch(`${API_URL}/billingcodes/${billingCode}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setSalary(data.salary);
            } catch (err) {
                console.error("Failed to fetch billing info:", err);
            }
        };

        fetchBillingObject();
    }, [billingCode]);

    /*henter alle aktiviteter og lagrer i activites (dropdown meny) */
    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await fetch(`${API_URL}/activities`);
                const jsonData = await response.json();
                setActivities(jsonData);
                if (jsonData.length > 0) {
                    setSelectedActivity(jsonData[0].name);
                }
            } catch (err) {
                console.error("Failed to fetch activities:", err);
            }
        };
        fetchActivities();
    }, []);

    /*henter alle dager for en gitt brukerid */
    useEffect(() => {
        const fetchTimeEntries = async () => {
            if (userId) {
                try {
                    const response = await fetch(`${API_URL}/days/${userId}`);
                    const data = await response.json();
                    setDays(data);
                } catch (err) {
                    console.error("Failed to fetch time entries:", err);
                }
            } else {
                return;
            }
        };
        fetchTimeEntries();
    }, [userId,dummyNumber]);

    const addNewTimeEntry = async (e) => {
        e.preventDefault()
        const acitivity = activities.find(e=>e.name === selectedActivity)

        const payload = {
            user_id: userId, 
            activity_id: acitivity.id,
            date: date,
            start_time: startTime,
            end_time: endTime,
        }

        try {
            const res = await fetch(`${API_URL}/timeEntry`, {
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

            setDummyNumber(dummyNumber+1)

        } catch (err) {
            console.error("Failed to  add entry  info:", err)
        }   
    }

    return (
        <>
            <Header />
            <main className="billing-page">
                <section className="billing-card">
                    <div className='billing-page-header'>
                        <h1>Your billing information</h1>
                        <div className='btn-group'>
                            <button type='button' className="btn" onClick={addNewTimeEntry}>Submit new hours</button>
                        </div>
                    </div>

                    <div className='billing-cards-first-half'>
                        <BillingInfoCard totalHoursWorked={2} salary={salary}/>

                        <div className='add-new-hours-card card-section'>
                            <AddHours 
                                selectedActivity={selectedActivity}
                                setSelectedActivity={setSelectedActivity}
                                activities={activities}
                                date={date}
                                setDate={setDate}
                                startTime={startTime}
                                setStartTime={setStartTime}
                                endTime={endTime}
                                setEndTime={setEndTime}
                            />
                        </div>
                    </div>

                    <div className='history-card card-section'>
                        <div className='billing-history'>
                            <h3>History</h3>
                            <div className='history-card-content'>
                                <div className='history-card-content-header'>  
                                    <TimesheetDays days={days} />           
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

export default Home

/*    const totalHoursWorked = (days ?? []).reduce((sum, entry) => sum + entry.total_hours, 0);
*/

/*
 */