import st from "./following.module.css";
// import checkMark from "../../../assets/image/check-mark.png";
import { useTheme } from "../../../context/theme";
import {Axios} from "../../../services";
import {useState} from "react";
// import Language from '../../../languages'
// import { useLang } from '../../../context/lanuage'

export default function Following({ data }) {
  const [dark] = useTheme();
  // const [ til ] = useLang()
  const [message, setMessage] = useState('')
  const [isMessage, setIsMessage] = useState(false)
  const [isError, setIsError] = useState(false)
  const [month, setMonth] = useState([
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ])

    const buyHandler = async (amount, exp_data) => {
      try {
        const date = new Date()
        let exp = 0
        switch (exp_data) {
          case '15 days' :
            exp = 15
            break
          case '1 month':
            exp = 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate()
            break
          case '3 month':
            for (let i = 0; i < 3; i++) {
              exp = exp + (32 - new Date(date.getFullYear(), date.getMonth() + i, 32).getDate())
            }
            break
          case '6 month':
            for (let i = 0; i < 6; i++) {
              exp = exp + (32 - new Date(date.getFullYear(), date.getMonth() + i, 32).getDate())
            }
            break
          case '1 year':
            for (let i = 0; i < 12; i++) {
              exp = exp + (32 - new Date(date.getFullYear(), date.getMonth() + i, 32).getDate())
            }
            break
          default:
            exp = null
            break
        }
        const order = await Axios.post(`/new-subscribe/${exp}?amount=${amount}`, {
          userId: data.userId
        })
        if (order.status === 200) {
          setMessage(order.data.message)
          setIsMessage(true)
          setTimeout(() => {
            setIsMessage(false)
            window.location.reload()
          }, 2000)
        }
      } catch (e) {
        if (e.response) {
          setMessage(e.response.data.message)
          setIsMessage(true)
          setIsError(true)
          setTimeout(() => {
            setIsMessage(false)
            setIsError(false)
          }, 2000)
        }
      }
    }

    return (
    <div className={data.transaction ? st.container : `${st.container} ${st.margin}`}>
      {
        data.transaction ?
            <div className={st.activeCard} style={{background: dark ? '#111112' : 'white'}}>
              <h1 className={st.activeTitle} style={{color: dark ? '#fff' : 'black'}}>{data.transaction.amount} Сум</h1>
              <p className={st.activeDescription}>У вас есть доступ к примерам зарубежных фильмов и сериалов!</p>
              <span className={st.expDate} style={{color: dark ? '#fff' : 'black'}}>
                <b>Действует до:</b> {
                `${new Date(data.transaction.exp_date).getDate()} ${month[new Date(data.transaction.exp_date).getMonth()]} ${new Date(data.transaction.exp_date).getFullYear()}`
              }</span>
              <div className={st.activeMore}>
                <span className={st.moreText}>ACTIVE</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className={st.moreIcon}
                >
                  <path d="M243.8 339.8C232.9 350.7 215.1 350.7 204.2 339.8L140.2
                   275.8C129.3 264.9 129.3 247.1 140.2 236.2C151.1 225.3 168.9 225.3
                   179.8 236.2L224 280.4L332.2 172.2C343.1 161.3 360.9 161.3 371.8
                   172.2C382.7 183.1 382.7 200.9 371.8 211.8L243.8 339.8zM512 256C512
                   397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256
                   0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9
                   141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"
                  />
                </svg>
              </div>
            </div> :
            <>
              <div
                  className={st.box}
                  style={{ background: dark ? "#111112" : "white" }}
              >
                <h1 className={st.tarHeading} style={{ color: dark ? "#fff" : "#000" }}>15 дней</h1>
                <p className={st.tarDesc}>Вы получите доступ к примерам зарубежных фильмов и сериалов!</p>
                <span className={st.tarPrice} style={{ color: dark ? "#fff" : "#000" }}>7 000 сум</span>
                <button className={st.tarButton} onClick={() => buyHandler(7000, '15 days')}>Купить</button>
              </div>
              <div
                  className={st.box}
                  style={{ background: dark ? "#111112" : "white" }}
              >
                <h1 className={st.tarHeading} style={{ color: dark ? "#fff" : "#000" }}>1 мес.</h1>
                <p className={st.tarDesc}>Вы получите доступ к примерам зарубежных фильмов и сериалов!</p>
                <span className={st.tarPrice} style={{ color: dark ? "#fff" : "#000" }}>15 000 сум</span>
                <button className={st.tarButton} onClick={() => buyHandler(15000, '1 month')}>Купить</button>
              </div>
              <div
                  className={st.box}
                  style={{ background: dark ? "#111112" : "white" }}
              >
                <h1 className={st.tarHeading} style={{ color: dark ? "#fff" : "#000" }}>3 мес.</h1>
                <p className={st.tarDesc}>Вы получите доступ к примерам зарубежных фильмов и сериалов!</p>
                <span className={st.tarPrice} style={{ color: dark ? "#fff" : "#000" }}>42 000 сум</span>
                <button className={st.tarButton} onClick={() => buyHandler(42000, '3 month')}>Купить</button>
              </div>
              <div
                  className={st.box}
                  style={{ background: dark ? "#111112" : "white" }}
              >
                <h1 className={st.tarHeading} style={{ color: dark ? "#fff" : "#000" }}>6 мес.</h1>
                <p className={st.tarDesc}>Вы получите доступ к примерам зарубежных фильмов и сериалов!</p>
                <span className={st.tarPrice} style={{ color: dark ? "#fff" : "#000" }}>77 000 сум</span>
                <button className={st.tarButton} onClick={() => buyHandler(77000, '6 month')}>Купить</button>
              </div>
              <div
                  className={st.box}
                  style={{ background: dark ? "#111112" : "white" }}
              >
                <h1 className={st.tarHeading} style={{ color: dark ? "#fff" : "#000" }}>1 год</h1>
                <p className={st.tarDesc}>Вы получите доступ к примерам зарубежных фильмов и сериалов!</p>
                <span className={st.tarPrice} style={{ color: dark ? "#fff" : "#000" }}>100 000 сум</span>
                <button className={st.tarButton} onClick={() => buyHandler(100000, '1 year')}>Купить</button>
              </div>
              <div
                  className={isMessage ?
                      isError ?
                          `${st.messageBox} ${st.errorMessage} ${st.activeMessage}` :
                          `${st.messageBox} ${st.message} ${st.activeMessage}` :
                      st.messageBox}
              >
                <p className={st.messageText}>{message}</p>
              </div>
            </>
      }
    </div>
  );
}
