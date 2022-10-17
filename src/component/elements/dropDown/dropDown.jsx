import  { useEffect, useRef, useState } from 'react'
import st from './dropDown.module.css'

export default function DropDown({ children, activeText, style }) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef()
    const handleClick =(event)=>{
        if(containerRef && containerRef!==null && containerRef!==undefined) {
            if(!containerRef.current.contains(event.target))
            setIsOpen(false)
        }
    }
    const ItemsStyle = {
        visibility:isOpen ? 'visible':'hidden',
        transition:'all .5s ease-in-out',
        opacity:isOpen ? 1: 0,
    }
    useEffect(()=>{
        document.addEventListener( 'mousedown',handleClick)
        return ()=>{
            document.removeEventListener('mousedown', handleClick)
        }
    }, [])
    return (
        <div  className={st.dropdown}>
            <div ref={containerRef} onClick={()=>setIsOpen(!isOpen)} className={st.itemOne}> 
                {activeText} 
                <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L7 7L13 1" stroke="#D7141D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div style={{...ItemsStyle, ...style}} className={st.items}>
                {children}
                <div className={st.overlay}></div>
            </div>
        </div>
    )
}
