import {Login} from "./page/login/Login";
import {SignUp} from "./page/login/SingUp";
import {Route, Routes} from "react-router-dom";
import {Main} from "./page/main/Main";
import {AddBook} from "./page/addPage/AddBook";
import {AddCard} from "./page/addPage/AddCard";

function App() {
    return (<div className="App">
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/addBook" element={<AddBook/>}/>
            <Route path="/addCard" element={<AddCard/>}/>
        </Routes>
    </div>);
}

export default App;
