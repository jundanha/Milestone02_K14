const express = require('express');
const app = express();
let ejs = require('ejs');
var path = require('path');

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
const data = {
  ttki: {
    nama: 'TATA TULIS KARYA ILMIAH',
    semester: 1,
    files: [
      { nama: 'Buku sakti', link: 'drive.com' },
      { nama: 'Buku besar', link: 'sipsipsip' },
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
app.get('/subbab', (req, res) => {
  res.render(__dirname + '/views/subbab', {
    matkul: data['ttki'],
  });
});

app.get('/matkul', (req, res) => {
    res.render(__dirname + '/views/matkul', {
        matkul: data['ttki'],
    })
})

app.listen(3000, () => {
  console.log('Server aktif');
});


