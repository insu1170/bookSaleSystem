import {useState} from "react";
import axios from "axios";
import port from "../../config/port";
import axiosPost from "../../config/axiosPost";

export const AddAddress = () => {
    const [state, setState] = useState({
        postNum: "", normalAdd: "", detailAdd: "", inputState: false
    })
    let searchWindow = null; //주소 검색 창
    const search = () => {
        searchWindow = window.open("https://business.juso.go.kr/addrlink/addrLinkUrl.do?confmKey=devU01TX0FVVEgyMDI0MDcyNjE2MzkxNzExNDk2NjI=&returnUrl=http://localhost:3001/Address&useDetailAddr=Y", "pop", "width=570,height=420, scrollbars=yes, resizable=yes")
        clintReq()
    }

    const clintReq = async () => { //여기서 값을 받고 값을 text로 띄우기 위해서 writeAdd 호출
        const response = await axios.post(`${port}/address`, {}, axiosPost)
        const data = response.data
        writeAdd(data)
        searchWindow.close()
    }

    const writeAdd = (data) => {
        setState({
            postNum: data.data[0] || "", normalAdd: data.data[1] || "", detailAdd: data.data[2] || "", inputState: true
        });

    }
    const changeHandle = (e) => {
        const data = e.target.value
        setState({
            ...state, detailAdd: data
        })
    }
    return (<div>
        우편번호:<input type="text" value={state.postNum} disabled='false'/>
        <button onClick={search}>검색</button>
        기본주소<input type="text" value={state.normalAdd} disabled='false'/>
        상세주소<input type="text" value={state.detailAdd} onChange={changeHandle} disabled={!state.inputState}/>

    </div>)
}