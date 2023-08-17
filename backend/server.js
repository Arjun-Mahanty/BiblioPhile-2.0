const {Client} = require('pg');
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

client
  .connect()
  .then(()=> console.log("postgreSQL connected"))
  .catch((e)=> console.log(e));


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server Started on Port", PORT);
  });