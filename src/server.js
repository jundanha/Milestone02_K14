const express = require('express');
const app = express();
let ejs = require('ejs');
var path = require('path');
const fs = require('fs');

// var fileMeet = fs.readFile(__dirname + '/data/meet.json');
// var dataMeet = JSON.parse(fileMeet);

//import file
const data = require('./data/index')

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

const meet = [
  [1, 2, 3],
  [2, 3],
];
app.get('/meet', (req, res) => {
  res.render(__dirname + '/views/meet', {
    meets: meet,
  });
});
const dataLokal = {
  ttki: {
    nama: 'KIMIA DASAR B',
    semester: 1,
    files: [
      {nama:'Buku Teks', link:'https://drive.google.com/drive/folders/0B-FCyeQT0LhoSjF2TGtnMXNTbkU?resourcekey=0-68gfGYMvcz0x7usaTySX-g&usp=sharing'},
      {nama:'Slide Dosen', link:'https://drive.google.com/drive/folders/0B-FCyeQT0LhoSjF2TGtnMXNTbkU?resourcekey=0-68gfGYMvcz0x7usaTySX-g&usp=sharing'},
      {nama:'Soal-Soal Latihan', link:'https://drive.google.com/drive/folders/0B-FCyeQT0LhoWlFwbElKLVZodms?resourcekey=0-jcs1suIVEoEC1V_MSXQt4Q'}
    ],
    subbab: [
      {
        nama: 'Kata Baku',
        materi: [
          { nama: 'Kata baku non esensial', link: 'youtube.com/sasasa atau drive atau pdf atau quiziz' },
          { nama: 'Kata baku esensial', link: 'youtube.com/asasafd' },
        ],
      },
      {
        nama: 'Kata Baku',
        materi: [
          { nama: 'Kata baku non esensial', link: 'youtube.com/sasasa atau drive atau pdf atau quiziz' },
          { nama: 'Kata baku esensial', link: 'youtube.com/asasafd' },
        ],
      },
    ],
  },
};
app.get('/matkul/:matkul', (req, res) => {
  res.render(__dirname + '/views/matkul', {
    matkul: data[req.params.matkul],
  });
});


app.listen(3000, () => {
  console.log('Server aktif');
});



