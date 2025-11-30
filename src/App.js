import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './components/Home.jsx';
import TestSelection from './components/TestSelection';
import TestPage from './components/TestPage.jsx';
import ResultPage from './components/ResultPage.jsx';


export default function App() {
    return (
        <div className="app-root">
            <Header />
            <main className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/select" element={<TestSelection />} />
                    <Route path="/test/:topicId/:testId" element={<TestPage />} />
                    <Route path="/result" element={<ResultPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}