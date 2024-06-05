import Spin from "./component/Spin";
import Home from "./component/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import DisableDevtool from 'disable-devtool';
import HomeMobile from "./component/mobile/HomeMobile";
import FortuneWheel from "./component/mobile/FortuneWheel";

function App() {
  // DisableDevtool();
  return (
    <Router>
      <div className="hidden md:block">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fortunewheel" element={<Spin />} />
        </Routes>
      </div>
      {/* For Mobile */}
      <div className="md:hidden">
        <Routes>
          <Route path="/" element={<HomeMobile />} />
          <Route path="/fortunewheel" element={<FortuneWheel />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
