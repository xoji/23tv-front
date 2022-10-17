import { NavLink, useParams } from "react-router-dom";
import logout from "../../../assets/image/logout.png";
import { useTheme } from "../../../context/theme";
import st from "./profileSideBar.module.css";
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'
import {useAuth} from "../../../context/user";
import {Axios} from "../../../services";

export default function ProfileSideBar() {
  const [dark] = useTheme();
  const [ til ] = useLang()
  const language = useParams();
// eslint-disable-next-line
  const [userData, setUserData] = useAuth()
  const pay = async () => {
    const amount = 1000
    const order = await Axios.post('/create-order', {
      user_id: userData.userId,
      amount: amount
    })
    const orderId = order.data.data.order_id


    // eslint-disable-next-line no-undef
    // createPaymentRequest({
    //   service_id: 19359,
    //   merchant_id: 13902,
    //   amount: amount,
    //   MERCHANT_TRANS_ID: orderId,
    //   transaction_param: `${userData.userId}`,
    //   merchant_user_id: "21954"
    // }, (data) => {
    //   console.log("closed", data.status);
    // });
  }
  return (
    <div
      style={{ background: dark ? "black" : "white" }}
      className={st.container}
    >
      <ul className={st.sidebarLinks}>
        <li>
          <NavLink
            activeClassName={dark ? st.sideLinkActive : st.sideLinkActiveDark}
            className={dark ? st.sideLink : st.sideLinkLight}
            to={`/${language.lang || "ru"}/settings/profile`}
          >
            {Language[til].user.profileSidebar.accaunt}
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={dark ? st.sideLinkActive : st.sideLinkActiveDark}
            className={st.sideLink}
            to={`/${language.lang || "ru"}/settings/follow`}
          >
            {Language[til].user.profileSidebar.follow}
          </NavLink>
        </li>
        <li style={{cursor: "pointer"}}>
          <NavLink
            activeClassName={dark ? st.sideLinkActive : st.sideLinkActiveDark}
            className={st.sideLink}
            to={`/${language.lang || "ru"}/settings/payment`}
          >
            {Language[til].user.profileSidebar.payment}
          </NavLink>
        </li>
        <li>
          <NavLink
            activeClassName={dark ? st.sideLinkActive : st.sideLinkActiveDark}
            className={st.sideLink}
            to={`/${language.lang || "ru"}/settings/history`}
          >
            {Language[til].user.profileSidebar.history}
          </NavLink>
        </li>
      </ul>
      <div
        style={{ cursor: "pointer" }}
        className={st.exitbtn}
        onClick={() => {
          localStorage.removeItem("Authorization");
          window.location.href = `/${language.lang || "ru"}/login`;
        }}
      >
        <img src={logout} alt="logout" /> {Language[til].user.profileSidebar.exit}
      </div>
    </div>
  );
}
