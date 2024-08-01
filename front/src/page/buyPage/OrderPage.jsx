import selectData from "../../config/sql/selectData";
import { useEffect, useState } from "react";

export const OrderPage = () => {


    useEffect(() => {
        const fetchCardData = async () => {
            try {
                const cardData = await selectData('card', '/selectTable', ['cardNum', 'cardPeriod', 'cardOption'], ['userId']);
                const addressData = await selectData('address','selectTable',['postNum','normalAdd','detailAdd'])
                console.log(cardData,addressData, '데이터 받음');

            } catch (error) {
                console.error("Error fetching card data:", error);
            }
        };

        fetchCardData();
    }, []);

    return (
        <div>
            <div>주문 확인 창</div>


        </div>
    )
}
