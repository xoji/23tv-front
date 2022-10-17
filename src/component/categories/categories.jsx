import Category from "./category/category";
import Header from "./categoryHeader/header";
import Navbar from "./categoryNavbar/navbar";
import { useTheme } from "../../context/theme";
import { useParams } from "react-router-dom";

export default function Categories(props) {
  const language = useParams()
  const [dark] = useTheme()
  const home = props.home
  return (
    <>
      {props.what === "category" ? (
        <>
          <Header allCategory={props.allCategory} />
          {props.type === "genres" ? (
            <Navbar type="genres" data={props.genres} />
          ) :
              home ? (<></>) : (<Navbar data={props.data} />)}
          }
          <div
            className=""
            style={{ background: dark ? "#0C0C0D" : "#F8F9FC" }}
          >
            {props.data &&
              props.data.map((val, key) => {
                return <Category
                key={key}
                loading={props.loading}
                movies={val.movies}
                title={val.category_name}
                link={`/${language.lang || "ru"}/categories/${val.category_name.toLowerCase()}`}
              />
              })}
          </div>
        </>
      ) : (
        <>
          <Header
            allCategory={props.allCategory}
            text={props.data.category && props.data.category.category_name}
          />
          <Navbar data={props.categories} text={props.data.category}/>
          <div
            className=""
            style={{ background: dark ? "#0C0C0D" : "#F8F9FC" }}
          >
            <Category
              title={""}
              link={props.data.category}
              movies={props.data && props.data.data}
              showAllLink={false}
              pagination="basic"
              visibled="12"
              count={props.data && props.data.count}
              loading={props.loading}
              what={'single-movie-category'}
            />
          </div>
        </>
      )}
    </>
  );
}
