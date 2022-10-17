import st from './account.module.css'
import { Redirect, Route } from 'react-router'
import Footer from '../../component/footer/footer'
import Navbar from '../../component/navbar/navbar'
import Profile from '../../component/user/profile/profile'
import maskProfile from '../../assets/image/maskProfile.png'
import Following from '../../component/user/following/following'
import History from '../../component/user/history/history'
import ProfileSideBar from '../../component/user/profileSideBar/profileSideBar'
import Payment from "../../component/user/payment/payment";
import { useParams } from 'react-router-dom'
import { useAuth } from '../../context/user'
import { useEffect, useState } from 'react'
import {api, Axios} from '../../services'
export default function Settings() {
    const language = useParams()
    const [auth] = useAuth()
    const [response, setResponse] = useState({})

    useEffect(()=>{
        if (auth === 400) {
            localStorage.removeItem('Authorization')
            window.location.href = `/${language.lang || 'ru'}/login`
        } else {
            setResponse(auth)
        }
    },[auth,language])

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
              setResponse(res.data.data)
              window.location.reload()
          }
        } catch (error) {
            
        }
    }

    return (
        <>
            <Navbar />
            <div className={st.mask}>
                <img src={maskProfile} alt="" />
                <div className={st.imageAvatar}>
                    <div
                    className={st.usernameBox}>{auth && auth.userName}</div>
                    <label htmlFor="uploadUser" style={{cursor: 'pointer'}}>
                        <img style={{borderRadius: '50%'}}
                        src={`${api}/${auth && auth.userPath}`} alt="" width="50" height="50" />
                    </label>
                    <input onChange={updateUserPic} type="file" accept="image/*" name="" id="uploadUser" hidden />
                </div>
            </div>
            <div className={st.contentContainer}>
                <div className={st.content}>
                    <Route path='/'><Redirect to={`/${language.lang || 'ru'}/settings/profile`}/></Route>
                    <Route path={`/${language.lang || 'ru'}/settings/profile`}>
                        <Profile data={response} />
                    </Route>
                    <Route path={`/${language.lang || 'ru'}/settings/follow`}>
                        <Following data={response} />
                    </Route>
                    <Route path={`/${language.lang || 'ru'}/settings/payment`}>
                        <Payment data={response} />
                    </Route>
                    <Route path={`/${language.lang || 'ru'}/settings/history`} component={History} />
                </div>
                <div className={st.sidebar}>
                    <ProfileSideBar />
                </div>
            </div>
            <Footer />
        </>
    )
}
