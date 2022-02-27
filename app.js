const express = require('express')
const path = require('path')
const { db } = require('./DB')

const PORT = 3000

const app = express()
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'src', 'views'))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  const postsQuery = req.query
  let postsForRender = db.posts
  console.log(postsQuery)
  if (postsQuery.limit !== undefined && Number.isNaN(+postsQuery.limit) === false) {
    postsForRender = db.posts.slice(0, postsQuery.limit)
  }

  if (postsQuery.reverse === '') {
    postsForRender = postsForRender.reverse()
  }

  res.render('main', { listOfPosts: postsForRender })
})

app.post('/newpost', (req, res) => {
  const dataFromUser = req.body
  db.posts.unshift(dataFromUser)
  res.redirect('/')
})

app.listen(PORT, () => {
})
