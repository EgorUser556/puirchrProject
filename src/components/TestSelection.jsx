import React from 'react';
import { useNavigate } from 'react-router-dom';
import TOPICS from '../data/questions';


export default function TestSelection(){
    const nav = useNavigate();
    return (
        <div>
            <h2>Выберите тему теста</h2>
            <div className="selection">
                {TOPICS.map((topic)=> (
                    <div key={topic.id} className="topic-row">
                        <div>
                            <div style={{fontWeight:700}}>{topic.title}</div>
                            <div className="small">Выберите один из трёх тестов — каждый тест содержит 11 вопросов.</div>
                        </div>
                        <div className="tests">
                            {topic.tests.map(t=> (
                                <button
                                    key={t.id}
                                    className="test-chip"
                                    onClick={()=>nav(`/test/${topic.id}/${t.id}`)}
                                >
                                    {t.title}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}