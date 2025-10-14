import './billingInfo.css'

const BillingInfoCard = ({ totalHoursWorked, salary }) => {

    return(
        <>
            <div className='billing-this-month-card card-section'>
                <h3>Billed this month</h3>
                <div className='billing-this-month-content'>
                    <label htmlFor='total-hours-month'>Total hours this month</label>
                    <input
                        className='accumulated-hours'
                        type='number'
                        value={totalHoursWorked}  
                        readOnly
                    />

                    <label htmlFor="total-comp-month">Total compensation for this month</label>
                    <input  
                        className='accumulated-pay'
                        type='number'
                        value={Math.round((salary/1750)*totalHoursWorked)}
                        readOnly
                    />
                </div>
            </div>
        </>
    )
}

export default BillingInfoCard;