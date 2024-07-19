import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

export const SignUp = () => {
    const [state, setState] = useState({
        idValue: '', passwordValue: '', idChecked: false, phoneNum: '', nickName: '', passSecret: ''
    });

    const onChangeValue = (e) => {
        const {value, name} = e.target;
        setState({
            ...state, [name]: value
        });
    }

    useEffect(() => {
        if (state.passwordValue) {
            inputSecret(state.passwordValue);
        }
    }, [state.passwordValue]);

    useEffect(() => {
        if (state.idValue) setState({...state, idChecked: false});
    }, [state.idValue]);

    const inputSecret = (password) => {
        const length = password.length;
        if (length >= 9) {
            setState({...state, passSecret: "굿"});
        } else if (length >= 4) {
            setState({...state, passSecret: "보통"});
        } else {
            setState({...state, passSecret: "약함"});
        }
    }

    const idCheck = async () => {
        try {
            const response = await axios.post('http://localhost:3001/id/check', {
                id: state.idValue
            }, {
                headers: {"Content-Type": 'application/json'},
                withCredentials: true // 쿠키 전송 허용
            });
            const data = response.data;
            if (data.length === 0) {
                alert('사용 가능한 아이디입니다.');
                setState({...state, idChecked: true});
            } else {
                alert('이미 사용 중인 아이디입니다.');
                setState({...state, idChecked: false, passwordValue: ''});
            }
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.idChecked) {
            if (state.phoneNum.length === 11) {
                try {
                    const response = await axios.post('http://localhost:3001/signup', {
                        id: state.idValue, password: state.passwordValue, nick: state.nickName, number: state.phoneNum
                    }, {
                        headers: {"Content-Type": 'application/json'}
                    });
                    const data = response.data;
                    if (data) {
                        alert("회원가입이 정상적으로 이루어 졌습니다");
                    } else {
                        alert("예상치 못한 오류가 발생했어요");
                    }
                } catch (err) {
                    console.error(err);
                    alert("서버와 통신 중 오류가 발생했습니다.");
                }
            } else {
                alert("전화번호 11자리를 입력하세요");
            }
        } else {
            alert("아이디 중복을 확인하세요");
        }
    }

    const navigate = useNavigate();

    return (
        <div>
            <form id="signupForm" onSubmit={handleSubmit}>
                아이디:
                <input
                    type="text"
                    name="idValue"
                    id="idInput"
                    placeholder="ID 입력창입니다"
                    value={state.idValue}
                    onChange={onChangeValue}
                />
                <button type="button" onClick={idCheck}>중복확인</button>
                <br/>

                비밀번호:
                <input
                    type="password"
                    name="passwordValue"
                    id="passwordInput"
                    placeholder="잠깐! ID 중복확인 하셨나요?"
                    value={state.passwordValue}
                    onChange={onChangeValue}
                    disabled={!state.idChecked}
                    maxLength="25"
                /> {state.passSecret}
                <br/>
                닉네임:
                <input
                    type="text"
                    name="nickName"
                    id="nickName"
                    value={state.nickName}
                    onChange={onChangeValue}
                    disabled={!state.idChecked}
                    maxLength="25"
                />
                <br/>
                전화번호:
                <input
                    type="number"
                    name='phoneNum'
                    id="phoneNumber"
                    value={state.phoneNum}
                    onChange={onChangeValue}
                    disabled={!state.idChecked}
                    maxLength="11"
                />
                <input type="submit" value="가입완료"/>
            </form>

            <button onClick={() => navigate('/login')}>
                로그인 창으로
            </button>
        </div>
    );
}
