import st from "./enterpassword.module.css";
import goBack from "../../../assets/image/goBack.png";
import InputProfile from "../../elements/inputProfile/inputProfile";
import Button from "../../elements/button/button";
import { useTheme } from "../../../context/theme";
import { useLogin } from "../../../context/login";
import { useEffect, useRef } from "react";
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage.jsx'
// eslint-disable-next-line
import {api, Axios} from "../../../services"

export default function EnterPassword() {
  const [dark] = useTheme();
  const [userState, setUserState] = useLogin();
  const [ til ] = useLang()

  useEffect(() => {
    if (userState.user.username === "" || userState.user.phone === "") {
      setUserState({ openPassword: false });
    }
  }, [userState, setUserState]);

  const pass1Ref = useRef();
  const pass2Ref = useRef();

  const handlePassword = async() => {
    const result = validate(pass1Ref.current.value, pass2Ref.current.value);
    if (result.isValid) {

      // setUserState(function (state) {
      //   return {
      //     ...state,
      //     user: {
      //       ...state.user,
      //       password: pass1Ref.current.value,
      //     },
      //     signUp: "verify",
      //   };
      // });

      const res = await Axios.post('/create-user', {
        username: userState.user.username,
        password: pass1Ref.current.value,
        age: userState.user.age - 0,
        phoneNumber: userState.user.phone,
      })
      const resData = res.data.accessToken
      if (resData) {
        localStorage.setItem("Authorization", resData)
        window.location.href = "/ru"
      }
    }
  };

  const validate = (pass1, pass2) => {
    var isValid = false;
    var message = null;
    if (pass1 === "" || pass2 === "") {
      message = Language[til].auth.enterPassword.validateMessage1;
    } else {
      if (pass1 === pass2) {
        isValid = true;
        message = null;
      } else {
        message = Language[til].auth.enterPassword.validateMessage2;
      }
    }
    return {
      isValid: isValid,
      message: message,
    };
  };

  const handleChange = () => {
    const result = validate(pass1Ref.current.value, pass2Ref.current.value);
    if (result.isValid) {
      setUserState(function (state) {
        return {
          ...state,
          error: {
            isError: false,
            message: result.message,
          },
        };
      });
    } else {
      if (pass1Ref.current.value && pass2Ref.current.value) {
        setUserState(function (state) {
          return {
            ...state,
            error: {
              isError: true,
              message: result.message,
            },
          };
        });
      }
    }
  };

  return (
    <div>
      <div className={st.navigation}>
        <img
          src={goBack}
          onClick={() =>
            setUserState({
              signUp: "",
            })
          }
          alt=""
        />
      </div>
      <div style={{ color: dark ? "" : "black" }} className={st.title}>
        {" "}
        {Language[til].auth.enterPassword.createPassword}
      </div>
      <div className={st.description}>
        {" "}
        {Language[til].auth.enterPassword.securePassword}
      </div>
      <InputProfile
        onKeyUp={handleChange}
        reference={pass1Ref}
        type="password"
        isPass={true}
        label={Language[til].auth.enterPassword.passwordLabel}
      />
      <InputProfile
        onKeyUp={handleChange}
        reference={pass2Ref}
        type="password"
        isPass={true}
        label={Language[til].auth.enterPassword.passwordAgainLabel}
      />

      <div onClick={handlePassword}>
        <Button
          style={{
            width: "100%",
            marginTop: "20px",
            cursor: userState.error.isError ? "not-allowed" : "pointer",
            background: userState.error.isError ? "#e4888c" : "",
          }}
        >
          {Language[til].auth.enterPassword.register}
        </Button>
      </div>
    </div>
  );
}
