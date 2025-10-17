import './timesheetDays.css'
import { Link } from 'react-router-dom'

const TimesheetDays = ({ days, onDelete }) => {
    return (
        <div className="days-timesheet" role="table" aria-label="Timesheet">
            <div className="days-header">
                <p className="days-col days-billing">Billing number</p>
                <p className="days-col days-activity">Number of activities</p>
                <p className="days-col days-date">Date</p>
                <p className="days-col days-total">Total hours</p>
                <p className="days-col days-view-more">View more information</p>
                <p className="days-col days-delete">Delete</p>
            </div>

            <div className="days-body" role="rowgroup">
                {days?.map((e, i) => (
                    <div className="days-row" role="row" key={e.id ?? i}>
                        <p className="days-col days-billing-number">{`Billing number #${e.id}`}</p>
                        <p className="days-col days-activity" role="cell">{`${e.time_entries.length} activities saved this day`}</p>
                        <p className="days-col days-date" role="cell">{e.date}</p>
                        <p className="days-col days-total" role="cell">{e.total_hours}</p>
                        <Link to={`/activities/day/${e.id}`} className="days-link">View activities</Link>
                        <span
                            className="days-link-like"
                            onClick={() => onDelete(e.id)}
                        >
                            Delete
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TimesheetDays;