import React, {useEffect, useState} from "react";
import st from './series.module.css'
import {Axios} from "../../services/index"
import {api} from "../../services/index";
import {useSrc} from "../../context/srcContext";
import {useLang} from "../../context/lanuage";


export default function Series({movieId, movie}) {
    const [active, setActive] = useState({})
    const [seasons, setSeasons] = useState([])
    const [series, setSeries] = useState([])
    const [activeSeries, setActiveSeries] = useState()
    const [til] = useLang()
    // eslint-disable-next-line
    const {src, setSrc} = useSrc()

    async function get(setSeasons, movieId){
        try {
            const {data} = await Axios.get(`/get-seasons?movieId=${movieId}`)
            if (data.data.length){
                setActive(data.data[0])
                setSeasons(data.data)
            }
        } catch (e){
            console.log('message', e)
        }
    }
    async function getSerias(seasonId){
        try {
            const {data} = await Axios.get(`/get-season_series?seasonId=${seasonId}`)
            setSeries(data.data)
            setActiveSeries(data.data[0])

            setSrc(data.data[0].movie_path)
        } catch (e) {
            console.log('message', e)
        }
    }
    useEffect(() => {
        get(setSeasons, movieId)
    }, [movieId])
    useEffect(() => {
        if (active.hasOwnProperty('season_id')){
            getSerias(active.season_id)
        }
        // eslint-disable-next-line
    }, [active])
    function seasonHandler(item){
        setActive(item)
    }

    return(
        <>
            <ul className={st.seasonList}>
                {
                    seasons.map((item, key) => {
                        return (
                            <li key={key} className={item.season_id === active.season_id ? st.liElem + ' ' + st.active : st.liElem} onClick={() => seasonHandler(item)}>{`Сезон ${item.season_num}`}</li>
                        )
                    })
                }
            </ul>
            {
                series.length ? (
                    <ul className={st.seriesList}>
                        <div className={st.seriesBlock}>
                            {series.length && activeSeries ? series.map((item, key) => {
                                return(
                                    <React.Fragment key={key}>
                                        <li
                                            className={item.movie_serial_id === activeSeries.movie_serial_id ? st.seriesItem + ' ' + st.seriesItemActive : st.seriesItem}
                                            onClick={() => {
                                                setSrc(item.movie_path)
                                                setActiveSeries(item)
                                            }}
                                        >
                                            <img
                                                src={`${api}/${movie.movie_thumnail_path}`}
                                                alt=""
                                                className={item.movie_serial_id === activeSeries.movie_serial_id ? st.seriesImg + ' ' + st.seriesImgActive : st.seriesImg}
                                            />
                                            <span
                                                className={item.movie_serial_id === activeSeries.movie_serial_id ? st.seriesTxt + ' ' + st.seriesTxtActive : st.seriesTxt}
                                            >
                                                {til === 'ru' ? item.movie_name_ru : item.movie_name}
                                            </span>
                                        </li>
                                    </React.Fragment>
                                )
                            }) : (<></>)}
                        </div>
                    </ul>
                ) : (<></>)
            }
        </>
    )
}
