const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const posts = {};
app.get('/posts', (req, res) => {});

app.get('/events', (req, res) => {});

app.listen(4003, () => {
  console.log('App Listening on port 4003');
});
