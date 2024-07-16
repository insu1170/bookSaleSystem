import {Login} from "./component/login/Login";
import {SignUp} from "./component/login/SingUp";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/signup" element={<SignUp/>}></Route>
            </Routes>
        </div>);
}

export default App;
