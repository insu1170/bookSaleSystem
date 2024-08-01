import axios from 'axios';
import port from '../port';
import axiosPostCookie from "../axios/axiosPostCookie";


/** 테이블 이름, 서버 url, key값, value값 넣으면 맞춰서 insert 문 실행*/
async function insertData(tableName, url, ...query) {

    const columns = query[0]; //key 값
    const values = query[1];  // value 값
    console.log(columns, values, url)
    const columnString = columns.join(', '); // key 값 배열을 문자열로 + 배열 값마다 , 를 넣는 과정
    const queryMark = values.map(() => '?').join(', '); // 값 개수만큼 ? 문자열 생성및 위와 같이 ,를 넣는 과정

    const sqlQuery = `INSERT INTO ${tableName} (${columnString}) VALUES (${queryMark})`; //쿼리문
    try {
        const response = await axios.post(`${port}${url}`, {
            table: tableName, query: {sql: sqlQuery, values}
        }, axiosPostCookie);
        // 응답 처리
        const data = response.data;
        if (data.success) {
            console.log('삽입완료')
            return true
        } else {
            console.log('삽입 실패')
            return false;
        }

    } catch (err) {
        return false
    }
}

export default insertData;
