import Button from "../../elements/button/button"
import st from "./verifyphone.module.css"
import VerifyInput from "../../elements/verifyInput/verifyInput"
import { useTheme } from "../../../context/theme"
import { useState } from "react"
import { useLogin } from "../../../context/login"
// import firebase from "../../../context/firebase"
// import { auth } from "../../../context/firebase"
import Language from "../../../languages"
import { useLang } from "../../../context/lanuage.jsx"
import {Axios} from "../../../services"

export default function VerifyPhone({ recover }) {
  const [dark] = useTheme()
  const [userState] = useLogin()
  const [isSendSms] = useState(true)
  const [verifyCode, setVerfyCode] = useState({})
  const [til] = useLang()

  // const setupReCaptcha = () => {
  //   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
  //     "recaptcha-container",
  //     {
  //       size: "invisible",
  //       callback: response => {
  //         onSignInOnSubmit()
  //       },
  //     }
  //   )
  // }

  // const onSignInOnSubmit = async () => {
  //   setupReCaptcha()
  //   const appVerifier = window.recaptchaVerifier
  //   const phoneNumber = userState.user.phone
  //   try {
  //     const confirmationResult = await firebase
  //       .auth()
  //       .signInWithPhoneNumber(phoneNumber, appVerifier)
  //     console.log("confirmationResult", confirmationResult)
  //     window.confirmationResult = confirmationResult
  //   } catch (err) {
  //     // sms sent err
  //   }
  // }

  // if (recover) {
  //   checkVerification()
  // } else {
  //   checkVerification()
  // }

  const checkVerification = async () => {
    try {
      // await window.confirmationResult.confirm(verifyCode)
      const res = await Axios.post(`/create-user`, {
        username: userState.user.username,
        password: userState.user.password,
        age: userState.user.age - 0,
        phoneNumber: userState.user.phone,
      })
      const resData = res.data.accessToken
      if (resData) {
        localStorage.setItem("Authorization", resData)
        window.location.href = "/ru"
      }
    } catch (err) {}
  }

  // useEffect(() => {
  //   onSignInOnSubmit()
  // })

  return (
    <div>
      <div className={st.navigation}>
        <img src={""} alt="" />
        <div id="recaptcha-container"></div>
      </div>
      {isSendSms ? (
        <>
          <div style={{ color: dark ? "" : "black" }} className={st.title}>
            {Language[til].auth.verifyPhone.sentPassword}
          </div>
          <VerifyInput verifyCode={verifyCode} setVerfyCode={setVerfyCode} />
          <div className={st.buttonLink}>
            {Language[til].auth.verifyPhone.resend}
          </div>
          <div onClick={checkVerification}>
            <Button style={{ width: "100%", marginTop: "10px" }}>
              {Language[til].auth.verifyPhone.confirm}
            </Button>
          </div>
        </>
      ) : (
        <>
          {userState.user.phone}
          <div
            onClick={() => {
              // onSignInOnSubmit
            }}
          >
            <Button style={{ width: "100%", marginTop: "10px" }}>
              {Language[til].auth.verifyPhone.sendSms}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
