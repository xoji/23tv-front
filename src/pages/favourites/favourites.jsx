import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"
import Navbar from "../../component/navbar/navbar"
import FavoriteMovies from "../../component/favourites/favourites"
import { useEffect, useState } from "react"
import {Axios} from "../../services"
import Loader from '../../component/loader/loader'


export default function Favourites() {
    const [loading,setLoading] = useState(false)
    const [favourMovies,setFavourMovies] = useState([])

    async function getFavourMovie() {
       try {
        setLoading(true)
        const res = await Axios.get('/favorite-movie', {
            headers: {
                Authorization: localStorage.getItem('Authorization')
            }
        })
        setLoading(false)
        setFavourMovies(res.data.data)
       } catch (error) {
            setLoading(false)
       }
    }

    useEffect(()=>{
        getFavourMovie();
    },[])


    return (
        <>
        {
            loading && <Loader />
        }
        <Navbar />
        <FavoriteMovies favourMovie={favourMovies} />
        <Ads />
        <Footer />
        </>
    )
}