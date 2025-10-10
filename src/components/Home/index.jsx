import './home.css'
import { Header, Footer } from '../Profile';
import AddIcon from '../../icons/add-icon';
import { useState } from 'react';

const Home = () => {
    const [selectedValue, setSelectedValue] = useState("option1"); /* startverdi i usestate må ha en av option verdiene for å vise valg umiddelbart*/ 
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("")

    const handleActivityChange = (e) => {
        setSelectedValue(e.target.value);
    };

    const handleDateChange = (e) => {
        setDate(e.taget.value)
    }

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value)
    }

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value)
    } 

    /* ta med richard neste møte om hvilke data som sendes
    const [newTimeEntry, setNewTimeEntry] = useState({
        
    })*/

    /*husk å legge til ekte data når databasen er opp */


    
    return (
        <>
        <Header />
            <main className="billing-page">
                <section className="billing-card">
                    <div className='billing-page-header'>
                        <h1>Your billing information</h1>
                        <div className='btn-group'>
                            <button type='button' className="btn">Submit new hours</button>
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
                                        value={selectedValue}
                                        onChange={handleActivityChange}
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
                                        onChange={handleDateChange}
                                        className="date-input"
                                    />
                                </div>

                                <div className='add-start-time'>
                                    <label>Select time when started*</label>
                                    <input
                                        id='time-native'
                                        type='time'
                                        value={startTime}
                                        onChange={handleStartTimeChange}
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
                                        onChange={handleEndTimeChange}
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
                            
                        </div>
                    </div>
                </section>
            </main>
        <Footer />
        </>
    )
}

export default Home;
