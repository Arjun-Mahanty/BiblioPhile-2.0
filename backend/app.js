const express = require("express");
const libraryRouter  = require( "./routes/libraryRouter");
const userRouter = require("./routes/userRouter");

const app = express();

const cors = require("cors");

// const allowList = [process.env.ALLOWED_URL_1, process.env.ALLOWED_URL_2];
const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // You can include this if needed
};

// var corsOptionsDeleagate = function (req, callback) {
//     var corsOptions = {
//         credenttials:true,
//     }
    
//     if(allowList.indexOf(req.header('Origin')) !== -1){
//         corsOptions.origin = true;
//     }else{
//         corsOptions.origin = false;
//     } 
    
//     callback(null, corsOptions);    
// }

// app.use(cors({...corsOptionsDeleagate, methods:"*"}));
app.use(cors(corsOptions));

app.use(express.json());

app.use("/test", (req, res, next) => {
    res.status(200).send("Server running!");
  });

app.use("/api/lib",libraryRouter);
app.use("/user",userRouter);

app.use("*", (req, res, next) => {
    res.status(404).send("Route Not Found");
  });

module.exports = app;
