const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bp = require('body-parser');
const app = express();
const port = 3005;

//CORS
app.use(cors());

//JSON
app.use(express.json());

//Body Parser
app.use(bp.urlencoded({extended: true}));

const corsOptions = {
    origin: "*",
    methods: "get",
    optionsSuccessStatus: 200
}


//Mysql Config
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "infosys"
});


//Mysql Connection
conn.connect((err)=>{
    if (err) throw err;
    console.log('Connected');
})

//Init server
app.listen(port, ()=>{
    console.log('Server is running on http://localhost:'+port);
});


//get requests
app.get("/", (req,res)=>{
   let selectSQL = `select * from spring`;

   conn.query(selectSQL, (err,rows)=>{
      if (err) throw err;

      //send to frontend
      res.send(rows);
      console.log(rows);
      res.end();
   });
});


//post requests
app.post("/add", (req,res)=>{
    res.status(200);
    res.setHeader('Content-Type', 'application/json');

    //Data Fetch from frontend
    let data = req.body;
    console.log(data);

    //Insert Query
    let insertSQL = `insert into spring values(${data.emp_id}, '${data.emp_name}', '${data.emp_desig}', '${data.emp_dept}', ${data.emp_salary}, '${data.emp_location}')`;

    conn.query(insertSQL, (err)=>{
       if (err) throw err;
       res.send('Entry Inserted!');
       res.end();
    });
});

//Update requests
app.post('/update', (req,res)=>{
   res.status(200);
   res.setHeader('Content-Type', 'application/json');

   //Front end data
   let data = req.body;
    console.log(data);

   let updateSQL = `update spring set emp_name='${data.emp_name}', emp_desig='${data.emp_desig}', emp_dept='${data.emp_dept}', emp_salary=${data.emp_salary}, emp_location=${data.emp_location} where emp_id = ${data.emp_id}`;

   conn.query(updateSQL, (err)=>{
       if (err) throw err;

       res.send('Updated');
       res.end();
   })
});

//Delete
app.post("/delete", (req,res)=>{
    res.status(200);
    res.setHeader('Content-Type', 'application/json');

    //Front ENd Data
    let data = req.body;

    let deleteSQL = `delete from spring where emp_id=${data.emp_id}`;

    //Mysql Query
    conn.query(deleteSQL, (err)=>{
        if (err) throw err;

        res.send('Deleted');
        res.end();
    })
});

