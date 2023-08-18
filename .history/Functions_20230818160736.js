const userModuls = require("./moduls/user");
const fs = require("fs");
const secretKey = fs.readFileSync("./privite.key", "utf8");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");

//signup function
const signup = async (req, res) => {
  try {
    const existinguser = await userModuls.findOne({
      email: req.body.email,
      username: req.body.username,
    });
    if (existinguser) {
      return res.send("User Already Exists");
    }

    const result = await userModuls.create({
      _id: new mongoose.Types.ObjectId(),
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });
    const token = jwt.sign({ email: result.email, id: result._id }, secretKey);

    res.status(200).json({ userData: result, token: token });
    console.log("Data Added Successfully");
  } catch (error) {
    console.log(error);
    res.send("Something Went Wrong...");
    res.end();
    console.log("Something Wrong...");
  }
};

//signin function
const signin = async (req, res) => {
  try {
    const existinguser = await userModuls.findOne({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    if (!existinguser) {
      return res.send("User Details Not Match...");
      res.end();
    }

    const matchPassword = bcrypt.compare(password, existinguser.password);

    if (matchPassword) {
      res.status(400).json({ error: "Incorrect password" });
    }
    // const token = jwt.sign(
    //   {
    //     email: existinguser.email,
    //     password: existinguser.password,
    //     id: existinguser._id,
    //   },
    //   secretKey
    // );
    res.status(201).json({ UserProfile_Accessed: existinguser });
    console.log("Login Successfully");
  } catch (error) {
    res.send("Something Went Wrong...");
    res.end();
    console.log("Error with Login");
  }
};

//get data handler
const getData = (req, res) => {
  userModuls
    .find()
    .then((result) => {
      res.status(200).json(result);
      console.log("Data Fetch Done.");
    })
    .catch((error) => {
      console.log("Error with Data fetching....");
    });
};

//delete handler with id
function deleteData(req, res) {
  userModuls
    .deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(202).json(result);
      console.log("Delete Successfully");
    })
    .catch((error) => {
      console.log("Deleting Error...");
    });
}

// update by id handler
const updateById = (req, res) => {
  userModuls
    .updateOne(
      { _id: req.params.id },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
      console.log("Update Successfully");
    })
    .catch((error) => {
      console.log("Error with Update ");
    });
};

module.exports = { signup, signin, getData, updateById, deleteData };
