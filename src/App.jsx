import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import InfoBot from "./pages/InfoBot";
import TalkBot from "./pages/TalkBot";
  
function App(props) {
  return (
    <BrowserRouter>
      <Navbar></Navbar>   
        <Routes>
          <Route path="/" element={<InfoBot />} />
          <Route path="/TalkBot" element={<TalkBot />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
