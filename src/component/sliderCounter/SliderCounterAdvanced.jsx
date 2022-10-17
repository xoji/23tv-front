import st from './sliderCounter.module.css'

export default function SliderCounterAdvanced({max, current, setCurrent, buttonNextStyle, buttonPrevStyle, mode}) {
    
    const next = () => setCurrent(x=>++x)
    const empty=() => {}
    const prev = () => setCurrent(x=>--x)

    const fake = new Array(max) 
    fake.fill(3)

    return (
        <>
                <div
                onClick={current>=1 ? prev : empty}
                style={buttonPrevStyle}
                className={`${st.advTopPrev} ${st.prev} ${current===0 ? st.minMaxBack : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>

                <div className={st.buttons} style={{background: mode ? '#111112' : 'rgba(17,17,18, 0.2)'}}>
                    {
                    fake.map((_, key)=> <div
                    key={key}
                    onClick={()=>{setCurrent(key)}}
                    className={`${st.box} ${key===current ? st.active : ''}`}></div>)
                    }
                </div>



                <div
                onClick={current<max-1 ? next : empty}
                style={buttonNextStyle}
                className={`${st.advTopNext} ${st.next} ${current===max-1 ? st.minMaxBack : ''}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
        </>
    )
}
