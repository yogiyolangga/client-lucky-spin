import { FaRegUser } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoIosKey } from "react-icons/io";
import { FaRegEyeSlash } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomeMobile() {
  const [username, setUsername] = useState("");
  const [spincode, setSpincode] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const apiUrl = "http://localhost:3001";
  const navigate = useNavigate();

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

  //   Login Function
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

  useEffect(() => {
    Axios.get(`${apiUrl}/loginforuser`).then((response) => {
      if (response.data.loggedIn === true) {
        logout();
      }
    });
  });

  return (
    <>
      <div className="w-full flex flex-col justify-center min-h-screen bg-black bg-opacity-60 backdrop-blur-sm  items-center">
        <div className="bg-white p-2 rounded-tl-full rounded-br-full">
          <img src="img/fortunewheel.png" alt="Logo" />
        </div>
        <p className="py-2 text-white">Lorem ipsum dolor sit amet.</p>
        <div className="w-full flex flex-col px-10 gap-2">
          <div className="p-2 bg-slate-100 rounded-3xl h-12 border-b-2 border-blue-500 flex gap-2 items-center">
            <FaRegUser className="text-xl text-blue-500" />
            <input
              type="text"
              placeholder="Username"
              className="h-10 bg-slate-100 flex-auto rounded-3xl px-2"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="p-2 bg-slate-100 rounded-3xl h-12 border-b-2 border-blue-500 flex gap-2 items-center">
            <IoIosKey className="text-xl text-blue-500" />
            <input
              type={showPassword}
              placeholder="Spin Code"
              className="h-10 bg-slate-100 flex-auto rounded-3xl px-2"
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
        <div className="w-full px-10 pt-6 pb-2 flex flex-col justify-center">
          <p className="text-center font-semibold text-sm text-red-500">
            {loginStatus}
          </p>
          <button
            onClick={login}
            className="flex justify-center items-center px-4 py-2 rounded-3xl w-full h-12 bg-gradient-to-r from-blue-500 to-slate-100 font-bold text-white text-xl"
          >
            Login
          </button>
        </div>
        <div className="flex justify-between w-full px-12">
          <p className="text-white text-sm font-light">No have ticket ?</p>
          <a href="/" className="text-white text-sm font-light">
            Create Ticket Here!
          </a>
        </div>
      </div>
    </>
  );
}
