const posts = require('../db/db.js')
const fs = require('fs')
const connection = require('../db/connection')



const index = (req, res) => {


    res.json({
        data: posts,
        counter: posts.length
    })
}

const show = (req, res) => {

    const post = posts.find(post => post.slug === req.params.slug)
    if (!post) {
        return res.status(404).json({
            erroe: `404! Not found`
        })
    }
    return res.json({
        data: post
    })

}


const store = (req, res) => {


    const post = {
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    posts.push(post)

    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)

    return res.status(201).json({
        status: 201,
        data: posts,
        counter: posts.length
    })

}

const update = (req, res) => {
    const post = posts.find(post => post.slug === req.params.slug)

    if (!post) {
        return res.status(404).json({
            error: `404! Not found`
        })
    }

    post.title = req.body.title;
    post.slug = req.body.slug;
    post.content = req.body.content;
    post.image = req.body.image;
    post.tags = req.body.tags

    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`)

    res.status(200).json({
        status: 200,
        data: posts
    })

}

const destroy = (req, res) => {
    const post = posts.find(post => post.slug === req.params.slug)

    if (!post) {
        return res.status(404).json({
            error: `404! Not found`
        })
    }

    const newPost = posts.filter((post) => post.slug !== req.params.slug)

    fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(newPost, null, 4)}`)

    res.status(200).json({
        status: 200,
        data: newPost
    })

}



module.exports = {
    index,
    show,
    store,
    update,
    destroy
}