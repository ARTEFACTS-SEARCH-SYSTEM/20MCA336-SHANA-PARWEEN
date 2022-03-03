const express = require('express');
const mysql = require('mysql');
const handlebars = require('handlebars');
const fs = require('fs');
var app = express();
const bp = require('body-parser');
const { NULL } = require('mysql/lib/protocol/constants/types');
var http = require('http');
//var sqlite3 = require('sqlite3').verbose();

app.use(bp.json());
// parse application/x-www-form-urlencoded
app.use(bp.urlencoded({ extended: false }))
var port = 7000;
app.listen(port, ()=> console.log("REST API app listening at http://localhost:%s", port));

app.get('/main', (req,res)=>{
  
          res.sendFile('/home.html', {root:__dirname});
  
});
app.get('/adminlogin', (req,res)=>{
  
  res.sendFile('/loginadmin.html', {root:__dirname});

});

app.post('/adminauth', (req,res)=>{
  
  var email=req.body.email;
  var pass=req.body.password;
  var mysqlUserConn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'SignUpDetails',
    debug: false,
    multipleStatements : true
});
mysqlUserConn.connect((err) =>{
  if(!err){
      console.log("User Data Db Connection Successful");
  }
  else{
      console.log("User Data Db Connection Failed");
  }
});
console.log("Entered email is: ",email);
mysqlUserConn.query("SELECT Password FROM admin WHERE Email = '"+ email +"'",(error, results)=>{
  console.log("results is:",results);
  if (error) {
    console.log(error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    if(results.length >0){
      console.log("Password is:",results[0].Password);
      
      if(pass === results[0].Password){
        console.log("LOGIN SUCCESSFUL!!!");
        res.send({
          "code":200,
          "message":"login sucessfull"
        })
        
      }
      else{
        console.log("LOGIN UNSUCCESSFUL!!!");
        res.send({
             "code":204,
             "message":"Email and password does not match"
        })
      }
    }
    else{
      console.log("LOGIN UNSUCCESSFUL!!!");
      res.send({
        "code":206,
        "message":"Email does not exist!!"
          });
    }
  }
  })
});

app.get('/producerlogin', (req,res)=>{
  
  res.sendFile('/loginproducer.html', {root:__dirname});

});
app.post('/producerauth', (req,res)=>{
  
  var email=req.body.email;
  var pass=req.body.password;
  var mysqlUserConn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'SignUpDetails',
    debug: false,
    multipleStatements : true
});
mysqlUserConn.connect((err) =>{
  if(!err){
      console.log("User Data Db Connection Successful");
  }
  else{
      console.log("User Data Db Connection Failed");
  }
});
console.log("Entered email is: ",email);
mysqlUserConn.query("SELECT * FROM seller WHERE Email = '"+ email +"'",(error, results)=>{
  console.log("results is:",results);
  if (error) {
    console.log(error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    if(results.length >0){
      console.log("Password is:",results[0].Password);
      
      if(pass === results[0].Password){
        console.log("LOGIN SUCCESSFUL!!!");
        const data = { results: results };
        const template = fs.readFileSync("./sellerdashboard.hbs", "utf8");
        const html = handlebars.compile(template)(data);
        res.send(html);
        //res.sendFile('/sellerdashboard.html', {root:__dirname}); 
      }
      else{
        console.log("LOGIN UNSUCCESSFUL!!!");
        res.send({
             "code":204,
             "message":"Email and password does not match"
        })
      }
    }
    else{
      console.log("LOGIN UNSUCCESSFUL!!!");
      res.send({
        "code":206,
        "message":"Email does not exist!!"
          });
    }
  }
  })
});


app.get('/consumerlogin', (req,res)=>{
  
  res.sendFile('/loginconsumer.html', {root:__dirname});

});
app.post('/consumerauth', (req,res)=>{
  
  var email=req.body.email;
  var pass=req.body.password;
  var mysqlUserConn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'SignUpDetails',
    debug: false,
    multipleStatements : true
});
mysqlUserConn.connect((err) =>{
  if(!err){
      console.log("User Data Db Connection Successful");
  }
  else{
      console.log("User Data Db Connection Failed");
  }
});
console.log("Entered email is: ",email);
mysqlUserConn.query("SELECT Password FROM consumer WHERE Email = '"+ email +"'",(error, results)=>{
  console.log("results is:",results);
  if (error) {
    console.log(error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    if(results.length >0){
      console.log("Password is:",results[0].Password);
      
      if(pass === results[0].Password){
        console.log("LOGIN SUCCESSFUL!!!");
          res.send({
            "code":200,
            "message":"login sucessfull"
          })
      }
      else{
        console.log("LOGIN UNSUCCESSFUL!!!");
        res.send({
             "code":204,
             "message":"Email and password does not match"
        })
      }
    }
    else{
      console.log("LOGIN UNSUCCESSFUL!!!");
      res.send({
        "code":206,
        "message":"Email does not exist!!"
          });
    }
  }
  })
});

