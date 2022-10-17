import Footer from "../../component/footer/footer"
import Ads from "../../component/ads/ads"
import Navbar from "../../component/navbar/navbar"
import MovieContainer from '../../component/movie/singleMovie/singleMovie'

export default function Serial() {
    return (
        <>
        <Navbar />
        <MovieContainer serial={true} />
        <Ads />
        <Footer />
        </>
    )
}