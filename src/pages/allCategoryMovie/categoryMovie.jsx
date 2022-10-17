import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"
import Navbar from "../../component/navbar/navbar"
import { useEffect, useState } from "react"
import CategoryMovie from '../../component/categories/categories'
import TrillerCarousel from '../../component/triller/trillerCarousel/triller'
import {api, Axios} from "../../services"

function MovieCategory() {
	const [categories, setCategories] = useState([])
	const [genres, setGenres] = useState([])
	const [recommendedTriller, setRecommendedTriller] = useState([])
	const [loading, setLoading] = useState(false)
	async function getMovies (){
		try {
			setLoading(true)
			const categories = await Axios.get('/category-with-movies', {
				headers: {
					Authorization: localStorage.getItem('Authorization')
				}
			})
			setLoading(false)
			setCategories(categories.data.data)
		} catch (error) {
		}
	}

	// vse kategorini kurib chiq yaxshilab

	async function getGenres() {
		try {
			setLoading(true)
			const genres = await Axios.get('/genres')
			setGenres(genres.data.data)
			setLoading(false)
		} catch (error) {
			
		}
	}

	async function recommendedTrillers() {
		try {
			setLoading(true)
			const trillers = await Axios.get('/recommended-t')
			setRecommendedTriller(trillers.data.data)
			setLoading(false)
		} catch (error) {
			
		}
	}
	
	useEffect(()=>{
		getMovies()
		getGenres()
		recommendedTrillers()
	},[])
	
	return (
		<>
		<Navbar />
		<TrillerCarousel
		api={api}
		movies={recommendedTriller} />
		<CategoryMovie
		data={categories}
		genres={genres}
		type="genres"
		loading={loading}
		what="category"
		allCategory={"all"} />
		<Ads />
		<Footer />
		</>
		)
	}
	

	export default MovieCategory
	