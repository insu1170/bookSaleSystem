import selectData from "../../config/sql/selectData";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import insertData from "../../config/sql/insertData";
import currentTime from "../../config/currentTime";
import updateDate from "../../config/sql/updateDate";

export const DirectOrderPage = () => {
    const navigate = useNavigate();
    const location = useLocation(); // 메인에서 넘겨 받은 주문 개수, 가격
    console.log('메인에서 오더 페이지로 넘어온 매개변수:', location.state)
    const [data, setData] = useState({
        card: [], address: []
    });

    const [state, setState] = useState({
        cardIndex: 0, addressIndex: 0
    })

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
        const time = currentTime()//현재시간
        const cardInfo = data.card[state.cardIndex]
        const addInfo = data.address[state.addressIndex]

        const key = ['orderDay', 'orderTotal', 'totalCount', 'cardOption', 'cardPeriod', 'postNum', 'normalAdd', 'detailAdd', 'userId']
        const value = [time, location.state.total, location.state.count, cardInfo.cardOption, cardInfo.cardPeriod, addInfo.postNum, addInfo.normalAdd, addInfo.detailAdd, '']

        console.log(key, value)
        const tf = await insertData('order', '/check', key, value)
        console.log(tf.value, '여기야')
        if (tf.success) {// 주문에 값넣기 성공 및 값 빼기
            updateDate('book', location.state.bookId, location.state.count, '-'); // 주문 한 만큼 수량 빼기
            insertData('orderList', '/insertUidX', ['orderTotalCount', 'orderId', 'bookId'], [location.state.count, tf.value, location.state.bookId])
            navigate('/main')
        }

    };

    return (<div>
        <div>주문 확인 창</div>
        카드를 선택하세요
        <select value={state.cardIndex} onChange={(e) => setState({...state, cardIndex: e.target.value})}>
            {data.card.map((card, index) => (<option key={index} value={index}>
                {card.cardNum}[{card.cardOption}] - {card.cardPeriod}
            </option>))}
        </select><br/>
        주소지를 선택하세요
        <select value={state.addressIndex} onChange={(e) => setState({...state, addressIndex: e.target.value})}>
            {data.address.map((address, index) => (<option key={index} value={index}>
                [{address.postNum}] {address.normalAdd}, {address.detailAdd}
            </option>))}
        </select>
        <button onClick={buy}>{location.state.total}원 결제 하기</button>
    </div>);
};
