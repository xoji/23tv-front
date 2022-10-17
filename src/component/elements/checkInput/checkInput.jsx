import { useEffect, useState, useRef } from 'react'
import st from './checkInput.module.css'
import checked from '../../../assets/image/checked.png'
import checkedDark from '../../../assets/image/checkedDark.png'
import { useTheme } from '../../../context/theme'

export default function CheckInput({name,value, children, onChange}) {
    const id = `${Math.random()}_${name}_${value}_${children}`
    const radioInput = useRef()
    const [isChecked, setIsChecked] = useState(false)
    useEffect(()=>{
        setIsChecked(radioInput.current.value)
    }, [isChecked])
    const [dark] = useTheme()
    return (
        <div className={`${st.item } ${dark ? st.dark : st.light}`}>
            <div className={st.checked}><img src={ dark ? checked : checkedDark} alt="" /></div>
            <input ref={radioInput} id={id} onChange={(e)=>{onChange(children, e)}} value={value} name={name} type="checkbox" /> <label htmlFor={id}>{children}</label>
        </div>
    )
}
