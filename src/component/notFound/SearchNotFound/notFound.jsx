import st from './notFound.module.css'
import NotFoundSearchImg from '../../../assets/logo/notFound.svg'
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'

export default function SearchNotFound({loading}) {
    const [ til ] = useLang()
    return (
        <div className={st.container}>
            <div className={st.box}>
                {
                    loading ? <div className="loader"></div> :
                    <>
                        <img src={NotFoundSearchImg} alt="" />
                        <div className={st.text}>{Language[til].notfound.searchNotFound}</div>
                    </>
                }
            </div>
        </div>
    )
}
