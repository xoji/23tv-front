import st from "./category.module.css"
import { Link } from "react-router-dom"
import MovieItem from "../../movie/movieItem/movieItem"
import NoFoundVideos from "../../notFound/videoNotFound/notFount"
import { useTheme } from "../../../context/theme"
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage.jsx'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, { Pagination } from 'swiper/core';
SwiperCore.use([Pagination])


export default function Category({
  title,
  link,
  loading,
  movies = [],
  showAllLink = true,
  showAllLinkText = true,
  what
}) {
  const [dark] = useTheme()
  const [til] = useLang()
  const categoryId = link && link.category_name
  return (
      <>
          {what === 'single-movie-category' ? (
              <div className={st.container}>
                  <div className={st.category_wrapper}>
                      {showAllLink && (
                          <div className={st.titleBox}>
                              <h1
                                  style={{ color: dark ? "#fff" : "#000" }}
                                  className={st.titleText}
                              >
                                  {title}
                              </h1>
                              {showAllLinkText && (
                                  <Link to={link} className={st.title}>
                                      {Language[til].categories.category.all}
                                  </Link>
                              )}
                          </div>
                      )}

                      <div className={st.items}>

                              {movies && movies.length === 0 ? (
                                  loading ? ( //if Loaded finished and no found videos
                                      <>
                                          <MovieItem />
                                          <MovieItem />
                                          <MovieItem />
                                          <MovieItem />
                                          <MovieItem />
                                          <MovieItem />
                                      </>
                                  ) : (
                                      <NoFoundVideos />
                                  )
                              ) : (
                                  movies.map(
                                      (item, key) => (
                                          <MovieItem
                                              caregoryId={categoryId}
                                              key={Math.random() * Math.random()}
                                              movie={item}
                                              what={'cat'}
                                          />
                                      )
                                  )
                              )}
                      </div>
                      {/* {
			(count > 0) ? <div className={st.bottom}>
			{
				<div className={st.pagination}
				style={{ justifyContent: pagination === "basic" ? "center" : "space-between" }}>
					<SliderCounterBasic
					  max={count}
					  current={current}
					  setCurrent={setCurrent}
					  mode={dark}
					/>
				</div>
			}
		  </div> : <div className={st.bottom}>
          {movies.length > visibled ? (
            <div
              className={st.pagination}
              style={{
                justifyContent:
                  pagination === "basic" ? "center" : "space-between",
              }}>
              {pagination === "basic" ? (
                <SliderCounterBasic
                  max={counts > 6 ? 5 : counts}
                  current={current}
                  setCurrent={setCurrent}
                  mode={dark}
                />
              ) : (
                <SliderCounterAdvanced
                  max={counts > 6 ? 5 : counts}
                  current={current}
                  setCurrent={setCurrent}
                  mode={dark}
                />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
		} */}
                  </div>
              </div>
          ) : (
              <div className={st.container}>
                  <div className={st.category_wrapper}>
                      {showAllLink && (
                          <div className={st.titleBox}>
                              <h1
                                  style={{ color: dark ? "#fff" : "#000" }}
                                  className={st.titleText}
                              >
                                  {title}
                              </h1>
                              {showAllLinkText && (
                                  <Link to={link} className={st.title}>
                                      {Language[til].categories.category.all}
                                  </Link>
                              )}
                          </div>
                      )}

                      <div className={st.items}>
                          <Swiper
                              slidesPerView={1}
                              spaceBetween={30}
                              slidesPerGroup={6}
                              modules={Pagination}
                              pagination={true}
                              breakpoints={{
                                  "300": {
                                      "slidesPerView": 2,
                                      "spaceBetween": 10,
                                      "slidesPerGroup": 2
                                  },
                                  "645": {
                                      "slidesPerView": 3,
                                      "spaceBetween": 20,
                                      "slidesPerGroup": 3
                                  },
                                  "768": {
                                      "slidesPerView": 4,
                                      "spaceBetween": 30,
                                      "slidesPerGroup": 4
                                  },
                                  "1023": {
                                      "slidesPerView": 5,
                                      "spaceBetween": 30,
                                      "slidesPerGroup": 5
                                  },
                                  "1900": {
                                      "slidesPerView": 6,
                                      "spaceBetween": 30,
                                      "slidesPerGroup": 6
                                  }
                              }} className="mySwiper"
                          >
                              {movies && movies.length === 0 ? (
                                  loading ? ( //if Loaded finished and no found videos
                                      <>
                                          <MovieItem />
                                          <MovieItem />
                                          <MovieItem />
                                          <MovieItem />
                                          <MovieItem />
                                          <MovieItem />
                                      </>
                                  ) : (
                                      <NoFoundVideos />
                                  )
                              ) : (
                                  movies.map(
                                      (item, key) => (
                                          <SwiperSlide key={key} width={`auto`}>
                                              <MovieItem
                                                  caregoryId={categoryId}
                                                  key={Math.random() * Math.random()}
                                                  movie={item}
                                              />

                                          </SwiperSlide>
                                      )
                                  )
                              )}
                          </Swiper>
                      </div>
                      {/* {
			(count > 0) ? <div className={st.bottom}>
			{
				<div className={st.pagination}
				style={{ justifyContent: pagination === "basic" ? "center" : "space-between" }}>
					<SliderCounterBasic
					  max={count}
					  current={current}
					  setCurrent={setCurrent}
					  mode={dark}
					/>
				</div>
			}
		  </div> : <div className={st.bottom}>
          {movies.length > visibled ? (
            <div
              className={st.pagination}
              style={{
                justifyContent:
                  pagination === "basic" ? "center" : "space-between",
              }}>
              {pagination === "basic" ? (
                <SliderCounterBasic
                  max={counts > 6 ? 5 : counts}
                  current={current}
                  setCurrent={setCurrent}
                  mode={dark}
                />
              ) : (
                <SliderCounterAdvanced
                  max={counts > 6 ? 5 : counts}
                  current={current}
                  setCurrent={setCurrent}
                  mode={dark}
                />
              )}
            </div>
          ) : (
            ""
          )}
        </div>
		} */}
                  </div>
              </div>
          )}
      </>
  )
}
