const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user',{ username: 1, name:1 })
  response.json(blogs)
  /*response.json({
    count: await Blog.count(),
    blogs: blogs
  })*/
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  //const user = await User.findById(body.userId)
  const user = request.user
  const { body } = request

  if(!user) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  if(blog.title === undefined || blog.url === undefined){
    response.status(400).end()
  }else{
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user

  if(!user) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  //const blog=await Blog.findByIdAndRemove(request.params.id)
  const blog=await Blog.findById(request.params.id)

  if(!blog) return response.status(404).json({
    error: 'blog not found'
  })

  if(blog.user.toString() !== user.id){
    return response.status(401).json({
      error: 'invalid user'
    })
  }

  await Blog.deleteOne(blog)
  response.json(blog)
  
})

blogsRouter.put('/:id', async (request, response) => {
  const { body } = request

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })

  response.json(updatedBlog)
})

module.exports = blogsRouter
