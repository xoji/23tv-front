import { useEffect, useState } from "react";
import st from "./movieItem.module.css";
import { Link, useParams } from "react-router-dom";
import { useTheme } from "../../../context/theme";
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'
import {api} from '../../../services'
export default function MovieItem({ movie = {}, caregoryId, what }) {
  const language = useParams();
  const [dark] = useTheme();
  const [ til ] = useLang()
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showAllGenre, setShowAllGenre] = useState(true);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 720) setShowAllGenre(false);
      else setShowAllGenre(true);
    });
  }, [])

  return (
    <>
        {what === 'cat' ? (
            <>
                <Link
                    to={`/${language.lang || "ru"}/categories/${(movie.category_name && movie.category_name.toLowerCase()) || (caregoryId && caregoryId.toLowerCase())}/${movie.movie_id}`}
                    className={st.container + ' ' + st.single_link}
                >
                    <div
                        className={`${st.imgBox} ${movie && imageLoaded ? "" : st.animate}`}
                    >
                        <img
                            onLoad={() => {
                                setImageLoaded(true);
                            }}
                            src={`${api}/${movie && movie.movie_thumnail_path}`}
                            style={{ visibility: movie && imageLoaded ? "" : "hidden" }}
                            alt=""
                        />
                    </div>
                    <div
                        className={`${st.title} ${movie ? "" : st.animate}`}
                        style={{ color: dark ? " " : "black" }}
                    >
                        {movie && movie.movie_name}
                    </div>
                    <div
                        className={`${st.description} ${movie ? "" : st.animate}`}
                        style={{
                            color: dark ? " " : "black",
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        <p style={{ fontWeight: "bold" }}>{Language[til].movie.movieItem.genre}: &nbsp; &nbsp; </p>
                        {movie &&
                        movie?.movie_genre &&
                        movie.movie_genre
                            .toString()
                            .split(",")
                            .map((genre, index) => {
                                if (!showAllGenre)
                                    return index <= 2 && <p key={genre}>{genre}, &nbsp;</p>;
                                else return <p key={genre}>{genre}, &nbsp;</p>;
                            })}
                    </div>
                </Link>
            </>
        ) : (
            <>
                <Link
                    to={`/${language.lang || "ru"}/categories/${(movie.category_name && movie.category_name.toLowerCase()) || (caregoryId && caregoryId.toLowerCase())}/${movie.movie_id}`}
                    className={st.container}
                >
                    <div
                        className={`${st.imgBox} ${movie && imageLoaded ? "" : st.animate}`}
                    >
                        <img
                            onLoad={() => {
                                setImageLoaded(true);
                            }}
                            src={`${api}/${movie && movie.movie_thumnail_path}`}
                            style={{ visibility: movie && imageLoaded ? "" : "hidden" }}
                            alt=""
                        />
                    </div>
                    <div
                        className={`${st.title} ${movie ? "" : st.animate}`}
                        style={{ color: dark ? " " : "black" }}
                    >
                        {movie && movie.movie_name}
                    </div>
                    <div
                        className={`${st.description} ${movie ? "" : st.animate}`}
                        style={{
                            color: dark ? " " : "black",
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        <p style={{ fontWeight: "bold" }}>{Language[til].movie.movieItem.genre}: &nbsp; &nbsp; </p>
                        {movie &&
                        movie?.movie_genre &&
                        movie.movie_genre
                            .toString()
                            .split(",")
                            .map((genre, index) => {
                                if (!showAllGenre)
                                    return index <= 2 && <p key={genre}>{genre}, &nbsp;</p>;
                                else return <p key={genre}>{genre}, &nbsp;</p>;
                            })}
                    </div>
                </Link>
            </>
        )}
    </>
  );
}
