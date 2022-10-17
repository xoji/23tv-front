import { useEffect , useRef, useState } from 'react'
import { useParams } from 'react-router'
import st from './moviePlayer.module.css'
import PlayPause from '../../elements/playPause/playPause'
import playIcon from '../../../assets/image/videplayerPlayIcon.png'
import pauseIcon from '../../../assets/image/videoplayerPauseIcon.png'
import fullScreenIcon from '../../../assets/image/videplayerFullScreenIcon.png'
import exitFullScreenIcon from '../../../assets/image/exitFullscreen.png'
import VideoVolume from '../../elements/videoVolume/videoVolume'
import Seekbar from '../../elements/seekbar/seekbar'
import { useResolution } from '../../../context/resolution'

const parseHMS=(value)=>{
	const sec = parseInt(value, 10)
	let hours = Math.floor(sec / 3600) // get hours
	let minutes = Math.floor((sec - (hours * 3600)) / 60) // get minutes
	let seconds = sec - (hours * 3600) - (minutes * 60) //  get seconds
	if (hours < 10) {hours = "0" + hours}
	if (minutes < 10) {minutes = "0" + minutes}
	if (seconds < 10) {seconds = "0" + seconds}
	return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
}

export default function TrillerVideoPlayer({ movie, api }) {
	const [resolution] = useResolution()
	const { movieid } = useParams()
	const videoRef = useRef()
	const [data, setData] = useState({})
	
	const [width, setWidth] = useState('')
	const [isLoad, setIsLoad] = useState(false)
	const [isFullScreen,setIsFullScreen ] = useState(false)
	const [isPlay, setIsPlay] = useState(false)
	const [duration, setDuration] = useState('--:--:--')
	const [isMuted, setIsMuted] = useState(false)
	const [volume, setVolume] = useState(0.5)
	
	
	const localFilmID = window.localStorage.getItem('movie_id')
	const currentTime =localFilmID === movieid ?  parseFloat(window.localStorage.getItem('movie_current_time')) : 0
	const durationInLocal = localFilmID === movieid ? parseFloat(window.localStorage.getItem('movie_duration')) : 1
	
	const [currentSecond, setCurrentSecond] = useState(()=>{
		return  {
			currentTime:currentTime || 0,  
			duration:durationInLocal || 1
		}
	})
	
	const setSize =()=>{
		const container = document.getElementById('videoContainer')
		setWidth(`${container.offsetWidth ? container.offsetWidth : 0 }px`)
	}
	
	useEffect(()=>{
		if (movie && movie.triller_path) {
			setData({
				path: movie.triller_path,
				movie_thumnail_path: movie.movie_thumnail_path
			})
		}
	},[movie])
	
	useEffect(()=>{
		var container = document.getElementById('videoContainer')
		container.focus()
	}, [])
	
	useEffect(()=>{
		if (videoRef.current) {
			videoRef.current.currentTime = window.localStorage.getItem('movie_id') === movieid ? parseFloat(window.localStorage.getItem('movie_current_time')) : 0
		}
	}, [movieid])
	
	useEffect(() => {
		if (videoRef.current) {
			isPlay ? videoRef.current.play() : videoRef.current.pause()
		}
	}, [isPlay]);
	
	useEffect(()=>{
		setSize();
		window.addEventListener('resize', setSize)
		return ()=>{
			window.addEventListener('resize', setSize)
		}
	}, [isLoad, width,isFullScreen])
	
	const onLoadedMetaInfo =()=>{
		setDuration(parseHMS(videoRef.current.duration))
	}
	
	const handleChangeVolume=(vol)=>{
		setVolume(vol)
		videoRef.current.volume = vol
	}
	
	const changeVolumeByKey =(vol)=>{
		if((volume >=0.9  && vol > 0) || (volume < 0.1 && vol < 0)){
			setVolume(vol>0  ? 1 :0)
		}else{
			setVolume(x=>x+vol)
		}
		videoRef.current.volume = volume
	}
	
	const handleMuted=()=>{
		setIsMuted(z=>!z)
		videoRef.current.muted = !isMuted
	}
	
	function openFullscreen() {
		var container = document.getElementById('videoContainer')
		container.focus()
		var videoId = document.getElementById('videoContainer')
		if (videoId.requestFullscreen) {
			videoId.requestFullscreen();
			setIsFullScreen(true)
		} else if (videoId.webkitRequestFullscreen) { /* Safari */
			videoId.webkitRequestFullscreen();
			setIsFullScreen(true)
		} else if (videoId.msRequestFullscreen) { /* IE11 */
			videoId.msRequestFullscreen();
			setIsFullScreen(true)
		}
	}
	
	function closeFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
			setIsFullScreen(false)
		} else if (document.webkitExitFullscreen) { /* Safari */
			document.webkitExitFullscreen();
			setIsFullScreen(false)
		} else if (document.msExitFullscreen) { /* IE11 */
			document.msExitFullscreen();
			setIsFullScreen(false)
		}
	}
	
	const handleSetCurrentSecond=(second)=>{
		setCurrentSecond(function(x){
			return {...x,...{currentTime:second}}
		})
		videoRef.current.currentTime = second
	}
	
	const handleSet10Sec=(second)=>{
		setCurrentSecond(function(x){
			return {...x,...{currentTime:x.currentTime+second}}
		})
		videoRef.current.currentTime = videoRef.current.currentTime + second
	}
	
	const timeUpdate=()=>{
		window.localStorage.setItem('movie_id',movie && movie.movie_id )
		window.localStorage.setItem('movie_current_time', videoRef.current.currentTime )
		window.localStorage.setItem('movie_duration', currentSecond.duration )
		
		setCurrentSecond({currentTime:videoRef.current.currentTime, duration:videoRef.current.duration})
	}
	
	const keyHandler =(e)=>{
		switch(e.keyCode){
			case 39:handleSet10Sec(5); break;
			case 37:handleSet10Sec(-5); break;
			case 32:setIsPlay(!isPlay); break;
			case 40:changeVolumeByKey(-0.1); break;
			case 38:changeVolumeByKey(0.1); break;
			case 13:e.altKey && (!isFullScreen ? openFullscreen() : closeFullscreen()); break;
			default: break;
		}
	}
	
	return (
		<div id="videoContainer"  onKeyDown={keyHandler} tabIndex={0} className={st.container}>
		<div className={st.controlBtns}>
		<div onClick={()=>{setIsPlay(!isPlay)}}  className={st.playerVisible}> </div>
		<div onClick={()=>{setIsPlay(!isPlay)}} className={st.playPause}>
		{isLoad ? <PlayPause isPlay={isPlay}/> : 'Please wait'}
		</div> 
		
		<div onClick={()=>{setIsPlay(!isPlay)}} onDoubleClick={()=>{handleSet10Sec(-10)}} className={st.prevTap}></div>
		<div onClick={()=>{setIsPlay(!isPlay)}} onDoubleClick={()=>{handleSet10Sec(10)}} className={st.nextTap}></div>
			<div className={st.controls}>
				<div onClick={()=>{setIsPlay(!isPlay)}} className={st.playingStatus}>
					<img src={isPlay ? pauseIcon : playIcon} alt="" />
				</div>
			<Seekbar currentSecond={currentSecond} setCurrentSecond={handleSetCurrentSecond}/>
				<div className={st.volume}>
					<VideoVolume
					isMuted={isMuted}
					setIsMuted={handleMuted}
					volume={volume}
					setVolume = {handleChangeVolume}/>
				</div>
			<div className={st.duration}>{duration}</div>
				<div onClick={isFullScreen ? closeFullscreen : openFullscreen} className={st.playingStatus}>
					<img src={!isFullScreen ? fullScreenIcon : exitFullScreenIcon} alt="" />
				</div>
			</div>
		</div>

		{
			data && data.path !== undefined && <video ref={videoRef} id='video'
			style={{width:width, maxHeight:isFullScreen ? '100vh' : '90vh'}}
			onTimeUpdate={timeUpdate}
			onLoadedMetadata ={onLoadedMetaInfo}
			onLoadStart={()=>setIsLoad(false)}
			onLoadedData={()=>setIsLoad(true)}
			preload={`${api}/${data.movie_thumnail_path}`}
			controlsList="nodownload">
			<source src={`${api}/stream/triller/${data.path}/${resolution}`} type="video/mp4" />
		</video>	
		}
		</div>
		)
	}
	