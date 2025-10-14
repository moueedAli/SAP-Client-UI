import './addHours.css'

const AddHours = ({ selectedActivity, setSelectedActivity, activities, date, setDate, startTime, setStartTime, endTime, setEndTime }) => {

    return (
        <>
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
        </>
    )
}

export default AddHours;