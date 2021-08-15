const express = require("express");
const app = express();
let ejs = require("ejs");
var path = require("path");
const fs = require("fs");
const data = require("./data/index");

// var fileMeet = fs.readFile(__dirname + '/data/meet.json');
// var dataMeet = JSON.parse(fileMeet);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

/**
 * Router to get home
 */

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/home.html");
});

/**
 * Router to get meet
 */

app.get("/meet", (req, res) => {
  //import file
  const fileData = fs.readFileSync("./data/meet.json");
  const meets = JSON.parse(fileData);
  function sliceIntoChunks(arr, chunkSize) {
    const mam = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      mam.push(chunk);
    }
    return mam;
  }
  function matkulForDropdown(data){
    let hasil = [];
    for (const [key, value] of Object.entries(data)) {
      hasil.push(value.nama);
    }
    return hasil
  }
  res.render(__dirname + "/views/meet", {
    meets: sliceIntoChunks(meets.meet, 3),
    matkulForDropdown: matkulForDropdown(data)
  });
});

/**
 * Router to get courses list
 */

app.get('/course', (req,res) => {
  res.sendFile(__dirname + '/views/courses.html')
})

/**
 * Router to add meet
 * body needed: matkul, judul, platform, link
 */

app.post("/api/tambahmeet", (req, res) => {
  console.log("ada");
  const data = req.body;
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes();
  let newMeet = {
    matkul: data.matkul,
    judul: data.judul,
    platform: data.platform,
    link: data.link,
    jam: time
  };
  try{
    const fileData = fs.readFileSync("./data/meet.json");
    const meets = JSON.parse(fileData);
    const newMeets = {
      meet: [...meets.meet, newMeet]
    }
    fs.writeFileSync("./data/meet.json", JSON.stringify(newMeets))
  }catch{
    res.status(500).json({message: "gagal menyimpan meet baru"})
  }
  res.status(200).json({message:"success"})
});

/**
 * Router to get specific matkul data
 * need a route parameter that specify the data
 */
app.get("/matkul/:matkul", (req, res) => {
  const matkul = req.params.matkul;
  if (!Object.keys(data).includes(matkul)) {
    res.render(__dirname + "/views/matkul404", {
      matkul: matkul,
    });
  
  } else {
    res.render(__dirname + "/views/matkul", {
      matkul: data[matkul],
     
    });
  }
});



/**
 * Server lies here
 */
app.listen(process.env.PORT || 3000, () => {
  console.log("Server aktif");
});
