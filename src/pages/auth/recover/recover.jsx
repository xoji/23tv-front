import st from "../auth.module.css";
import Navbar from "../../../component/navbar/navbar";
import MaskLogin from "../../../assets/image/MaskLogin.png";
import Recover from "../../../component/auth/recover/recover";
import VerifyPhone from "../../../component/auth/verifyphone/verifyphone";
import { useAuth } from "../../../context/user";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useLogin } from "../../../context/login";

export default function Recovery() {
  const [auth] = useAuth();
  const language = useParams();
  const [login] = useLogin();

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
            {login && login.recovery === "rocover" ? (
              <VerifyPhone />
            ) : (
              <Recover />
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
