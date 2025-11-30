import React from 'react';
import { useNavigate } from 'react-router-dom';
import TOPICS from '../data/questions';


export default function Home(){
    const nav = useNavigate();
    return (
        <div>
            <section className="hero">
                <div className="hero-left">
                    <h1>Проверяйте навыки сотрудников быстро и удобно</h1>
                    <p>Короткие HR‑тесты по ключевым темам: делегирование, подбор, адаптация, мотивация, компенсации и создание команд. Каждый тест — шкала Лайкерта (1–5). По завершении — интерактивная визуализация результатов.</p>
                    <div style={{display:'flex', gap:12}}>
                        <button className="btn" onClick={()=>nav('/select')}>Начать тестирование</button>
                    </div>
                </div>
                <div style={{width:320}}>
                    <div style={{padding:18, borderRadius:12, border:'1px solid #f4f4f4'}}>
                        <h3 style={{marginTop:0}}>Как это работает</h3>
                        <ol style={{margin:'8px 0 0 18px', color:'#666'}}>
                            <li>Выберите тему</li>
                            <li>Пройдите тест (10–13 вопросов)</li>
                            <li>Просмотрите результаты в интерактиве</li>
                        </ol>
                    </div>
                </div>
            </section>


            <section style={{marginTop:20}}>
                <h2>Темы тестов</h2>
                <div className="topics-wrap">
                    {TOPICS.map((t)=> (
                        <div key={t.id} className="topic-card" role="button">
                            <div className="topic-accent" aria-hidden></div>
                            <div className="topic-title">{t.title}</div>
                            <div className="topic-desc">3 теста • 11 вопросов в каждом • шкала Лайкерта</div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}