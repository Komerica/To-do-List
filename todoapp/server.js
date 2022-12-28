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
// 🟢1.어떤 사람이 form 에서 /add 경로로 POST 요청을 하면, req.body 에 form 의 내용물이 담겨옴!
app.post('/add', function (req, res) {
    res.send('Sent!');  // ← 항상 있어야함! 안그럼 데이터는 보내지긴 하지만, 사이트가 멈춤!
    console.log(req.body.toDo); // 🟧 3. 내가 방금 전달한 데이터가 console 창에 뜸! (toDo = input 에 있는 name 속성)
    console.log(req.body);      // POST 요청을 할때 form 안에 들어가 있는 정보들은 다 여기 저장됨! => { toDo: 'Coding', date: '2023-01-03' }  ← Object 자료형
    console.log(req.body.date); // 2023-01-03
    // 🟢2.db 안에 counter 라는 collection 안에서 "name: The number of post"를 value 값으로 가진 항목을 찾는다.
    db.collection('counter').findOne({name: 'The number of post'}, function (error, result) {
        console.log(result.totalPost);
        // 🟢3.totalPost 를 key 로 가진 값을 변수 numOfPosts 에 저장해준다.
        let numOfPosts = result.totalPost;
        // 🟢4.db 안에 post 라는 collection 안에서 아래 항목을 추가하고, 콜백함수 console.log("Saved Successfully!"); 실행!
        //     영구저장하고 싶으면 아래와 같이 "DB에 저장해주세요" 라고 코드짜면 됨 ↓ ↓
        db.collection('post').insertOne({_id: numOfPosts + 1, todo: req.body.toDo, date: req.body.date}, function (error, result) {
            console.log("Saved Successfully!");
            // 🟢5.db 안에 counter 라는 collection 안에서 "name: The number of post"를 value 값으로 가진 항목을 찾아서 그 안의 totalPost 라는 key 를 가진 value 값을 1 증가시켜야함
            db.collection('counter').updateOne({name: "The number of post"}, {$inc: {totalPost: 1}}, function (error, result) {
                                            // 수정할 데이터 찾기 ↑,   그 중에서 실제로 수정할 값 ↑
                                            // Operator ($set: 변경 / $inc: 증가 / $min: 기존값보다 적을때만 변경 / $rename: key값 이름변경)
                if(error) return console.log(error);
            });
        });
    });

});
// ↑ ↑ 우리가 이제 영구 저장할 정보들(list.html 에서 적은 정보들)은 어디로 저장되는 것일까? -> 콜백함수의 req 에 들어가 있음
//     하지만 이것을 req 에서 꺼내 쓰려면 또 다른 library 가 필요! -> body-parser
//  🟧 POST 요청으로 input 에 있는 데이터를 서버에 전송하고 싶으면..
//     1. npm install body-parser   라이브러리 설치
//        *body-parser: input 안에 적힌 데이터를 해석할 수 있도록 도와주는 라이브러리!
//                      이 라이브러리 없으면 req.body.toDo / req.body.date 이런거 못씀!

// 🟦 2. 서버에서 데이터를 가져와서 EJS 파일 보여주기
//       1) 누군가 /list로 GET 요청을 하면
//       2) MongoDB에서 데이터를 꺼낸 뒤에
//       3) list.ejs 파일에 그 데이터를 꽂아넣어서 고객에게 보내줌
app.get('/list', function (req, res) {
    // DB에 저장된 post 라는 collection 안의 모든 데이터를 꺼내주세요 ↓            ↓ 서버로부터 실제 가져온 데이터!
    db.collection('post').find().toArray(function (error, result) {
                              // toArray: collection('post')에 있는 모든 데이터를 Array 자료형으로 가져옴
        console.log(result);             // ↓ posts 라는 key 에 결과를 다 넣음!
        // 위에서 꺼낸 데이터를 html 태그에 박은 ejs 파일을 보여주세요
        res.render('list.ejs', {posts: result});    // 서버로부터 데이터를 가져와서 list.ejs 에 넣음!
    });
});
app.delete('/delete', function (req, res) {
    console.log(req.body);  // AJAX 요청시 서버에 {_id: 1} 이라는 정보도 보내주세요! => But req.body 로 가져오면 {_id: '1'}문자로 받아옴!
                                                                            // => parseInt 를 써서 숫자로 변경해줘야함
    req.body._id = parseInt(req.body._id);
    // ↓ req.body 에 담겨온 게시물 번호를 가진 글을 db 에서 찾아서 삭제해주세요
    //   Ex) db.collection('post').deleteOne({_id: 2}, function () { });    // 특정 아이디가 있는 document 를 삭제하고 싶으면 이렇게!
    db.collection('post').deleteOne(req.body, function (error, result) {
        console.log('Deleted successfully!');
    });
});

// ✔ ——DataBase—————————————————————————
//   |  —collection—     ——collection—  |
//   | |            |   |             | |
//   |  ————————————     —————————————  |
//   ————————————————————————————————————
//   *DataBase: 하나의 폴더 (하나의 큰 데이터베이스 공간)
//   *Collection: 하나의 엑셀 파일들!


