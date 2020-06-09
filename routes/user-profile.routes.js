const express = require("express");
const app = express();
const User = require("../models/User.model");
const multer = require("multer");
const upload = multer({dest: "./public/uploads/"});

app.get("/user-profile", (req, res) => {
  User
    .findById(req.session.currentUser._id)
    .then((user) => { 
      res.render("users/user-profile", {user})
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post("/user-profile/upload-picture", upload.single("profilePicture"), (req, res, next) => {
  debugger
  User
    .findByIdAndUpdate(req.session.currentUser._id, {profilePicture: req.file.filename})
    .then((user) => {
      res.redirect("/user-profile")
    })
    .catch((err) => {
      console.log("Error with uploading profile picture", err)
    })
})

module.exports = app;