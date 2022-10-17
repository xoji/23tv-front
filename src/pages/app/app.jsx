import "./app.css";
import { Route, Switch } from "react-router-dom";
import Home from "../home/home";
import AllCategoryMovie from "../allCategoryMovie/categoryMovie";
import CategoryMovie from "../categoryMovie/categoryMovie";
import GenreMovie from "../genreMovie/genreMovie";
import Movie from "../movie/movie";
import Serial from "../movie/serial";
import Live from "../live/live";
import Login from "../auth/login/login";
import SignUp from "../auth/signup/signup";
import Recovery from "../auth/recover/recover";
import Settings from "../account/account";
import Favourites from "../favourites/favourites";
import NotFound from "../notfound404/notfound404";
import PrivacyPolicy from "../privacyPolicy/privacyPolicy";
import { useTheme } from "../../context/theme";

function App() {
  const [dark] = useTheme();

  return (
    <div style={{ background: dark ? "#0C0C0D" : "#F8F9FC" }}>
      <Switch>
        <Route path="/:lang?" component={Home} exact />
        <Route path="/:lang?/login" component={Login} exact />
        <Route path="/:lang?/privacy" component={PrivacyPolicy} exact />
        <Route path="/:lang?/sign-up" component={SignUp} exact />
        <Route path="/:lang?/sign-up/recover" component={Recovery} exact />
        <Route path="/:lang?/categories" component={AllCategoryMovie} exact />
        <Route path="/:lang?/live" component={Live} exact />
        <Route path="/:lang?/favourites" component={Favourites} exact />
        <Route path="/:lang?/categories/:category" component={CategoryMovie} exact />
        <Route path="/:lang?/categories/:category/:movieid" component={Movie} exact />
        <Route path="/:lang?/categories/:category/:movieid/:serialid" component={Serial} exact />
        <Route path="/:lang?/genres/:genreid" component={GenreMovie} exact />
        <Route path="/:lang?/settings" component={Settings} />
        <Route path="**" component={NotFound} exact />
      </Switch>
    </div>
  );
}

export default App;
