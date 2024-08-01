import axios from "axios";
import port from "../port";
import axiosPost from "../axios/axiosPost";
/** 테이블 이름, 책ID, 변경 수량, +혹은 - */
async function updateDate(tableName, bookId, subCount, mark) {

    const sql = `UPDATE ${tableName} set quantity= quantity ${mark} ${subCount} where bookId = ${bookId}`;
    const response = await axios.post(`${port}/update`, {
        sql: sql
    }, axiosPost)
    const data = response.data
    console.log('업데이트 결과',data)


}

export default updateDate