const express = require("express");

const route = express.Router();

const upload = require("../configs/multer");

const {uploadPhoto} = require("../controllers/photoController")

route.post("/upload", upload.single("photo"), uploadPhoto);

module.exports = route;