import Navbar from "../../../component/navbar/navbar";
import st from "../auth.module.css";
import MaskLogin from "../../../assets/image/MaskLogin.png";
import CreateAccount from "../../../component/auth/createaccaunt/createaccaunt";
import EnterPassword from "../../../component/auth/enterpassword/enterpassword";
// import VerifyPhone from "../../../component/auth/verifyphone/verifyphone";

import { useLogin } from "../../../context/login";
import { useAuth } from "../../../context/user";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function SignUp() {
  const [login] = useLogin();
  const [auth] = useAuth();
  const language = useParams();

  useEffect(() => {
    if (typeof auth === "object" && auth) {
      window.location.href = `/${language.lang || "ru"}`;
    }
  }, [auth, language]);

  return (
    <>
      <div className={st.container}>
        <Navbar path="auth" />
        <div className={st.area}>
          <div className={st.fields}>
            {login && login.signUp === "password" ? (
              <EnterPassword />
            ) : login && login.signUp === "verify" ? (
              // <VerifyPhone />

              <></>
            ) : (
              <CreateAccount />
            )}
          </div>
          <div className={st.mask}>
            <img src={MaskLogin} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
