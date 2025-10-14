import './profile.css'
import Header from '../Header';
import Footer from '../Footer';

const Profile = ({ user }) => {

    if(!user) {
        return <div>Loading profile..</div>
    }

    return (
        <>
            <Header />
            <div className="profile-page">

                <main className="profile-card">
                    <section className="profile-info-card">
                        <h3>Welcome, {user.first_name} {user.last_name}</h3>

                        <div className="profile-personal-info">
                            <div className="form-group first-name-input">
                                <label htmlFor="first_name">First name</label>
                                <input id="first_name" type="text" value={user.first_name} readOnly />
                            </div>

                            <div className="form-group last-name-input">
                                <label htmlFor="last_name">Last name</label>
                                <input id="last_name" type="text" value={user.last_name} readOnly />
                            </div>

                            <div className="form-group email-input">
                                <label htmlFor="email">Email</label>
                                <input id="email" type="email" value={user.email} readOnly />
                            </div>

                            <div className="form-group mobile-input">
                                <label htmlFor="mobile">Mobile number</label>
                                <input id="mobile" type="tel" value={user.mobile} readOnly />
                            </div>
                        </div>

                        <div className="profile-billing-info">
                            <div className="form-group hours-this-month">
                                <label htmlFor="hours_month">Total hours billed this month</label>
                                <input id="hours_month" type="number" value={0} readOnly />
                            </div>

                            <div className="form-group compensation">
                                <label htmlFor="compensation">Total compensation</label>
                                <input id="compensation" type="number" value={0} readOnly />
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
