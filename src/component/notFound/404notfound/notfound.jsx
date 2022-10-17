import Navbar from '../../navbar/navbar'
import NotFoundImg from '../../../assets/image/NotFound.png'
import st from './notfound.module.css'
import Button from '../../elements/button/button'
import { Link, useParams } from 'react-router-dom'
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'

export default function NotFound() {
    const [ til ] = useLang()
    const language = useParams()

    return (
        <div className={st.container}>
            <Navbar />
            <div className={st.backContainer}><img className={st.background} src={NotFoundImg} alt=""/></div>
            <div className={st.button}>
                <Link to={`/${language.lang || 'ru'}`} >
                    <Button  style={{padding:'10px 30px'}} >{Language[til].notfound.notFound.goToMainPage}</Button>
                </Link>
            </div>
        </div>
    )
}
