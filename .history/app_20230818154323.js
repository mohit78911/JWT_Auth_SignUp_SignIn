const express = require("express");
const app = express();
app.use(express.json());
const functionHandler = require("./Functions");
require("./Config");
const path = require("path");
const cors = require("cors");

app.get("/userdata", functionHandler.getData);
app.post("/signup", functionHandler.signup);
app.post("/signin", functionHandler.signin);
app.delete("/delete/:id", functionHandler.deleteData);
app.put("/update/:id", functionHandler.updateById);

//this is html page
app.get("/inputfield", (req, res) => {
  res.sendFile(path.join(__dirname, "signup.html"));
});

app.get("/value", (req, res) => {
  res.json({ result: "hello Node js" });
});

module.exports = app;
