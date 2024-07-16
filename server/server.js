const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

app.use(cors());
// 미들웨어 설정
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: '127.0.0.1', user: 'root', password: '1234', database: 'booksalesystem'
});

connection.connect();

app.post('/id/check', (req, res) => {
    const id = req.body.id;
    console.log(`${id} 확인`);
    connection.query('select userId from user where userId = ?', [id], (err, result) => {
        console.log(result)
        if (result.length > 0) {
            console.log('거절');
        } else {
            console.log('가능');
        }
        res.json(result)
    })
});

app.post('/signup', (req, res) => {
    const value = req.body;
    connection.query('INSERT INTO `user` (`userId`, `passWord`, `userName`, `phoneNum`) VALUES (?, ?, ?, ?)', [value.id, value.password, value.nick, value.number], (err, result) => {
        if (err) {
            console.log('실패', err)
            res.json(false)
        } else {
            console.log('성공', result.insertId)
            res.json(true)
        }

    })
})

app.post('/login/check', (req, res) => {
    const data = req.body;
    connection.query('select userId,passWord from user where userId = ? and passWord = ?', [data.id, data.passWord], (err, result) => {
        if (err) {
            console.log("예상치 못한 오류")
            res.json(err)
        } else if (result.length > 0) {
            console.log("회원 확인");
            res.json(true)
        } else {
            console.log('d없어')
        }
    })
})

app.set('port', process.env.PORT || 3001);
const server = http.createServer(app).listen(app.get('port'), () => {
    console.log('서버 시작: ' + app.get('port'));
});
