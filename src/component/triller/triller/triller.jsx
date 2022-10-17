import st from "./triller.module.css";
import { useEffect, useState, useRef } from "react";
import TrailerItem from "../trillerItem/trillerItem";
import SliderCounterBasic from "../../sliderCounter/sliderCounterBasic";
import SearchNotFound from "../../notFound/SearchNotFound/notFound";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core';
SwiperCore.use([Pagination])
SwiperCore.use([Navigation]);
SwiperCore.use([Autoplay]);


export default function Trailer(props) {
  const [current, setCurrent] = useState(0);
  const [itemWidth, setItemWidth] = useState();
  const navigationNextRef = useRef()
  const navigationPrevRef = useRef()
  // eslint-disable-next-line
  const carouselWayStyle = {
    transform: `translateX(-${current * itemWidth}px)`,
    transition: "transform 1s ease",
    minWidth: "100%",
    minHeight: "200px",
  };
  const settingSize = () => {
    var playerRefId = document.getElementById("playerRef");
    setItemWidth(playerRefId.clientWidth || playerRefId.offsetWidth);
  };


  useEffect(() => {
    settingSize();
    window.addEventListener("resize", settingSize);
    window.addEventListener("load", settingSize);
    return () => {
      window.removeEventListener("resize", settingSize);
      window.removeEventListener("load", settingSize);
    };
  }, []);

  useEffect(() => {
    settingSize();
  }, []);




  return (
    <div className={st.container}>
      <div id="playerRef" className={st.player}>
        
        <Swiper
          autoplay={ {
            delay: 10000,
            disableOnInteraction: false
          }}
          slidesPerView={1} spaceBetween={0}
          modules={Pagination}
          // loop={true}
          className="mySwiper"
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

          {props.data && props.data.length > 0 ? (
            props.data.map((item, key) => {
              return (
                <SwiperSlide key={key} width="auto" >
                    <TrailerItem
                      listenIndex={current}
                      isActive={key === current}
                      data={item}
                      api={props.api} 
                      play={true}
                      />
                </SwiperSlide>
              );
            })
          ) : (
            <SwiperSlide width="auto" >
                <div style={{ display: "flex", height: "100vh", width: "100%" }}>
                  <SearchNotFound />
                </div>
                </SwiperSlide>
            
          )}
        </Swiper>
        <div className={st.controls}>
          <SliderCounterBasic
            current={current}
            max={props.data && props.data.length}
            navigationPrevRef={navigationPrevRef} navigationNextRef={navigationNextRef}
          />
        </div>
      </div>
    </div>
  );
}
