import { useSelector } from "react-redux";
import LoginPage from "./Components/Authentication/LoginPage";
import Headers from "./Components/Layouts/Headers";
import { Routes, Route } from "react-router-dom";
import MainMenuList from "./Components/Layouts/MainMenuList";
import ComposeMail from "./Components/Pages/ComposeMail";

function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      {auth.isLoggedIn && <Headers />}
      {auth.isLoggedIn && <MainMenuList />}
      {/* <ComposeMail /> */}
      <Routes>
        {!auth.isLoggedIn && <Route path="/" element={<LoginPage />}></Route>}
      </Routes>
    </div>
  );
}

export default App;
