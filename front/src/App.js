import {Login} from "./page/login/Login";
import {SignUp} from "./page/login/SingUp";
import {Route, Routes} from "react-router-dom";
import {Main} from "./page/main/Main";
import {AddBook} from "./page/addBook/AddBook";

function App() {
    return (<div className="App">
        <Routes>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/signup" element={<SignUp/>}></Route>
            <Route path="/main" element={<Main/>}/>
            <Route path="/addBook" element={<AddBook/>}/>
        </Routes>
    </div>);
}

export default App;
