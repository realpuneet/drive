const express = require("express");
const userRouter = require("./routes/user.routes");


app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.set("view engine", "ejs");

app.use("/user", userRouter);


module.exports = app;
