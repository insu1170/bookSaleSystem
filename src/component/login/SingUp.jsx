import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';


export const SignUp = () => {
    const [idValue, setIdValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [idChecked, setIdChecked] = useState(false);
    const [phoneNum, setPhoneNum] = useState('');
    const [nickName, setNickName] = useState("");
    const [passSecret, setPassSecret] = useState("");


    // const [state, setState] = useState({
    //     idValue: '',
    //     passwordValue: '',
    //     idChecked: false,
    //     phoneNum: '',
    //     nickName: '',
    //     passSecret: ''
    // });

    useEffect(() => {
        if (passwordValue) {
            inputSecret(passwordValue);
        }
    }, [passwordValue]);

    useEffect(() => {  //아이디 중복 확인 후 값 변경할 경우
        if (idValue) setIdChecked(false)
    }, [idValue]);

    const idCheck = () => {
        fetch("http://localhost:3001/id/check", {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify({id: idValue})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.length);
                if (data.length == 0) {
                    alert('사용 가능한 아이디입니다.');
                    setIdChecked(true);
                } else {
                    alert('이미 사용 중인 아이디입니다.');
                    setIdChecked(false);
                    setPasswordValue("");
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const inputSecret = (passWord) => { // 나중에 좀 더 추가
        const length = passWord.length
        if (length >= 9) {
            setPassSecret("굿")
        } else if (length >= 4) {
            setPassSecret("보통");
        } else {
            setPassSecret("약함")
        }


    }

    const handleSubmit = (event) => {
        event.preventDefault(); // 폼의 기본 제출 이벤트를 막음
        if (idChecked) {// 폼 제출 로직 추가

            if (phoneNum.length == 11) {
                console.log('god')

                fetch('http://localhost:3001/signup', {
                    method: 'POST', headers: {
                        'Content-Type': 'application/json'
                    }, body: JSON.stringify({id: idValue, password: passwordValue, nick: nickName, number: phoneNum})
                }).then(res => res.json())
                    .then(data => { //true flase 반환
                        if(data){
                            alert('정상적으로 가입 완료되었습니다.')
                        }else{
                            alert('예상치 못한 오류가 발생하였습니다.')
                        }
                        console.log(data);
                    })


            } else {
                alert('전화번호 11자리 입력하세요')
            }
            console.log('폼 제출:', idValue, passwordValue);
        } else {
            alert('아이디 중복 확인을 해주세요.');
        }
    }
    const signupCheck = () => {
        if (phoneNum.length == 11) {
            console.log("굿")
        } else {
            alert('전화번호 11자리를 입력하세요')
        }


    }
    const navigate = useNavigate();

    return <div>
        <form id="signupForm" onSubmit={handleSubmit}>
            아이디:
            <input
                type="text"
                name="id"
                id="idInput"
                placeholder="ID 입력창입니다"
                value={idValue}
                onChange={(e) => setIdValue(e.target.value)}
            />
            <button type="button" onClick={idCheck}>중복확인</button>
            <br/>

            비밀번호:<input
            type="text"
            name="password"
            id="passwordInput"
            placeholder="잠깐! ID 중복확인 하셨나요?"
            value={passwordValue}
            onChange={(e) => {
                setPasswordValue(e.target.value);
            }}
            disabled={!idChecked}
            maxLength="25"
        /> {passSecret}
            <br/>
            닉네임:
            <input
                type="text"
                name="name"
                id="nickName"
                value={nickName}
                onChange={(e) => {
                    setNickName(e.target.value);
                }}
                disabled={!idChecked}
                maxLength="25"
            />
            <br/>
            전화번호:
            <input
                type="number"
                name='phoneNum'
                id="phoneNumber"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                disabled={!idChecked}
                maxLength="11"

            />

            <input type="submit" value="가입완료" onSubmit={signupCheck}/>
        </form>

        <button onClick={() => navigate('/login')}>
            로그인 창으로
        </button>
    </div>
}
