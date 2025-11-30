import React, { useEffect, useState, useRef } from 'react';


export default function ResultPage(){
    const [data, setData] = useState(null);
    const [rot, setRot] = useState({x:-20,y:25});
    const cubeRef = useRef(null);
    const drag = useRef({down:false, startX:0, startY:0, rotX:-20, rotY:25});

    useEffect(()=>{
        const raw = localStorage.getItem('lastResult');
        if(raw) setData(JSON.parse(raw));
        let frame;
            const animate = () => {
                if (!drag.current.down) {
                    setRot(r => ({ x: r.x, y: r.y + 0.15 })); // медленное авто-вращение
                }
                frame = requestAnimationFrame(animate);
            };
            frame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(frame);
    },[]);

    useEffect(()=>{
        const el = cubeRef.current;
        if(!el) return;
        const onDown = (e)=>{
            drag.current.down = true;
            drag.current.startX = e.clientX;
            drag.current.startY = e.clientY;
            drag.current.rotX = rot.x;
            drag.current.rotY = rot.y;
        };
        const onUp = ()=>{
            drag.current.down=false;
        };
        const onMove = (e)=>{
            if(!drag.current.down) return;
            const dx = e.clientX - drag.current.startX;
            const dy = e.clientY - drag.current.startY;
            setRot({ x: drag.current.rotX - dy*0.2, y: drag.current.rotY + dx*0.2 });
        };
        el.addEventListener('mousedown', onDown);
        window.addEventListener('mouseup', onUp);
        window.addEventListener('mousemove', onMove);
        return ()=>{
            el.removeEventListener('mousedown', onDown);
            window.removeEventListener('mouseup', onUp);
            window.removeEventListener('mousemove', onMove);
        }
    },[rot]);

    if(!data) return <div>Результат не найден — пройдите тест.</div>;


    const answers = data.payload.answers.map(v=>Number(v)||0);
    const answeredCount = answers.filter(Boolean).length;
    const avg = answeredCount? Math.round((answers.reduce((s,a)=>s+a,0) / answeredCount) * 10)/10 : 0;


// разбиваем по градациям для простого графика
    const buckets = [0,0,0,0,0];
    answers.forEach(v=>{ if(v>=1 && v<=5) buckets[v-1]++; });


    const rotateTo = (x,y)=> setRot({x,y});

    return (
        <div>
            <button className="btn ghost" onClick={()=>window.history.back()}>Вернуться к тестам</button>
            <h2 style={{marginTop:12}}>Результаты — {data.topicTitle} / {data.testTitle}</h2>


            <div className="result-wrap">
                <div className="controls">
                    <div style={{fontWeight:700}}>Управление кубом</div>
                    <button className="test-chip" onClick={()=>rotateTo(-20,25)}>Показать фронт</button>
                    <button className="test-chip" onClick={()=>rotateTo(0,180)}>Задняя грань</button>
                    <button className="test-chip" onClick={()=>rotateTo(90,0)}>Правая грань</button>
                    <button className="test-chip" onClick={()=>rotateTo(-90,0)}>Левая грань</button>
                    <div style={{height:12}}></div>
                    <div style={{fontWeight:700}}>Средний балл</div>
                    <div style={{fontSize:28, fontWeight:800}}>{avg}</div>
                    <div className="small">Оценок: {answeredCount}</div>
                </div>


        <div>
            <div className="cube-scene">
                <div ref={cubeRef} className="cube" style={{transform:`rotateX(${rot.x}deg) rotateY(${rot.y}deg)`}}>
                    <div className="cube-face front">{Math.round(avg*10)/10}</div>
                    <div className="cube-face back">Детали</div>
                    <div className="cube-face right">{buckets[4]}×5</div>
                    <div className="cube-face left">{buckets[0]}×1</div>
                    <div className="cube-face top">Визуализация</div>
                    <div className="cube-face bottom">Ещё</div>
                </div>
            </div>


            <div style={{display:'flex', gap:12, marginTop:6}}>
                <div className="chart">
                    <div style={{fontWeight:700}}>Распределение ответов</div>
                    <div style={{height:8}}></div>
                    {buckets.map((b,i)=> (
                        <div key={i} style={{display:'flex', alignItems:'center', gap:8, marginTop:8}}>
                            <div style={{width:36}} className="small">{i+1}</div>
                            <div style={{flex:1, background:'#f3f3f3', height:14, borderRadius:8}}>
                                <div className="bar" style={{width:`${Math.round((b/answers.length||0)*100)}%`}}></div>
                            </div>
                            <div style={{width:36, textAlign:'right'}} className="small">{b}</div>
                        </div>
                    ))}
                </div>


                <div className="chart">
                    <div style={{fontWeight:700}}>Доп. шкалы</div>
                    <div style={{height:8}}></div>
                    <div className="small">Понимание — {( (answers.reduce((s,a,i)=>s+a*(5-i),0) / (answers.length*5||1) )*100).toFixed(0)}%</div>
                    <div style={{height:8}}></div>
                    <div style={{background:'#f3f3f3', height:12, borderRadius:8, overflow:'hidden'}}>
                        <div className="bar" style={{width:`${Math.min(100,avg*20)}%`}}></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
);
}