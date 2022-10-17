import { useState, useRef } from "react";
import goBack from "../../../assets/image/goBack.png";
import st from "./login.module.css";
import InputProfile from "../../elements/inputProfile/inputProfile";
import Button from "../../elements/button/button";
import { useTheme } from "../../../context/theme";
import {Link, useHistory, useParams} from "react-router-dom";
// eslint-disable-next-line
import {api, Axios} from "../../../services";
import Language from "../../../languages";
import { useLang } from "../../../context/lanuage.jsx";
import {useAuth} from "../../../context/user";

export default function SignIn() {
  const [dark] = useTheme();
  const language = useParams();
  const phoneRef = useRef();
  const passRef = useRef();
    // eslint-disable-next-line
  const [auth, setAuth] = useAuth()
  const [error, setError] = useState({
    isError: false,
    message: null,
  });
    // eslint-disable-next-line
  const history = useHistory()
  const [til] = useLang();

  async function handleSignIn() {
    try {
      console.log(passRef.current.value.length)
      if (phoneRef.current.value.length === 0 || passRef.current.value.length === 0){
          setError({ isError: true, message: 'Login yoki Parol bo\'sh bo\'lishi mumkin emas!' })
      }else if (passRef.current.value.length < 5){
          setError({ isError: true, message: 'Parol 6ta simvol yoki undan ko\'p bo\'lishi kerak' });
      }else {
          const res = await Axios.post('/login-user', {
              phoneNumber: phoneRef.current.value,
              password: passRef.current.value,
          });
          if (res.data && res.data.accessToken) {
              localStorage.setItem("Authorization", res.data.accessToken);
              setError({ isError: false, message: null });
              window.location.href = `/${language.lang || "ru"}`;
          }
      }
    } catch (error) {
        setError({ isError: true, message: "Login yoki parol xato" });
    }
  }

  const handleOnChange = () => setError({ isError: false, message: null });

  return (
    <div>
      <div className={st.navigation} onClick={() => {history.goBack()}}>
        <img src={goBack} alt="" />
      </div>
      <div className={st.title}>
        <div style={{ color: dark ? "" : "black" }}>
          {Language[til].auth.login.enter}
        </div>
        <Link to={`/${language.lang || "ru"}/sign-up`} className={st.regLink}>
          {Language[til].auth.login.register}
        </Link>
      </div>
      <InputProfile
        onChange={handleOnChange}
        isCorrect={!error.isError}
        reference={phoneRef}
        label={Language[til].auth.login.labelPhone}
      />
      <InputProfile
        onChange={handleOnChange}
        isCorrect={!error.isError}
        reference={passRef}
        label={Language[til].auth.login.labelPassword}
        isPass={true}
        type="password"
      />
      <div style={{ color: "red" }}>{error.isError ? error.message : " "}</div>
      <div onClick={handleSignIn}>
        <Button style={{ width: "100%", marginTop: "30px" }}>
          {Language[til].auth.login.enter}
        </Button>
      </div>
      <div className={st.buttonLink}>
        <Link to="#" style={{ color: "red" }}>
          {Language[til].auth.login.restorePassword}
        </Link>
      </div>
    </div>
  );
}
