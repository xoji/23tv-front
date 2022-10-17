import st from "./navbar.module.css";
import logo from "../../assets/logo/23tv_logo.svg";
import xIcon from "../../assets/logo/close_icon.svg";
import xIconDark from "../../assets/logo/close_icon_light.svg";
import fontIcon from "../../assets/logo/font_icon.svg";
import sunIconForLight from "../../assets/logo/sun_light_icon.svg";
import sunIcon from "../../assets/logo/sun_icon.svg";
import userIcon from "../../assets/logo/user_icon.svg";
import searchIconBlack from "../../assets/logo/search_icon_white.svg";
import searchIcon from "../../assets/logo/search_icon.svg";
import menuOpen from "../../assets/logo/menu_icon.svg";
import menuOpenLight from "../../assets/logo/menu_icon_light.svg";
import MovieItem from '../movie/movieItem/movieItem'
import SearchNotFound from '../notFound/SearchNotFound/notFound'
import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "../../context/theme";
import {Axios} from "../../services";
import Language from '../../languages'
import { useLang } from '../../context/lanuage'

function Navbar({ login, path }) {
	const [isOpenSearch, setIsOpenSearch] = useState(false);
	const [isOpen, setIsOpen] = useState();
	const componentRef = useRef();
	const [dark, setDark] = useTheme();
	const [lang, setLang] = useLang();
	const [fontType, setFontType] = useState("MEDIUM");
	const [reload, setReload] = useState(false);
	const language = useParams();
	const [loading, setLoading] = useState(false)
	const [movies, setMovies] = useState([])
  	const [burger, setBurger] = useState(false)
	const [isAuth, setIsAuth] = useState(false)
    const [ til ] = useLang()
	//toggle dark or light mode  and write localstorage

	const toggleDark = () => {
	setDark((x) => {
		window.localStorage.setItem("dark_mode", !x ? 1 : 0);
		return !x;
	});
	};
	useEffect(() => {
		const auth = localStorage.getItem('Authorization')
		if (auth) {
			setIsAuth(true)
		} else {
			setIsAuth(false)
		}
	}, [isAuth])

	useEffect(() => {
	if (reload) {
		window.location.reload();
		setReload(false);
	}
	}, [reload]);

	const miniMenuStyle = {
	transition: " all .3s ease",
	transform: isOpen ? "translate(0, 0 )" : "translate(-20px, 0) ",
	visibility: isOpen ? "visible" : "hidden",
	opacity: isOpen ? 1 : 0,
	userSelect: "none",
	};

	useEffect(() => {
	function handleClickOutside(event) {
		if (
		componentRef.current &&
		!componentRef.current.contains(event.target) &&
		isOpen
		) {
		setIsOpen(false);
		}
	}

	document.addEventListener("mousedown", handleClickOutside);
	return () => {
		document.removeEventListener("mousedown", handleClickOutside);
	};
	}, [componentRef, isOpen, setIsOpen]);

	const searchStyle = {
	transition: "opacity .3s ease-in-out",
	position: isOpenSearch ? "fixed" : "",
	top: isOpenSearch ? "0" : "initial",
	left: isOpenSearch ? "0" : "initial",
	zIndex: isOpenSearch ? 9999 : "",
	height: isOpenSearch ? "100vh" : "",
	width: isOpenSearch ? "100%" : "",
	opacity: isOpenSearch ? ".9" : "",
	background: dark ? "#0C0C0D" : "#F8F9FC",
	};

	const handleSearch = () => {
	setIsOpenSearch((x) => !x);
	};
	useEffect(() => {
	if (isOpenSearch)
		window.onscroll = function () {
		window.scrollTo(null, null);
		}

	else window.onscroll = function () {};
	}, [isOpenSearch]);

	const fontChange = (size) => {
		var domElements = document.querySelectorAll(
			"a, p, div, h1, h2, h3, h4, h5, h6"
		);
		for (let i = 0; i < domElements.length; i++) {
			switch (size) {
			case "SMALL":
				domElements[i].style.fontSize = "12px";
				break;
			case "LARGE":
				domElements[i].style.fontSize = "18px";
				break;
			default:
				domElements[i].style.fontSize = "";
			}
		}
		setFontType(size)
	}

	async function searchIngineOnKeyUpHandler(e) {
		if (e.target.value.trim() !== '') {
			setLoading(true)
			try {
				// const res = await Axios.post('/search-movie', {
				// 	searchValue: e.target.value.toLowerCase(),
				// }, {
				// 	headers: {
				// 		Language: localStorage.getItem('lang')
				// 	}
				// })
        const res = await Axios.get(`/movie-filter?search=${e.target.value}`)
				setMovies(res.data.data)
				// console.log(res.data.data)
			} catch (err) {
			}
			setLoading(false)

		} else {
			setMovies([])
		}
	}

  return (
    <section style={searchStyle}>
      <div className={st.container}>
        <nav className={st.nav}>
          <Link className={st.logo_link} to={`/${language.lang || "ru"}`}>
            <img src={logo} alt="logo" />
          </Link>
          {path !== "auth" && (
            <>
              <div className={burger ? st.burger_active : st.burger}
                onClick={() => {
                  setBurger(!burger)
                }}
              >
              <span />
            </div>
              <ul
                style={{ 
                  transition: 'all ease 0.5s',
                  width: isOpenSearch ? "0" : "",
                  maxHeight: burger ? '100vh' : ''
               }}
                className={st.navbar}
              >
                <li className={st.navbar_link_item + ' ' + st.sub_li_elem}>
                  <span className={st.nav_menu}>{Language[til].navbar.movies}</span>
				  <ul className={st.sub_menu}>
					  <li className={st.sub_menu_item}>
						  <Link to={`/${language.lang || "ru"}/categories/узбекские%20фильмы`} className={st.sub_menu_links}>
							  {Language[til].navbar.uzb_films}
						  </Link>
					  </li>
					  <li className={st.sub_menu_item}>
						  <Link to={`/${language.lang || "ru"}/categories/зарубежные%20фильмы`} className={st.sub_menu_links}>
							  {Language[til].navbar.side_films}
						  </Link>
					  </li>
				  </ul>
                </li>
                <li className={st.navbar_link_item + ' ' + st.sub_li_elem}>
                  <span className={st.nav_menu}>{Language[til].navbar.serials}</span>
					<ul className={st.sub_menu}>
						<li className={st.sub_menu_item}>
							<Link to={`/${language.lang || "ru"}/categories/узбекские%20cериалы`} className={st.sub_menu_links}>
								{Language[til].navbar.uzb_serials}
							</Link>
						</li>
						<li className={st.sub_menu_item}>
							<Link to={`/${language.lang || "ru"}/categories/зарубежные%20сериалы`} className={st.sub_menu_links}>
								{Language[til].navbar.side_serials}
							</Link>
						</li>
					</ul>
                </li>
				<li className={st.navbar_link_item + ' ' + st.sub_li_elem}>
				  <span className={st.nav_menu}>Turk Dunyasi</span>
				  <ul className={st.sub_menu}>
					  <li className={st.sub_menu_item}>
						  <Link to={`/${language.lang || "ru"}/categories/турецкие%20фильмы`} className={st.sub_menu_links}>
							  {Language[til].navbar.turk_films}
						  </Link>
					  </li>
					  <li className={st.sub_menu_item}>
						  <Link to={`/${language.lang || "ru"}/categories/турецкие%20сериалы`} className={st.sub_menu_links}>
							  {Language[til].navbar.turk_serials}
						  </Link>
					  </li>
				  </ul>
			  </li>
                <li className={st.navbar_link_item}>
                  <Link to={`/${language.lang || "ru"}/categories/мультфильмы`}>
                    {Language[til].navbar.carton}
                  </Link>
                </li>
                
                <li className={st.navbar_link_item}>
                  <Link to={`/${language.lang || "ru"}/categories/концерты`}>
                    {Language[til].navbar.consert}
                  </Link>
                </li>
                <li className={st.navbar_link_item}>
                  <Link to={`/${language.lang || "ru"}/categories/передачи`}>
                    {Language[til].navbar.prod}
                  </Link>
                </li>
                <li className={st.navbar_link_item}>
                  <Link to={`/${language.lang || "ru"}/live`}>
                    LIVE <span style={{ color: 'red', fontWeight: 'bold' }}>&#183;</span>
                  </Link>
                </li>
                <li className={st.navbar_link_item}>
                  <Link to={`/${language.lang || "ru"}/categories`}>
                    {Language[til].navbar.allCategories}
                  </Link>
                </li><li className={st.navbar_link_item}>
                  <Link to={`/${language.lang || "ru"}/favourites`}>
                    {Language[til].navbar.forwards}
                  </Link>
                </li>
              </ul>
              <div className={st.user_tools} style={{ width: isOpenSearch ? "100%" : '' }}>
                <div className={st.search_tool} htmlFor="search_tool"
                  style={{ width: isOpenSearch ? " 100%" : "", marginLeft: "auto", backgroundColor: dark ? "" : "#F6F6F6"}}>
                  <input style={{ 
                    color: dark ? "" : "#888888",
                    display: isOpenSearch ? "" : 'none'
                   }} onFocus={() => setIsOpenSearch(true)}
					onKeyUp={searchIngineOnKeyUpHandler} id="search_tool" type="text" placeholder=""
                  />

                  <div onClick={handleSearch} className={st.search_icon}>
                    <img
                      src={
                        isOpenSearch
                          ? dark
                            ? xIcon
                            : xIconDark
                          : dark
                          ? searchIcon
                          : searchIconBlack
                      }
                      alt="search-icon"
                    />
                  </div>
                </div>
              </div>

              <div className={`${st.language} ${dark ? st.dark : ""}`}>
                <Link
                  to="/ru"
                  style={{ fontWeight: lang === "ru" ? 900 : 400 }}
                  onClick={() => {
                    setLang("ru");
                    setReload(true);
                  }}
                >
                  RU
                </Link>
                <span style={{ color: !dark ? "black" : "white" }}>|</span>
                <Link
                  to="/uz"
                  style={{ fontWeight: lang === "uz" ? 900 : 400 }}
                  onClick={() => {
                    setLang("uz");
                    setReload(true);
                  }}
                >
                  UZ
                </Link>
              </div>

              {/* Mini menu for mobile devices */}
              
              <div ref={componentRef}>
                <div style={miniMenuStyle} className={st.miniMenu}>
                  <div>
                      <div style={{padding: '10px', justifyContent: 'space-around'}} className={`${st.languageMiniDevice} ${dark ? st.dark : ""}`}>
                    <Link
                      to="/ru"
                      style={{fontWeight: lang === "ru" ? 900 : 400 }}
                      onClick={() => {
                        setLang("ru");
                        setReload(true);
                      }}
                    >
                      RU
                    </Link>
                    <span style={{color: "#000"}}>|</span>
                    <Link
                      to="/uz"
                      style={{fontWeight: lang === "uz" ? 900 : 400 }}
                      onClick={() => {
                        setLang("uz");
                        setReload(true);
                      }}
                    >
                      UZ
                    </Link>
                  </div>
                   

                    <Link
                      to={isAuth ? `/${language.lang || "ru"}/settings/profile` : `/${language.lang || "ru"}/login`}
                      className={st.menuItem}
                    >
                      <img src={userIcon} alt="" />
						{isAuth ? (<div className={st.itemName}>{Language[til].navbar.settings}</div>) : (<div className={st.itemName}>{Language[til].navbar.auth}</div>)}
                    </Link>
                    <div onClick={toggleDark} className={st.menuItem}>
                      <img src={dark ? sunIcon : sunIconForLight} alt="" />
                      <div className={st.itemName}>
                        {dark ? Language[til].navbar.darkMode : Language[til].navbar.lightMode}
                      </div>
                    </div>
                    <div className={st.menuItem}>
                      <img src={fontIcon} alt="" />
                      <div className={st.itemName}>{Language[til].navbar.shrift}</div>
                      <div className={st.itemChild}>
                        <div
                          className={`${st.childItem} ${
                            fontType === "SMALL" ? "active" : ""
                          }`}
                          onClick={() => {
                            fontChange("SMALL");
                          }}
                        >
                          {Language[til].navbar.smallShrift}
                        </div>
                        <div
                          className={`${st.childItem} ${
                            fontType === "MEDIUM" ? "active" : ""
                          }`}
                          onClick={() => {
                            fontChange("MEDIUM");
                          }}
                        >
                          {Language[til].navbar.mediumShrift}
                        </div>
                        <div
                          className={`${st.childItem} ${
                            fontType === "LARGE" ? "active" : ""
                          }`}
                          onClick={() => {
                            fontChange("LARGE");
                          }}
                        >
                          {Language[til].navbar.bigShrift}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={st.toggleIcon}>
                  <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ display: "flex" }}
                  >
                    <img
                      style={{ cursor: "pointer" }}
                      src={
                        isOpen
                          ? dark
                            ? xIcon
                            : xIconDark
                          : dark
                          ? menuOpen
                          : menuOpenLight
                      }
                      alt="close_icon"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </nav>
      </div>
      {isOpenSearch ? (movies.length > 0 ?
		<div className={st.container}>
			<div className={st.resultContainer}>
				{
					movies.map((x, key) => {
						return <MovieItem key={key} movie={x} />
					})
				}
			</div>
		</div>
		:  <SearchNotFound loading={loading} />)  : ''}
    </section>
  );
}

export default Navbar;
