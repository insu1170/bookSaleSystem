import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import sessionCheck from "../../config/sessionCheck";
import searchBook from "../../config/searchBook";
import cartBasket from "../../config/cartBasket";
import directOrder from "../../config/directOrder";

export const Main = () => {
    const [bookList, setBookList] = useState([]);
    const [count, setCount] = useState({
        quantity: 0, price: 0
    })
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

    const bookBuy = (e) => {
        console.log(e, '사보자고')
    }
    const openBuyCount = () => {
        // 나중에 hidden 추가하기
        setCount({...count, quantity: 0, price: 0})
    }

    const onClickHandleCount = (sign, max, price) => { // + - 버튼
        if (sign === '-') {
            if (count.quantity === 0) return
            setCount({
                ...count, quantity: count.quantity - 1, price: count.price - price
            });

        } else {
            if (count.quantity >= max) return
            setCount({
                ...count, quantity: count.quantity + 1, price: count.price + price
            });
        }

    }

    const directBuy = () => {
        directOrder()

    } // 바로 구매 구현 예정

    const cartIn = (item) => {
        cartBasket(item, count.quantity, count.price)
        setCount({...count, quantity: 0, price: 0})
    }
    return (<div>
        <h1>여기는 메인화면</h1>
        {bookList.map((item) => (<table key={item.id}>
            <tbody onClick={() => bookBuy(item)}>
            <tr>
                <th rowSpan="4" style={{width: 100}}>
                    <img src={item.bookUrl !== "" ? item.bookUrl : "/bookImg/defaultBook.png"} alt='X'
                         style={{width: 100}}/>
                </th>
            </tr>
            <tr>
                <td>{item.name}</td>
            </tr>
            <tr style={{height: 15}}>
                <td></td>
                <td>
                    <button onClick={openBuyCount}>구매하기</button>
                </td>
                <td>수량을 선택하세여 <button
                    onClick={() => onClickHandleCount('-', item.quantity, item.price)}>-</button>{count.quantity}
                    <button onClick={() => onClickHandleCount('+', item.quantity, item.price)}>+</button>
                    가격:{count.price}원
                </td>

                <td>
                    <button onClick={() => cartIn(item)}>장바구니 담기</button>
                    <button onClick={() => {
                        navigate('/orderPage',{state:{count:count.quantity,total:count.price,bookId:item.bookId}});
                        directBuy();
                    }}>바로 구매
                    </button>
                </td>
            </tr>
            <tr>
                <td>가격: {item.price}원({item.quantity}개)</td>
            </tr>

            </tbody>
        </table>))}
    </div>);
};
