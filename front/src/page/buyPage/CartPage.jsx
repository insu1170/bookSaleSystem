import selectData from "../../config/sql/selectData";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
export const CartPage = () => {
    const [cartData, setCartData] = useState(new Map());
    const [mapKey, setMapKey] = useState([]);
    const [bookData, setBookData] = useState(new Map());
    const [totalInfo, setTotalInfo] = useState({
        price:0, count:0
    });
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const data = await selectData('cart', '/select', ['orderCount', 'bookId'], ['userId']);
            console.log(data);

            const keys = [];
            const newCartData = new Map();
            const newBookData = new Map();
            let totalPrice = 0;
            let totalCount = 0;
            for (const item of data) {
                if (!newCartData.has(item.bookId)) {
                    console.log('map에 데이터 없어요');
                    keys.push(item.bookId);
                    newCartData.set(item.bookId, item.orderCount);

                    const bookDatas = await selectData('book', '/selectUidX', ['bookId', 'name', 'price'], ['bookId'], [item.bookId]);
                    newBookData.set(item.bookId, [bookDatas[0].name, bookDatas[0].price]);
                    totalCount+=item.orderCount;
                    totalPrice += bookDatas[0].price * item.orderCount;
                } else {
                    console.log('map에 데이터 있어요');
                    newCartData.set(item.bookId, newCartData.get(item.bookId) + item.orderCount);

                    const existingBookPrice = newBookData.get(item.bookId)[1] || 0;
                    totalPrice += existingBookPrice * item.orderCount;
                    totalCount+=item.orderCount;
                }
            }

            setMapKey(keys);
            setBookData(newBookData);
            setCartData(newCartData);
            setTotalInfo({
                ...totalInfo, count:totalCount , price: totalPrice
            })
            console.log(newCartData, '카트 데이터');
            console.log(newBookData, '책 데이터');
        };

        fetchData();
    }, []);

    const buyHandle = async () => {
navigate('/orderPage',{state:{'count':totalInfo.count,'totalPrice':totalInfo.price,'detailInfo':cartData,'bookId':mapKey}})
    }

    return (
        <div>
            <h1>Cart Page</h1>
            <div>
                {mapKey.map((bookId, index) => (
                    <div key={index}>
                        bookId: {bookId}, count: {cartData.get(bookId)} 개당 가격:{bookData.get(bookId)[1]}
                        {/*<button>수량 증가</button> */}
                        {/*<button>수량 감소</button>*/}
                        {/*<button value={index} onClick={onClickHandle}>장바구니 제외</button>*/}
                    </div>
                ))}
            </div>
            <button onClick={buyHandle}>{totalInfo.count}개 {totalInfo.price}원 구입하기</button>
        </div>
    );
};
