function numberCheck(number, name) {
    const checked = Number(number);
    if (!isNaN(checked)) {
        console.log(name, `입력`)
        console.log(checked)
        return [true,Math.abs(Math.round(checked))]
    } else {
        console.log('dd')
        alert(`${name} 숫자만 입력 하세요`)
        return [false,number];
    }
}

export default numberCheck;

