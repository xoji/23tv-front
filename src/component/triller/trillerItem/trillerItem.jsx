import st from "./trillerItem.module.css"
import Button from "../../elements/button/button"
import TrailarPlayer from "../trillerPlayer/player"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import rateStars from "../../../assets/image/rates.png";
import bg from "../../../assets/image/IMG_3896.JPG"


export default function TrailerItem({ isActive, data, api, play }) {
  const [showAllGenre, setShowAllGenre] = useState(true)
  const language = useParams()
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 550) setShowAllGenre(false)
      else setShowAllGenre(true)
    })
  }, [])

  return (
    <>
      {
        <div className={st.container}>
          <img className={st.bg_image} src={bg} alt="triller_img" />
          <div className={st.box}>
            <div className={st.info}>
              <h1 className={st.name}>{data.triller_name}</h1>
              <h6 className={st.counter}>Страна: {data.country_name}</h6>
              <h6 className={st.description}>
                {!showAllGenre
                  ? data.movie_body.substring(0, 120) + "..."
                  : data.movie_body}
              </h6>
              <div className={st.genre}>
                {data &&
                  data.movie_genre.split(",").map((x, key) => {
                    return !showAllGenre ? (
                      key <= 2 && (
                        <div className={st.genreItem} key={key}>
                          {x}
                        </div>
                      )
                    ) : (
                      <div className={st.genreItem} key={key}>
                        {x}
                      </div>
                    )
                  })}
              </div>
              <div className={st.rating}>
                <h6 className={st.title}>Рейтинг: &nbsp;<img width="90" src={rateStars} alt="rate" /> </h6>
              </div>
              <div className={st.button} onClick={() => {
                  window.location.href = `/${
                    language.lang || "ru"
                  }/categories/recomended/${data.triller_id}`
                }}>
                <Button>Смотреть по подписке</Button>
              </div>
            </div>
            <div className={st.player}>
              <TrailarPlayer
                isActive={isActive}
                src={data && data.triller_path}
                api={api}
                play={play}
              />
            </div>
          </div>
        </div>
      }
    </>
  )
}
