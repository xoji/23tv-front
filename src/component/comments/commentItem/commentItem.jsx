import st from './commentItem.module.css'
import { useTheme } from '../../../context/theme'
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage.jsx'

export default function CommentItem({ comment, api }) {
    const [dark] = useTheme()
    const [ til ] = useLang()

    return (
        <div  className={st.container} style={{color: dark ? '' : '#666'}}>
            {
            comment ? <>
            <div style={{color: dark ? '' : '#000'}} className={st.author}>
                <div className={st.avatar}>
                    <img src={`${api}/${comment.user_path || 'users/user-default.png'}`} alt="avatar" width="45" />
                </div>
                <div className={st.username}>
                    {comment.user_username}
                </div>
            </div>
            <div className={st.divider}></div>
            <div className={st.comment}>{comment.comment_body}</div>
            </> : <div className="">{Language[til].comments.commentItem.noComment}</div>
            }
        </div> 
    )
}
