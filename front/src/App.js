import {Login} from "./page/login/Login";
import {SignUp} from "./page/login/SingUp";
import {Route, Routes} from "react-router-dom";
import {Main} from "./page/main/Main";
import {AddBook} from "./page/addPage/AddBook";
import {AddCard} from "./page/addPage/AddCard";
import {AddAddress} from "./page/addPage/AddAddress";
import {DirectOrderPage} from "./page/buyPage/DirectOrderPage";
import {CartPage} from "./page/buyPage/CartPage";
import {OrderPage} from "./page/buyPage/OrderPage";

function App() {
    return (<div className="App">
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/addBook" element={<AddBook/>}/>
            <Route path="/addCard" element={<AddCard/>}/>
            <Route path="/addAddress" element={<AddAddress/>}/>
            <Route path="/direct/orderPage" element={<DirectOrderPage/>}/>
            <Route path="/cartPage" element={<CartPage/>}/>
            <Route path="/orderPage" element={<OrderPage/>}/>
        </Routes>
    </div>);
}

export default App;
