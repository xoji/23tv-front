import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"
import Navbar from "../../component/navbar/navbar"
import Triller from "../../component/triller/triller/triller"
import CategoryMovie from "../../component/categories/categories"
import { useEffect, useState } from "react"
import { api } from "../../services"
import FilterComponent from '../../component/filter/filter'
import Loader from '../../component/loader/loader'
import axios from "axios"
function Home() {
  const [categories, setCategories] = useState([])
  const [recommendedTriller, setRecommendedTriller] = useState([])
  const [loading, setLoading] = useState(false)

  async function getMovies() {
    try {
      setLoading(true)
      const categories = await axios.get(api + "/category-with-movies")
      setLoading(false)
      setCategories(categories.data.data)
    } catch (error) {}
  }

  async function recommendedTrillers() {
    try {
      setLoading(true)
      const trillers = await axios.get(api + "/recommended-t")
      setRecommendedTriller(trillers.data.data)
      setLoading(false)
    } catch (error) {}
  }

  useEffect(() => {
		  getMovies()
    	recommendedTrillers()
  }, [])

  return (
    <>
      {
        loading && <Loader />
      }
      <FilterComponent />
      <Navbar />
      <Triller data={recommendedTriller} api={api} />
      <CategoryMovie data={categories} loading={loading} what="category" home={true} />
      {/*<Ads />*/}
      <Footer />
    </>
  )
}

export default Home
