import { useState } from 'react'
import st from './inputProfile.module.css'
import showIcon from '../../../assets/image/showHide.png'
import showPassword from '../../../assets/image/showPassword.png'
import { useTheme } from '../../../context/theme'

export default function InputProfile({
    style,
    onKeyUp,
    label,
    value,
    placeHolder = "",
    reference,
    disabled = false,
    type='text',
    isPass=false,
    isCorrect=true
}) {
    const [dark] = useTheme()
    const [isPasswordField, setIsPasswordField] = useState(type)
    const rand =`${Math.random()}_field` 

    return (
        <div style={style} className={st.container}>
            <label className={st.title} htmlFor={rand}>{label}</label>
            
            <div style={{position:'relative'}}>
                <input onKeyUp={onKeyUp}
                disabled={disabled}
                placeholder={placeHolder}
                style={{
                    color: isCorrect ?(dark ? '' : '#666666') : '#D7141D',
                    background:isCorrect ? 
                    (dark ? '' : 'rgba(119, 119, 119, 0.06)') : 'rgba(215, 20, 29, 0.06)'
                }}
                
                type={isPasswordField}
                ref={reference}
                className={st.input}
                id={rand} />

                {isPass ? (<div
                onClick={()=>{setIsPasswordField(x => x === 'password' ? 'text' : 'password')}}
                className={st.eye}>{isPasswordField==='password' ?  <img
                src={showPassword}
                alt=""/> : <img
                src={showIcon}
                alt=""/>}</div>)
                 :''}
            </div>            
        </div>
    )
}
