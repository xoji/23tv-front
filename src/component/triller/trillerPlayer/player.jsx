import PlayPause from "../../elements/playPause/playPause"
import { useEffect, useRef, useState } from "react"
import st from "./player.module.css"
export default function TrailerPlayer({ src, api , isActive, play}) {
  const [isPlay, SetIsPlay] = useState(play ? play : false)
  const videoRef = useRef()

  const [isLoadedVideo, setIsLoadedVideo] = useState(false)

  useEffect(() => {
    (isPlay && isActive) ? videoRef.current.play() : play ? videoRef.current.play()  : videoRef.current.pause()
    // eslint-disable-next-line
  }, [isPlay,isActive])

  useEffect(()=>{
    if (!isActive) SetIsPlay(play ? play : false)
    videoRef.current.currentTime=0
    // eslint-disable-next-line
  }, [isActive])

  return (
    <div className={st.container}  onClick={()=>{
		if (isPlay) {
			videoRef.current.pause()
		}else {
			videoRef.current.play()
		}

    }}>
    <div style={{display:'flex', width:'100%', height:'100%'}} onClick={()=> {
      isActive ? SetIsPlay(isPlay) : SetIsPlay(false)
    }} >
    <div  className={st.playerButton}> 
    {isLoadedVideo ? <div><PlayPause isPlay={isPlay} /></div> : 'Loading video Please Wait until loading the video...'}
    </div>
    
    {
      src && <video
        style={{width:'100%', height:"100%"}}
        controls={false}
          muted={play ? play : false}
        onLoadStart={()=>{setIsLoadedVideo(false)}}
        onPlay={()=>{SetIsPlay(true)}}
        onPause={()=>{SetIsPlay(false)}}
        onLoadedData={()=>{setIsLoadedVideo(true)}}
        ref={videoRef}
        className={st.trller_video}
        controlsList="nodownload"
        playsInline={true}
      >
			<source src={`${api}/stream/triller/${src}/`} type="video/mp4" />
		</video>
    }
    </div>
    </div>
    )
  }
  
