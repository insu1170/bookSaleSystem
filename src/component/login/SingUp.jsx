import React, { useState } from "react";

export const SignUp = () => {
    const [idValue, setIdValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [idChecked, setIdChecked] = useState(false);

    const idCheck = () => {
        fetch("http://localhost:3001/login/check", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: idValue })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.exists) {
                alert('이미 사용 중인 아이디입니다.');
            } else {
                alert('사용 가능한 아이디입니다.');
                setIdChecked(true);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // 폼의 기본 제출 이벤트를 막음
        if (idChecked) {
            // 폼 제출 로직 추가
            console.log('폼 제출:', idValue, passwordValue);
        } else {
            alert('아이디 중복 확인을 해주세요.');
        }
    }

    return (
        <div>
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
                <button type="button" onClick={idCheck}>중복확인</button><br/>

                비밀번호:<input
                    type="text"
                    name="password"
                    id="passwordInput"
                    placeholder="잠깐! ID 중복확인 하셨나요?"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    disabled={!idChecked}
                />
                
                <input type="submit" value="가입완료" />
            </form>
            <form action="/public/login.html">
                <button>로그인 창으로</button>
            </form>
        </div>
    );
}
