import React, {useState} from "react";
import insertData from "../../config/sql/insertData";

export const AddCard = () => {
    const [cardInfo, setCardInfo] = useState({
        cardNum1: '', cardNum2: '', cardNum3: '', cardNum4: '', cardPeriod: '', cardOption: ""
    })

    const changeHandle = (e) => {
        const {value, name} = e.target
        setCardInfo({
            ...cardInfo, [name]: value
        })
    }

    const handleSubmit = async () => {
        const queryNames = Object.keys(cardInfo)
        queryNames.splice(0, 4, 'cardNum');
        const queryValues = Object.values(cardInfo);
        const data = queryValues.slice(0, 4)
        let inputs = ""

        data.map((data) => {
            inputs += data;
        })

        queryValues.splice(0, 4, inputs)
        queryNames.push('userId')
        queryValues.push('')
        // console.log(queryNames, queryValues)

        try {
            await insertData('card', '/check', queryNames, queryValues);
            alert('등록되었습니다!');
        } catch (err) {
            alert('오류가 발생했습니다.');
            console.error(err);
        }
    };

    return (<div>
            카드번호:
            <input
                type="text"
                placeholder="****"
                maxLength="4"
                name='cardNum1'
                value={cardInfo.cardNum1}
                onChange={changeHandle}
            />-
            <input
                type="text"
                maxLength="4"
                name='cardNum2'
                value={cardInfo.cardNum2}
                onChange={changeHandle}
            />-
            <input
                type="text"
                maxLength="4"
                name='cardNum3'
                value={cardInfo.cardNum3}
                onChange={changeHandle}
            />-
            <input
                type="password"
                maxLength="5"
                name='cardNum4'
                value={cardInfo.cardNum4}
                onChange={changeHandle}
            />
            <br/>

            유효기간:
            <input
                type="text"
                placeholder="유효기간 입력하세요"
                name='cardPeriod'
                value={cardInfo.cardPeriod}
                onChange={changeHandle}
            />
            <br/>

            카드종류:
            <input
                type="text"
                placeholder="입력하세요"
                name="cardOption"
                value={cardInfo.cardOption}
                onChange={changeHandle}
            />
            <button onClick={handleSubmit}>등록하기</button>
        </div>

    )
}