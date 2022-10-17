import { useState, useRef } from 'react'
// import goBack from '../../../assets/image/goBack.png'
import st from './recover.module.css'
import InputProfile from '../../elements/inputProfile/inputProfile'
import Button from '../../elements/button/button'
import { useTheme } from '../../../context/theme'
import { useLogin } from '../../../context/login'
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage.jsx'

export default function Recovery() {
    const [dark] = useTheme()
    const [setLogin] = useLogin(true)
    const phoneRef = useRef()
    const passRef = useRef()
    const [error, setError] = useState({
        isError:false,
        message:null
    })
    const [ til ] = useLang()

    const handleOnChange = () => setError({isError:false, message:null})

    return (
        <div>
            <div className={st.navigation}>
                <img src={''} alt=""/>
            </div>
            <div className={st.title}>
                <div  style={{color:dark ? '' : 'black'}}>{Language[til].auth.login.recovery}</div>
            </div>
                <InputProfile onChange={handleOnChange} isCorrect={!error.isError} reference={phoneRef}  label={Language[til].auth.login.labelPhone}/>
                <InputProfile  onChange={handleOnChange}  isCorrect={!error.isError} reference={passRef} label={Language[til].auth.login.newLabelPassword} isPass={true} type='password'/>
            <div style={{color:'red'}}>{error.isError ? error.message  :' '}</div>
            <div onClick={()=>{
                if (passRef.current.value && phoneRef.current.value) {
                    setLogin((state)=>{
                        return {
                            ...state, 
                            user:{
                                newPassword: passRef.current.value,
                                phone: phoneRef.current.value
                            },
                            recovery: 'rocover'
                        }
                    })
                }
            }}>
                <Button style={{width:'100%', marginTop:'30px'}}>{Language[til].auth.login.restorePassword}</Button>
            </div>
        </div>
    )
}
