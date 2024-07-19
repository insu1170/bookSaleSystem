import {Login} from "./page/login/Login";
import {SignUp} from "./page/login/SingUp";
import {Route, Routes} from "react-router-dom";
import {Main} from "./page/main/Main";

function App() {
    return (<div className="App">
        <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/main" element={<Main/>}/>
        </Routes>
    </div>);
}

export default App;
