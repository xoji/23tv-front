import st from './favourites.module.css'
import { useLang } from '../../context/lanuage.jsx'
import Language from '../../languages'
import { useTheme } from '../../context/theme'
import MovieItem from '../movie/movieItem/movieItem'

export default function FavouriteMovies({ favourMovie  }) {
    const [ til ] = useLang()
    const [dark] = useTheme()

    return (
        <>

        <div className={st.container}>
            <div style={{color: dark ? '#fff':"#111112"}} className={st.title_category}>
                {Language[til].navbar.forwards }
            </div>

        </div>
            <div className={st.containerMovie}>
            {
                favourMovie.length && favourMovie.map((val, index) => <MovieItem key={index}
                caregoryId={'favourite'} movie={val} />)
            }
            </div>
        
        </>
    )
}