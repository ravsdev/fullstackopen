const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('blogs api', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })

  test('id is the unique identifier property of the blog posts', async () => {
    const response = await api.get('/api/blogs')
    for(const blog of response.body){
      expect(blog.id).toBeDefined()
    }
  })

  test('a valid blog can be added', async () => {
    
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await helper.blogsInDb()

    expect(response).toHaveLength(helper.initialBlogs.length + 1)

  })

  test('if likes property is missing, it will default to 0', async () => {
    const response =     await api
      .post('/api/blogs')
      .send(helper.noLikesBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const { likes } = response.body

    expect(likes).toBe(0)
  })

  test('title or url missing, responds 400', async () => {
    const response = await api
      .post('/api/blogs')
      .send(helper.noURLBlog)

    expect(response.status).toBe(400)
  })

  test('title missing, responds 400', async () => {
    const response = await api
      .delete('/api/blogs')
      .send(helper.noTitleBlog)

    expect(response.status).toBe(400)
  })

  test('url missing, responds 400', async () => {
    const response = await api
      .delete('/api/blogs')
      .send(helper.noURLBlog)

    expect(response.status).toBe(400)
  })

  test('delete blog', async () => {
    const newBlog = await api
      .post('/api/blogs')
      .send(helper.newBlog)

    const response = await api
      .delete(`/api/blogs/${newBlog.body.id}`)

    expect(response.status).toBe(200)
  })

  test('update blog', async () => {
    const updateBlog = {
      likes: 3
    }
    const newBlog = await api
      .post('/api/blogs')
      .send(helper.newBlog)

    const response = await api
      .put(`/api/blogs/${newBlog.body.id}`)
      .send(updateBlog)

    expect(response.body.likes).toBe(updateBlog.likes)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})