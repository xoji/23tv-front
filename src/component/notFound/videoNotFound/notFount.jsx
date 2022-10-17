import { useTheme } from "../../../context/theme";
import st from "./notFound.module.css";
import Language from '../../../languages'
import { useLang } from '../../../context/lanuage'

export default function NoFoundVideos() {
  const [dark] = useTheme();
  const [ til ] = useLang()

  return (
    <div className={st.container}>
      <div className={st.text} style={{ color: dark ? " " : "black" }}>
      {Language[til].notfound.videoNotFound}
      </div>
    </div>
  );
}
