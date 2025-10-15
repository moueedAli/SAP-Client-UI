import { useNavigate } from "react-router-dom";
import './header.css'

const Header = () => {
    const navigate = useNavigate()

    return (
        <>
            <header className="site-header">
                <div className="container header-inner">
                    <div className="brand">SAP 2.0</div>

                    <nav className="main-nav" aria-label="Main navigation">
                        <a href="/home" className="nav-link">Home</a>
                        <a href="/profile" className="nav-link ">Profile</a>
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

export default Header;