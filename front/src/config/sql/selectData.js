import axios from "axios";
import port from "../port";
import axiosPostCookie from "../axios/axiosPostCookie";

async function selectData(tableName, url, ...query) {
    console.log(tableName, url, ...query);
    const queryData = query[0];

    const sql = `SELECT ${queryData} from ${tableName} where userId = ?`

    const data = await axios.post(`${port}/select`, {
        sql: sql,
    }, axiosPostCookie)
    console.log(data, '결과 임')
    return (data.data)
}

export default selectData;