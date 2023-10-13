import React from 'react'
import {BsList, BsSearch,BsFillPersonFill } from 'react-icons/bs';
import { Link ,useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { userLoggingOut} from '../ReduxActions/UserLogged'

const Navbar = (props) => {

   const {setToggleSideBar, ToggleSideBar}= props
   const name = useSelector((state) => state.user.name)
   const dispatch = useDispatch()
   const navigate = useNavigate()

  return (
    <>
    <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
     
            <Link className="navbar-brand ps-3" to="/">Note Taker</Link>
          
            {/* <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0 text-white" id="sidebarToggle" onClick={()=>{setToggleSideBar(()=>!ToggleSideBar);console.log("first")}}><BsList/></button> */}

         
            {/* <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                    <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
                    <button className="btn btn-primary" id="btnNavbarSearch" type="button"><BsSearch fill='white'/></button>
                </div>
            </form> */}
  
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false"><BsFillPersonFill fill='white'/></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><Link  className="dropdown-item" to="/profile">{name}</Link></li>
                        <li><Link  className="dropdown-item" to="/">Home</Link></li>
                        {/* <li><Link className="dropdown-item" to="/">Activity Log</Link></li> */}
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={()=>{dispatch(userLoggingOut());navigate("/login")}}>Logout</button></li>
                    </ul>
                </li>
            </ul>
        </nav>




    </>
  )
}

export default Navbar