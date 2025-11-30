import React from 'react';


export default function Footer(){
    return (
        <footer className="footer">
            © {new Date().getFullYear()} ТестКнижка — оценка компетенций: делегирование, подбор, адаптация, мотивация и др.
        </footer>
    );
}