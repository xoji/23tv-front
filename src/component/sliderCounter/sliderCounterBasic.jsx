import st from './sliderCounter.module.css'
export default function SliderCounterBasic({ max = 1, current,  infinite = false, navigationNextRef, navigationPrevRef }) {
    
   
    
    const fake = new Array(max) 
    fake.fill(3)

    return (
        <>
            <div
            ref={navigationPrevRef}
            
            className={`${st.prev} ${current===0 && !infinite ? st.minMaxBack:''}`}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

            </div>
            <div className={st.buttons}>
                {
                fake.map((item, key)=> <div
                key={key}
                className={`${st.box} ${key===current ? st.active : ''}`}></div>)
                }
            </div>
            <div
            ref={navigationNextRef}
            className={`${st.next} ${current===max-1 &&  !infinite ? st.minMaxBack : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>








            {/* <div onClick={current>=1 ? prev : empty}  className={`${st.prev} ${current===0 && !infinite ? st.minMaxBack:''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 6L9 12L15 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                </div>
                <div className={st.buttons}>
                   
                  {fake.map((item, key)=>{
                    return <div key={key} onClick={()=>{setCurrent(key)}} className={`${st.box}  ${key===current ? st.active : ''}`}></div>
                  })}
              </div>
                <div onClick={current<max-1 ? next : empty} className={`${st.next} ${current===max-1 &&  !infinite ? st.minMaxBack : ''}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                </div> */}
        </>
    )
}
