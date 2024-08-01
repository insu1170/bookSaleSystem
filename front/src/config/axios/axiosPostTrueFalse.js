import axios from "axios";
import axiosPost from "./axiosPost";

async function axiosPostTrueFalse(URL, number, table, query) {
    const res = await axios.post(URL, {
        id: number, tableName: table, query: query
    }, axiosPost);
    const data = res.data;
    console.log(data, 'dd');
    return !!(data);
}

export default axiosPostTrueFalse;
