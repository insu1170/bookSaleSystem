import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import sessionCheck from "../../config/sessionCheck";
import searchBook from "../../config/searchBook";

export const Main = () => {
    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const checkSessionAndFetchBooks = async () => {
            const isValid = await sessionCheck();
            if (!isValid) {
                alert('로그인 먼저 해주세요');
                navigate('/login');
            } else {
                const books = await searchBook();
                setBookList(books);
                console.log(books);
            }
        };

        checkSessionAndFetchBooks();
    }, [navigate]);

    const bookBuy=()=>{
        console.log('사보자고')
    }
    
    return (<div>
        <h1>여기는 메인화면</h1>
        {bookList.map((item) => (<table key={item.id}>
            <tbody onClick={bookBuy}>
            <tr>
                <th rowSpan="3" style={{width: 100}}>
                    <img src={item.bookUrl !== "" ? item.bookUrl : "/bookImg/defaultBook.png" } alt='X'
                         style={{width: 100}}/>
                </th>
            </tr>
            <tr>
                <td>{item.name}</td>
            </tr>
            <tr>
                <td>가격: {item.price}원({item.quantity}개)</td>
            </tr>
            </tbody>
        </table>))}
    </div>);
};
