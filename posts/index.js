const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');
const app = express();
//middleware
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  const requestBody = {
    type: 'PostCreated',
    data: {
      ...posts[id],
    },
  };
  await axios.post('http://localhost:4005/events', requestBody);

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log(`recivieved event ${req.body.type}`);
  res.send({});
});

app.listen(4000, () => {
  console.log('Posts Service:4000');
});
