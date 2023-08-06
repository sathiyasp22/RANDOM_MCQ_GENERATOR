import "./App.css";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./Components/Forms/login";
import Register from "./Components/Forms/register";
import { useState, useEffect } from "react";
import Profile from "./Components/DashBoard/Profile";

function App() {
  const [token, setToken] = useState("");
  const [refresh,setRefresh] = useState(false)

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setToken(userToken);
      setRefresh(true)
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {
          token ? <Route path="/" element={<Home />} /> : <Route path="/login" element={<Login />} />
        }
        {
          token ? <Route path="/profile" element={<Profile />} /> : <Route path="/login" element={<Login />} />
        }
        
        <Route path="/signup" element={<Register />} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
