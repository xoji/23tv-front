import st from './triller.module.css'
import SliderCounterBasic from '../../sliderCounter/sliderCounterBasic'
import TrailerPlayer from '../trillerPlayer/player'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, { Pagination } from 'swiper/core';
import { useTheme } from '../../../context/theme'
SwiperCore.use([Pagination])

export default function TrailerCarousel({ movies = [], api }) {
    const [current, setCurrent] = useState(0)
    const [itemWidth, setItemWidth] = useState()
    const [dark] = useTheme()
    const [ til ] = useLang()
    const navigationNextRef = useRef()
    const navigationPrevRef = useRef()
    // eslint-disable-next-line
    const carouselItemStyle = {
        minWidth: itemWidth + 'px', 
        transition:'transform 0.5s ease-in-out'
    }
    const textStyle ={
        background:dark ? 'black': 'white', 
        color: dark ? 'white': 'black'
    }
// eslint-disable-next-line
    const wayStyle = {
        
        transition: 'transform .5s ease-in-out',
        transform: `translateX(-${current*itemWidth}px)`
    }
    const setSize = () =>{
        var box = document.querySelector('#box')
        setItemWidth(window.innerWidth>761 ? box?.offsetWidth/2 : box?.offsetWidth )
    }

    useEffect(()=>{
        setSize()
        window.addEventListener("resize",setSize)
          window.addEventListener("load",setSize)
          return ()=>{
            window.removeEventListener("resize",setSize)
            window.removeEventListener("load",setSize)
          }
    } , [])

    return (
        <div className={st.container} style={{background: dark ? '#0C0C0D' : '#F8F9FC', paddingTop:'30px'}}>
            {/* Carousel */}
            <Swiper
                slidesPerView={2} spaceBetween={10}
                modules={Pagination}
                centeredSlides={false}
                breakpoints={{
                    "300": {
                        "slidesPerView": 1,
                        "spaceBetween": 10
                    },
                    "645": {
                        "slidesPerView": 1,
                        "spaceBetween": 10
                    },
                    "768": {
                        "slidesPerView": 2,
                        "spaceBetween": 10
                    },
                    "1023": {
                        "slidesPerView": 2,
                        "spaceBetween": 10
                    }
                }} className="mySwiper"
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                    swiper.navigation.init();
                    swiper.navigation.update();
                }}
                onSlideChange={(e) => {
                    setCurrent(e.activeIndex)
                }}
            >
                {
                    movies.map((x, key) => (
                        <SwiperSlide key={key} width="auto" >
                            <TrailerPlayer api={api} isActive={current === key} src={x && x.triller_path} />
                        </SwiperSlide>
                    ))
                }
                <SwiperSlide  width="auto" >
                </SwiperSlide>
            </Swiper>
            

            {/* Navigation */}
            <div className={st.control}>
                <div className={st.info}>
                    <div style={{color:dark ? ' ': 'black'}}  className={st.name}>{movies && movies[current]?.triller_name}<span>{Language[til].triller.trillerCarousel.triller}</span></div>
                    <div className={st.subInfo}>
                        <div style={{color:dark ? ' ': 'black'}}  className={st.country}>{Language[til].triller.trillerCarousel.country}:{movies && movies[current]?.country_name}</div>
                        <div className={st.genre}>
                            {
                            movies && movies[current]?.movie_genre.toString().split(',').map((x, key)=>{
                                return <Link key={key} style={textStyle} to="#">{x}</Link>
                            })
                            }
                        </div>
                    </div>
                </div>
                <div className={st.counter}> <SliderCounterBasic 
                    navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}
                infinite={false} max={movies.length} current={current} setCurrent={setCurrent}/></div>
            </div>
        </div>
    )
}
