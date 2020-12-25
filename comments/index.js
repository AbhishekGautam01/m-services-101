const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

//{IdofPost: [array of comment]}
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comment = commentsByPostId[req.params.id] || [];
  comment.push({ id: commentId, content: content });
  commentsByPostId[req.params.id] = comment;

  res.status(201).send(comment);
});

app.listen(4001, () => {
  console.log('Listening for 4001');
});
