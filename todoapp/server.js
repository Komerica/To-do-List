// π© node.js μμμ express λΌμ΄λΈλ¬λ¦¬λ₯Ό μ¬μ©ν΄ server λ₯Ό λ§λ€κΈ° μν κΈ°λ³Έ λ¬Έλ²!!
//    : κ°λ¨ν λ§ν΄, server μ€ννλ λ¬Έλ²!
//      Ex) const express = require('express');
//          const app = express();
//          app.listen();
const express = require('express');
const app = express();
// π§ 2. μλμ κ°μ΄ μ μ΄μ€! (μ΄κ²κΉμ§ ν΄μ€μΌ body-parser μ μ¬μ©ν  μ μμ!)
const bodyParser = require('body-parser');          // body-parser μ μ°κΈ° μν΄ μΆκ°
app.use(bodyParser.urlencoded({extended: true}));   // body-parser μ μ°κΈ° μν΄ μΆκ°
// πͺ 1. DB μ°κ²°(MongoDB)
//       npm install mongodb    β mongodb μ€μΉν μλ μ½λμμ±
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://admin:qwer1234@ac-2wjogy0-shard-00-00.2j7fqtv.mongodb.net:27017,ac-2wjogy0-shard-00-01.2j7fqtv.mongodb.net:27017,ac-2wjogy0-shard-00-02.2j7fqtv.mongodb.net:27017/?ssl=true&replicaSet=atlas-fss5uj-shard-0&authSource=admin&retryWrites=true&w=majority';
let db;
// π¦ 1. EJS μ€μΉ
//       npm install ejs    β ejs μ€μΉν μλ μ½λ μμ±!
app.set('view engine', 'ejs');  // β μ΄λ κ² λ±λ‘κΉμ§ λ§μ³μΌ ejs λ‘ μ΄ html μ node.jsκ° λ λλ§μ μ ν΄μ€!
MongoClient.connect(url, function (error, client) {
              // μλ¬λ°μμ μ΄λ€μλ¬μΈμ§ μλ €μ€ β
    if (error) return console.log(error);
    db = client.db('todoapp');    // todoapp μ΄λΌλ database(ν΄λ)μ μ°κ²°μ’μ
    app.listen(8080, function () {
        // β μλ²λ₯Ό μ€νν  ν¬νΈλ²νΈ  β μλ² μ€νμ μ€νν  μ½λ
        console.log('listening on 8080');
    });
});
// β Tip. ν¬νΈλ²νΈλ?
//   μ»΄ν¨ν°μλ μΈλΆμ λ€νΈμν¬ ν΅μ μ νκΈ° μν 6λ§κ°μ κ΅¬λ©μ΄ μμ.
//   κ·Έ κ΅¬λ© μ€ 8080μ ν΅ν΄μ λ€μ΄μ€λ μ¬λλ€μ function(){} μ΄ μμμ ν΄μ£ΌμΈμ!
//   browser μ£Όμμ°½μμ localhost:8080 λΌκ³  μΉλ©΄ λ΄ μ»΄ν¨ν°μ 8080μ΄λΌλ κ΅¬λ©μΌλ‘ λ€μ΄κ°λ λ°©λ²μγγ±

// β λ΄ μ»΄ν¨ν°μ μλ²λ₯Ό μ΄μ μκ² ν΄μ€  // β μ½λ°±ν¨μλ₯Ό μ μ°λλ©΄.. μλ°μ€ν¬λ¦½νΈμμ λ­κ° μμ°¨μ μΌλ‘ μ€ννκ³  μΆμ λ μ¬μ©νλ€κ³ λ§ μλ©΄ λ¨
                                   //   listen() ν¨μλ₯Ό λμμν¨ λ€μ, function(){} λ΄μ μλ μ½λλ₯Ό μ€νν΄μ£ΌμΈμ~ λΌλ λ»μΌλ‘ μ¬μ©ν κ²!
                                   //   Node.js νΉμ±μ μ½λλ₯Ό μ°λ¬μμ 2κ° μ λλ€κ³  κ·Έ μ½λκ° μμ°¨μ μΌλ‘ μ€νλλ€λ λ³΄μ₯ X (μ΄μ κ°μ μ°Έκ³ )
                                   //   λ­κ° μμ°¨μ μΌλ‘ μ€νν  λ 'ν¨μμμ ν¨μλ₯Ό μ§μ΄λ£λ μ½λ°±ν¨μ'λ₯Ό κΌ­ μ¬μ©ν©λλ€.
