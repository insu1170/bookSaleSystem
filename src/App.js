import {Login} from "./component/login/Login";
import {SignUp} from "./component/login/SingUp";
import {Route, Routes} from "react-router-dom";
import {Main} from "./component/main/Main";

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
