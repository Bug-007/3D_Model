import React, { useContext, useState } from "react";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Formik } from "formik";
import { AppContext } from '../../AppContext';
import { EmailOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const {setloggedIn} = useContext(AppContext)
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const loginform = {
    email: "",
    password: "",
  };
  const loginSubmit = async(formdata) => {
    console.log(formdata);
    const response = await fetch("http://localhost:5000/user/authenticate", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-Type": "application/json",
      },
    })
      if (response.status === 200) {
        console.log(response.status);
            console.log('success')
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login Success!!👍",
        });
         //  session m store krwa lenge jisse 
         const data= await response.json();
         console.log(data); 
         setloggedIn(true);
        //  this will store user data in session
         sessionStorage.setItem('user',JSON.stringify(data));
        navigate('/home');  
      } else if (response.status === 300) {
        console.log(response.status);
                    console.log('something went wrong')
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Login Failed!!👍",
        });
      }
    }


  return (
    <div className="container-fluid "style={{background: "linear-gradient(to top, #ffffff00,#64a5ad, #ffffff00,#64a5ad)"}}>
      <div className="row">
        <div
          class="col-sm-6 px-0 d-none d-sm-block banner"
          style={{
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
          }}
        >
          <img
            className="img-fluid image"
            // style={{background:"content",backgroundSize:'fixed'}}
            src="https://cdn.creators3d.com/site/stripe_2.jpg"
            // src="https://static.turbosquid.com/Preview/2014/07/07__14_43_27/midshootrender.jpg617b6d0a-2b43-471f-804c-428eba59dc76Large.jpg"
            // src="https://media.sketchfab.com/models/51400549799b410c8cdb778a9350d589/thumbnails/8b67515e8bf74949b82dd6c712436ee5/3334fab8ce1d4d84bebb0a98f1b345bb.jpeg"
            alt=""
          />
          <h1 className="heading">WELCOME BACK</h1>
          <p className="paragraph"></p>
        </div>
        <div class="col-sm-6 " style={{ color: "" }}>
          <div className="signup-cont">
            <div className="">
              <div className="col-md-6 col-sm-6 mx-auto">
                <button className="btn btn-success w-100 mt-2">
                  Continue with Google
                </button>
                <button className="btn btn-primary w-100 mt-4">
                Continue with Facebook
                </button>
                <div className="">
                  <div className="card-body">
                    <h4 style={{ textAlign: "center", marginTop: "2%" }}>
                      <i style={{ top: "" }}>OR</i>
                    </h4>
                    <hr className="mb-4" />
                    <h4 style={{ textAlign: "center" }}>Login</h4>
                    <Formik initialValues={loginform} onSubmit={loginSubmit}>
                      {({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                          <TextField
                            label="Email"
                            variant="standard"
                            className="w-100 mb-3"
                            id="email"
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <EmailOutlined />
                                </InputAdornment>
                              ),
                            }}
                            onChange={handleChange}
                            value={values.email}
                          />
                          <TextField
                            label="Password"
                            variant="standard"
                            className="w-100 mb-4"
                            id="password"
                            type={showPassword ? "text" : "password"}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={(e) =>
                                      setShowPassword(!showPassword)
                                    }
                                  >
                                    {showPassword ? (
                                      <Visibility />
                                    ) : (
                                      <VisibilityOff />
                                    )}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            onChange={handleChange}
                            value={values.password}
                          />

                          <Button type="submit" variant=""
                          className="btn  "
                          sx={{background: "#64a5ad"}} fullWidth>
                            {" "}
                            Sign Up
                          </Button>
                        </form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
