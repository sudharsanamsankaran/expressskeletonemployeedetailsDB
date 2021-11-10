const mysql =require('mysql2');
const express = require('express');
const { NotExtended } = require('http-errors');
//const {schema} = require('mongoose');
var router = express.Router();
router.use(express.json());

var mysqlConnection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'sudharsanam95',
    database : 'edetails',
    multipleStatements: true
});


mysqlConnection.connect((err)=>{
    if(!err){
        console.log('Connection has been established successfully....');
    } else
    console.log('Connection Failed!!'+JSON.stringify(err,undefined,2));
});

router.get('/',(req,res) =>{
    mysqlConnection.query('select * from edetail;',(err,rows,fields) =>{
        if(!err)
        res.send(rows);
        else
        console.log(err);
    })
});

router.get('/:Id' , (req, res) => {
    mysqlConnection.query('select  * from edetail where Id = ?',[req.params.Id], (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
    });

module.exports=router; 
//ROUTER TO ADD AN ITEM TO THE DATABASE
/*
router.get('/add',(req,res)=>{
    mysqlConnection.query('insert into edetail(Id,empname, designation, salary, city) values (111,"sudharsanam","software Developer",32,000,"chennai")',[req.params.Id], (err, rows, fields) => {
        if (!err)
        res.send('record inserted sucessfully');
        else
        console.log(err);
        })
});
module.exports=router;
*/
/*
const sequelize = new Sequelize('edetails', 'root', 'sudharsanam95', {
    host: 'localhost',
    dialect: 'mysql' 
  });
  
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }*/
/*
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');

//const app = express();

router.use(bodyParser.json({ limit: '100mb' }));
router.use(bodyParser.urlencoded({ extended: true, limit: '100mb', parameterLimit: 1000000 }));

const sequelize = new Sequelize('edetails', 'root', 'sudharsanam95', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

const empdetail = sequelize.define('edetail', {
    Id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
    },
    empname: Sequelize.STRING,
    designation: Sequelize.STRING,
    salary: Sequelize.INTEGER,
});

router.post('/test', function (request, response) {
    return empdetails.create({
        id: request.body.id,
        empname: request.body.name,
        designation: request.body.role,
        salary: request.body.salary
       // city: request.body.city
    }).then(function (empdetails) {
        if (empdetails) {
            response.send(empdetails);
        } else {
            response.status(400).send('Error in insert new record');
        }
    });
});


/*
app.listen(3001, function () {
    console.log('Express server is listening on port 3000');
});*/