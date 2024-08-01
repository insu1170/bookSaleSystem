import insertData from "./sql/insertData";
import updateDate from "./sql/updateDate";
import currentTime from "./currentTime"; // 현재 시간을 구하는 함수 _ db dateTime에 맞게


const cartBasket = async (item, count, price) => {
    const today = currentTime()
    console.log(today)
    const success = await insertData('cart', '/check', ['orderCount', 'time', 'bookId', 'userId'], [count, today, item.bookId, ''])
    if (success) {// 여기서 수량 빼는 함수 작성 해야함 - updateData에서 유동적으로 뺄 수 있게
        const updates = updateDate('book', item.bookId, count, '-');
        console.log(updates, '업데이트')
    } else {
        alert('예상치 못한 오류가 발생')
    }

}
export default cartBasket