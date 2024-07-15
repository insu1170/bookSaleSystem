import React from "react";

export const Login = () => {
    return (
        <div>
        <div>
            아이디: <input type="text" placeholder="아이디 입력"/><br/>
            비밀번호:<input type="text" placeholder="비밀번호를 입력하세요"/>
        </div>
        <div>
            <input type="submit"  value="로그인" /><button>회원가입</button>
        </div>
        </div>
    )
}