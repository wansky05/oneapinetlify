// netlify/functions/index.js

const express = require('express');
const serverless = require('serverless-http');

// Import semua file handler seperti `ytmp3`, `aitoxic`, dll.
const ytmp3 = require("./savetube.js");
const aichat = require('./aitoxic.js');
const tikwm = require('./tikwm.js');
const ig = require('./ig.js');
const yta = require('./yta.js');
const ytv = require('./ytv.js');
const fb = require('./fb.js');
const { getBuffer } = require('./myfunc.js');
const downloaderyt = require('./downloaderyt.js');
const downloadFileAsBuffer = require('./downloadFileAsBuffer.js');

// Inisialisasi aplikasi Express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route utama
app.get("/", (req, res) => res.send("Express on Netlify!"));

// Contoh route download untuk ytmp3
app.get('/ytget/:id', async (req, res) => {
  const q = req.query.data;
  try {
    const respon = await downloaderyt(q);
    res.send(respon);
  } catch (e) {
    res.end();
  }
});

// Route lainnya juga sama, misalnya /download/:id, /getbuffer/:id, dll.
app.get('/download/:id', async (req, res) => {
  const q = req.query.data;
  try {
    const respon = await downloadFileAsBuffer(q);
    res.send(respon);
  } catch (e) {
    res.end();
  }
});

app.get('/getbuffer/:id', async (req, res) => {
  const q = req.query.data;
  try {
    const respon = await getBuffer(q);
    res.send(respon);
  } catch (e) {
    res.end();
  }
});

// Tambahkan route lainnya sesuai dengan yang kamu miliki, seperti /ai/:id, /ytmp3/:id, dll.


// Konversi aplikasi Express menjadi fungsi serverless dengan `serverless-http`
module.exports.handler = serverless(app);
