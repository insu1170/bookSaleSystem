import React, {useState} from "react";


export const Login = () => {
    const [state, setState] = useState({
        idValue: "", passWordValue: ""
    })
    const onChangeValue = (e) => {
        const {value, name} = e.target;
        console.log(state)
        setState({
            ...state,
            [name]: value
        })
    }
    const loginCheck = () => {
        fetch('http://localhost:3001/login/check', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: state.idValue, passWord: state.passWordValue})
        }).then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(err => console.error(err))
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
            <button>회원가입</button>
        </div>
    </div>)
}