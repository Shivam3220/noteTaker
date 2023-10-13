import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import { userLoggingIn} from '../ReduxActions/UserLogged'

const Login = () => {
    const [userCredential, setuserCredential] = useState({email:"" , password:""})
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const HandleUserSubmit=async(e)=>{
        e.preventDefault()
        const {email , password} = userCredential
        if(email!="" && password!=""){
            const data={"email":email , "password":password}
            try {
                const register = await fetch(
                  "http://localhost:5002/user/log-in",
                  {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                      "Content-type": "application/json",
                    },
                  }
                );
                const jsonRes = await register.json();
                console.log(jsonRes)
                if (jsonRes.code == 200) {
                  const msg = jsonRes.message;
                  toast.success(msg, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  toast.success("Redirecting to Home Page...", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  dispatch(userLoggingIn(jsonRes.data))
                  localStorage.setItem("user",jsonRes.token)
                  setTimeout(() => {
                    navigate("/");
                  }, 3000);
                } else {
                  const msg = jsonRes.message;
                    toast.error(msg, {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "light",
                    });
                 
                }
              } catch (error) {
                console.log(error)
              }
        }
    }

    const HandleInputChange=(e)=>{
        const {name , value} =e.target
        setuserCredential({...userCredential,[name]:value})
    }


  return (
    <div id="layoutAuthentication" className='bg-primary' style={{"width":"100%"}}>
         <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <div id="layoutAuthentication_content">
        <main>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-5">
                        <div className="card shadow-lg border-0 rounded-lg mt-5">
                            <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                            <div className="card-body">
                                <form onSubmit={(e)=>{HandleUserSubmit(e)}}>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="inputEmail" type="email" placeholder="name@example.com" name='email' required onChange={(e)=>HandleInputChange(e)}/>
                                        <label htmlFor="inputEmail">Email address</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input className="form-control" id="inputPassword" type="password" placeholder="Password" name='password' required onChange={(e)=>HandleInputChange(e)}/>
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>
                                    {/* <div className="form-check mb-3">
                                        <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                                        <label className="form-check-label" htmlFor="inputRememberPassword">Remember Password</label>
                                    </div> */}
                                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                                        {/* <a className="small" to="/forget">Forgot Password?</a> */}
                                        <button className="btn btn-primary" type='submit'>Login</button>
                                    </div>
                                </form>
                            </div>
                            <div className="card-footer text-center py-3">
                                <div className="small"><Link to="/register">Need an account? Sign up!</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
    {/* <div id="layoutAuthentication_footer">
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; Your Website 2023</div>
                    <div>
                        <Link to="/">Privacy Policy</Link>
                        &middot;
                        <Link to="/">Terms &amp; Conditions</Link>
                    </div>
                </div>
            </div>
        </footer>
    </div> */}
</div>
  )
}

export default Login