app.get('/createadmin',(req,res)=>{
  res.sendFile('/signupadmin.html', {root:__dirname});

});
app.get('/createproducer',(req,res)=>{
  res.sendFile('/signupproducer.html', {root:__dirname});

});
app.get('/createconsumer',(req,res)=>{
  res.sendFile('/signupconsumer.html', {root:__dirname});

});
app.get('/connectdb',(req,res)=>{
  res.sendFile('/connectDB.html', {root:__dirname});

});



app.post('/producerCreation',(req,res)=>{
  fname = req.body.firstName;
  lname = req.body.lastName;
  email = req.body.email;
  pass = req.body.confirmPassword;
  var mysqlUserConn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'SignUpDetails',
    debug: false,
    multipleStatements : true
});
mysqlUserConn.connect((err) =>{
  if(!err){
      console.log("User Data Db Connection Successful");
  }
  else{
      console.log("User Data Db Connection Failed");
  }
});
mysqlUserConn.query("INSERT INTO seller (First_Name, Last_Name, Email, Password) VALUES('"+ fname +"','"+lname+"','"+email+"','"+pass+"');",(err,rows)=>{
          if(!err){
            console.log("Data stored succesfully");
            res.send({
              "code":200,
              "message":"SignUp sucessfull"
            })

          }
          else{
            console.log(err);
            res.send({
              "code":206,
              "message":"SignUp Unsucessfull"
            })
          }

        })


});

app.post('/consumerCreation',(req,res)=>{
  fname = req.body.firstName;
  lname = req.body.lastName;
  email = req.body.email;
  pass = req.body.confirmPassword;
  var mysqlUserConn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'SignUpDetails',
    debug: false,
    multipleStatements : true
});
mysqlUserConn.connect((err) =>{
  if(!err){
      console.log("User Data Db Connection Successful");
  }
  else{
      console.log("User Data Db Connection Failed");
  }
});
mysqlUserConn.query("INSERT INTO consumer (First_Name, Last_Name, Email, Password) VALUES('"+ fname +"','"+lname+"','"+email+"','"+pass+"');",(err,rows)=>{
          if(!err){
            console.log("Data stored succesfully");
            res.send({
              "code":200,
              "message":"SignUp sucessfull"
            })

          }
          else{
            console.log(err);
            res.send({
              "code":206,
              "message":"SignUp Unsucessfull"
            })
          }

        })

});
app.post('/hostconnect', (req,res)=>{
  
  var mysqlConn = mysql.createConnection({
    host : req.body.host,
    user : req.body.userr,
    password : req.body.password,
    
    debug: false,
    multipleStatements : true
})
mysqlConn.connect((error) =>{
if(!error){
  console.log("Host Connection Successful");
  res.sendFile('/DBredirect.html', {root:__dirname});
  app.all('/dbconnect',(req,res)=>{
    
    console.log("Connection Successful");
    
    db_name = req.body.db;
    
    mysqlConn.query("show databases;", (err,db)=>{
      mysqlConn.query("use "+db_name+";", (err,rows)=>{
        mysqlConn.query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA='"+db_name+"'", (err,tbs)=>{
           // mysqlConn.query("SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '"+tb_name+"'", (err,cols)=>{
  
    if(!err){
        const data = { dbs: db, tb: tbs};
        
        const template = fs.readFileSync("./configuration.hbs", "utf8");
        const html = handlebars.compile(template)(data);
        res.send(html);
  
    }
    
    else{
    res.send("Error encountered while displaying");
    console.log(err);
  }

  
  })
  })
  })
  //})

  

})

app.all('/products', (req,res)=>{
  tb_name=req.body.table;
  console.log("Table Name:",tb_name);

  mysqlConn.query("SELECT * FROM "+tb_name+"; SELECT DISTINCT categories FROM "+tb_name+" ",(err,rows)=>{
      if(!err){
          const data = { results: rows[0], category: rows[1] };
          const template = fs.readFileSync("./books.hbs", "utf8");
          const html = handlebars.compile(template)(data);
          res.send(html);
      }
      
      else
      res.send("Error encountered while displaying");
      console.log(err);
  })
});
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
        
        console.log("Entry displayed successfully");
    }
  })

});

}

else{
  console.log("Host Connection Unsuccessful", error);
}
     
}) 
});
app.post('/getURL',(req,res)=>{

  console.log("UUID is:",req.body.uid);
})









