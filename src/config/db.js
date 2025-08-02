const mongoose = require("mongoose");

function dbConnect() {
  // console.log(process.env.MONGODB_URI);
  mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("database connection established..");
  });
}

module.exports = dbConnect;
