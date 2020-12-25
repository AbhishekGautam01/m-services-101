import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CommentList({ comments }) {
  const renderComments = comments.map((comment) => {
    let content;
    if (comment.status === 'approved') {
      content = comment.content;
    }
    if (comment.status === 'pending') {
      content = 'This comment is pending moderation';
    }
    if (comment.status === 'rejected') {
      content = 'This comment is rejected';
    }
    return <li key={comment.id}>{content}</li>;
  });
  return <div>{renderComments}</div>;
}

export default CommentList;
