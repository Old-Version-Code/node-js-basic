const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();


connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/blogs', require('./routes/blogRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
