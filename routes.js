const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models');

const router = express.Router();

router

  .get('/', (req, res) => {
    Post.find({}, (err, posts) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(posts);
      }
    });
  })

  .get('/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(post);
      }
    });
  })

  .post('/save', (req, res) => {
    console.log({
      title: req.body.title,
      content: req.body.content,
    });
    const newPost = new Post({
      title: req.body.title,
      content: req.body.content,
    });
    newPost.save((err, post) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json({ msg: 'Saved post' });
      }
    });
  })

  .patch('/update', (req, res) => {
    Post.findById(req.body._id, (err, post) => {
      if (err) {
        console.log(err);
      } else {
        if (req.body.type === 'like') {
          Post.findByIdAndUpdate(
            post._id,
            { $set: { likes: (post.likes += 1) } },
            (error, updatedPost) => {
              if (error) {
                console.log(error);
              } else {
                res.status(200).json({ msg: 'Likes have been updated' });
              }
            }
          );
        } else if (req.body.type === 'dislike') {
          Post.findByIdAndUpdate(
            post._id,
            { $set: { dislikes: (post.dislikes += 1) } },
            (error, updatedPost) => {
              if (error) {
                console.log(error);
              } else {
                res.status(200).json({ msg: 'Dislikes have been updated' });
              }
            }
          );
        }
      }
    });
  })

  .delete('/delete', (req, res) => {
    Post.findByIdAndDelete(req.body._id, (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json({ msg: 'Deleted post' });
      }
    });
  });

module.exports = router;
