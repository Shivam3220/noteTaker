import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const navigate = useNavigate();

  const HandleDataChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const HandleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = userDetails;
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      cpassword !== ""
    ) {
      const data = {
        name: name,
        email: email,
        password: password,
        cpassword: cpassword,
      };
      try {
        const register = await fetch(
          "http://localhost:5002/user/add-user",
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-type": "application/json",
            },
          }
        );
        const jsonRes = await register.json();
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
          toast.success("Redirecting to Login Page...", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          const msg = jsonRes.message;
          msg.map((e) => {
            toast.error(e, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          });
        }
      } catch (error) {
        console.log(error)
      }
    }
  };
  return (
    <div
      id="layoutAuthentication"
      className="bg-primary"
      style={{ width: "100%" }}
    >
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
      {/* Same as */}
      <ToastContainer />
      <div id="layoutAuthentication_content">
        <main>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div className="card shadow-lg border-0 rounded-lg mt-5">
                  <div className="card-header">
                    <h3 className="text-center font-weight-light my-4">
                      Create Account
                    </h3>
                  </div>
                  <div className="card-body">
                    <form onSubmit={(e) => HandleFormSubmit(e)}>
                      <div className="row mb-3">
                        <div className="col-md-12">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              className="form-control"
                              id="inputFirstName"
                              type="text"
                              placeholder="Enter your full name"
                              name="name"
                              onChange={(e) => HandleDataChange(e)}
                              required
                            />
                            <label htmlFor="inputFirstName">Full name</label>
                          </div>
                        </div>
                        
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          className="form-control"
                          id="inputEmail"
                          type="email"
                          placeholder="name@example.com"
                          name="email"
                          onChange={(e) => HandleDataChange(e)}
                          required
                        />
                        <label htmlFor="inputEmail">Email address</label>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              className="form-control"
                              id="inputPassword"
                              onChange={(e) => HandleDataChange(e)}
                              type="password"
                              placeholder="Create a password"
                              name="password"
                              required
                            />
                            <label htmlFor="inputPassword">Password</label>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-floating mb-3 mb-md-0">
                            <input
                              className="form-control"
                              id="inputPasswordConfirm"
                              onChange={(e) => HandleDataChange(e)}
                              type="password"
                              placeholder="confirm password"
                              name="cpassword"
                              required
                            />
                            <label htmlFor="inputPasswordConfirm">
                              Confirm Password
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 mb-0">
                        <button
                          className="btn btn-primary btn-block"
                          type="submit"
                        >
                          Create Account
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="card-footer text-center py-3">
                    <div className="small">
                      <Link to="/login">Have an account? Go to login</Link>
                    </div>
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
              <div className="text-muted">
                Copyright &copy; Your Website 2023
              </div>
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
  );
};

export default Register;
