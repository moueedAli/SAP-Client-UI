import './timesheetDays.css'
import { Link } from 'react-router-dom'

const TimesheetDays = ({ days }) => {

    return (
        <div className="timesheet" role="table" aria-label="Timesheet">
            <div className="header">
                <p className="col billing">Billing number</p>
                <p className="col activity">Number of activities</p>
                <p className="col date">Date</p>
                <p className="col total">Total hours</p>
                <p className='col view-moew'>View more information</p>
            </div>

            <div className="body" role="rowgroup">
                {days?.map((e, i) => (
                    <div className="row" role="row" key={e.id ?? i}>
                        <p>{`Billing number #${e.id}`}</p>
                        <p className="col activity" role="cell">{`${e.time_entries.length} activities saved this day`}</p>
                        <p className="col date" role="cell">{e.date}</p>
                        <p className="col total" role="cell">{e.total_hours}</p>
                        <Link to={"/activities/:id"}>View activities</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TimesheetDays;