// β λκ΅°κ°κ° /pet μΌλ‘ λ°©λ¬Ένλ©΄ pet κ΄λ ¨λ μλ΄λ¬Έμ λμμ£Όμ
//                        request(μμ²­), respond(μλ΅)
app.get('/pet', function (req, res) {
    res.send('Welcome to my pet store!');
});

app.get('/beauty', function (req, res) {
    res.send('Welcome to my beauty shop!');
});
//    β '/': λ©μΈ ννμ΄μ§ (localhost:8080)
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');     // sendFile: html νμΌμ λ³΄λΌ μ μλ€!
                   // __dirname: directory name
});
app.get('/write', function (req, res) {
    res.sendFile(__dirname + '/write.html');
});
// π’1.μ΄λ€ μ¬λμ΄ form μμ /add κ²½λ‘λ‘ POST μμ²­μ νλ©΄, req.body μ form μ λ΄μ©λ¬Όμ΄ λ΄κ²¨μ΄!
app.post('/add', function (req, res) {
    res.send('Sent!');  // β ν­μ μμ΄μΌν¨! μκ·ΈλΌ λ°μ΄ν°λ λ³΄λ΄μ§κΈ΄ νμ§λ§, μ¬μ΄νΈκ° λ©μΆ€!
    console.log(req.body.toDo); // π§ 3. λ΄κ° λ°©κΈ μ λ¬ν λ°μ΄ν°κ° console μ°½μ λΈ! (toDo = input μ μλ name μμ±)
    console.log(req.body);      // POST μμ²­μ ν λ form μμ λ€μ΄κ° μλ μ λ³΄λ€μ λ€ μ¬κΈ° μ μ₯λ¨! => { toDo: 'Coding', date: '2023-01-03' }  β Object μλ£ν
    console.log(req.body.date); // 2023-01-03
    // π’2.db μμ counter λΌλ collection μμμ "name: The number of post"λ₯Ό value κ°μΌλ‘ κ°μ§ ν­λͺ©μ μ°Ύλλ€.
    db.collection('counter').findOne({name: 'The number of post'}, function (error, result) {
        console.log(result.totalPost);
        // π’3.totalPost λ₯Ό key λ‘ κ°μ§ κ°μ λ³μ numOfPosts μ μ μ₯ν΄μ€λ€.
        let numOfPosts = result.totalPost;
        // π’4.db μμ post λΌλ collection μμμ μλ ν­λͺ©μ μΆκ°νκ³ , μ½λ°±ν¨μ console.log("Saved Successfully!"); μ€ν!
        //     μκ΅¬μ μ₯νκ³  μΆμΌλ©΄ μλμ κ°μ΄ "DBμ μ μ₯ν΄μ£ΌμΈμ" λΌκ³  μ½λμ§λ©΄ λ¨ β β
        db.collection('post').insertOne({_id: numOfPosts + 1, todo: req.body.toDo, date: req.body.date}, function (error, result) {
            console.log("Saved Successfully!");
            // π’5.db μμ counter λΌλ collection μμμ "name: The number of post"λ₯Ό value κ°μΌλ‘ κ°μ§ ν­λͺ©μ μ°Ύμμ κ·Έ μμ totalPost λΌλ key λ₯Ό κ°μ§ value κ°μ 1 μ¦κ°μμΌμΌν¨
            db.collection('counter').updateOne({name: "The number of post"}, {$inc: {totalPost: 1}}, function (error, result) {
                                            // μμ ν  λ°μ΄ν° μ°ΎκΈ° β,   κ·Έ μ€μμ μ€μ λ‘ μμ ν  κ° β
                                            // Operator ($set: λ³κ²½ / $inc: μ¦κ° / $min: κΈ°μ‘΄κ°λ³΄λ€ μ μλλ§ λ³κ²½ / $rename: keyκ° μ΄λ¦λ³κ²½)
                if(error) return console.log(error);
            });
        });
    });

});
// β β μ°λ¦¬κ° μ΄μ  μκ΅¬ μ μ₯ν  μ λ³΄λ€(list.html μμ μ μ μ λ³΄λ€)μ μ΄λλ‘ μ μ₯λλ κ²μΌκΉ? -> μ½λ°±ν¨μμ req μ λ€μ΄κ° μμ
//     νμ§λ§ μ΄κ²μ req μμ κΊΌλ΄ μ°λ €λ©΄ λ λ€λ₯Έ library κ° νμ! -> body-parser
//  π§ POST μμ²­μΌλ‘ input μ μλ λ°μ΄ν°λ₯Ό μλ²μ μ μ‘νκ³  μΆμΌλ©΄..
//     1. npm install body-parser   λΌμ΄λΈλ¬λ¦¬ μ€μΉ
//        *body-parser: input μμ μ ν λ°μ΄ν°λ₯Ό ν΄μν  μ μλλ‘ λμμ£Όλ λΌμ΄λΈλ¬λ¦¬!
//                      μ΄ λΌμ΄λΈλ¬λ¦¬ μμΌλ©΄ req.body.toDo / req.body.date μ΄λ°κ±° λͺ»μ!

