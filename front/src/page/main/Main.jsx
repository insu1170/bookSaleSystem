import React, {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import sessionCheck from "../../config/sessionCheck";

export const Main = () => {
    const navigate = useNavigate();


    useEffect(() => {
        const checkSession = async () => {
            const isValid = await sessionCheck();
            if (!isValid) {
                alert('로그인 먼저 해주세요')
                navigate('/login');
            } else {
                console.log("dd")
            }
        };
        checkSession();
    }, []);

    return (<div>
            여기는 메인화면
        </div>);
};

