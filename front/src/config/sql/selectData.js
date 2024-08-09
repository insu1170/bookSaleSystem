import axios from "axios";
import port from "../port";
import axiosPostCookie from "../axios/axiosPostCookie";

async function selectData(tableName, url, ...query) {
    console.log(tableName, url, ...query);
    const queryData = query[0];
    const filterKey =query[1]
const filterVal = query[2]
    const sql = `SELECT ${queryData} from ${tableName} where ${filterKey} = ?`

    const data = await axios.post(`${port}${url}`, {
        sql: sql,datas:filterVal
    }, axiosPostCookie)
    console.log(data, 'select 결과 임')
    return (data.data)
}

export default selectData;