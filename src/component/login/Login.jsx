import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        idValue: "", passWordValue: ""
    })
    const onChangeValue = (e) => {
        const {value, name} = e.target;
        console.log(state)
        setState({
            ...state, [name]: value
        })
    }
    const loginCheck = () => {

        fetch('http://localhost:3001/login/check', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', // 쿠키를 포함하도록 설정합니다.
            body: JSON.stringify({id: state.idValue, passWord: state.passWordValue})
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.success){

                    console.log('로그인 완료')
                    navigate('/main')
                }else{
                    console.log('실패')
                }

            })
            .catch(err => console.error(err))
    }

    const sessionCheck=()=>{
        fetch('http://localhost:3001/session/check',{
            method:"GET",
            credentials: 'include'
        }).then(res=>res.json())
            .then(data=>{
                console.log(data)
            })
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
            <button onClick={sessionCheck}>회원가입</button>
        </div>
    </div>)
}