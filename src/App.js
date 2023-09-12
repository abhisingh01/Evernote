import "./App.css";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import About from "./Component/About";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Component/Alert";
import { useState } from "react";
import Login from "./Component/Login"
import Signup from "./Component/Signup"

function App() {
    const [alert, setAlert] = useState(null);
    const showAlert = (message,type) => {
        setAlert({
            message:message,
            type:type
        })
        setTimeout(() => {
            setAlert(null)
        }, 1500);
    }

    return (
        <>
            <NoteState>
                <Router>
                    <Navbar />
                    <Alert alert={alert}/>
                    <div className="container my-3">
                        <Routes>
                            <Route exact path="/" element={<Home showAlert={showAlert}/>}></Route>
                            <Route exact path="/about" element={<About />}></Route>
                            <Route exact path="/login" element={<Login showAlert={showAlert}/>}></Route>
                            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}></Route>
                        </Routes>
                    </div>
                </Router>
            </NoteState>
        </>
    );
}

export default App;
