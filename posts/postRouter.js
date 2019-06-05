const express = require('express');
const Users = require('../users/userDb');
const Post = require('./postDb');

const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await Post.get();
    try {
        res.status(200).json(posts)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Cannot find posts' })
    }

});

router.get('/:id', async (req, res) => {
    const posts = await Post.getById(req.params.id);
    try {
        res.status(200).json(posts)
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Cannot find post'})
    }

});

router.post('/', async (req, res) => {
    const newPost = await Post.insert(req.body);
    try {
        res.status(201).json({newPost})
    } catch(err) {
        console.log(err)
        res.status(500).json({ message: 'Cannot add post'})
    }
})

router.put('/:id', async (req, res) => {
    try {
        if (!req.body.text) {
            return res.status(400).json({ errorMessage: 'Please provide text for post.'})
        }
        const post = await post.update(req.params.id, req.body)
        if(post) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: 'Post not found'})
        }
    }
    catch(err) {
        console.log(err)
        res.status(500).json({
            message: 'Updating error'
        })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const post = await post.remove(req.params.id)
        if (post > 0) {
            res.status(200).json({ message: 'Post has been deleted'})
        } else {
            res.status(404).json({ message: 'Cant find post with this ID.'})
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            message: 'Error! Cannot delete post.'
        })
    }

});

router.put('/:id', (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;