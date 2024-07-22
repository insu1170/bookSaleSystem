import axios from "axios";
import port from "./port";


async function sessionCheck() {

    try {
        const response = await axios.get(`${port}/session/check`, {
            withCredentials: true // 쿠키 전송 허용
        });
        const data = response.data;
        if(data.success){
            console.log('있음')
            return true
        }else{
            console.log('없음')
            return false;
        }

    } catch (err) {
        console.error('에러 발생', err);
    }
}
export  default sessionCheck