import { useCallback, useEffect, useState } from "react"
import st from "../../movie/moviePlayerContainer/moviePlayerContainer.module.css"
import stLocal from "./livePlayerContainer.module.css"
import { useTheme } from "../../../context/theme"
import IO from "socket.io-client"
import cover from "../../../assets/bg/IMG_3873.JPG"
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'
import {api, Axios} from '../../../services'
import './live.css'

export default function LivePlayerContainer() {
	const [ til ] = useLang()
	const [dark] = useTheme()
	const [, setPlayerHeight] = useState("")
	const [liveTitle, setLiveTitle] = useState('')
	const [liveBody, setLiveBody] = useState('')
	// const [liveFile, setLiveFile] = useState('')
	const [liveStart, setLiveStart] = useState(false)
	const [modal, setModal] = useState(false)
	const [isVideo, setIsVideo] = useState(false)
	const settingSize = () => {
		var playerRef = document.getElementById("playerRef")
		setPlayerHeight((playerRef.offsetWidth * 480) / 854)
	}
	
	useCallback(() => {
		window.addEventListener("load", settingSize)
		window.addEventListener("resize", settingSize)
		return () => {
			window.addEventListener("load", settingSize)
			window.addEventListener("resize", settingSize)
		}
	}, [])
	
	function stopLive() {
		const check = (api === 'https://23tv.uz/api')
			const socket = IO(check ? 'https://23tv.uz/live' : api + '/live', {
				path: "/socket.io",
				transports: ["websocket"],
				autoConnect: false,
			},[api])
			// const socket = IO("https://tv23.herokuapp.com/live", {
			// 	path: "/socket.io",
			// 	transports: ["websocket"],
			// 	autoConnect: false,
			//   })
			socket.disconnect()
			const liveProps = {
				liveTitle: '',
				liveBody: '',
				status: false
			}
			Axios.post('/live-status-update', liveProps)
	}

	function wrtc(liveStart, liveTitle, liveBody) {
		// getting dom elements
		const divConsultingRoom = document.getElementById("consultingRoom")
		const btnJoinBroadcaster = document.getElementById("joinBroadcaster")
		const videoElement = document.getElementById("livePlayer")
		// variables
		let user
		let rtcPeerConnections = {}
		
		// constants
		const iceServers = {
			iceServers: [
				{ urls: "stun:stun.services.mozilla.com" },
				{ urls: "stun:stun.l.google.com:19302" },
			],
		}
		const streamConstraints = { audio: true, video: true }
		
		// Let's do this 💪
		// const socket = IO('http://localhost:4000/live', { path: '/socket.io', transports: ["websocket"], autoConnect: false })
		const check = (api === 'https://23tv.uz/api')
		const socket = IO(check ? 'https://23tv.uz/live' : api + '/live', {
		path: "/socket.io",
		transports: ["websocket"],
		autoConnect: false,
	})
	// const socket = IO("https://tv23.herokuapp.com/live", {
	//   path: "/socket.io",
	//   transports: ["websocket"],
	//   autoConnect: false,
	// })
	
	btnJoinBroadcaster.onclick = function () {
		setModal(true)
	};
	
	if (liveStart) {
		setModal(false)
		const liveProps = {
			liveTitle: liveTitle || '',
			liveBody: liveBody || '',
			status: true
		}
		socket.connect()
		Axios.post('/live-status-update', liveProps)
		socket.emit('waiting', liveProps)
		
		user = {
			room: "TV23",
			name: "boburmirzo",
		}
		
		divConsultingRoom.style = "display: block"
		
		navigator.mediaDevices
		.getUserMedia(streamConstraints)
		.then(function (stream) {
			videoElement.srcObject = stream;
			socket.emit("register as broadcaster", user.room);
		})
		.catch(function (err) {
		});
		
	}
	
	// message handlers
	socket.on("new viewer", function (viewer) {
		rtcPeerConnections[viewer.id] = new RTCPeerConnection(iceServers)
		
		const stream = videoElement.srcObject
		stream
		.getTracks()
		.forEach((track) =>
		rtcPeerConnections[viewer.id].addTrack(track, stream)
		)
		
		rtcPeerConnections[viewer.id].onicecandidate = (event) => {
			if (event.candidate) {
				socket.emit("candidate", viewer.id, {
					type: "candidate",
					label: event.candidate.sdpMLineIndex,
					id: event.candidate.sdpMid,
					candidate: event.candidate.candidate,
				})
			}
		}
		
		rtcPeerConnections[viewer.id]
		.createOffer()
		.then((sessionDescription) => {
			rtcPeerConnections[viewer.id].setLocalDescription(sessionDescription)
			socket.emit("offer", viewer.id, {
				type: "offer",
				sdp: sessionDescription,
				broadcaster: user,
			})
		})
		.catch((error) => {
		})
	})
	
	socket.on("candidate", function (id, event) {
		var candidate = new RTCIceCandidate({
			sdpMLineIndex: event.label,
			candidate: event.candidate,
		})
		rtcPeerConnections[id].addIceCandidate(candidate)
	})
	
	socket.on("offer", function (broadcaster, sdp) {
		rtcPeerConnections[broadcaster.id] = new RTCPeerConnection(iceServers)
		
		rtcPeerConnections[broadcaster.id].setRemoteDescription(sdp)
		
		rtcPeerConnections[broadcaster.id]
		.createAnswer()
		.then((sessionDescription) => {
			rtcPeerConnections[broadcaster.id].setLocalDescription(
				sessionDescription
				)
				socket.emit("answer", {
					type: "answer",
					sdp: sessionDescription,
					room: user.room,
				})
			})
			
			rtcPeerConnections[broadcaster.id].ontrack = (event) => {
				videoElement.srcObject = event.streams[0]
			}
			
			rtcPeerConnections[broadcaster.id].onicecandidate = (event) => {
				if (event.candidate) {
					socket.emit("candidate", broadcaster.id, {
						type: "candidate",
						label: event.candidate.sdpMLineIndex,
						id: event.candidate.sdpMid,
						candidate: event.candidate.candidate,
					})
				}
			}
		})
		
		socket.on("answer", function (viewerId, event) {
			rtcPeerConnections[viewerId].setRemoteDescription(
				new RTCSessionDescription(event)
				)
			})
	}
		
		useEffect(() => {
			wrtc(liveStart, liveTitle, liveBody)
		},[liveStart, liveTitle, liveBody])
		
		return (
			<div
			className={st.container}
			style={{ background: dark ? "#0C0C0D" : "#F8F9FC" }}
			>
			<div className={st.topBar}>
			<div style={{ color: dark ? "#fff" : "#000" }} className={`${st.title_films} ${dark ? "" : st.black}`}>
			<h3>
			{Language[til].live.livePlayContainer.nowLive}
			<b>
			<span style={{ color: "red" }}>&#183;</span>
			</b>
			</h3>
			</div>
			<div className="live__left" onClick={() => {
				stopLive()
				window.location.reload()
			}}>
				<button className="live__btn">
				стоп Эфир 
				</button>
			</div>
			</div>
			<div id="playerRef" className={stLocal.playerArea}>
			<div id="consultingRoom"
			style={{ display: isVideo ? "flex" : "none", width: "100% !important"}}>
			<video className={stLocal.video} id="livePlayer" width="100%" height="100%" autoPlay style={{ objectFit: "cover" }}></video>
			</div>
			
			<div className={st.cover} style={{ display: isVideo ? "none" : "flex" }}>
			<img src={cover} alt="video_cover" />
			<div className={st.controlBtn}>
			<div onClick={() => setIsVideo(true)}>
			<button className={stLocal.btn} id="joinBroadcaster">{Language[til].live.livePlayContainer.startStream}</button>
			</div>
			</div>
			</div>
			</div>


			<div id="myModal" className={stLocal.modal} style={{display: modal ? 'block' : 'none'}}>

			<div className={stLocal.modal_content}>
				<span onClick={()=>setModal(false)} className={stLocal.close}>&times;</span>
				<input className="live__input" type="text" onKeyUp={(e)=>setLiveTitle(e.target.value)} placeholder="live title" />
				<br />
				<textarea className="live__textarea" onKeyUp={e=>setLiveBody(e.target.value)} style={{resize: 'none'}} cols="30" rows="10"></textarea>
				<br />
				{/* <input onChange={e => setLiveFile(e.target.files)} type="file" /> */}
				<button className='live__btn' onClick={()=>setLiveStart(true)}>Start</button>
			</div>

			</div>

			</div>
			)
		}
		