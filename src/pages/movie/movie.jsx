import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"
import Navbar from "../../component/navbar/navbar"
import MovieContainer from '../../component/movie/singleMovie/singleMovie'

export default function Movie() {
    return (
        <>
        <Navbar />
        <MovieContainer />
        <Ads />
        <Footer />
        </>
    )
}