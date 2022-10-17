import st from "./ads.module.css"
import { useTheme } from "../../context/theme"
// eslint-disable-next-line
import { useEffect, useState } from "react"
// import {api, Axios} from "../../services"

export default function Ads() {
	const [dark] = useTheme()
    // eslint-disable-next-line
	const [ads, setAds] = useState({})
    // eslint-disable-next-line
    // async function ADS() {
	// 	try {
    //   const res = await Axios.get('/ads')
	// 	  setAds(res.data.data)
    // } catch (error) {
    //
    // }
	// }

  return (
    <>
    {
      ads && ads.ads_id && <div className={st.ads} style={{ background: dark ? "#0C0C0D" : "#F8F9FC" }}>
      <div className={st.container}>
        {/*<a href={`${ads.ads_link}`}>*/}
        {/*  <img src={`${api}/${ads.ads_path}`} alt="" height="20" />*/}
        {/*</a>*/}
      </div>
    </div>
    }
    </>
  )
}
