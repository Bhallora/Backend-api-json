const express = require('express');

const mongoose = require('mongoose');

/* configuring password and username for mongodb*/
/*const DB_USER= 'Bhallora'
const DB_USER_PASSWORD = "786786"
const DB_URL =`mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@cluster0-pi5qk.azure.mongodb.net/test?retryWrites=true&w=majority`;*/


//use of express.Router()//
const router = express.Router();
/* *** */


let employees = require('../data/employees.json');
const _ = require('lodash');

/* use of morgan logger middleware */
var morgan = require('morgan');
router.use(morgan('tiny'));
/* *** */

/* use of body-parser middleware */
var bodyParser = require('body-parser');
router.use(bodyParser.json());
/* *** */

let employeesArray= employees;


/*Establishing connection to the database*/
/*mongoose.connect(DB_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
//try {
// mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true   });
 //} catch (error) {
  //  handleError(error);
 //}
const db = mongoose.connection;
db.once('open',()=>{
    console.log('Hooray we connected to mongodb');
});*/

/* schema definition */

/*const EmployeeSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,  //for unique IDs.
     name: String,
     employeeCode: Number,
     voucherNo: String,
     date: String,
     department: String,
     division: String,
     expenseDate: String,
     expenseDetail: String,
     amount: Number,

});
const EmployeeModel=mongoose.model('Employee', EmployeeSchema);*/



//get request
router.get('/', (req, res) => {
    res.json(employeesArray);}); //because of db connected.
  /*EmployeeModel.find((err,employees)=>{
      if(err) res.status(500).send(err);
       res.json(employees);
    });});
*/
router.get('/:id', (req, res) => {

    const employee = _.find(employeesArray, employee => employee.id === parseInt(req.params.id));
    if (employee) {
        res.json(employee);
    }
    else {
        res.sendStatus(404);
    }
  /*  EmployeeModel.findById(req.params.id,(err,employee)=>
    {   if(err) res.status(500).send(err);
        if (employee) {
            res.json(employee);
        }
        else {
            res.status(404).send(`User with id ${req.params.id} not found`);
        }
    })*/

});

//post request
router.post('/', (req,res)=>{
    console.log("handling POST request");
    console.log(req.body);
    //validation can be done while pushing
    employeesArray.push(req.body);
    res.sendStatus(200);

 
   /* const id = new mongoose.Types.ObjectId();
    const employeeToPersist = Object.assign({
        _id: id}, req.body
    );
    const employee= new EmployeeModel(employeeToPersist);
    employee.save().then ((err, employee) => {
    
        if (err) res.status(500).send(err);
        res.json(employee);
    }); */

    //console.log(JSON.stringify(employeeToPersist));
    //res.end();
});
//advantage of using router, param method used below helps in validation //
router.param('id', (req,res,next,id)=>{
    if(isNaN(id)){
        next(`The id: ${id} that you have entered is not in the correct format. `);
    } next();

});
/*router.put('/:id',(req,res)=>{
    EmployeeModel.findById(req.params.id,(err,employee)=>{
        if (err) res.status(500).send(err);
        if(employee){
        employee.name=req.body.name;
        employee.expenseDetail=req.body.expenseDetail;
        employee.save().then ((err, employee) => {
    
            if (err) res.status(500).send(err);
            res.json(employee);
        }); }
        else {
            res.status(404).send(`User with id ${req.params.id} not found`);
        }
    });

});*/

router.put('/:id',(req,res)=>{
      const requestId = parseInt(req.params.id);
      let employee = employeesArray.filter(employee=>{
          return employee.id ===requestId;
      })[0];
      const index = employeesArray.indexOf(employee);
      const  keys = Object.keys(req.body);

      keys.forEach(key => {
          employee[key]=req.body[key];
      });
      employeesArray[index]=employee;
      res.json(employeesArray[index]);
    });


/*router.delete('/:id',(req,res)=>{
    EmployeeModel.findByIdAndRemove(req.params.id,(err,employee)=>{
        if(err) res.status(500).send(err);
        res.status(200).send(`employee with Id ${req.params.id}got deleted`);
    });

});*/
router.delete('/:id',(req,res)=>{
    const requestId = parseInt(req.params.id);
    let employee = employeesArray.filter(employee=>{
        return employee.id ===requestId;
    })[0];
    const index = employeesArray.indexOf(employee);
    employeesArray.splice(index, 1);
     res.json({message:`user with id :${requestId} deleted`});
});
module.exports = router;
