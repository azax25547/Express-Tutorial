const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const Joi = require('joi');


const app = express();

//serving static files
app.use('/public', express.static(path.join(__dirname,'static')));
app.use(bodyparser.urlencoded({extended : false}));
//app.get = create routes

/**
* Root Route 
*/
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'static','index.html'))
})

app.post('/', (req,res) => {
    console.log(req.body);
    //db works
    //create a schema(Set of rules)

    const schema = Joi.object().keys({
        email : Joi.string().trim().email().required(),
        password : Joi.string().min(5).max(10).required()
    });

    Joi.validate(req.body, schema, (err,result) => {
        if(err){
           res.send('An Error') 
        }else {
            res.send("Success");
            console.log(result);      
        }
    })

})
/**
 * any static route 
 */
app.get('/example', (req,res) => {
    res.send('example')
})

/**
 * Dynamic Route
 */
app.get('/example/:name/:age',(req,res) => {
    const {name,age} = req.params;
    console.log(req.params)
    console.log(req.query)
    console.log(name,age);
    res.send(`My name is ${name} and my age is ${age}`);
})

app.listen('3333',() => console.log("Server is Running"));