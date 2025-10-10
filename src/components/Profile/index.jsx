import { useNavigate } from 'react-router-dom';
import './profile.css'

export const Header = () => {
  const navigate = useNavigate()

    return (
        <>
            <header className="site-header">
                <div className="container header-inner">
                <div className="brand">SAP 2.0</div>

                <nav className="main-nav" aria-label="Main navigation">
                    <a href="/home" className="nav-link">Home</a>
                    <a href="/about" className="nav-link">About</a>
                    <a href="/profile" className="nav-link active">Profile</a>
                </nav>

                <div className="header-actions">
                    <button
                        className="search-btn"
                        aria-label="Open search"
                        type="button"
                        onClick={() => navigate('/login')}
                        >
                    Log out
                    </button>
                </div>
                </div>
            </header>
        </>
    );
}

export const Footer = () => {
    return (
        <>
            <footer className="site-footer">
                <div className="container footer-inner">
                    <div className="footer-left">
                        <button className="icon-btn" aria-label="Settings">⚙️</button>
                        <a className="icon-link" href="https://facebook.com" aria-label="Facebook">f</a>
                        <a className="icon-link" href="https://instagram.com" aria-label="Instagram">ig</a>
                    </div>

                    <div className="footer-right">
                        <a className="footer-contact" href={`mailto: help@experis.com`}>{'help@experis.com'}</a>
                        <span className="footer-contact">{'40404040'}</span>
                    </div>
                </div>
            </footer>
        </>
    );
}

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