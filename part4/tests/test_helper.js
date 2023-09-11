const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]

const newBlog = {
  title: 'New blog',
  author: 'Blog author',
  url: 'https://blogurl.com/',
}

const noLikesBlog = {
  title: 'Blog with no likes',
  author: 'Some author',
  url: 'some URL',
}
const noTitleBlog = {
  author: 'Some author',
  url: 'some URL',
}
const noURLBlog = {
  title: 'Blog with no url',
  author: 'Some author',
}

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  noLikesBlog,
  noTitleBlog,
  noURLBlog,
  newBlog
}