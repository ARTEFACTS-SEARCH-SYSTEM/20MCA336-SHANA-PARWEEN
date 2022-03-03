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
    debug : false, 
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


//To List All Books and Categories available in DB, 
app.get('/books', (req,res)=>{

    mysqlConn.query('SELECT * FROM books; SELECT DISTINCT categories FROM books ',(err,rows)=>{
        if(!err){
            console.log(rows);
            const data = { results: rows[0], categories: rows[1] };
            const template = fs.readFileSync("./books.hbs", "utf8");
            const html = handlebars.compile(template)(data);
            res.send(html);
        }
        else
        res.send("Error encountered while displaying");
        console.log(err);
    })
});

//To perform a generalized search
app.post('/search', function(req,res){
    
    var inserts = req.body.searchinput;
    
    
    mysqlConn.query("SELECT * FROM books WHERE authors LIKE '%"+ inserts +"%' OR title LIKE '%"+ inserts +"%' OR categories LIKE '%"+ inserts +"%' OR isbn LIKE '%"+ inserts +"%' ",function(err,rows){ 
            
      if(err){
        res.send("Error encountered while displaying");
        return console.error(err.message);
      }
      else if(rows === undefined || rows.length === 0){
              const data = { results: rows };
              const template = fs.readFileSync("./empty.hbs", "utf8");
              const html = handlebars.compile(template)(data);
              res.send(html);
              
              console.log("No matches found");
          }
      else{
          const data = { results: rows };
          const template = fs.readFileSync("./search.hbs", "utf8");
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