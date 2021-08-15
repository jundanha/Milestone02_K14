const express = require("express");
const app = express();
let ejs = require("ejs");
var path = require("path");
const fs = require("fs");
const data = require('./data/index')

// var fileMeet = fs.readFile(__dirname + '/data/meet.json');
// var dataMeet = JSON.parse(fileMeet);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

const meet = [
  [1, 2, 3],
  [2, 3],
];
app.get("/meet", (req, res) => {
  //import file
  const fileData = fs.readFileSync('./data/meet.json');
  const meets = JSON.parse(fileData);
  function sliceIntoChunks(arr, chunkSize) {
    const mam = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      mam.push(chunk);
    }
    return mam;
  }
  res.render(__dirname + "/views/meet", {
    meets: sliceIntoChunks(meets.meet, 3),
  });
});

app.post("/api/tambahmeet", (req, res) => {});

app.get("/matkul/:matkul", (req, res) => {
  res.render(__dirname + "/views/matkul", {
    matkul: data[req.params.matkul],
  });
});

app.listen(3000, () => {
  console.log("Server aktif");
});
