import React, {useEffect, useState} from "react";
import axiosPostTrueFalse from "../../config/axios/axiosPostTrueFalse";
import port from "../../config/port";
import numberCheck from "../../config/numberCheck";
import axios from "axios";
import axiosPost from "../../config/axios/axiosPost";

export const AddBook = () => {
    const [state, setState] = useState({
        bookNumber: "", bookName: "", bookPrice: "", bookCount: "", bookImg: "", numberCheck: false, type:'text'
    });

    useEffect(() => {
        if (state.bookNumber) setState({...state, numberCheck: false});
    }, [state.bookNumber]);

    const changeValue = (e) => {
        const {name, value} = e.target;
        setState({
            ...state, [name]: value
        });
    };

    const changeType=()=>{
        let text = ""
        state.type==='text'? text ='file': text ='text';
        setState(({
            ...state,type: text
        }))
    }

    const checkBookNumber = async () => {
        const number =numberCheck(state.bookNumber,'제품 번호')
        if(!number[0]){
            return
        }
        try {
            const TF = await axiosPostTrueFalse(`${port}/overlap/check`, state.bookNumber, 'book', 'bookId');
            if (TF) {
                console.log('사용가능');
                setState({...state, numberCheck: true})
            } else {
                console.log('불가능');
                alert('이미 사용중')
            }
        } catch (error) {
            console.error(error);
        }
    };
    const addBook = async () => {
        if (state.numberCheck === false) {
            alert('제품 번호확인 먼저 하세요');
            return
        }
        const bookplace = numberCheck(state.bookPrice, '제품가격');
        const bookcount = numberCheck(state.bookCount, '제품수량');

        if (state.bookName !== "") {
            if (bookplace[0] && bookcount[0]) {
                if (window.confirm(`책 이름:${state.bookName}, 책 가격:${bookplace[1]}원, 책 수량:${bookcount[1]}원 맞습니까?`)) {
                    try {
                        const res = await axios.post(`${port}/add/book`, {
                            id: state.bookNumber,
                            name: state.bookName,
                            place: state.bookPrice,
                            count: state.bookCount,
                            img: state.bookImg
                        }, {
                            axiosPost
                        })
                        const data = await res.data;
                        if (data) {
                            alert("등록이 정상적으로 이루어 졌습니다");
                        } else {
                            alert("예상치 못한 오류가 발생했어요");
                        }
                    } catch (err) {
                        alert("예상치 못한 오류가 발생")
                    }

                } else {
                    console.log('dd')
                }
            }
        }
    }

    return (<div>
        제품번호:<input type="text" name="bookNumber" value={state.bookNumber} onChange={changeValue}/>
        <button onClick={checkBookNumber}>번호 확인</button>
        <br/>
        제품이름:<input type="text" name="bookName" value={state.bookName} onChange={changeValue}/>
        <br/>
        제품가격:<input type="text" name="bookPrice" value={state.bookPrice} onChange={changeValue}
                    placeholder="기본 값 0원"/>
        <br/>
        제품수량:<input type="text" name="bookCount" value={state.bookCount} onChange={changeValue}
                    placeholder="기본 값 0원"/>
        <br/>
        제품이미지:<input type={state.type} name="bookImg" onChange={changeValue} placeholder="사용할 사진의 URL입력"/> <input type="checkbox" onClick={changeType} />내 파일 사용 <br/>
        <button onClick={addBook}>도서 등록하기</button>
    </div>);
};
