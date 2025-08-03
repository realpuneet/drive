const express = require("express");
const userRouter = require("./routes/user.routes");
const indexRouter = require("./routes/index.routes")
const cookieParser = require("cookie-parser")
app = express();

app.set("view engine", "ejs");

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use("/", indexRouter);
app.use("/user", userRouter);

module.exports = app;
