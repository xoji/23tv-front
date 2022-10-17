import loader from '../../assets/img/loader.png'
import logo from '../../assets/logo/23tv_logo.svg'
import st from './loader.module.css'

export default function Loader() {
    return (
        <>
            <div className={st.loadercover}>
                <div className={st.logoBlock}>
                    <img src={logo} alt="Logo" className={st.logo}/>
                </div>
                <div className={st.loaderbody}>
                    <img src={loader} alt="loader" />
                </div>
            </div>
        </>
    )
}
