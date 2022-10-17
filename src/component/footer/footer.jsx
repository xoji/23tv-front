import st from "./footer.module.css"
import { Link, useParams } from "react-router-dom"
import telegram from "../../assets/logo/telegram_logo.svg"
import instagram from "../../assets/logo/instagram_logo.svg"
import facebook from "../../assets/logo/facebook_logo.svg"
import appStore from "../../assets/img/app-store.png"
import googlePlay from "../../assets/img/google-play.png"
import { useTheme } from "../../context/theme"
import Language from '../../languages'
import { useLang } from '../../context/lanuage'

function Footer() {
  const [dark] = useTheme()
  const language = useParams()
  const [ til ] = useLang()

  return (
    <>
      <footer className={st.footer}>
        <div
          className={st.footer_main}
        >
          <div className={st.container}>
            <div className={st.footer_body}>
              <div className={st.app_downloading}>
                <p className={st.download_title} style={{ color: dark ? "#fff" : "#000" }}>
                 {Language[til].footer.downloadApp}
                </p>
                <div className={st.downloads}>
                  <a
                      className={st.download_link}
                      href="https://play.google.com/store/apps/details?id=org.supersite.tv23"
                      rel="noreferrer"
                      target="_blank"
                  >
                    <img src={googlePlay} alt="google-play-icon" />
                  </a>
                  <a
                      className={st.download_link}
                      href="https://apps.apple.com/us/app/23tv/id1601503149"
                      rel="noreferrer"
                      target="_blank"
                  >
                    <img src={appStore} alt="google-play-icon" />
                  </a>
                </div>
                <div className={st.boxBottom}>
                  <div
                    style={{ color: dark ? "#fff" : "#000" }}
                    className={st.socialTitle}
                  >
                    {Language[til].footer.weOnSocial}:{" "}
                  </div>
                  <ul className={st.social_links}>
                    <li className={st.link_item}>
                      <a
                        href="https://www.instagram.com/23_tv.uz/"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <img className={st.istagram} src={instagram} alt="instagram_logo" />
                      </a>
                    </li>
                    <li className={st.link_item}>
                      <Link to="#">
                        <img src={facebook} alt="facebook_logo" />
                      </Link>
                    </li>
                    <li className={st.link_item}>
                      <Link to="#">
                        <img src={telegram} alt="telegram_logo" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className={st.wrapper_footer}>
                <ul className={`${st.categories} ${!dark ? st.dark : ""}`}>
                  <li className={st.category_item}>
                    <Link to={`/${language.lang || "ru"}/categories/фильмы`}>{Language[til].footer.movies}</Link>
                  </li>
                  <li className={st.category_item}>
                    <Link to={`/${language.lang || "ru"}/categories/сериалы`}>{Language[til].footer.serials}</Link>
                  </li>
                  <li className={st.category_item}>
                    <Link to={`/${language.lang || "ru"}/categories`}>{Language[til].footer.allCategories}</Link>
                  </li>
                  <li className={st.category_item}>
                    <Link to={`/${language.lang || "ru"}/live`} className={st.live}>
                      LIVE{" "}
                      <b>
                        <span style={{ color: "red" }}>&#183;</span>
                      </b>
                    </Link>
                  </li>
                  <li className={st.category_item}>
                    <Link to={`/${language.lang || "ru"}/favourites`}>{Language[til].footer.forwards}</Link>
                  </li>
                </ul>

                <ul className={`${st.info_liks} ${!dark ? st.dark : ""}`}>
                  <li className={st.info_link__item}>
                    <Link style={{color: '#777'}} to="#">{Language[til].footer.aboutUs}</Link>
                  </li>
                  <li className={st.info_link__item}>
                    <Link to="/ru/privacy">{Language[til].footer.aboutCompany}</Link>
                  </li>
                  <li className={st.info_link__item}>
                    <Link to="#">{Language[til].footer.ads}</Link>
                  </li>
                  <li className={st.info_link__item}>
                    <Link to="#">{Language[til].footer.forPartners}</Link>
                  </li>
                  <li className={st.info_link__item}>
                    <Link to="#">{Language[til].footer.vacancies}</Link>
                  </li>
                </ul>

                <ul className={`${st.support_links} ${!dark ? st.dark : ""}`}>
                  <p>{Language[til].footer.techSupport}:</p>
                  <li className={st.support_link__item}>
                    <Link to="#">@Supportnaming.uz</Link>
                  </li>
                  <li className={st.support_link__item}>
                    <Link to="#">+99890 000-23-00</Link>
                  </li>

                  <div className={st.support_link__item_media}>
					<div>
					<p className={st.leave_comment}>{Language[til].footer.leaveComment}:</p>
					<li className={`${st.support_link__item}`}>
					<Link to="#">@infonaming.uz</Link>
					</li>
					</div>

					<div className={st.boxBottom1}>
						<div style={{ color: dark ? "#fff" : "#000" }} className={st.socialTitle}>
							{Language[til].footer.weOnSocial}:{" "}
						</div>
						<ul className={st.social_links}>
							<li className={st.link_item}>
							<a
								href="https://www.instagram.com/23_tv.uz/" rel="noreferrer" target="_blank">
								<img className={st.istagram} src={instagram} alt="instagram_logo" />
							</a>
							</li>
							<li className={st.link_item}>
							<Link to="#">
								<img src={facebook} alt="facebook_logo" />
							</Link>
							</li>
							<li className={st.link_item}>
							<Link to="#">
								<img src={telegram} alt="telegram_logo" />
							</Link>
							</li>
						</ul>
					</div>
				  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div
          className={st.footer_footer}
          style={{ background: dark ? "#000" : "#EAEDF0" }}
        >
          <div className={st.container}>
            <div className={st.social_links_and_author}>
              <p className={`${st.author} ${!dark ? st.dark : ""}`}>
                Разработала команда <a style={{color: dark ? "#fff" : "#000", marginLeft: '10px'}} href="http://supersite.uz/">Supersite.uz</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
