const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

//connnect mongoose
mongoose.connect("mongodb+srv://kathysporty:L6O4LAR29qF1SWJk@cluster0-zyett.mongodb.net/node-angular?retryWrites=true&w=majority",
                  { useUnifiedTopology: true, useNewUrlParser: true })
        .then(() => {
          console.log('connect to database');
        })
        .catch(() => {
          console.log('database error');
        });

//import routes
const routeTasks = require('./routes/tasks');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  //CORS là một cơ chế xác nhận thông qua Header của request.
  //Cụ thể là trên Server sẽ nói với browser về quy định chấp nhận những request từ domain nào và phương thức ra sao (GET, POST, PUT, v.v..)

  //Access-Control-Allow-Origin: Những origin mà server cho phép. (ví dụ server loda.his chỉ chấp nhận loda.me request lên)
  res.setHeader("Access-Control-Allow-Origin", "*");
  //Access-Control-Allow-Headers: Những Header được server cho phép. (ví dụ x-authorize, origin, cái này do server bạn quy định)
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  //Access-Control-Allow-Methods: Những Method được server cho phép (POST, GET, v.v..)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
})

app.use(routeTasks);

module.exports = app;