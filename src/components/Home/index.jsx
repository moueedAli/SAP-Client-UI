import './home.css'
import { Header, Footer } from '../Profile';
import AddIcon from '../../icons/add-icon';
import { useEffect, useState } from 'react';
import { API_URL } from '../../service/constant';

export const Timesheet = ({ entries }) => {
    return (
        <div className="timesheet" role="table" aria-label="Timesheet">
           <div className="header">
                <p className="col billing">Billing number</p>
                <p className="col activity">Activity</p>
                <p className="col date">Date</p>
                <p className="col start">Start time</p>
                <p className="col end">End time</p>
                <p className="col total">Total hours</p>
            </div>
    
          <div className="body" role="rowgroup">
            {entries.map((e, i) => (
              <div className="row" role="row" key={e.id ?? i}>
                <p className="col billing" role="cell">{e.billing}</p>
                <p className="col activity" role="cell">{e.activity}</p>
                <p className="col date" role="cell">{e.date}</p>
                <p className="col start" role="cell">{e.start}</p>
                <p className="col end" role="cell">{e.end}</p>
                <p className="col total" role="cell">{e.total}</p>
              </div>
            ))}
          </div>
        </div>
    );
}

const Home = () => {
    const [selectedActivity, setSelectedActivity] = useState("option1"); /* startverdi i usestate må ha en av option verdiene for å vise valg umiddelbart*/ 
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("")
    const [userId, setUserId] = useState(null)
    const userObj = localStorage.getItem('user')
    const [entries, setEntries] = useState([
        { id: 1, billing: "#2023-2025", activity: "Produkt- og tjenesteutvikling (interprosjekt)",
          date: "10-09-2023", start: "07:30 UTC", end: "15:30 UTC", total: 8 },
        { id: 2, billing: "#2023-2025", activity: "Produkt- og tjenesteutvikling (interprosjekt)",
            date: "10-09-2023", start: "07:30 UTC", end: "14:30 UTC", total: 7 },
        { id: 3, billing: "#2023-2025", activity: "Produkt- og tjenesteutvikling (interprosjekt)",
            date: "10-09-2023", start: "10:30 UTC", end: "15:30 UTC", total: 5 }
    ]);
    const [billingCode, setBillingCode] = useState(null);
    const [salary, setSalary] = useState(null)
    const url = `${API_URL}/billingcodes/${billingCode}`;

    useEffect(() => {
        if (userObj) {
            try {
                const token = JSON.parse(userObj)
                setUserId(token.id)
                setBillingCode(token.billing_code_id)
            } catch (err) {
                console.error(err)
            }
        } else {
            console.warn('No userObj found for this user')
        }
    }, [userObj])
    
    const fetchBillingObject = async (e) => {
        e.preventDefault()
            
        if (!billingCode) return;
            
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }
                
            const data = await response.json()
            setSalary("data", data)

        } catch (err) {
            console.error("Failed to fetch billing info:", err)
        }
    }    

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

        } catch (err) {
            console.log(err)
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
                                    value={26734}
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
                                        <option value="option1">Option 1</option>
                                        <option value="option2">Option 2</option>
                                        <option value="option3">Option 3</option>
                                        <option value="option4">Option 4</option>
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
                                        onChange={(event) =>setEndTime(event.target.value)}
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
                                   <Timesheet entries={entries}/>
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

export default Home;
