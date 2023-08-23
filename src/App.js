import "./App.css";
import { useState } from "react";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import NoteState from "./contexts/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SingUp from "./components/SingUp";
import UserState from "./contexts/user/UserState";

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type)=>{
    setAlert({
      msg : message,
      type : type
    })
    setTimeout(()=>{
      setAlert(null)
    },3000)
  }
  return (
    <>
    <UserState>
      <NoteState>
        <Router>
          <Navbar showAlert={showAlert}/>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About/>} />
              <Route path="/login" element={<Login showAlert={showAlert}/>} />
              <Route path="/signup" element={<SingUp showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>
      </UserState>
    </>
  );
}

export default App;
