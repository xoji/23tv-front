import st from "./navbar.module.css";
import { useState } from "react";
import { useTheme } from "../../../context/theme";
import { Link, useParams } from "react-router-dom";
export default function Navbar({ data, type, text }) {
  const [active, setActive] = useState("");
  const [dark] = useTheme();
  const language = useParams();
  return (
    <>
      <div
        className={st.category_navbar}
        style={{ background: dark ? "#0C0C0D" : "#F8F9FC" }}
      >
        <div className={st.container}>
          <div className={st.items}>
            {type === "genres"
              ? data &&
                data.map((val, key) => (
                  <Link
                    to={`/${
                      language.lang || "ru"
                    }/genres/${val.genre_id}`}
                    id={val.genre_id}
                    onClick={(e) => setActive(e.target.id)}
                    key={key}
                    style={{
                      background: dark ? "rgba(17, 17, 18, 1)" : "#fff",
                    }}
                    className={`${st.nav_item} ${
                      val.genre_id === active ? st.active : ""
                    }`}
                  >
                    {val.genre_name}
                  </Link>
                ))
              : data &&
                data.map((val, key) => (
                  <Link
                    key={key}
                    to={`/${
                      language.lang || "ru"
                    }/categories/${val.category_name.toLowerCase()}`}
                    id={val.category_id}
                    onClick={(e) => setActive(e.target.id)}
                    style={{
                      background: dark ? "rgba(17, 17, 18, 1)" : "#fff",
                    }}
                    className={`${st.nav_item} ${
                      val.category_id === (text && text.category_id)
                        ? st.activeCategory
                        : ""
                    }`}
                  >
                    {val.category_name}
                  </Link>
                ))}
          </div>
        </div>
      </div>
    </>
  );
}
