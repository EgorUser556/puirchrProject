import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TOPICS from '../data/questions';

export default function TestPage(){
    const { topicId, testId } = useParams();
    const nav = useNavigate();


    const topic = TOPICS.find(t=> String(t.id) === String(topicId));
    const test = topic?.tests.find(x=> String(x.id) === String(testId));
    const questions = test?.questions || [];


    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [current, setCurrent] = useState(0);


    useEffect(()=>{
        window.scrollTo({top:0, behavior:'smooth'});
    },[current]);
    const handleSelect = (idx, val)=>{
        const next = [...answers]; next[idx]=val; setAnswers(next);
    }


    const progress = Math.round((answers.filter(Boolean).length / questions.length) * 100);

    const canGoNext = answers[current] !== null;

    const handleNext = () => {
        if (!canGoNext) return; // можно ещё показывать сообщение об ошибке
        setCurrent((c) => Math.min(c + 1, questions.length - 1));
    };

    const handlePrev = () => {
        setCurrent((c) => Math.max(c - 1, 0));
    };

    const handleSubmit = ()=>{
        if (answers.some(a => a === null)) {

            return;
        }
        const numeric = answers.map(a=>a||0);
        const sum = numeric.reduce((s,v)=>s+v,0);
        const avg = numeric.length? (sum / numeric.filter(Boolean).length) : 0;
        const payload = { topicId, testId, answers: numeric, average: avg };
        localStorage.setItem('lastResult', JSON.stringify({payload, topicTitle: topic.title, testTitle: test.title}));
        nav('/result');
    }
    if(!topic || !test) return <div>Тест не найден</div>;


    return (
        <div>
            <button className="btn ghost" onClick={()=>nav('/select')}>Назад к выбору</button>
            <h2 style={{marginTop:12}}>{topic.title} — {test.title}</h2>


            <div className="test-wrap">
                <div className="questions">
                    <div className="progress"><span style={{width:`${progress}%`}}></span></div>


                    <div className="question-card">
                        <div style={{fontWeight:700}}>Вопрос {current+1} из {questions.length}</div>
                        <div className="small" style={{marginTop:6}}>{questions[current]}</div>
                        <div className="likert" style={{marginTop:12}}>
                            {[1,2,3,4,5].map(n=> (
                                <button key={n} className={answers[current]===n? 'selected':''} onClick={()=>handleSelect(current,n)}>
                                    {n}
                                </button>
                            ))}
                        </div>
                    </div>


                    <div style={{display:'flex', gap:10, marginTop:8}}>
                        <button className="btn ghost" onClick={()=>setCurrent(Math.max(0,current-1))} disabled={current===0}>Назад</button>
                        {current < questions.length-1 ? (
                            <button className="btn" onClick={()=>setCurrent(Math.min(questions.length-1, current+1))} disabled={!canGoNext}>Далее</button>
                        ) : (
                            <button className="btn" onClick={handleSubmit} disabled={!canGoNext}>Завершить и посмотреть результат</button>
                        )}
                        <div style={{marginLeft:'auto', alignSelf:'center'}} className="small">Заполнено: {answers.filter(Boolean).length}/{questions.length}</div>
                    </div>
                </div>


                <aside style={{width:260}}>
                    <div style={{padding:12, borderRadius:10, border:'1px solid rgba(0,0,0,0.04)'}}>
                        <div style={{fontWeight:700}}>Инструкция</div>
                        <div className="small" style={{marginTop:8}}>Оцените каждый пункт по шкале от 1 (совсем не согласен) до 5 (полностью согласен). Средний балл поможет понять уровень компетенции по теме.</div>
                    </div>


                    <div style={{height:16}}></div>


                    <div style={{padding:12, borderRadius:10, border:'1px solid rgba(0,0,0,0.04)'}}>
                        <div style={{fontWeight:700}}>Сравнение</div>
                        <div className="small" style={{marginTop:8}}>Средний по тесту отображается на итоговой странице вместе с графиками.</div>
                    </div>
                </aside>
            </div>
        </div>
    );
}