// π¦ 2. μλ²μμ λ°μ΄ν°λ₯Ό κ°μ Έμμ EJS νμΌ λ³΄μ¬μ£ΌκΈ°
//       1) λκ΅°κ° /listλ‘ GET μμ²­μ νλ©΄
//       2) MongoDBμμ λ°μ΄ν°λ₯Ό κΊΌλΈ λ€μ
//       3) list.ejs νμΌμ κ·Έ λ°μ΄ν°λ₯Ό κ½μλ£μ΄μ κ³ κ°μκ² λ³΄λ΄μ€
app.get('/list', function (req, res) {
    // DBμ μ μ₯λ post λΌλ collection μμ λͺ¨λ  λ°μ΄ν°λ₯Ό κΊΌλ΄μ£ΌμΈμ β            β μλ²λ‘λΆν° μ€μ  κ°μ Έμ¨ λ°μ΄ν°!
    db.collection('post').find().toArray(function (error, result) {
                              // toArray: collection('post')μ μλ λͺ¨λ  λ°μ΄ν°λ₯Ό Array μλ£νμΌλ‘ κ°μ Έμ΄
        console.log(result);             // β posts λΌλ key μ κ²°κ³Όλ₯Ό λ€ λ£μ!
        // μμμ κΊΌλΈ λ°μ΄ν°λ₯Ό html νκ·Έμ λ°μ ejs νμΌμ λ³΄μ¬μ£ΌμΈμ
        res.render('list.ejs', {posts: result});    // μλ²λ‘λΆν° λ°μ΄ν°λ₯Ό κ°μ Έμμ list.ejs μ λ£μ!
    });
});
// π« 2.'list.ejs' μμ λ°μμ¨ {_id: numOfPost} λ₯Ό κ°κ³  κ·Έμ ν΄λΉνλ κ²μλ¬Όμ μ­μ νκΈ°!
app.delete('/delete', function (req, res) {
    console.log(req.body);  // AJAX μμ²­μ μλ²μ {_id: 1} μ΄λΌλ μ λ³΄λ λ³΄λ΄μ£ΌμΈμ! => But req.body λ‘ κ°μ Έμ€λ©΄ {_id: '1'}λ¬Έμλ‘ λ°μμ΄! (π₯list.ejs νμΌμμ $.ajax μ½λμμ κ°μ Έμ΄!!)
                                                                            // => parseInt λ₯Ό μ¨μ μ«μλ‘ λ³κ²½ν΄μ€μΌν¨
    req.body._id = parseInt(req.body._id);
    // β req.body μ λ΄κ²¨μ¨ κ²μλ¬Ό λ²νΈλ₯Ό κ°μ§ κΈμ db μμ μ°Ύμμ μ­μ ν΄μ£ΌμΈμ
    //   Ex) db.collection('post').deleteOne({_id: 2}, function () { });    // νΉμ  μμ΄λκ° μλ document λ₯Ό μ­μ νκ³  μΆμΌλ©΄ μ΄λ κ²!
    db.collection('post').deleteOne(req.body, function (error, result) {
        console.log('Deleted successfully!');   // β IDE μ μ½μμ°½
        res.status(200).send({message: 'Successful!'}); // β Response code κ° 200 μ΄λΌ list.ejs μμ $.ajax μ½λ μμμ λ¬΄μ‘°κ±΄ .done μμ μλ μ½λ°±ν¨μλ₯Ό μ€ν!
                    // β https://developer.mozilla.org/en-US/docs/Web/HTTP/Status - μλ΅μ½λ(Response Code)
                    //   https://gist.github.com/sandrabosk/d125177b31eca8dc3e5c524e703ba94d - μλ΅μ½λ κ·Έλ¦Ό
                    // 200: OK(μμ²­μ±κ³΅)     // 400: Bad Request(κ³ κ° μλͺ»μΌλ‘ μμ²­μ€ν¨)     // 500: Internal Server Error(μλ²λ¬Έμ λ‘ μμ²­μ€ν¨)
    });
});
//                β ':'μ μλ―Έ -> /detail/: λ€μ μλ¬΄ λ¬Έμμ΄μ΄λ μλ ₯νλ©΄ μλ μ½λλ₯Ό μ€νμμΌμ£ΌμΈμ! => μ΄κ²μ μ λ¬Έμ©μ΄λ‘ "URL μ parameter" λΌκ³  ν¨!
//                  μ¬κΈ°μλ id κ° URL parameter!
app.get('/detail/:id', function (req, res) {
    // console.log(typeof req.params.id);   // β string
    // 1. β μ΄λ€ μ¬λμ΄ detail/μ«μ(or λ€λ₯Έ λ¬Έμμ΄)λ‘ μ μμ νλ©΄, β db μ 'post' λΌλ collection μμ _id κ° res.params.id(/detail/?? β μ¬κΈ° μ΄ λ²νΈ) μΈ κ²μ μ°Ύμμ¨λ€!
    db.collection('post').findOne({_id: parseInt(req.params.id)}, function (error, result) {
        console.log(result);
        // 2. β κ·Έ κ²°κ³Όλ₯Ό detail.ejs νμΌμλ€κ° λ³΄λ΄μ€λ€!
        res.render('detail.ejs', {data: result});
    });
});

