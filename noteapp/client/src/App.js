import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import { useSelector, useDispatch } from 'react-redux'
import { userLoggingIn} from './ReduxActions/UserLogged'
import Profile from "./pages/Profile";

function App() {
  const [ToggleSideBar, setToggleSideBar] = useState(true);
  const checkLogged = useSelector((state) => state.user.Logged)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(!checkLogged){
      navigate("/login")
    }
  }, [checkLogged])


  const checkToken = async (user) => {
    const response = await fetch("http://localhost:5002/user/check-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({"token":user})
    });
    const jsonres = await response.json()
    if(jsonres.code===200){
      dispatch(userLoggingIn(jsonres.user))
      navigate("/")
    }
  }


  useEffect(() => {
    const a =localStorage.getItem("user")
    checkToken(a)
  }, [])
  

  return (
    <>


        <Routes>
          <Route path="/" element={<><div id="layoutSidenav">
            <div id="layoutSidenav_content">
              <Navbar
                setToggleSideBar={setToggleSideBar}
                ToggleSideBar={ToggleSideBar}
              />
            </div>
          </div>
            <div className={`${ToggleSideBar ? "d-flex " : "d-block "}`}>
             <Home /> </div></>} />


          <Route path="/profile" element={<><div id="layoutSidenav">
            <div id="layoutSidenav_content">
              <Navbar
                setToggleSideBar={setToggleSideBar}
                ToggleSideBar={ToggleSideBar}
              />
            </div>
          </div>
            <div className={`${ToggleSideBar ? "d-flex " : "d-block "}`}>
              <Profile /> </div></>} />

          <Route path="/login" element={<><Login /></>} />

          <Route path="/register" element={<><Register /></>} />

        </Routes>

    </>
  );
}

export default App;
