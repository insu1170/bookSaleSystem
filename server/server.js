const express = require('express');
const http = require('http');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const MySqlSession = require('express-mysql-session')(session);


app.use(cors({
    origin: 'http://localhost:3000', // 클라이언트의 주소를 지정합니다.
    credentials: true
}));
// 미들웨어 설정
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: '127.0.0.1', user: 'root', password: '1234', database: 'booksalesystem'
});

connection.connect();

app.use(express.json())

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: "secret", resave: false, saveUninitialized: false, cookie: {
        maxAge:3600 * 1000 , httpOnly: false, secure: false,
    },
}));

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
            console.log("쿼리 오류 발생", err);
            res.json(err);
        } else if (result.length > 0) {
            console.log("회원 확인");
            req.session.user = {
                id: data.id, passWord: data.passWord, name: "userName", authorized: true
            };
            res.json({success: true, user:req.session.user})
            console.log(req.session.user);
        } else {
            console.log('로그인 실패');
            res.json(false);
        }
    });
});

app.get('/session/check', (req, res) => {
    console.log('세션 확인:',req.session.user)
    if(req.session.user){
        res.json({success: true, user:req.session.user})
    }else{
        res.json({success:false, user:false})
    }
})
app.get('/main', (req, res) => {
    console.log(req.session.user);
})


app.set('port', process.env.PORT || 3001);
const server = http.createServer(app).listen(app.get('port'), () => {
    console.log('서버 시작: ' + app.get('port'));
});






