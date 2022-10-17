import st from "./comments.module.css";
import Button from "../elements/button/button";
import SliderCounterAdvanced from "../sliderCounter/SliderCounterAdvanced";
import { useEffect, useRef, useState } from "react";
import CommentItem from "./commentItem/commentItem";
import { useTheme } from "../../context/theme";
import Language from '../../languages'
import { useLang } from '../../context/lanuage.jsx'
// eslint-disable-next-line
import {api, Axios} from "../../services";
import { useAuth } from '../../context/user'

export default function Commenting({ film_id, api }) {
  const bodyRef = useRef();
  const [dark] = useTheme();
  const [comments, setComments] = useState([])
  const [ til ] = useLang()
  const [user] = useAuth()
  const [current, setCurrent] = useState(0);

  const settingSize = () => {
    setWidth(window.innerWidth);
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    settingSize();
    window.addEventListener("resize", settingSize);
    return function () {
      window.removeEventListener("resize", settingSize);
    };
  }, []);

  const [isValid, setIsValid] = useState(false);
  const changeHandler = (e) => {
    if (e.target.value === "") setIsValid(false);
    else setIsValid(true);
  };

  const clearHandle =()=>{
		bodyRef.current.value = ''
		setIsValid(false)
	}



	const addComment = async(e)=>{
	e.preventDefault()
		try {
			const res = await Axios.post(`add-comment`, {
				movieId: film_id,
				commentBody:bodyRef.current.value,
				userId:user && user.userId
			})
			if(res)clearHandle(); else window.alert('Error while commenting!!!')
		} catch (error) {
			
		}
	}

	async function GetComment(api, film_id){
		const res = await Axios.get('/comments?movieId='+ film_id)
		setComments(res.data.data)
	}

	useEffect(()=>{
		try {
			if (api && film_id) {
				GetComment(api, film_id)	
			}
		} catch (error) {
			
		}
	}, [api, film_id])


  return (
    <div className={st.container}>
      <div className={st.commentContainer}>
        <div className={st.comments}>
          <div style={{ color: dark ? "" : "black" }} className={st.title}>
            {Language[til].comments.comments.comments}
          </div>
          <div className={st.description}>
            {Language[til].comments.comments.leaveComment}
          </div>
          <CommentItem api={api} comment={comments[current]} />
          <div className={st.slider}>
            <SliderCounterAdvanced
              buttonNextStyle={{
                transform: width > 1025 ? "translate(130%, -100px)" : "",
                marginLeft: width > 1025 ? "" : "20px",
              }}
              buttonPrevStyle={{
                transform: width > 1025 ? "translate(-130%, -100px)" : "",
                marginRight: width > 1025 ? "" : "20px",
              }}
              counterStyle={{ display: "none" }}
              max={comments.length}
              current={current}
              setCurrent={setCurrent}
            />
          </div>
        </div>
        <div className={st.addComment}>
          <div style={{ color: dark ? "" : "black" }} className={st.label}>
            {Language[til].comments.comments.leaveComments}
          </div>

          <textarea
            onChange={changeHandler}
            ref={bodyRef}
            style={{ color: dark ? "" : "black" }}
            cols="30"
            rows="10"
          ></textarea>
          <div className={st.button}>
            <div onClick={isValid ? addComment : ()=>{}}>
              <Button
                style={{
                  backgroundColor: !isValid ? "#de7b80" : "",
                  paddingLeft: "40px",
                  paddingRight: "40px",
                }}
              >
                {Language[til].comments.comments.addComment}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
