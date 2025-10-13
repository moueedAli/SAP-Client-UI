import './timesheet.css'

const Timesheet = ({ entries, activities }) => {

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
                <p className='col billing' role='cell'>{`Billing number #${e.id}`}</p>
                <p className="col activity" role="cell">{activities[e.activity_id-1].name}</p>
                <p className="col date" role="cell">{e.date}</p>
                <p className="col start" role="cell">{e.start_time}</p>
                <p className="col end" role="cell">{e.end_time}</p>
                <p className="col total" role="cell">{e.total_hours}</p>
              </div>
            ))}
          </div>
        </div>
    );
}

export default Timesheet;
