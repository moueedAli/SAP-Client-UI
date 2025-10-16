import './footer.css'
import FacebookIcon from '../../icons/facebook-icon';

const Footer = () => {
    return (
        <>
            <footer className="site-footer">
                <div className="container footer-inner">
                    <div className="footer-left">
                        <button className="icon-btn" aria-label="Settings">⚙️</button>
                        <a className="icon-link" href="https://facebook.com" aria-label="Facebook">Facebook</a>
                        <a className="icon-link" href="https://instagram.com" aria-label="Instagram">Instagram</a>
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

export default Footer;