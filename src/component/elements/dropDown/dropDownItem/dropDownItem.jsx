import st from './dropDownItem.module.css'
export default function DropDownItem({ children, onClick, style }) {
    
    return (
        <div onClick={onClick} style={style} className={st.dropdownItems}>{children}</div>
    )
}
