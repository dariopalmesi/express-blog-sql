// const posts = require('../db/db.js')
const fs = require('fs')
const connection = require('../db/connection')



const index = (req, res) => {

    const sql = 'SELECT * FROM posts'

    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: `Database query failed` })
        res.json(results)
    })

}

const show = (req, res) => {

    const id = req.params.id
    console.log(id);


    const sql = 'SELECT * FROM posts WHERE id =?'

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'Posts not found' })
        res, json(results[0]);
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

    const { id } = req.params

    connection.query('DELETE FROM posts WHERE id =?', [id], (err) => {
        if (err) {
            return res.status(500).json({
                error: 'Failed to delete post'
            })
        }

        res.status(204)
    })





    // const post = posts.find(post => post.slug === req.params.slug)

    // if (!post) {
    //     return res.status(404).json({
    //         error: `404! Not found`
    //     })
    // }

    // const newPost = posts.filter((post) => post.slug !== req.params.slug)

    // fs.writeFileSync('./db/db.js', `module.exports = ${JSON.stringify(newPost, null, 4)}`)

    // res.status(200).json({
    //     status: 200,
    //     data: newPost
    // })

}



module.exports = {
    index,
    show,
    store,
    update,
    destroy
}