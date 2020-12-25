const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const posts = {};
app.get('/posts', (req, res) => {
  res.send(posts);
});

app.get('/events', (req, res) => {
  const { type, data } = req.body;
  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    const post = posts[postId];
    post.comments.push({ id, content });
  }
});

app.listen(4003, () => {
  console.log('App Listening on port 4003 ');
});
