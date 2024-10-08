import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import selectData from "../../config/sql/selectData";
import currentTime from "../../config/currentTime";
import insertData from "../../config/sql/insertData";

export const OrderPage = () => {
    const location = useLocation();
    console.log(location.state, '받은 결과');

    // 카드와 주소의 선택 상태를 관리하기 위한 state 정의
    const [state, setState] = useState({
        cardIndex: 0, // 기본 카드 선택 인덱스
        addressIndex: 0 // 기본 주소 선택 인덱스
    });

    const [data, setData] = useState({
        card: [], address: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const cardData = await selectData('card', '/select', ['cardNum', 'cardPeriod', 'cardOption'], ['userId']);
                const addressData = await selectData('address', '/select', ['postNum', 'normalAdd', 'detailAdd'], ['userId']);

                setData({
                    card: cardData, address: addressData
                });

                console.log(cardData, addressData, '데이터 받음');
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const buy = async () => {
        console.log(location.state)

        const time = currentTime()//현재시간
        const cardInfo = data.card[state.cardIndex]
        const addInfo = data.address[state.addressIndex]
        console.log(cardInfo)
        const key = ['orderDay', 'orderTotal', 'totalCount', 'cardOption', 'cardPeriod', 'postNum', 'normalAdd', 'detailAdd', 'userId']
        const value = [time, location.state.totalPrice, location.state.count, cardInfo.cardOption, cardInfo.cardPeriod, addInfo.postNum, addInfo.normalAdd, addInfo.detailAdd, '']
        const order = await insertData('order', '/check', key, value)
        console.log(order.value, '주문 키')
        const bookKey = location.state.bookId
        console.log(location.state.detailInfo.get(bookKey), '다시 받은거')
        const detailInfoLen = location.state.detailInfo.size // 장바구니에서 온 디테일 정보
        for (let a = 0; a <= detailInfoLen - 1; a++) {
            insertData('orderList', '/insertUidX', ['orderTotalCount', 'orderId', 'bookId'], [location.state.detailInfo.get(bookKey[a]), order.value, bookKey[a]])
        }
    }

    return (<div>
        <div>주문 확인 창</div>
        카드를 선택하세요
        <select value={state.cardIndex} onChange={(e) => setState({...state, cardIndex: e.target.value})}>
            {data.card.map((card, index) => (<option key={index} value={index}>
                {card.cardNum}[{card.cardOption}] - {card.cardPeriod}
            </option>))}
        </select>
        <br/>
        주소지를 선택하세요
        <select value={state.addressIndex} onChange={(e) => setState({...state, addressIndex: e.target.value})}>
            {data.address.map((address, index) => (<option key={index} value={index}>
                [{address.postNum}] {address.normalAdd}, {address.detailAdd}
            </option>))}
        </select>
        <button onClick={buy}>{location.state.total}원 결제 하기</button>
    </div>);
}
