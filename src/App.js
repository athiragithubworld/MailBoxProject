import { useSelector } from "react-redux";
import LoginPage from "./Components/Authentication/LoginPage";
import Headers from "./Components/Layouts/Headers";
import { Routes, Route } from "react-router-dom";

function App() {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      {auth.isLoggedIn && <Headers></Headers>}
      <Routes>
        {!auth.isLoggedIn && <Route path="/" element={<LoginPage />}></Route>}
      </Routes>
    </div>
  );
}

export default App;
