const express = require('express');
const mysql = require('mysql');
const handlebars = require('handlebars');
const fs = require('fs');
var app = express();
const bp = require('body-parser');
const { NULL } = require('mysql/lib/protocol/constants/types');

app.use(bp.json());
// parse application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: false }))



var mysqlConn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'book_inventory',
    multipleStatements : true
});

mysqlConn.connect((err) =>{
    if(!err){
        console.log("Db Connection Successful");
    }
    else{
        console.log("Db Connection Failed");
    }
});
var port = 3000;
app.listen(port, ()=> console.log("REST API app listening at http://localhost:%s", port));


//To List All Books in DB
app.get('/getBooks', (req,res)=>{

    let query=mysqlConn.query('SELECT * FROM books',(err,rows,fields)=>{
        if(!err){
            const data = { results: rows };
            const template = fs.readFileSync("./books.hbs", "utf8");
            const html = handlebars.compile(template)(data);
            res.send(html);
        }
        
        else
        res.send("Error encountered while displaying");
        console.log(err);
    })

});

//To Search Books by Author or Title
app.post('/search', function(req,res){
    
    var inserts = req.body.searchinput;
    
    mysqlConn.query("SELECT * FROM books WHERE authors LIKE '%"+ inserts[0] +"%' AND title LIKE '%"+ inserts[1] +"%' ",function(err,rows){  
      if(err){
        res.send("Error encountered while displaying");
        return console.error(err.message);
      }
      else{
          const data = { results: rows };
          const template = fs.readFileSync("./books.hbs", "utf8");
          const html = handlebars.compile(template)(data);
          res.send(html);
          console.log("Entry displayed successfully");
      }
    })

});


  //To Filter by Category
  app.post('/category', function(req,res){
    
    var input = req.body.catinput;
    
    mysqlConn.query("SELECT * FROM books WHERE categories LIKE '%"+ input +"%'",function(err,rows){ 
           
      
      if(err){
        res.send("Error encountered while displaying");
        return console.error(err.message);
      }
      else{
          const data = { results: rows };
          const template = fs.readFileSync("./search.hbs", "utf8");
          const html = handlebars.compile(template)(data);
          res.send(html);
          console.log(rows);
          console.log("Entry displayed successfully");
      }
    })

});



const env = process.env;

// to search using isbn
app.get('/getBooks/:isbn',(req,res)=>{  
    mysqlConn.query('SELECT * FROM books WHERE isbn = ?',[req.params.isbn],(err,rows,fields)=>{  
    if(!err)   
    res.send(rows);  
    else  
        console.log(err);  
         
})
});






















/*const mysql = require('mysql');  
var express = require('express');
var app = express();
const bp = require('body-parser');
var fs = require('fs');

var mysqlConnection = mysql.createConnection({
    host: 'localhost',  
    user : 'root',  
    password : '',   
    database : 'book_inventory'
  });
  
// To check whether the connection is succeed for Failed while running the project in console.  
mysqlConnection.connect((err) => {  
    if(!err) {  
        console.log("Db Connection Succeed");  
    }  
    else{  
        console.log("Db connect Failed \n Error :" + JSON.stringify(err,undefined,2));  
    }  
}); 


var port = process.env.PORT || 3000;
var server = app.listen(port,function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})

app.get('/getBooks', (req,res)=>{

    let query=mysqlConnection.query('SELECT * FROM books',(err,rows,fields)=>{
        if(!err){
            const data = { books: rows };
            const template = fs.readFileSync("./books.hbs", "utf8");
            const html = handlebars.compile(template)(data);
            res.send(html);
        }
        
        else
        console.log(err);
    })

});


    /*if(req.url==='/getBooks'){*/
      
           /* if (err) throw err;
          
            res.send(result);
           
    
          });
    }else{
        res.write('error')
        res.end()
    }
})*/

/*const env = process.env;

// to search using isbn
app.get('/getBooks/:isbn',(req,res)=>{  
    mysqlConnection.query('SELECT * FROM books WHERE isbn = ?',[req.params.isbn],(err,rows,fields)=>{  
    if(!err)   
    res.send(rows);  
    else  
        console.log(err);  
         
})
});*/