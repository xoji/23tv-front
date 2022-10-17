import MovieInfo from "../movieInfo/movieInfo"
import MoviePlayerContainer from "../moviePlayerContainer/moviePlayerContainer"
import Actor from "../../actors/actor"
// import Ads from "../../ads/ads"
import Category from "../../categories/category/category"
import Comments from "../../comments/comments"
import { useSharing } from "../../../context/shareLink"
import ShareLink from "../../shareMovie/shareMovie"
import { useParams } from "react-router-dom"
import {api, Axios} from "../../../services"
import Loader from '../../loader/loader'
import Series from '../../series/series'

import { useEffect, useState } from "react"
export default function SignleMovie({ serial }) {
  const [openModal] = useSharing()
  const params = useParams()
  const [movie, setMovie] = useState({})
  const [actors, setActors] = useState([])
  const [directors, setDirectors] = useState([])
  const [similarMovie, setSimilarMovie] = useState([])
  const [loadng, setLoading] = useState(false)

  async function getActors(params) {
	setLoading(true)
    const res = await Axios.get(
      `/movie-actors?movieId=${params && params.movieid}`
    )
    setActors(res.data.data)
	setLoading(false)
  }

  async function getDirector(params) {
	setLoading(true)
    const res = await Axios.get(
      `/movie-directors?movieId=${params && params.movieid}`
    )
	setLoading(false)
    setDirectors(res.data.data)
  }

  async function getMovies(params, movie) {
	setLoading(true)
    const res = await Axios.get(`/similar-movies/`, {
      params: {
        movieId: params && params.movieid,
        categoryName: movie && movie.category_name,
      },
    })
	setLoading(false)
    setSimilarMovie(res.data.data)
  }

  async function MovieDetail(params) {
    try {
		setLoading(true)
		const movies = await Axios.get("/movie-one", {
			params: {
				movieId: params && params.movieid,
        type: (params && (params.category === 'recomended' ? 't' : 'm')),
			},
			headers: {
				Authorization: localStorage.getItem("Authorization") || 1,
			},
			})
		setLoading(false)
		setMovie(movies.data.data)
	} catch (error) {
        console.log(error)
	}
  }
  
  async function MovieSerialDetail(params) {
    try {
		const movies = await Axios.get("/serial-one", {
			params: {
				movieId: params && params.serialid,
			}
			})
		setMovie(movies.data.data)
	} catch (error) {

	}
  }

  useEffect(() => {
      MovieDetail(params)
      // eslint-disable-next-line
  }, [])


  useEffect(() => {
    if (movie && movie.category_id) {
      getMovies( params, movie)
    }
  }, [movie, params])

  useEffect(() => {
      getActors(params)
      getDirector(params)
	  if (serial) {
		MovieSerialDetail( params)
	  } else {
		MovieDetail(params)
	  }
  }, [params, serial])


  return (
    <>
    {
      loadng && <Loader />
    }
      <MoviePlayerContainer movie={movie && movie} api={api} />
      {movie.movie_serial_is ? <Series movieId={movie.movie_id} movie={movie && movie}/> : <></>}
      <MovieInfo movie={movie} api={api} />
      {/*<Ads />*/}
      <Actor creator={directors} actors={actors} api={api} />
      <Category
        showAllLinkText={false}
        title="Похожие сериалы"
        movies={similarMovie}
		loading={loadng}
		link={similarMovie}
      />
      <Comments api={api} film_id={params && params.movieid} />
      {openModal && <ShareLink />}
    </>
  )
}
