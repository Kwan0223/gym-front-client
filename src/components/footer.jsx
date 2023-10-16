import React from 'react';
import '../css/Footer.css';


const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-links">
                    <a href="/terms">이용약관</a>
                    <a href="/privacy">개인정보 처리방침</a>
                    <a href="/about">회사 정보</a>
                </div>
                <div className="footer-info">
                    <p>© 2023 회사명. 모든 권리 보유.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
