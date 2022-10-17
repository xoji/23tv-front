import { useState, useRef, useEffect } from "react";
import st from "./profile.module.css";
import InputProfile from "../../../component/elements/inputProfile/inputProfile";
import { useTheme } from "../../../context/theme";
import logout from "../../../assets/image/logoutred.png";
import { useParams } from "react-router-dom";
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'
import { useAuth } from '../../../context/user'
import { api, Axios} from "../../../services";
export default function Profile({ data }) {
  const inputRef = useRef();
  const [dark] = useTheme();
  const [isEdit, setIsEdit] = useState(false);
  const [oldPassword, setOldPassword] = useState('')
  const [username, setUsername] = useState('')
  const [age, setAge] = useState('')
  const [newPassword, setNewPassword] = useState()
  const [update, setUpdate] = useState(false)
  const [IsOpenPass, setIsOpenPass] = useState(false);
  const language = useParams();
  const [ til ] = useLang()
  const [userData, setUserData] = useAuth()

  useEffect(() => {
    setIsOpenPass(false);
  }, [isEdit])

  const textStyle = {
    color: dark ? "#fff" : "#000",
  }

  async function updateUserPassword(data) {
	await Axios.post('/update-user-password', data, {
		headers: {
			Authorization: localStorage.getItem('Authorization')
		}
	})
  }
  
  async function updateUserData(data) {
	const res = await Axios.post('/update-user-data', data, {
		headers: {
			Authorization: localStorage.getItem('Authorization')
		}
	})
	setUserData(res.data.data)
  }

  async function updateUserPic(e) {
	  try {
		if(window.confirm('Do you want to update avatar')) {
			let data = new FormData()
			data.append('file', e.target.files[0])
			const res = await Axios.post('/update-user-ava', data, {
				headers: {
				Authorization: localStorage.getItem('Authorization')
				}
			})
			setUserData(res.data.data)
			window.location.reload()
		}
	  } catch (error) {
		  
	  }
  }



  return (
    <div style={{ background: dark ? "#0C0C0D" : "" }} className={st.container}>
		<label htmlFor="updateUser" style={{cursor: 'pointer'}}>
      	<img style={{borderRadius: '50%'}}
		  src={`${api}/${userData && userData.userPath}`} width="90" height="90" className={st.profileImage} alt="" />
		</label>
		<input onChange={updateUserPic} type="file" accept="image/*" name="" id="updateUser" hidden />
      <div className={st.mainContainer} style={{ display: isEdit ? "none" : "" }}>
        <div className={st.mainInfo}>
          <div style={textStyle} className={st.nickName}>
          {Language[til].user.profile.nickname}: {data && data.userName}
          </div>
          <div className={st.pairs}>
            <div className={st.key}>{Language[til].user.profile.balans}:</div>
            <div style={textStyle} className={st.val}>
              {" "}{data ? data.balance : ''}
              {Language[til].user.profile.price}
            </div>
          </div>
        </div>
        <div className={st.addInfo}>
          <div className={`${st.pairs} ${st.pairsBottom}`}>
            <div className={st.key}>{Language[til].user.profile.phoneNumber}: </div>
            <div className={st.val} style={textStyle}>
              {data && data.userTel}
            </div>
          </div>
          <div className={st.pairs}>
            <div className={st.key}>{Language[til].user.profile.age}: </div>
            <div className={st.val} style={textStyle}>
				{data && data.age}
            </div>
          </div>
        </div>

        <div className={st.actions}>
          <div className={st.pairs}>
            <div className={st.key}>{Language[til].user.profile.idNumber}: </div>
            <div style={{ color: dark ? "#fff" : "#000" }} className={st.val}>
                {data ? data.balance_id : ''}
            </div>
          </div>
          <div>
            <div
              onClick={() => {
                setIsEdit((x) => !x);
              }}
              className={st.buttonLink}
            >
              {Language[til].user.profile.editProfile}
            </div>
            <div
              className={st.logoutBtn}
              onClick={() => {
                localStorage.removeItem("Authorization");
                window.location.href = `/${language.lang || "ru"}/login`;
              }}
            >
              <img src={logout} alt="logout" /> {Language[til].user.profile.exit}
            </div>
          </div>
        </div>
      </div>

      <div
        className={st.editContent}
        style={{ display: isEdit ? " " : "none" }}
      >
        <div className={st.mainInput}>
          {/* reference prop is give access input value - reference attributi inputning attributelariga kirish imkonini beradi */}

          <div style={{ width: "50%", paddingRight: "20px" }}>
            <InputProfile placeHolder={userData && userData.userName} onKeyUp={e =>{
				setUsername(e.target.value)
			}}
			value={username}
			reference={inputRef} label={Language[til].user.profile.nameLabel} />
          </div>
          <div style={{ width: "50%", paddingLeft: "20px" }}>
            <InputProfile placeHolder={userData && userData.userTel} disabled={true}
            label={Language[til].user.profile.numberLabel} />
          </div>
          <div style={{ width: "50%", paddingRight: "20px" }}>
            <InputProfile placeHolder={userData && userData.age} onKeyUp={e => {
				setAge(e.target.value)
			}}
			value={age}
            label={Language[til].user.profile.age} />
          </div>
        </div>
        <div style={{ display: IsOpenPass ? "" : "none" }}>
          <div
            style={{
              ...textStyle,
              ...{ marginTop: "20px", marginBottom: "10px" },
            }}
            className={st.setPass}>
            Установить новый пароль
          </div>
          <div className={st.setPass}>
            <div style={{ width: "50%", paddingRight: "20px" }}>
              <InputProfile
                type="password"
                isPass={true}
				onKeyUp={(e)=>setOldPassword(e.target.value)}
                label={Language[til].user.profile.oldPassword}
              />
            </div>
            <div style={{ width: "50%", paddingRight: "20px" }}>
              <InputProfile
			  onKeyUp={e => setNewPassword(e.target.value)}
                type="password"
                isPass={true}
                label={Language[til].user.profile.setNewPassword}
              />
            </div>
            <div style={{ width: "50%", paddingRight: "20px" }}>
              <InputProfile
                type="password"
				onKeyUp={ e => {
					if (e.target.value !== '') {
						setUpdate(e.target.value === newPassword)
					} else {
						setUpdate(false)
					}
				}}
                isPass={true}
                label={Language[til].user.profile.retypeNewPassword}
              />
            </div>
          </div>
        </div>
        <div className={st.actions}>
          <div
            onClick={() => {
              setIsOpenPass(true);
            }}
            className={st.buttonLink}
            style={{
              display: IsOpenPass ? "none" : " ",
              marginLeft: 0,
              marginRight: "auto",
            }}
          >
            {Language[til].user.profile.labelPassword}
          </div>
          <div
            onClick={() => {
              setIsEdit((x) => !x)

				if (username.length > 1 && age.length > 0 && data && data.userId) {
					const data1 = {
						userId: data && data.userId,
						username,
						userAge: age
					}
					updateUserData(data1)
				}

			  if (update) {
				const data = {
					newPassword: newPassword,
					oldPassword: oldPassword
				}
				updateUserPassword(data)
			  }
            }}
            className={st.buttonLink}
          >
            {Language[til].user.profile.save}
          </div>
        </div>
      </div>
    </div>
  );
}
