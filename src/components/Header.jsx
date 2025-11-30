import React from 'react';
import { Link } from 'react-router-dom';


export default function Header(){
    return (
        <header className="header">
            <div className="brand">
                <div className="logo" aria-hidden>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect x="3" y="4" width="14" height="14" rx="1.5" fill="white" opacity="0.06" />
                        <path d="M5 5h11v13H5z" stroke="white" strokeOpacity="0.25" />
                        <path d="M7 7h7v1H7z" fill="white" />
                    </svg>
                </div>
                <div>
                    <div className="site-title">ТестКнижка</div>
                    <div className="small">онлайн‑тестирование HR и лидерства</div>
                </div>
            </div>


            <nav className="nav">
                <Link to="/" className="btn ghost">Главная</Link>
                <Link to="/select" className="btn">Начать тест</Link>
            </nav>
        </header>
    );
}