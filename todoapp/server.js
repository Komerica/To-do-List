// 🟩 node.js 상에서 express 라이브러리를 사용해 server 를 만들기 위한 기본 문법!!
//    : 간단히 말해, server 오픈하는 문법!
//      Ex) const express = require('express');
//          const app = express();
//          app.listen();
const express = require('express');
const app = express();
// ↓ 내 컴퓨터에 서버를 열수 있게 해줌  // ↓ 콜백함수를 왜 쓰냐면.. 자바스크립트에서 뭔가 순차적으로 실행하고 싶을 때 사용한다고만 알면 됨.                                                     listen() 함수를 동작시킨 다음, function(){} 내에 있는 코드를 실행해주세요~ 라는 뜻으로 사용한 것!                                               Node.js 특성상 코드를 연달아서 2개 적는다고 그 코드가 순차적으로 실행된다는 보장 X (이전강의 참고)                                                뭔가 순차적으로 실행할 때 '함수안에 함수를 집어넣는 콜백함수'를 꼭 사용합니다.
app.listen(8080, function () {
         // ↑ 서버를 오픈할 포트번호  ↑ 서버 오픈시 실행할 코드
    console.log('listening on 8080');
});
// ✔ Tip. 포트번호란?
//   컴퓨터에는 외부와 네트워크 통신을 하기 위한 6만개의 구멍이 있음.
//   그 구멍 중 8080을 통해서 들어오는 사람들은 function(){} 이 작업을 해주세요!
//   browser 주소창에서 localhost:8080 라고 치면 내 컴퓨터에 8080이라는 구멍으로 들어가는 방법임ㅅㄱ

// ↓ 누군가가 /pet 으로 방문하면 pet 관련된 안내문을 띄워주자
//                        request(요청), respond(응답)
app.get('/pet', function (req, res) {
    res.send('Welcome to my pet store!');
});

app.get('/beauty', function (req, res) {
    res.send('Welcome to my beauty shop!');
});
//      '/': 메인 홈페이지 (localhost:8080)
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/write.html');     // sendFile: html 파일을 보낼 수 있다!
                   // __dirname: directory name
});