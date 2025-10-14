import './timesheet.css'
import { Link } from 'react-router-dom'

const TimesheetDays = ({ entries, activities }) => {

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
                {entries?.map((e, i) => (
                    <div className="row" role="row" key={e.id ?? i}>
                        <p className="col date" role="cell">{e.date}</p>
                        <p className="col activity" role="cell">{`Number of activities for this day ${activities}`}</p>
                        <p className="col total" role="cell">{e.total_hours}</p>
                        <Link to={"/activities/:id"}>Click here to view all activities for this day</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TimesheetDays;