// β ββDataBaseβββββββββββββββββββββββββ
//   |  βcollectionβ     ββcollectionβ  |
//   | |            |   |             | |
//   |  ββββββββββββ     βββββββββββββ  |
//   ββββββββββββββββββββββββββββββββββββ
//   *DataBase: νλμ ν΄λ (νλμ ν° λ°μ΄ν°λ² μ΄μ€ κ³΅κ°)
//   *Collection: νλμ μμ νμΌλ€!

// π΄ κ³ κ° μμ²­μ μλ΅νλ 5κ°μ§ λ°©λ² π΄
// app.get('/μ΄μ©κ΅¬', function(μμ²­, μλ΅){
//     μλ΅.send('<p>some html</p>')                          // λ°©λ²1: sendλ κ°λ¨ν λ¬Έμλ HTMLμ λ³΄λΌ μ μμ΅λλ€.
//     μλ΅.status(404).send('Sorry, we cannot find that!')   // λ°©λ²2: statusλ μλ΅μ½λλ₯Ό λ³΄λΌ μ μμ΅λλ€.
//     μλ΅.sendFile('/uploads/logo.png')                     // λ°©λ²3: sendFileμ static νμΌλ€μ λ³΄λΌ μ μμ΅λλ€.
//     μλ΅.render('list.ejs', { ejsμ λ³΄λΌ λ°μ΄ν° })           // λ°©λ²4: renderλ ejsλ±μ ννλ¦Ώμ΄ μ μ©λ νμ΄μ§λ€μ λ λλ§ν΄μ€ μ μμ΅λλ€.
//     μλ΅.json(μ μ΄μ¨λ°μ΄ν°)                                  // λ°©λ²5: jsonμ μ μ΄μ¨ λ°μ΄ν°λ₯Ό λ΄μλ³΄λΌ μ μμ΅λλ€.
// });



