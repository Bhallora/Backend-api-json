const express = require('express');
var morgan = require ('morgan');
var bodyParser = require('body-parser');
let employees = require('./data/employees.json');
const _ = require('lodash');
const router = require ('./routes/EmpoyeeRoute');
var  EmployeeRoute = require('./routes/EmpoyeeRoute');
//import https from 'https';


const PORT = 3000;

const server = express();

const buildUrl = (version, path) => `/api/${version}/${path}`;
const EMPLOYEES_BASE_URL = buildUrl('v1', 'employees');



server.use(EMPLOYEES_BASE_URL, EmployeeRoute); /*passing of the url to be used in EmployeeRoute*/
server.use(morgan('tiny')); /* using morgan ( 3rd party logger middleware ); here 'tiny' refers to istring for format */
server.use(bodyParser.json());

/*commenting the below code as we are using express.Router */


/*server.get(EMPLOYEES_BASE_URL, (req, res) => {
    res.json(employees);
});
server.get(`${EMPLOYEES_BASE_URL}/:id`, (req, res) => {

    const employee = _.find(employees, employee => employee.id === parseInt(req.params.id));
    if (employee) {
        res.json(employee);
    }
    else {
        res.sendStatus(404);
    }

});

server.post(EMPLOYEES_BASE_URL, (req,res)=>{
    console.log("handling POST request");
    res.end();
});*/


/* code for multiple handlers*/
/*server.get('/route-handlers',(req,res,next)=>{
    res.send("Route Handlers are cool");
    next();
},     (req,res,next)=>{ console.log("Route handlers are cooler");
      next();
}, (req,res)=>{
    console.log("Route Handlers are the coolest");
}
);*/
/*code for multiple handlers ends here.
Only one handler will be able to send data to the client .*/
server.listen(PORT, () => {
    console.log(` server listening in ${PORT} `);
});