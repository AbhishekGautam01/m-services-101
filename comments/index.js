const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();
app.use(bodyParser.json());
app.use(cors());

//{IdofPost: [array of comment]}
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content } = req.body;
  const comment = commentsByPostId[req.params.id] || [];
  comment.push({ id: commentId, content: content, status: 'pending' });
  commentsByPostId[req.params.id] = comment;
  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentCreated',
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: 'pending',
    },
  });
  res.status(201).send(comment);
});

app.post('/events', async (req, res) => {
  console.log(`recivieved event ${req.body.type}`);
  const { type, data } = req.body;
  if (type === 'CommentModerated') {
    const { postId, id, status, content } = data;
    const comments = commentsByPostId[postId];
    const comment = comments.find((comment) => comment.id === id);
    comment.status = status;
  }

  await axios.post('http://event-bus-srv:4005/events', {
    type: 'CommentUpdated',
    data: { id, status, content, postId },
  });
  res.send({});
});

app.listen(4001, () => {
  console.log('Comment Service:4001');
});
