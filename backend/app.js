const express = require("express");
const libraryRouter  = require( "./routes/libraryRouter");
const gptRouter = require('./routes/gptRouter');
const adminRouter = require("./routes/adminRouter");

const app = express();

const cors = require("cors");

const allowedOrigins = ['http://localhost:3000'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

app.use("/test", (req, res, next) => {
    res.status(200).send("Server running!");
  });

app.use("/api/lib",libraryRouter);
app.use("/gpt",gptRouter);
app.use("/admin",adminRouter);

app.use("*", (req, res, next) => {
    res.status(404).send("Route Not Found");
  });

module.exports = app;
