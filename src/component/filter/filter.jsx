import { useState, useEffect } from 'react'
import st from './filter.module.css'
import exitIcon from '../../assets/logo/close_icon.svg'
import exitIconForLight from '../../assets/logo/close_icon_light.svg'
import Button from '../elements/button/button'
import { useFilter } from '../../context/filter'
import CheckInput from '../elements/checkInput/checkInput'
import { useTheme } from '../../context/theme'
import MovieItem from '../movie/movieItem/movieItem'
import SearchNotFound from '../notFound/SearchNotFound/notFound'
import Language from '../../languages'
import { useLang } from '../../context/lanuage.jsx'
import {Axios} from '../../services'
export default function FilterConfigure() {
const [countires, setCountries] = useState([])
const [genres, setGenres] = useState([])
const [year, setYear] = useState([])
const [isOpen, setIsOpen] = useFilter()
const [tab, setTab] = useState('country') // country, genre, year
const [dark] = useTheme()
const [result, setResult] = useState([])
const [selectedGenreId, setselectedGenreId] = useState([])
const [selectedCountryId, setSelectedCountryId] = useState([])
const [selectedYear, setSelectedYear] = useState([])
const [loading, setLoading] = useState(false)
const [ til ] = useLang()
useEffect(()=>{
    ;(async()=>{
        try {
            const res = await Axios.get('/countries')
            setCountries(res.data.data)
        } catch (error) {
            throw error
        }
    })()
},[])

useEffect(()=>{
    ;(async()=>{
        try {
                const res = await Axios.get('/genres')
                setGenres(res.data.data)
        } catch (error) {
            throw error
        }
    })()
},[])

useEffect(()=>{
    ;(async()=>{
        try {
            const res = await Axios.get('/movie-year')
            setYear(res.data.data)
        } catch (error) {
            throw error
        }
    })()
},[])




const handleChangeGenre=(_, e)=>{
    if (e.target.checked) {
        setselectedGenreId([e.target.value, ...selectedGenreId])
    } else if (e.target.checked === false) {
        removeElement(selectedGenreId, e)
    }
}

const handleChangeCountry=(_, e)=>{
    if (e.target.checked) {
        setSelectedCountryId([e.target.value, ...selectedCountryId])
    } else if (e.target.checked === false) {
        removeElement(selectedCountryId, e)
    } 
}

const handleChangeYear=(_ ,e)=>{
    if (e.target.checked) {
        setSelectedYear([e.target.value, ...selectedYear])
    } else if (e.target.checked === false) {
        removeElement(selectedYear, e)
    }
}


const sendSearchData = async() => {
    const searchData = {
        year: selectedYear,
        genreId: selectedGenreId,
        countryId: selectedCountryId,
    }
    setLoading(true)
    const res = await Axios.post('/filter-movie', searchData, {
        headers: {
            Language: localStorage.getItem('lang')
        }
    })
    setResult(res.data.data)
    setLoading(false)
}

function removeElement(data,e) {
    for( var i = 0; i < data.length; i++){
        if ( data[i] === e.target.value) { 
            data.splice(i, 1); 
        }
    }
}

const containerStyle= {
    visibility: isOpen ? 'visible' : 'hidden',
    opacity: isOpen ? 1: 0,
    height: isOpen ? '100vh' : '0vh',
    transform: isOpen ?  'scale(1)' : 'scale(0)',
    overflow: 'auto',
    top: isOpen ? '0': '100%',
    left: isOpen ? '0': '50%'
}

const resultStyle = {
    fontSize:'18px',
    fontWeight:'600',
    color:"white",
    marginTop:'20px',
    textAlign:'center'
}   
return (
    <div style={{...containerStyle, ...{background: dark ? '' : 'rgba(255, 255, 255, 0.98)'}}} className={st.container}>
    <div className={st.containerTitle} style={{borderBottom:dark ? ' ' :' 1px solid rgba(119, 119, 119, 0.2)'}}>
    <div style={{color:dark ? '' : 'black'}} className={st.title}>
        {Language[til].filter.filtering}
    </div>
    <div onClick={()=>{setIsOpen(false)}} className={st.favourites}>
    <img src={dark ? exitIcon : exitIconForLight} alt="" />
    </div>
    </div>
    <div className={st.navigation}>
    <div onClick={()=>{setTab('country')}} className={st.tab_item} >
    <Button  className={tab==='country' ?'' : st.buttonInActive}> {Language[til].filter.country}</Button>
    </div>
    <div  onClick={()=>{setTab('year')}} className={st.tab_item}>
    <Button className={tab==='year' ? '' : st.buttonInActive}> {Language[til].filter.year}</Button>
    </div>
    <div  onClick={()=>{setTab('genre')}}  className={st.tab_item}>
    <Button className={tab==='genre' ?'' : st.buttonInActive}>{Language[til].filter.genre}</Button>
    </div>
    </div>
        <div className={st.filterArea} style={{display: tab === 'country' ? 'flex' : 'none'}}>
            {
                countires && countires.map((val, key)=> <div
                id={val.country_id}
                key={key}>
                <CheckInput onChange={handleChangeCountry} value={val.country_id} name="country">{val.country_name}</CheckInput>
                </div>)
            }
        </div>

        <div className={st.filterArea} style={{display: tab === 'year' ? 'flex' : 'none'}}>
            {
                year && year.map((val, key)=> <div
                key={key}>
                <CheckInput onChange={handleChangeYear} value={val.year} name="year">{val.year}</CheckInput>
                </div>)
            }
        </div>

        <div className={st.filterArea} style={{display: tab === 'genre' ? 'flex' : 'none'}}>
            {
                genres && genres.map((val, key)=> <div
                id={val.genre_id}
                key={key}>
                <CheckInput onChange={handleChangeGenre} value={val.genre_id} name="genre">{val.genre_name}</CheckInput>
                </div>)
            }
        </div>
        <div onClick={sendSearchData}><Button>{Language[til].filter.filtering}</Button></div>
            { 
            
                result.length ? (result.length > 0 ?
                    <>
                    <div style={resultStyle}>{Language[til].filter.foundMovies}</div>
                    <div className={st.result}>
                        {
                            result.map((x, key) => {
                                return <MovieItem key={key} movie={x} />
                            })
                        }


                    </div>
                    </>
                    :  <SearchNotFound loading={loading} />)  : 
                    <div onClick={()=>{setIsOpen(false)}} className={st.result}>
                        <MovieItem movie={{}}  />
                        <MovieItem movie={{}}  />
                        <MovieItem movie={{}}  />
                        <MovieItem movie={{}}  />
                        <MovieItem movie={{}}  />
                        <MovieItem movie={{}}  />
                        <MovieItem movie={{}}  />
                        <MovieItem movie={{}}  />
                        <MovieItem movie={{}}  />
                        <MovieItem movie={{}}  />
                    </div>
            }



    </div>
    )
}
