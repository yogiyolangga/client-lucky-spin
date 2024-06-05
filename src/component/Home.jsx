import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoIosKey } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";

const Home = () => {
  const [username, setUsername] = useState("");
  const [spincode, setSpincode] = useState("");
  const navigate = useNavigate();
  const [loginStatus, setLoginStatus] = useState("");
  const apiUrl = "http://localhost:3001";

  const [showPassword, setShowPassword] = useState("password");
  const [openIconEyes, setOpenIconEyes] = useState("");
  const [closeIconEyes, setCloseIconEyes] = useState("hidden");
  const handleShowPassword = () => {
    setShowPassword("text");
    setOpenIconEyes("hidden");
    setCloseIconEyes("");
  };
  const handleHidePassword = () => {
    setShowPassword("password");
    setCloseIconEyes("hidden");
    setOpenIconEyes("");
  };

  Axios.defaults.withCredentials = true;

  const login = () => {
    Axios.post(`${apiUrl}/loginforuser`, {
      username: username,
      spincode: spincode,
    }).then((response) => {
      if (response.data.messageError) {
        setLoginStatus(response.data.messageError);
      } else {
        setLoginStatus(response.data[0].username);
        navigate("/fortunewheel");
      }
    });
  };

  const logout = () => {
    Axios.post(`${apiUrl}/logoutforuser`).then((response) => {
      if (response.data.loggedIn === false) {
        navigate("/");
      }
    });
  };

  useEffect((event) => {
    Axios.get(`${apiUrl}/loginforuser`).then((response) => {
      if (response.data.loggedIn === true) {
        logout();
      }
    });
  });

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center backdrop-blur-sm">
        <div className="flex w-full justify-center gap-14">
          <div className="flex justify-center items-center">
            <img
              src="img/login-img.png"
              alt="Login FreeWheel"
              className="w-[350px]"
            />
          </div>
          <div className="p-2">
            <FormLogin
              setUsername={setUsername}
              setSpincode={setSpincode}
              showPassword={showPassword}
              handleShowPassword={handleShowPassword}
              openIconEyes={openIconEyes}
              handleHidePassword={handleHidePassword}
              closeIconEyes={closeIconEyes}
              loginStatus={loginStatus}
              login={login}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

const FormLogin = ({
  setUsername,
  setSpincode,
  showPassword,
  handleShowPassword,
  openIconEyes,
  handleHidePassword,
  closeIconEyes,
  loginStatus,
  login,
}) => {
  return (
    <>
      <div className="w-full flex flex-col justify-center">
        <h1 className="text-2xl font-bold text-white">
          Login with your spincode
        </h1>
        <p className="py-2 text-slate-300">Lorem ipsum dolor sit amet.</p>
        <div className="w-full flex flex-col gap-2">
          <div className="p-2  h-12 border rounded-md border-slate-200 flex gap-2 items-center">
            <FaRegUser className="text-xl text-blue-500" />
            <input
              type="text"
              placeholder="Username"
              className="h-10 bg-transparent text-white flex-auto px-2"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="p-2  h-12 border rounded-md border-slate-200 flex gap-2 items-center">
            <IoIosKey className="text-xl text-blue-500" />
            <input
              type={showPassword}
              placeholder="Spin Code"
              className="h-10 bg-transparent text-white flex-auto px-2"
              onChange={(e) => {
                setSpincode(e.target.value);
              }}
            />
            <IoEyeSharp
              onClick={handleShowPassword}
              className={`text-xl text-blue-500 ${openIconEyes}`}
            />
            <FaRegEyeSlash
              onClick={handleHidePassword}
              className={`text-xl text-blue-500 ${closeIconEyes}`}
            />
          </div>
        </div>
        <div className="w-full pt-6 pb-2 flex flex-col justify-center">
          <p className="text-center font-semibold text-sm text-red-500">
            {loginStatus}
          </p>
          <button
            onClick={login}
            className="flex hover:scale-110 duration-100 justify-center items-center px-4 py-2 rounded-md w-full h-12 bg-gradient-to-r from-blue-500 to-slate-100 font-bold text-white text-xl"
          >
            Login
          </button>
        </div>
        <div className="flex justify-between w-full">
          <p className="text-white text-sm font-light">No have ticket ?</p>
          <a href="/" className="text-white text-sm font-light">
            Create Ticket Here!
          </a>
        </div>
      </div>
    </>
  );
};
