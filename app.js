// Task1: initiate app and run server at 3000
const express = require('express');
const mongoose = require('mongoose');
const cors =require('cors');
const logger = require('morgan');
const app =  express();

const { EmployeeModel } = require('./model/employeeList');


const path=require('path');
app.use(logger('dev'));
app.use(cors())
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Task1: create mongoDB connection 



mongoose.connect('mongodb+srv://amalashraf04:aamssanamm1234@cluster0.sc2qvv5.mongodb.net/employee?retryWrites=true&w=majority', { useNewUrlParser: true });

//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
//TODO: get data from db  using api '/api/employeelist'

app.get('/api/employeelist', async (req, res) => {
    try {
      const employees = await EmployeeModel.find();
      res.send(employees);
      //console.log(employees)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });


//TODO: get single data from db  using api '/api/employeelist/:id'
app.post('/api/employeelist/:id',async(req,res)=>{
    const id = req.params.id; // Get the ID from the URL parameters
    const employee = await EmployeeModel.findById(id); // Find the employee by ID

        res.send(employee)
    
})



//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post("/api/employeelist", async (req, res) => {
    let data = req.body;
    let employee = new EmployeeModel(data);
     employee.save()
     res.json({status:"Success"})
        
})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async (req, res) => {
    try {
      const id = req.params.id; // Get the ID from the URL parameters
      const deletedEmployee = await EmployeeModel.findByIdAndDelete(id); // Find and delete the employee by ID
  
      // Check if the employee exists
      if (!deletedEmployee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      // Send the deleted employee object as response
      res.json(deletedEmployee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

//using name
app.put('/api/employeelist', async (req, res) => {
  try {
    const { name, location, position, salary } = req.body;

    // Find the employee by name and update their information
    const updatedEmployee = await EmployeeModel.findOneAndUpdate(
      { name },
      { location, position, salary },
      { new: true }
    );

    // Check if the employee exists
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//using id
app.patch('/api/employeelist', async (req, res) => {
    try {
      const id =req.body._id
      const {name,location,position,salary} = req.body
       // let data = req.body; // Get the ID from the request body
      const employee = await EmployeeModel.findByIdAndUpdate(id,{name,location,position,salary}); // Find the employee by ID
     console.log(employee)
       res.send(employee);
       
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  
//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});
app.listen(3000, () => {
    console.log("Server is running on the PORT 3000");
})


