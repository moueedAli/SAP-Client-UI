import { useState } from "react";
import { API_URL } from "../../service/constant";
import Timesheet from "../Timesheet";
import Header from "../Header";
import Footer from "../Footer";

const Activities = ({ user }) => {
    const [activities, setActivities] = useState([]);
    const [entries, setEntries] = useState([]);

    return (
        <>
        <Header />
        <main className="billing-page">
            <section className="billing-card">
                <div className='billing-page-header'>
                    <h1>Your billing information</h1>
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

export default Activities;