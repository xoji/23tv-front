import goBack from "../../../assets/image/goBack.png";
import st from "./createaccaunt.module.css";
import InputProfile from "../../elements/inputProfile/inputProfile";
import Button from "../../elements/button/button";
import { useRef } from "react";
import { useLogin } from "../../../context/login";
import { Link, useParams } from "react-router-dom";
import Language from "../../../languages";
import { useLang } from "../../../context/lanuage.jsx";

export default function CreateAccount() {
  const [setLoginInfo] = useLogin(true);
  const phoneRef = useRef();
  const usernameRef = useRef();
  const ageRef = useRef();
  const language = useParams();
  const [til] = useLang();

  const handleInfo = () => {
    if (
      phoneRef.current.value &&
      usernameRef.current.value &&
      ageRef.current.value
    ) {
      setLoginInfo((state) => {
        return {
          ...state,
          user: {
            phone: phoneRef.current.value,
            username: usernameRef.current.value,
            age: ageRef.current.value,
          },
          signUp: "password",
        };
      });
    }
  };



  return (
    <div>
      <div className={st.navigation}>
        <img src={goBack} alt="" />
      </div>
      <div className={st.title}>
        <div>{Language[til].auth.createAccout.accoutToCreate}</div>
        <Link to={`/${language.lang || "ru"}/login`} className={st.regLink}>
          {Language[til].auth.createAccout.enter}
        </Link>
      </div>
      <InputProfile
        reference={phoneRef}
        label={Language[til].auth.createAccout.phoneNumber}
      />
      <InputProfile
        reference={usernameRef}
        label={Language[til].auth.createAccout.userName}
      />
      <InputProfile
        reference={ageRef}
        label={Language[til].auth.createAccout.age}
      />
      <div onClick={handleInfo}>
        <Button style={{ width: "100%", marginTop: "30px" }}>
          {Language[til].auth.createAccout.nextStep}
        </Button>
      </div>
    </div>
  );
}
