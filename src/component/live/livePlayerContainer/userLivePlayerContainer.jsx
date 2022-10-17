import { useCallback, useState, useEffect } from "react";
import st from "../../movie/moviePlayerContainer/moviePlayerContainer.module.css";
import stLocal from "./livePlayerContainer.module.css";
import { useTheme } from "../../../context/theme";
import cover from "../../../assets/bg/client.JPG";
import Button from "../../elements/button/button";
import IO from "socket.io-client";
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'

export default function UserLivePlayerContainer({ movie, api }) {
  const [ til ] = useLang()
  const [dark] = useTheme();
  const [isVideo, setIsVideo] = useState(false);
  const [, setPlayerHeight] = useState("");
  const [collapseDesc, setCollapseDesc] = useState(false);
  const descStyle = {
    height: !collapseDesc ? 48 + "px" : "auto",
  };
  const setCollapse = () => setCollapseDesc(!collapseDesc);
  const settingSize = () => {
    var playerRef = document.getElementById("playerRef");
    setPlayerHeight((playerRef.offsetWidth * 480) / 854);
  };

  useCallback(() => {
    window.addEventListener("load", settingSize);
    window.addEventListener("resize", settingSize);
    return () => {
      window.addEventListener("load", settingSize);
      window.addEventListener("resize", settingSize);
    };
  }, []);

  useEffect(() => {
    if (api) {
      Live(api)
    }
  },[api])

  function Live(api) {
    // getting dom elements
    const btnJoinViewer = document.getElementById("joinViewer")
    const videoElement = document.getElementById("liveVideo")

    // variables
    let user;
    let rtcPeerConnections = {};

    // constants
    const iceServers = {
      iceServers: [
        { urls: "stun:stun.services.mozilla.com" },
        { urls: "stun:stun.l.google.com:19302" },
      ],
    };

    // Let's do this 💪
    // const socket = IO('http://localhost:4000/live', { path: '/socket.io', transports: ["websocket"], autoConnect: false })
    const check = (api === 'https://23tv.uz/api')
		const socket = IO(check ? 'https://23tv.uz/live' : api + '/live', {
      path: "/socket.io",
      transports: ["websocket"],
      autoConnect: true,
    });

    // const socket = IO("https://tv23.herokuapp.com/live", {
    //   path: "/socket.io",
    //   transports: ["websocket"],
    //   autoConnect: true,
    // });

    socket.on("waiting", data => {
		// console.log(data);
	});

    btnJoinViewer.onclick = function () {
      socket.connect();
      user = {
        room: "TV23",
        name: "someone",
      };

      socket.emit("register as viewer", user);
    };

    // message handlers
    socket.on("new viewer", function (viewer) {
      rtcPeerConnections[viewer.id] = new RTCPeerConnection(iceServers);

      const stream = videoElement.srcObject;
      stream
        .getTracks()
        .forEach((track) =>
          rtcPeerConnections[viewer.id].addTrack(track, stream)
        );

      rtcPeerConnections[viewer.id].onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", viewer.id, {
            type: "candidate",
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          });
        }
      };

      rtcPeerConnections[viewer.id]
        .createOffer()
        .then((sessionDescription) => {
          rtcPeerConnections[viewer.id].setLocalDescription(sessionDescription);
          socket.emit("offer", viewer.id, {
            type: "offer",
            sdp: sessionDescription,
            broadcaster: user,
          });
        })
        .catch((error) => {
        });
    });

    socket.on("candidate", function (id, event) {
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: event.label,
        candidate: event.candidate,
      });
      rtcPeerConnections[id].addIceCandidate(candidate);
    });

    socket.on("offer", function (broadcaster, sdp) {
      rtcPeerConnections[broadcaster.id] = new RTCPeerConnection(iceServers);

      rtcPeerConnections[broadcaster.id].setRemoteDescription(sdp);

      rtcPeerConnections[broadcaster.id]
        .createAnswer()
        .then((sessionDescription) => {
          rtcPeerConnections[broadcaster.id].setLocalDescription(
            sessionDescription
          );
          socket.emit("answer", {
            type: "answer",
            sdp: sessionDescription,
            room: user.room,
          });
        });

      rtcPeerConnections[broadcaster.id].ontrack = (event) => {
        videoElement.srcObject = event.streams[0];
      };

      rtcPeerConnections[broadcaster.id].onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("candidate", broadcaster.id, {
            type: "candidate",
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate,
          });
        }
      };
    });

    socket.on("answer", function (viewerId, event) {
      rtcPeerConnections[viewerId].setRemoteDescription(
        new RTCSessionDescription(event)
      );
    });
  }

  const coverBtnStyle = {
    marginBottom: "20px",
    width: "200px",
  };

  return (
    <div
      className={st.container}
      style={{ background: dark ? "#0C0C0D" : "#F8F9FC" }}
    >
      <div className={st.topBar}>
        <div
          style={{ color: dark ? "#fff" : "#000" }}
          className={`${st.title_films} ${dark ? "" : st.black}`}
        >
          <h3>
            {Language[til].live.userLivePlayerContainer.nowLive}
            <b>
              <span style={{ color: "red" }}>&#183;</span>
            </b>
          </h3>
        </div>
      </div>

      <div id="playerRef" className={stLocal.playerArea}>
        <video className={stLocal.video} id="liveVideo" autoPlay width="100%" height="100%" style={{ display: isVideo ? "flex" : "none", objectFit: "cover" }}></video>
        <div className={st.cover} style={{ display: isVideo ? "none" : "flex" }}>
          <img src={cover} alt="video_cover" />
          <div className={st.controlBtn}>
            <div onClick={() => setIsVideo(true)} id="joinViewer">
              <Button style={coverBtnStyle}>{Language[til].live.userLivePlayerContainer.watchByFollow}</Button>
            </div>
          </div>
        </div>
      </div>

      <div className={st.topBar}>
        <div className={`${st.additional_functions} ${dark ? "" : st.black}`}></div>
      </div>
      <div style={descStyle} className={stLocal.description}>
        <p style={{ color: dark ? "" : "black" }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in ...
        </p>
        <div onClick={setCollapse} style={{ color: dark ? "" : "black" }}>
          Ochish
        </div>
      </div>
    </div>
  );
}
