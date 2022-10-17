import st from './header.module.css'
import filterIcon from '../../../assets/logo/filer-icon.svg'
import filterIconDark from '../../../assets/logo/filter-icon-light.svg'
import { useTheme } from '../../../context/theme'
import { useFilter } from '../../../context/filter'
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage.jsx'

export default function Header({ allCategory, text }) {
  const [dark] = useTheme()
  const [ til ] = useLang()
  const [open, setOpen] = useFilter()

  return (
    <div
    style={{ display: (allCategory === 'all') && 'none', background: dark ? '#0C0C0D':"#F8F9FC" }}
    className={st.container}>
      <div className={st.row_container} style={{borderBottom: dark  ? '1px solid #777777' : '1px solid #1111113f'}}>
		<div style={{color: dark ? '#fff':"#111112"}} className={st.title_category}>
			{ text || Language[til].categories.categoryHeader.categories }
		</div>
		
		<div className={st.favourites} onClick={()=> setOpen(!open)}>
			<img src={dark ? filterIcon : filterIconDark} alt="" />
		</div>

	  </div>
    </div>
  )
}
