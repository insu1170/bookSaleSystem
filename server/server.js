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
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'booksalesystem'
});

connection.connect();

app.post('/login/check', (req, res) => {
    const id = req.body.id;
    console.log(`${id}ㅇㄹㅇㄹ`);
});

app.set('port', process.env.PORT || 3001);
const server = http.createServer(app).listen(app.get('port'), () => {
    console.log('서버 시작: ' + app.get('port'));
});
