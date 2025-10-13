import './home.css'
import { Header, Footer } from '../Profile';
import AddIcon from '../../icons/add-icon';
import { act, useEffect, useState } from 'react';
import { API_URL } from '../../service/constant';
import Timesheet from '../Timesheet';

const Home = () => {
    const [selectedActivity, setSelectedActivity] = useState("");
    const [activities, setActivities] = useState([]);
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [billingCode, setBillingCode] = useState(null);
    const [salary, setSalary] = useState(0);

    const [userId, setUserId] = useState(null);
    const [entries, setEntries] = useState([]);
    
    /*henter brukerdata fra localstorage */
    useEffect(() => {
      const userObj = localStorage.getItem("user");
      if (userObj) {
        try {
          const token = JSON.parse(userObj);
          setUserId(token.id);
          setBillingCode(token.billing_code_id);
        } catch (err) {
          console.error("Failed to parse user object:", err);
        }
      } else {
        console.warn("No userObj found for this user");
      }
    }, []);
  
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
  
    /*henter alle time entries gitt en brukerid */
    useEffect(() => {
      if (!userId) return;
  
      const fetchTimeEntries = async () => {
        try {
          const response = await fetch(`${API_URL}/users/entries/${userId}`);
          const data = await response.json();
          setEntries(data);
        } catch (err) {
          console.error("Failed to fetch time entries:", err);
        }
      };
  
      fetchTimeEntries();
    }, [activities, userId]);
  
    const addNewTimeEntry = async (e) => {
        e.preventDefault()

        const payload = {
            userId, 
            selectedActivity,
            date,
            startTime,
            endTime,
        }

        try {
            const res = await fetch(`console.log("Fetched data:", data)`, {
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

        } catch (err) {
            console.error("Failed to fetch billing info:", err)
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
                            <button type='button' className="btn">FAQ</button>
                        </div>
                    </div>

                    <div className='billing-cards-first-half'>
                        <div className='billing-this-month-card card-section'>
                            <h3>Billed this month</h3>
                            <div className='billing-this-month-content'>
                                <label htmlFor='total-hours-month'>Total hours this month</label>
                                <input
                                    className='accumulated-hours'
                                    type='number'
                                    value={72.5}
                                    readOnly
                                />

                                <label htmlFor="total-comp-month">Total compensation for this month</label>
                                <input  
                                    className='accumulated-pay'
                                    type='number'
                                    value={Math.round((salary/1800)*72.5)}
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className='add-new-hours-card card-section'>
                            <h3>Add new hours</h3>
                            <div className='add-hours-inputfields'>
                                <div className='select-activity-field'>
                                    <label>Select an activity*</label>
                                    <select
                                        id="activity-select"
                                        className="dropdown-activity"
                                        value={selectedActivity}
                                        onChange={(event) => setSelectedActivity(event.target.value)}
                                    >
                                        {activities.map((a,key)=>
                                        <option key={key} value={a.name}> {a.name} </option>)}
                                    </select>
                                </div>

                                <div className='select-date-field'>
                                    <label>Select a date*</label>
                                    <input
                                        id="date-native"
                                        type="date"
                                        value={date}
                                        onChange={(event) => setDate(event.target.value)}
                                        className="date-input"
                                    />
                                </div>

                                <div className='add-start-time'>
                                    <label>Select time when started*</label>
                                    <input
                                        id='time-native'
                                        type='time'
                                        value={startTime}
                                        onChange={(event) => setStartTime(event.target.value)}
                                        step="1"
                                        className='time-input'
                                    />
                                </div>

                                <div className='add-end-time'>
                                    <label>Select time when ended*</label>
                                    <input
                                        id='time-native'
                                        type='time'
                                        value={endTime}
                                        onChange={(event) => setEndTime(event.target.value)}
                                        step="1"
                                        className='time-input'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='history-card card-section'>
                        <div className='billing-history'>
                            <h3>History</h3>
                            <div className='history-card-content'>
                                <div className='history-card-content-header'>             
                                   <Timesheet entries={entries} activities={activities}/>
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
