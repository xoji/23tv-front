import st from './videoVolume.module.css'
import volumeIcon from '../../../assets/image/videoplayerVolumeIcon.png'
import volumeMutedIcon from '../../../assets/image/videoplayerVolumeMutedIcon.png'

export default function VideoVolume({ isMuted,setIsMuted,  volume=0.5, setVolume }) {
    const volumeDegree = new Array(10).fill(0)
    return (
        <div className={st.container}>
            <img onClick={setIsMuted} src={isMuted || volume===0  ? volumeMutedIcon :volumeIcon } alt="" />
            <div className={st.degree}>
               {volumeDegree.map((x,key)=>{
                   return (<div key={key} onMouseUp={()=>{setVolume((key+1)/10)}} onDrag={()=>{setVolume((key+1)/10)}} onMouseDown={()=>{setVolume((key+1)/10)}} style={{backgroundColor: (key+1)/10<=volume ? '#D7141D' : '#777777'}}></div>)
               }) }
            </div>
        </div>
    )
}
