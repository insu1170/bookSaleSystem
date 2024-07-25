import axios from "axios";
import port from "./port";

const searchBook = async () => {
    try {
        const res = await axios.get(`${port}/bookList`, {});

        return res.data;
    } catch (error) {
        console.error('Error fetching book list:', error);
        return [];
    }
};

export default searchBook;
