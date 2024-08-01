import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import axiosPostCookie from "../../config/axios/axiosPostCookie";
import port from "../../config/port";
import sessionCheck from "../../config/sessionCheck";

export const Login = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        idValue: "", passWordValue: ""
    })
    const onChangeValue = (e) => {
        const {value, name} = e.target;
        console.log(state,e.target)
        setState({
            ...state, [name]: value
        })
    }

    async function loginCheck() {
        try {
            const response = await axios.post(`${port}/login/check`, {
                id: state.idValue, passWord: state.passWordValue
            },axiosPostCookie // 쿠키를 포함하도록 설정합니다.
            );
            const data = response.data;
            console.log(data);

            if (data.success) {
                console.log('로그인 완료');
                navigate('/main');
            } else {
                console.log('실패');
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (<div>
        <div>
            아이디:
            <input
                type="text"
                placeholder="아이디 입력"
                name="idValue"
                value={state.idValue}
                onChange={onChangeValue}
            /><br/>
            비밀번호:
            <input
                type="text"
                placeholder="비밀번호를 입력하세요"
                name="passWordValue"
                value={state.passWordValue}
                onChange={onChangeValue}
            />
        </div>
        <div>
            <input type="submit" value="로그인" onClick={loginCheck}/>
            <button onClick={() => sessionCheck()}>회원가입</button>
        </div>
    </div>)
}