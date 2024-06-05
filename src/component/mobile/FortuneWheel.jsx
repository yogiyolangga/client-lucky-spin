import React, { useEffect, useRef, useState } from "react";
import soundWheel from "../../assets/xwheel.mp3";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

export default function FortuneWheel() {
  const [loginStatus, setLoginStatus] = useState("");
  const [duit, setDuit] = useState("");
  const [hadiah, setHadiah] = useState("");
  const [chance, setChance] = useState();
  const [id, setId] = useState();
  const navigate = useNavigate();
  const apiUrl = "http://localhost:3001";
  const defaultPrizes = [
    {
      small: "1000",
      medium: "5000",
      big: "9000",
      huge: "11000",
    },
    {
      small: "2000",
      medium: "6000",
      big: "10000",
      huge: "12000",
    },
    {
      small: "3000",
      medium: "7000",
      big: null,
      huge: null,
    },
    {
      small: "4000",
      medium: "8000",
      big: null,
      huge: null,
    },
  ];
  const [prize, setPrize] = useState(defaultPrizes);

  const logout = () => {
    Axios.post(`${apiUrl}/logoutforuser`).then((response) => {
      if (response.data.loggedIn === false) {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    const defaultPrizeHere = [
    {
      small: "1000",
      medium: "5000",
      big: "9000",
      huge: "11000",
    },
    {
      small: "2000",
      medium: "6000",
      big: "10000",
      huge: "12000",
    },
    {
      small: "3000",
      medium: "7000",
      big: null,
      huge: null,
    },
    {
      small: "4000",
      medium: "8000",
      big: null,
      huge: null,
    },
  ];
    const fetchData = async () => {
      try {
        const response = await Axios.get(`${apiUrl}/loginforuser`);
        if (response.data.loggedIn === true) {
          setLoginStatus(response.data.user[0].username);
          setHadiah(response.data.user[0].hadiah);
          setId(response.data.user[0].id);
          setChance(response.data.user[0].chance);
          setDuit(response.data.user[0].nominal);
          if (response.data.result[0].small != null) {
            setPrize(response.data.result);
          } else {
            setPrize(defaultPrizeHere);
          }
        } else {
          navigate("/");
        }
      } catch (error) {
        console.log("Error Fetching Data :", error);
      }
    };
    fetchData();
  }, [navigate, apiUrl]);

  const [smallPrize, setSmallPrize] = useState([]);
  const [mediumPrize, setMediumPrize] = useState([]);
  const [bigPrize, setBigPrize] = useState([]);
  const [hugePrize, setHugePrize] = useState([]);

  useEffect(() => {
    if (prize) {
      const small = [];
      const medium = [];
      const big = [];
      const huge = [];

      for (let i = 0; i < prize.length; i++) {
        if (prize[i].small != null) {
          small.push(prize[i].small);
        }
        if (prize[i].medium != null) {
          medium.push(prize[i].medium);
        }
        if (prize[i].big != null) {
          big.push(prize[i].big);
        }
        if (prize[i].huge != null) {
          huge.push(prize[i].huge);
        }
      }

      setSmallPrize(small);
      setMediumPrize(medium);
      setBigPrize(big);
      setHugePrize(huge);

      // console.log(smallPrize);
      // console.log(mediumPrize);
      // console.log(bigPrize);
      // console.log(hugePrize);
    }
  }, [prize]);

  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      return logout();
    }
    return "";
  };

  const update = () => {
    Axios.put(`${apiUrl}/api/update/${id}`, { nominal: nominal });
  };

  const wheel = document.querySelector(".wheelm");
  const popUp = document.getElementById("popupm");
  const cover = document.getElementById("cover");

  // untuk yang sudah putar sebelumnya
  // pop up hadiah langsung muncul
  if (duit > 0 || duit === "ZONK") {
    popUp.classList.remove("scale-0");
  }

  // let hadiahGroup = "";
  // if (hadiah === "SMALL") {
  //   hadiahGroup = ["5000", "10000"];
  // } else if (hadiah === "MEDIUM") {
  //   hadiahGroup = ["20000", "30000", "50000", "65000", "80000"];
  // } else if (hadiah === "BIG") {
  //   hadiahGroup = ["100000", "168000", "200000"];
  // } else if (hadiah === "HUGE") {
  //   hadiahGroup = ["1000000"];
  // } else {
  //   hadiahGroup = ["ZONK"];
  // }

  let hadiahGroup = "";

  if (hadiah === "MEDIUM") {
    hadiahGroup = mediumPrize;
  } else if (hadiah === "BIG") {
    hadiahGroup = bigPrize;
  } else if (hadiah === "HUGE") {
    hadiahGroup = hugePrize;
  } else {
    hadiahGroup = smallPrize;
  }

  console.log(hadiahGroup);

  let nominal = "";
  if (duit > 0) {
    nominal = duit;
  } else {
    nominal = hadiahGroup[Math.floor(Math.random() * hadiahGroup.length)];
  }

  console.log(nominal);

  let allDeg = [360, 330, 300, 270, 240, 210, 180, 150, 120, 90, 60, 30];

  const smallDeg = [];
  const mediumDeg = [];
  const bigDeg = [];
  const hugeDeg = [];

  for (let i = 0; i < smallPrize.length; i++) {
    const randomIndex = Math.floor(Math.random() * allDeg.length);

    smallDeg.push(allDeg[randomIndex]);

    allDeg.splice(randomIndex, 1);
  }

  for (let i = 0; i < mediumPrize.length; i++) {
    const randomIndex = Math.floor(Math.random() * allDeg.length);

    mediumDeg.push(allDeg[randomIndex]);

    allDeg.splice(randomIndex, 1);
  }

  for (let i = 0; i < bigPrize.length; i++) {
    const randomIndex = Math.floor(Math.random() * allDeg.length);

    bigDeg.push(allDeg[randomIndex]);

    allDeg.splice(randomIndex, 1);
  }

  for (let i = 0; i < hugePrize.length; i++) {
    const randomIndex = Math.floor(Math.random() * allDeg.length);

    hugeDeg.push(allDeg[randomIndex]);

    allDeg.splice(randomIndex, 1);
  }

  console.log("smallDeg:", smallDeg);
  console.log("mediumDeg:", mediumDeg);
  console.log("bigDeg:", bigDeg);
  console.log("hugeDeg:", hugeDeg);
  console.log("allDeg setelah diambil:", allDeg);

  function Spinner(corner) {
    if (smallDeg.includes(corner)) {
      for (let i = 0; i < smallDeg.length; i++) {
        if (smallDeg[i] === corner) {
          return <span>{isNumber(smallPrize[i])}</span>;
        }
      }
    } else if (mediumDeg.includes(corner)) {
      for (let i = 0; i < mediumDeg.length; i++) {
        if (mediumDeg[i] === corner) {
          return <span>{isNumber(mediumPrize[i])}</span>;
        }
      }
    } else if (bigDeg.includes(corner)) {
      for (let i = 0; i < bigDeg.length; i++) {
        if (bigDeg[i] === corner) {
          return <span>{isNumber(bigPrize[i])}</span>;
        }
      }
    } else {
      for (let i = 0; i < hugeDeg.length; i++) {
        if (hugeDeg[i] === corner) {
          return <span>{isNumber(hugePrize[i])}</span>;
        }
      }
    }
  }

  let deg = [];

  if (hadiah === "MEDIUM") {
    for (let i = 0; i < mediumDeg.length; i++) {
      if (nominal === hadiahGroup[i]) {
        deg = mediumDeg[i] + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
      }
    }
  } else if (hadiah === "BIG") {
    for (let i = 0; i < bigDeg.length; i++) {
      if (nominal === hadiahGroup[i]) {
        deg = bigDeg[i] + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
      }
    }
  } else if (hadiah === "HUGE") {
    for (let i = 0; i < hugeDeg.length; i++) {
      if (nominal === hadiahGroup[i]) {
        deg = hugeDeg[i] + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
      }
    }
  } else {
    for (let i = 0; i < smallDeg.length; i++) {
      if (nominal === hadiahGroup[i]) {
        deg = smallDeg[i] + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
      }
    }
  }

  console.log(hadiahGroup);
  console.log(deg);

  // if (nominal === "5000") {
  //   deg = 30 + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
  // } else if (nominal === "10000") {
  //   deg = 240 + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
  // } else if (nominal === "20000") {
  //   deg = 90 + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
  // } else if (nominal === "30000") {
  //   deg = 180 + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
  // } else if (nominal === "50000") {
  //   deg = 150 + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
  // } else if (nominal === "65000") {
  //   deg = 210 + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
  // } else if (nominal === "80000") {
  //   deg = 60 + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
  // } else if (nominal === "100000") {
  //   deg = 270 + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
  // } else if (nominal === "168000") {
  //   deg = 360 + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
  // } else if (nominal === "200000") {
  //   deg = 120 + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
  // } else if (nominal === "1000000") {
  //   deg = 300 + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
  // } else {
  //   deg = 330 + 360 * Math.ceil(Math.random() * (15 - 10) + 10);
  // }
  const audioRef = useRef(null); //Referensi ke elemen audio

  // Loading audio saat page di muat
  useEffect(() => {
    audioRef.current = new Audio(soundWheel);
  }, [])

  const Putar = () => {
    if (chance < 1) {
      window.alert("No have Chance!");
      logout();
    } else {
      update(id);
      cover.classList.remove("hidden");
      wheel.style.transform = "rotate(" + deg + "deg)";

      // make sure audio loaded
      if (audioRef.current) {
        audioRef.current.play();
      }

      socket.emit("send_message", { message: "Notif!" });
      setTimeout(function () {
        popUp.classList.remove("scale-0");
      }, 7200);
    }
  };

  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  let popupText;
  let popupText1;

  function isNumber(str) {
    if (str >= 0) {
      return rupiah.format(str);
    } else {
      return str;
    }
  }

  popupText = "You Won Prize";
  popupText1 = isNumber(nominal);

  return (
    <div className="w-full bg-black bg-opacity-60 min-h-screen overflow-hidden">
      <div
        id="cover"
        className="absolute hidden w-full h-full bg-transparent z-30"
      ></div>
      <div
        id="popupm"
        className="scale-0 fixed w-full h-full bg-transparent z-40 transition-all duration-300"
      >
        <div className="w-full h-full relative flex justify-center items-center">
          <div className="w-[80%] flex flex-wrap h-fit pt-6 pb-3 px-3 md:w-[50%] lg:w-[20%] absolute bg-black bg-opacity-90 rounded-tr-[40%] rounded-bl-[40%] border-2 border-white">
            <h2 className="w-full text-center text-white font-bold">
              {popupText}
            </h2>
            <p className="w-full text-center text-white font-bold">
              {popupText1}
            </p>
            <button
              className="px-3 py-1 bg-blue-500 mx-auto mt-3 rounded-xl text-white font-bold"
              onClick={logout}
            >
              OK
            </button>
          </div>
        </div>
      </div>
      <div className="py-5">
        <div className="w-full px-10 py-3">
          <div className="bg-white p-2 rounded-tl-full rounded-br-full">
            <img src="img/fortunewheel.png" alt="Logo" />
          </div>
        </div>
        <h1 className="text-center font-semibold text-lg lg:text-2xl text-white bg-blue-500 w-fit mx-auto px-3 rounded-md shadow-lg shadow-black">
          Hello "{loginStatus}"
        </h1>
      </div>
      <div className="">
        <h1 className="text-center text-lg text-white">Click Spin</h1>
      </div>
      <div className="flex justify-center items-center py-10">
        <div
          id="container"
          className="relative w-[300px] lg:w-[400px] h-[300px] lg:h-[400px] flex justify-center items-center"
        >
          <div
            className="spinBtn hover:scale-125 duration-100 absolute w-[60px] h-[60px] bg-white rounded-[50%] z-10 flex justify-center items-center uppercase font-[600] text-[#333] border-4 border-[rgba(0,0,0,0.75)] cursor-pointer select-none"
            onClick={Putar}
          >
            Spin
          </div>
          <div className="wheelm absolute top-0 left-0 w-full h-full bg-[#fff] rounded-[50%] overflow-hidden ">
            <div
              className="number"
              style={{ "--i": 1, "--clr": "rgb(59 130 246)" }}
            >
              {Spinner(360)}
            </div>
            <div className="number" style={{ "--i": 2, "--clr": "#3b3939" }}>
              {Spinner(330)}
            </div>
            <div
              className="number"
              style={{ "--i": 3, "--clr": "rgb(59 130 246)" }}
            >
              {Spinner(300)}
            </div>
            <div className="number" style={{ "--i": 4, "--clr": "#3b3939" }}>
              {Spinner(270)}
            </div>
            <div
              className="number"
              style={{ "--i": 5, "--clr": "rgb(59 130 246)" }}
            >
              {Spinner(240)}
            </div>
            <div className="number" style={{ "--i": 6, "--clr": "#3b3939" }}>
              {Spinner(210)}
            </div>
            <div
              className="number"
              style={{ "--i": 7, "--clr": "rgb(59 130 246)" }}
            >
              {Spinner(180)}
            </div>
            <div className="number" style={{ "--i": 8, "--clr": "#3b3939" }}>
              {Spinner(150)}
            </div>
            <div
              className="number"
              style={{ "--i": 9, "--clr": "rgb(59 130 246)" }}
            >
              {Spinner(120)}
            </div>
            <div className="number" style={{ "--i": 10, "--clr": "#3b3939" }}>
              {Spinner(90)}
            </div>
            <div
              className="number"
              style={{ "--i": 11, "--clr": "rgb(59 130 246)" }}
            >
              {Spinner(60)}
            </div>
            <div className="number" style={{ "--i": 12, "--clr": "#3b3939" }}>
              {Spinner(30)}
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto pb-8 px-5 lg:mt-24">
        <p className="text-white lg:text-2xl font-bold text-center">
          Thank you for trying this app. Feel free give some advice!
        </p>
      </div>
    </div>
  );
}
