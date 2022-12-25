// 🟩 node.js 상에서 express 라이브러리를 사용해 server 를 만들기 위한 기본 문법!!
//    : 간단히 말해, server 오픈하는 문법!
//      Ex) const express = require('express');
//          const app = express();
//          app.listen();
const express = require('express');
const app = express();
// 🟧 2. 아래와 같이 적어줌! (이것까지 해줘야 body-parser 을 사용할 수 있음!)
const bodyParser = require('body-parser');          // body-parser 을 쓰기 위해 추가
app.use(bodyParser.urlencoded({extended: true}));   // body-parser 을 쓰기 위해 추가
// 🟪 1. DB 연결(MongoDB)
//       npm install mongodb    ← mongodb 설치후 아래 코드작성
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://admin:qwer1234@ac-2wjogy0-shard-00-00.2j7fqtv.mongodb.net:27017,ac-2wjogy0-shard-00-01.2j7fqtv.mongodb.net:27017,ac-2wjogy0-shard-00-02.2j7fqtv.mongodb.net:27017/?ssl=true&replicaSet=atlas-fss5uj-shard-0&authSource=admin&retryWrites=true&w=majority';
let db;
// 🟦 1. EJS 설치
//       npm install ejs    ← ejs 설치후 아래 코드 작성!
app.set('view engine', 'ejs');  // ← 이렇게 등록까지 마쳐야 ejs 로 쓴 html 을 node.js가 렌더링을 잘 해줌!
MongoClient.connect(url, function (error, client) {
              // 에러발생시 어떤에러인지 알려줌 ↑
    if (error) return console.log(error);
    db = client.db('todoapp');    // todoapp 이라는 database(폴더)에 연결좀요
    app.listen(8080, function () {
        // ↑ 서버를 오픈할 포트번호  ↑ 서버 오픈시 실행할 코드
        console.log('listening on 8080');
    });
});
// ✔ Tip. 포트번호란?
//   컴퓨터에는 외부와 네트워크 통신을 하기 위한 6만개의 구멍이 있음.
//   그 구멍 중 8080을 통해서 들어오는 사람들은 function(){} 이 작업을 해주세요!
//   browser 주소창에서 localhost:8080 라고 치면 내 컴퓨터에 8080이라는 구멍으로 들어가는 방법임ㅅㄱ

// ↓ 내 컴퓨터에 서버를 열수 있게 해줌  // ↓ 콜백함수를 왜 쓰냐면.. 자바스크립트에서 뭔가 순차적으로 실행하고 싶을 때 사용한다고만 알면 됨
                                   //   listen() 함수를 동작시킨 다음, function(){} 내에 있는 코드를 실행해주세요~ 라는 뜻으로 사용한 것!
                                   //   Node.js 특성상 코드를 연달아서 2개 적는다고 그 코드가 순차적으로 실행된다는 보장 X (이전강의 참고)
                                   //   뭔가 순차적으로 실행할 때 '함수안에 함수를 집어넣는 콜백함수'를 꼭 사용합니다.
// ↓ 누군가가 /pet 으로 방문하면 pet 관련된 안내문을 띄워주자
//                        request(요청), respond(응답)
app.get('/pet', function (req, res) {
    res.send('Welcome to my pet store!');
});

app.get('/beauty', function (req, res) {
    res.send('Welcome to my beauty shop!');
});
//    ↓ '/': 메인 홈페이지 (localhost:8080)
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');     // sendFile: html 파일을 보낼 수 있다!
                   // __dirname: directory name
});
app.get('/write', function (req, res) {
    res.sendFile(__dirname + '/write.html');
});
// 어떤 사람이 /add 경로로 POST 요청을 하면, ??를 해주세요!
app.post('/add', function (req, res) {
    res.send('Sent!');
    console.log(req.body.toDo); // 🟧 3. 내가 방금 전달한 데이터가 console 창에 뜸! (toDo = input 에 있는 name 속성)
    console.log(req.body);      // POST 요청을 할때 form 안에 들어가 있는 정보들은 다 여기 저장됨! => { toDo: 'Coding', date: '2023-01-03' }  ← Object 자료형
    console.log(req.body.date); // 2023-01-03
    // 영구저장하고 싶으면 여기다가 "DB에 저장해주세요" 라고 코드짜면 됨
    db.collection('post').insertOne({todo: req.body.toDo, date: req.body.date}, function (error, result) {
        console.log("Saved Successfully!");
    });
});
// ↑ ↑ 우리가 이제 영구 저장할 정보들(write.html 에서 적은 정보들)은 어디로 저장되는 것일까? -> 콜백함수의 req 에 들어가 있음
//     하지만 이것을 req 에서 꺼내 쓰려면 또 다른 library 가 필요! -> body-parser
//  🟧 POST 요청으로 input 에 있는 데이터를 서버에 전송하고 싶으면..
//     1. npm install body-parser   라이브러리 설치
//        *body-parser: input 안에 적힌 데이터를 해석할 수 있도록 도와주는 라이브러리!
//                      이 라이브러리 없으면 req.body.toDo / req.body.date 이런거 못씀!

// 🟦 2. EJS 파일 보여주기
app.get('/list', function (req, res) {
    res.render('list.ejs');
});

// ✔ ——DataBase—————————————————————————
//   |  —collection—     ——collection—  |
//   | |            |   |             | |
//   |  ————————————     —————————————  |
//   ————————————————————————————————————
//   *DataBase: 하나의 폴더 (하나의 큰 데이터베이스 공간)
//   *Collection: 하나의 엑셀 파일들!


